'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useCreateComment } from '@/queries/comments'

type Props = { slug: string }

export function CommentForm({ slug }: Props) {
  const t = useTranslations('comments')
  const { mutate: submit, isPending } = useCreateComment(slug)

  const schema = z.object({
    author: z.string().min(1, t('name_required')).max(50),
    email: z.string().email(t('email_invalid')),
    body: z.string().min(1, t('body_required')).max(2000),
  })
  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = (data: FormValues) => {
    submit({ ...data, postSlug: slug }, { onSuccess: () => reset() })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register('author')}
            placeholder={t('name')}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.author && <p className="mt-1 text-xs text-destructive">{errors.author.message}</p>}
        </div>
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder={t('email')}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <textarea
          {...register('body')}
          rows={4}
          placeholder={t('body')}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        {errors.body && <p className="mt-1 text-xs text-destructive">{errors.body.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {isPending ? t('submitting') : t('submit')}
      </button>
    </form>
  )
}
