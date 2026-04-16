'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bold,
  Italic,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image,
  Upload,
  Eye,
  PenSquare,
  Columns,
  ChevronDown,
  X,
  Save,
  Send,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { CATEGORIES } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useI18n } from '@/components/i18n-provider'
import { persistArticle } from '@/lib/firebase-articles'
import { isFirebaseConfigured } from '@/lib/firebase-client'

type ViewMode = 'write' | 'preview' | 'split'

const DEFAULT_CONTENT = `## Introduction

Write your article introduction here. This is where you hook the reader and explain what they'll learn.

## Background

Provide context and background information that helps the reader understand the topic.

## Main Content

Your main content goes here. You can use **bold**, *italic*, and \`inline code\`.

### Code Example

\`\`\`typescript
const greet = (name: string): string => {
  return \`Hello, \${name}!\`
}

console.log(greet('World'))
\`\`\`

### Key Points

- First important point
- Second important point
- Third important point

## Data and Comparisons

| Feature | Option A | Option B |
|---------|----------|----------|
| Speed   | Fast     | Moderate |
| Cost    | Low      | High     |
| Ease    | Simple   | Complex  |

## Conclusion

> Summarize the key takeaways and what the reader should do next.

Wrap up your article with actionable insights and next steps.
`

const TOOLBAR_ACTIONS = [
  {
    group: 'format',
    items: [
      { icon: Bold, label: 'Bold', syntax: '**', wrap: true },
      { icon: Italic, label: 'Italic', syntax: '*', wrap: true },
      { icon: Code, label: 'Inline Code', syntax: '`', wrap: true },
    ],
  },
  {
    group: 'headings',
    items: [
      { icon: Heading2, label: 'Heading 2', syntax: '## ', wrap: false },
      { icon: Heading3, label: 'Heading 3', syntax: '### ', wrap: false },
    ],
  },
  {
    group: 'blocks',
    items: [
      { icon: List, label: 'Bullet List', syntax: '- ', wrap: false },
      { icon: ListOrdered, label: 'Ordered List', syntax: '1. ', wrap: false },
      { icon: Quote, label: 'Blockquote', syntax: '> ', wrap: false },
    ],
  },
]

export function EditorPage() {
  const { t, locale } = useI18n()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [articleId, setArticleId] = useState<string | undefined>()
  const [persistingState, setPersistingState] = useState<'idle' | 'draft' | 'publish'>('idle')
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [isDragging, setIsDragging] = useState(false)
  const [wordCount, setWordCount] = useState(
    DEFAULT_CONTENT.split(/\s+/).filter(Boolean).length
  )
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleContentChange = (val: string) => {
    setContent(val)
    setWordCount(val.split(/\s+/).filter(Boolean).length)
  }

  const insertAtCursor = (syntax: string, wrap: boolean) => {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = content.slice(start, end)

    let newContent: string
    let newCursorPos: number

    if (wrap && selected) {
      newContent =
        content.slice(0, start) +
        syntax +
        selected +
        syntax +
        content.slice(end)
      newCursorPos = start + syntax.length + selected.length + syntax.length
    } else if (wrap) {
      newContent =
        content.slice(0, start) + syntax + 'text' + syntax + content.slice(end)
      newCursorPos = start + syntax.length + 4
    } else {
      newContent = content.slice(0, start) + syntax + selected + content.slice(end)
      newCursorPos = start + syntax.length + selected.length
    }

    setContent(newContent)
    setWordCount(newContent.split(/\s+/).filter(Boolean).length)

    setTimeout(() => {
      ta.focus()
      ta.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith('.md') && file.type !== 'text/markdown') {
      alert(t('editor.invalidMarkdown'))
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      setContent(text)
      setWordCount(text.split(/\s+/).filter(Boolean).length)
    }
    reader.readAsText(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }, [])

  const addTag = () => {
    const tagValue = tagInput.trim()
    if (tagValue && !tags.includes(tagValue) && tags.length < 8) {
      setTags([...tags, tagValue])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

  const readTime = Math.max(1, Math.ceil(wordCount / 200))
  const isPersisting = persistingState !== 'idle'

  const persistLocal = (status: 'draft' | 'published') => {
    const id = articleId ?? `local-${Date.now()}`
    const nowIso = new Date().toISOString()
    const payload = {
      id,
      title: title.trim(),
      content,
      category,
      tags,
      locale,
      wordCount,
      readTime,
      status,
      updatedAt: nowIso,
      publishedAt: status === 'published' ? nowIso : undefined,
    }

    try {
      const existing = JSON.parse(
        window.localStorage.getItem('makalem-local-articles') ?? '[]'
      ) as Array<{ id: string }>
      const updated = [payload, ...existing.filter((item) => item.id !== id)]
      window.localStorage.setItem(
        'makalem-local-articles',
        JSON.stringify(updated.slice(0, 100))
      )
    } catch (error) {
      console.error(error)
    }

    setArticleId(id)
    setStatusMessage(
      status === 'draft'
        ? `${t('editor.saveDraftSuccess')} ${t('editor.localModeSuffix')}`
        : `${t('editor.publishSuccess')} ${t('editor.localModeSuffix')}`
    )
  }

  const persistToFirebase = async (status: 'draft' | 'published') => {
    if (status === 'published' && (!title.trim() || !category || !content.trim())) {
      setStatusMessage(t('editor.publishRequiresFields'))
      return
    }

    if (!isFirebaseConfigured()) {
      persistLocal(status)
      return
    }

    setPersistingState(status === 'draft' ? 'draft' : 'publish')
    setStatusMessage(status === 'draft' ? t('editor.savingDraft') : t('editor.publishing'))

    try {
      const result = await persistArticle(
        {
          id: articleId,
          title,
          content,
          category,
          tags,
          locale,
          wordCount,
          readTime,
        },
        status
      )

      setArticleId(result.id)
      setStatusMessage(
        status === 'draft' ? t('editor.saveDraftSuccess') : t('editor.publishSuccess')
      )
    } catch (error) {
      console.error(error)
      setStatusMessage(t('editor.saveError'))
    } finally {
      setPersistingState('idle')
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Editor top bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border glass sticky top-0 z-30">
        <div className="flex items-center gap-1 bg-muted rounded-md p-0.5">
          {(
            [
              { mode: 'write' as ViewMode, icon: PenSquare, label: t('editor.modeWrite') },
              { mode: 'preview' as ViewMode, icon: Eye, label: t('editor.modePreview') },
              { mode: 'split' as ViewMode, icon: Columns, label: t('editor.modeSplit') },
            ] as const
          ).map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all',
                viewMode === mode
                  ? 'bg-background shadow-sm text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          <span>{t('editor.wordCount', { count: wordCount.toLocaleString() })}</span>
          <span>·</span>
          <span>{t('editor.readTime', { count: readTime })}</span>
          {statusMessage ? (
            <>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline text-[11px] truncate max-w-60">{statusMessage}</span>
            </>
          ) : null}
          <Separator orientation="vertical" className="h-4 mx-1" />
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 h-7 text-xs"
            onClick={() => persistToFirebase('draft')}
            disabled={isPersisting}
          >
            <Save className="w-3.5 h-3.5" />
            {persistingState === 'draft' ? t('editor.savingDraft') : t('editor.saveDraft')}
          </Button>
          <Button
            size="sm"
            className="gap-1.5 h-7 text-xs"
            onClick={() => persistToFirebase('published')}
            disabled={isPersisting}
          >
            <Send className="w-3.5 h-3.5" />
            {persistingState === 'publish' ? t('editor.publishing') : t('editor.publish')}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Settings sidebar */}
        <div className="w-56 border-r border-border shrink-0 overflow-y-auto p-4 space-y-5 hidden lg:block">
          <div>
            <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              {t('editor.category')}
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder={t('editor.selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.slug} className="text-xs">
                    {t(`categories.${c.slug}`, undefined, c.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              {t('editor.tags')}
            </Label>
            <div className="flex gap-1">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
                placeholder={t('editor.addTag')}
                className="h-7 text-xs flex-1"
              />
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2"
                onClick={addTag}
              >
                +
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[10px] gap-1 pr-1"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Upload .md file */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              {t('editor.uploadMarkdown')}
            </Label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              className={cn(
                'rounded-lg border-2 border-dashed p-4 text-center cursor-pointer transition-colors',
                isDragging
                  ? 'border-ring bg-accent'
                  : 'border-border hover:border-muted-foreground/50 hover:bg-accent/50'
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1.5" />
              <p className="text-[11px] text-muted-foreground">
                {t('editor.dropMarkdown')}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,text/markdown"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file)
                }}
              />
            </div>
          </div>

          <Separator />

          {/* Keyboard shortcuts */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {t('editor.shortcuts')}
            </p>
            <div className="space-y-1.5 text-[11px] text-muted-foreground">
              {[
                ['⌘B', 'Bold'],
                ['⌘I', 'Italic'],
                ['⌘K', 'Link'],
                ['⌘S', 'Save'],
              ].map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span>{label}</span>
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main editor area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Title input */}
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('editor.titlePlaceholder')}
              className="w-full text-2xl sm:text-3xl font-bold text-foreground bg-transparent placeholder:text-muted-foreground/40 border-none outline-none ring-0 focus:ring-0"
            />
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-1 px-4 py-2 border-b border-border overflow-x-auto">
            {TOOLBAR_ACTIONS.map((group, gi) => (
              <div key={gi} className="flex items-center gap-0.5">
                {gi > 0 && (
                  <div className="w-px h-4 bg-border mx-1 shrink-0" />
                )}
                {group.items.map(({ icon: Icon, label, syntax, wrap }) => (
                  <button
                    key={label}
                    title={label}
                    onClick={() => insertAtCursor(syntax, wrap)}
                    className="flex items-center justify-center w-7 h-7 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Editor / Preview */}
          <div
            className={cn(
              'flex flex-1 overflow-hidden',
              viewMode === 'split' && 'divide-x divide-border'
            )}
          >
            {/* Write pane */}
            {(viewMode === 'write' || viewMode === 'split') && (
              <div
                className={cn(
                  'flex flex-col overflow-hidden',
                  viewMode === 'split' ? 'w-1/2' : 'w-full'
                )}
              >
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="flex-1 w-full resize-none bg-background text-foreground text-sm font-mono leading-relaxed p-6 outline-none border-none focus:ring-0 placeholder:text-muted-foreground/40"
                  placeholder={t('editor.contentPlaceholder')}
                  spellCheck
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
                      e.preventDefault()
                      insertAtCursor('**', true)
                    }
                    if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
                      e.preventDefault()
                      insertAtCursor('*', true)
                    }
                  }}
                />
              </div>
            )}

            {/* Preview pane */}
            {(viewMode === 'preview' || viewMode === 'split') && (
              <div
                className={cn(
                  'overflow-y-auto',
                  viewMode === 'split' ? 'w-1/2' : 'w-full'
                )}
              >
                <div className="p-8 max-w-none">
                  {title && (
                    <h1 className="text-3xl font-bold text-foreground tracking-tight mb-6">
                      {title}
                    </h1>
                  )}
                  {content ? (
                    <MarkdownRenderer content={content} />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                      <FileText className="w-8 h-8 mb-2 opacity-30" />
                      <p className="text-sm">{t('editor.previewPlaceholder')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
