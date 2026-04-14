import { Lang } from '@/lib/translations'
import HomePage from '@/components/HomePage'

export default function Page({ params }: { params: { lang: string } }) {
  const lang = (['ru', 'en'].includes(params.lang) ? params.lang : 'ru') as Lang
  return <HomePage lang={lang} />
}
