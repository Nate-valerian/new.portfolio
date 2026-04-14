import type { Metadata } from 'next'
import { translations, Lang } from '@/lib/translations'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = (params.lang as Lang) || 'ru'
  const isRu = lang === 'ru'
  return {
    title: isRu
      ? 'Разработка сайтов, приложений и AI продуктов | N.DEV'
      : 'Website, App & AI Development | N.DEV',
    description: isRu
      ? 'Создаём сайты, мобильные приложения, AI продукты под ключ. В 3 раза быстрее и на 30% дешевле любого агентства.'
      : 'We build websites, mobile apps and AI products end-to-end. 3x faster and 30% cheaper than any agency.',
    keywords: isRu
      ? 'разработка сайтов, мобильное приложение, AI разработка, искусственный интеллект, Москва, Россия'
      : 'website development, mobile app, AI development, artificial intelligence, Russia',
    alternates: {
      canonical: `https://nate-web3.com/${lang}`,
      languages: { ru: 'https://nate-web3.com/ru', en: 'https://nate-web3.com/en' },
    },
    openGraph: {
      title: isRu ? 'N.DEV — Разработка сайтов, приложений и AI продуктов' : 'N.DEV — Website, App & AI Development',
      description: isRu
        ? 'В 3 раза быстрее и на 30% дешевле любого агентства'
        : '3x faster and 30% cheaper than any agency',
      url: `https://nate-web3.com/${lang}`,
      siteName: 'N.DEV',
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }]
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
