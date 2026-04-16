'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Github, Eye, EyeOff } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { LogoMark } from '@/components/logo-mark'

export function AuthModal() {
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useI18n()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 text-xs font-medium px-2 sm:px-3">
          {t('auth.signIn')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col items-center pt-8 pb-4 px-6 bg-muted/30 border-b border-border">
          <div
            className="w-10 h-10 rounded-xl overflow-hidden border border-border bg-white dark:bg-black mb-4 flex items-center justify-center"
            aria-label={t('project.logoAlt')}
          >
            <LogoMark className="w-7 h-7" />
          </div>
          <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
            {t('auth.welcome')}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            {t('auth.subtitle')}
          </p>
        </div>

        <div className="p-6">
          <Tabs defaultValue="signin">
            <TabsList className="w-full mb-5">
              <TabsTrigger value="signin" className="flex-1 text-xs">
                {t('auth.signIn')}
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1 text-xs">
                {t('auth.register')}
              </TabsTrigger>
            </TabsList>

            {/* Sign In */}
            <TabsContent value="signin" className="mt-0 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="gap-2 text-xs h-9">
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-xs h-9">
                  <GoogleIcon />
                  Google
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">{t('auth.or')}</span>
                <Separator className="flex-1" />
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium">
                    {t('auth.email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-medium">
                      {t('auth.password')}
                    </Label>
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {t('auth.forgot')}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-9 text-sm pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-9 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {t('auth.signInAction')}
              </Button>
            </TabsContent>

            {/* Register */}
            <TabsContent value="register" className="mt-0 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="gap-2 text-xs h-9">
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-xs h-9">
                  <GoogleIcon />
                  Google
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">{t('auth.or')}</span>
                <Separator className="flex-1" />
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-medium">
                    {t('auth.fullName')}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('auth.namePlaceholder')}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-email" className="text-xs font-medium">
                    {t('auth.email')}
                  </Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-password" className="text-xs font-medium">
                    {t('auth.password')}
                  </Label>
                  <div className="relative">
                    <Input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('auth.passwordMin')}
                      className="h-9 text-sm pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-9 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {t('auth.createAccount')}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {t('auth.termsPrefix')}{' '}
                <button className="underline underline-offset-2 hover:text-foreground transition-colors">
                  {t('auth.terms')}
                </button>{' '}
                {t('auth.and')}{' '}
                <button className="underline underline-offset-2 hover:text-foreground transition-colors">
                  {t('auth.privacy')}
                </button>
                {t('auth.termsSuffix')}
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
