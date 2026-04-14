'use client'
import { useState, useEffect, useRef } from 'react'
import { translations, Lang } from '@/lib/translations'


import emailjs from '@emailjs/browser'

const EMAILJS_PUBLIC_KEY = '87_f2ZcU4pQ0LZlpc'
const EMAILJS_SERVICE_ID = 'service_8xs6t0i'
const EMAILJS_TEMPLATE_ID = 'template_u3fwuan'

const CITIES_RU = ['Москва','Санкт-Петербург','Новосибирск','Екатеринбург','Казань','Нижний Новгород','Челябинск','Самара','Омск','Ростов-на-Дону','Уфа','Красноярск','Пермь','Воронеж','Волгоград','и вся Россия']
const CITIES_EN = ['Moscow','St. Petersburg','Novosibirsk','Yekaterinburg','Kazan','Nizhny Novgorod','Chelyabinsk','Samara','Omsk','Rostov-on-Don','Ufa','Krasnoyarsk','Perm','Voronezh','Volgograd','and all of Russia']

const NAV_SECTIONS = ['hero','about','services','projects','stack','why','calc','faq','how','contact']

export default function HomePage({ lang }: { lang: Lang }) {
  const t = translations[lang]
  const isRu = lang === 'ru'

  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [cookieAccepted, setCookieAccepted] = useState(true)
  const [calcSelected, setCalcSelected] = useState<Set<number>>(new Set())
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [cbName, setCbName] = useState('')
  const [cbPhone, setCbPhone] = useState('')
  const [cbSuccess, setCbSuccess] = useState(false)
  const [ctName, setCtName] = useState('')
  const [ctPhone, setCtPhone] = useState('')
  const [ctEmail, setCtEmail] = useState('')
  const [ctMsg, setCtMsg] = useState('')
  const [ctSuccess, setCtSuccess] = useState(false)

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY)
    const accepted = localStorage.getItem('cookieAccepted')
    if (accepted) setCookieAccepted(true)
    else setCookieAccepted(false)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress((scrollTop / docH) * 100)
      let current = 'hero'
      NAV_SECTIONS.forEach(id => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 300) current = id
      })
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleCalc = (idx: number) => {
    setCalcSelected(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const calcTotal = Array.from(calcSelected).reduce((sum, idx) => sum + t.calculator.services[idx].min, 0)

  const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

  const sendCallback = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        subject: isRu ? 'Заявка на обратный звонок' : 'Callback Request',
        name: cbName, phone: cbPhone, message: isRu ? 'Перезвоните мне' : 'Please call me back',
      })
    } catch {}
    setCbSuccess(true)
    setCbName(''); setCbPhone('')
  }

  const sendContact = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        subject: isRu ? 'Новая заявка с сайта' : 'New Request from Website',
        name: ctName, phone: ctPhone, email: ctEmail, message: ctMsg,
      })
    } catch {}
    setCtSuccess(true)
    setCtName(''); setCtPhone(''); setCtEmail(''); setCtMsg('')
  }

  const navItems = [
    { id: 'hero', label: isRu ? 'Главная' : 'Home' },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'stack', label: isRu ? 'Технологии' : 'Stack' },
    { id: 'why', label: isRu ? 'Почему мы' : 'Why Us' },
    { id: 'calc', label: t.nav.prices },
    { id: 'faq', label: t.nav.faq },
    { id: 'how', label: t.nav.how },
    { id: 'contact', label: t.nav.contact },
  ]

  const stackItems = isRu ? [
    '📱 Приложения iPhone и Android', '🌐 Сайты и веб-платформы', '🤖 ChatGPT и Claude AI',
    '🎙️ Голосовые AI системы', '🎬 AI генерация видео', '🎮 3D движок Unreal Engine',
    '🖼️ AI генерация изображений', '☁️ Облачные серверы', '💳 Онлайн-платежи',
    '🎨 UI/UX дизайн', '🔒 Защита данных', '📊 Базы данных',
    '🔗 Интеграции с любыми сервисами', '📡 270° проекционные системы', '⚡ Быстрый деплой и запуск',
  ] : [
    '📱 iPhone & Android Apps', '🌐 Websites & Web Platforms', '🤖 ChatGPT & Claude AI',
    '🎙️ Voice AI Systems', '🎬 AI Video Generation', '🎮 Unreal Engine 3D',
    '🖼️ AI Image Generation', '☁️ Cloud Servers', '💳 Online Payments',
    '🎨 UI/UX Design', '🔒 Data Security', '📊 Databases',
    '🔗 Any Service Integrations', '📡 270° Projection Systems', '⚡ Fast Deploy & Launch',
  ]

  const whyItems = isRu ? [
    { n: '01', title: 'Под ключ — от идеи до запуска', desc: 'Вам не нужно искать дизайнеров и разработчиков отдельно. Мы берём проект и доводим до конца сами.' },
    { n: '02', title: 'В 3 раза быстрее любого агентства', desc: 'Там, где другие работают 6 месяцев — мы сдаём за 2. Без потери качества.' },
    { n: '03', title: 'На 30% дешевле рынка', desc: 'Мы работаем эффективно и не раздуваем команду. Вы платите за результат, а не за офис.' },
    { n: '04', title: 'Опыт в 5+ странах', desc: 'Работали с клиентами из России, Европы, США и СНГ. Понимаем разные рынки.' },
    { n: '05', title: 'Красиво и понятно', desc: 'Делаем не только чтобы работало — но и чтобы было красиво. Дизайн, который нравится.' },
    { n: '06', title: 'Всегда на связи', desc: 'Отвечаем быстро, объясняем понятно, без технического жаргона.' },
  ] : [
    { n: '01', title: 'End-to-End Delivery', desc: "You don't need to find designers and developers separately. We take the project and see it through." },
    { n: '02', title: '3x Faster Than Any Agency', desc: 'Where others take 6 months — we deliver in 2. Without sacrificing quality.' },
    { n: '03', title: '30% Below Market Price', desc: "We work efficiently without unnecessary overhead. You pay for results, not our office." },
    { n: '04', title: 'Experience in 5+ Countries', desc: "We've worked with clients from Russia, Europe, the US and CIS. We understand different markets." },
    { n: '05', title: 'Beautiful and Intuitive', desc: "We don't just make it work — we make it look great. Design that users love." },
    { n: '06', title: 'Always Available', desc: 'We respond fast, explain clearly, no technical jargon.' },
  ]

  const inputStyle = "w-full bg-white/5 border border-cyan-500/20 rounded-2xl px-5 py-3.5 text-white placeholder-green-900/60 text-sm outline-none focus:border-cyan-500/60 transition-colors font-sans"

  return (
    <div className="relative">

      {/* PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-[3px] z-[9999] transition-all duration-100"
        style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg,#0EA5E9,#86EFAC,#6B4EFF)', boxShadow: '0 0 10px rgba(14,165,233,.8)' }} />

      {/* AURORA */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[700px] h-[500px] -top-24 -left-48 rounded-full opacity-40 animate-aurora1 blur-[40px]"
          style={{ background: 'radial-gradient(ellipse, rgba(14,165,233,.12) 0%, transparent 70%)' }} />
        <div className="absolute w-[600px] h-[500px] top-1/3 -right-48 rounded-full opacity-30 animate-aurora2 blur-[50px]"
          style={{ background: 'radial-gradient(ellipse, rgba(107,78,255,.1) 0%, transparent 70%)' }} />
      </div>

      {/* LEFT NAV */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-start">
        <div className="absolute left-[15px] top-0 bottom-0 w-[2px] rounded-sm" style={{ background: 'rgba(14,165,233,.1)' }} />
        <div className="absolute left-[15px] top-0 w-[2px] rounded-sm transition-all duration-300"
          style={{ height: `${(NAV_SECTIONS.indexOf(activeSection) / (NAV_SECTIONS.length - 1)) * 100}%`, background: 'linear-gradient(to bottom,#0EA5E9,#6B4EFF)' }} />
        {navItems.map((item, i) => (
          <button key={item.id} onClick={() => scrollTo(item.id)}
            className="group flex items-center gap-3 pl-9 py-2 cursor-pointer relative">
            <div className={`absolute left-3 w-2 h-2 rounded-full transition-all duration-300 -translate-x-1/2 border-[1.5px] ${activeSection === item.id ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_10px_rgba(14,165,233,.6)] scale-125' : 'bg-cyan-500/20 border-cyan-500/30 group-hover:bg-cyan-500/50 group-hover:border-cyan-500'}`} />
            <span className={`text-[11px] font-bold whitespace-nowrap transition-all duration-300 ${activeSection === item.id ? 'text-cyan-500' : 'text-transparent group-hover:text-white/70'}`}
              style={{ fontFamily: 'var(--font-jakarta)' }}>
              <span className={`mr-2 text-[10px] tracking-widest transition-colors ${activeSection === item.id ? 'text-cyan-500' : 'text-cyan-500/25 group-hover:text-cyan-500'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* COOKIE BANNER */}
      {!cookieAccepted && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9998] w-[calc(100%-40px)] max-w-2xl rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap"
          style={{ background: 'linear-gradient(145deg,#0A1E35,#061522)', border: '1px solid rgba(14,165,233,.3)', boxShadow: '0 8px 40px rgba(2,11,24,.8)' }}>
          <p className="text-sm flex-1 min-w-[200px]" style={{ color: '#7AAF87' }}>
            {t.cookie.text}{' '}
            <a href="#privacy" style={{ color: '#0EA5E9' }}>{t.cookie.link}</a>.
          </p>
          <button onClick={() => { setCookieAccepted(true); localStorage.setItem('cookieAccepted', 'true') }}
            className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#0EA5E9,#6B4EFF)' }}>
            {t.cookie.btn}
          </button>
        </div>
      )}

      {/* NAV */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 rounded-full px-6 py-2.5 w-[calc(100%-32px)] max-w-[860px]"
        style={{ background: 'rgba(6,18,34,.88)', backdropFilter: 'blur(24px)', border: '1px solid rgba(14,165,233,.12)' }}>
        <span className="font-extrabold text-base tracking-widest flex-1" style={{ fontFamily: 'var(--font-jakarta)' }}>
          N<span style={{ color: '#0EA5E9' }}>.</span>DEV
        </span>
        <div className="hidden md:flex gap-1">
          {[{id:'about',l:t.nav.about},{id:'services',l:t.nav.services},{id:'projects',l:t.nav.projects},{id:'calc',l:t.nav.prices},{id:'faq',l:t.nav.faq},{id:'contact',l:t.nav.contact}].map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="text-[13px] font-medium px-3.5 py-2 rounded-full transition-all hover:text-white hover:bg-white/5"
              style={{ color: '#7AAF87', fontFamily: 'var(--font-jakarta)' }}>
              {item.l}
            </button>
          ))}
        </div>
        {/* Language toggle */}
        <a href={`/${lang === 'ru' ? 'en' : 'ru'}`}
          className="text-xs font-bold px-3 py-1.5 rounded-full border transition-all hover:scale-105 mr-2"
          style={{ color: '#0EA5E9', borderColor: 'rgba(14,165,233,.3)', background: 'rgba(14,165,233,.08)' }}>
          {lang === 'ru' ? 'EN' : 'RU'}
        </a>
        <button onClick={() => scrollTo('contact')}
          className="text-[13px] font-bold px-5 py-2.5 rounded-full text-white transition-all hover:scale-105 whitespace-nowrap"
          style={{ background: '#6B4EFF' }}>
          {t.nav.cta} →
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center text-center px-5 pt-32 pb-20 overflow-hidden">
        <div className="relative z-10 max-w-3xl w-full">
          {/* Badges */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-9">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.25)', color: '#10B981' }}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
              {t.hero.badge}
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full" style={{ background: 'rgba(107,78,255,.1)', border: '1px solid rgba(107,78,255,.3)', color: '#A78BFA' }}>
              ⚡ {t.hero.badgeFast}
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full" style={{ background: 'rgba(14,165,233,.08)', border: '1px solid rgba(14,165,233,.25)', color: '#0EA5E9' }}>
              💎 {t.hero.badgeCheap}
            </div>
          </div>

          {/* Title */}
          <h1 className="font-extrabold leading-[1.08] tracking-[-1.5px] mb-6" style={{ fontSize: 'clamp(36px,6.5vw,76px)', fontFamily: 'var(--font-jakarta)' }}>
            {t.hero.title1}<br />
            <span className="grad-text">{t.hero.title2}</span><br />
            <span style={{ color: '#7AAF87' }}>{t.hero.title3}</span><br />
            {t.hero.title4}
          </h1>

          <p className="mb-10 mx-auto max-w-lg leading-[1.8]" style={{ fontSize: 'clamp(15px,2vw,18px)', color: '#7AAF87' }}>
            {t.hero.sub}
          </p>

          <div className="flex gap-3 justify-center flex-wrap mb-10">
            <button onClick={() => scrollTo('contact')} className="text-sm font-bold px-9 py-4 rounded-full text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(14,165,233,.4)]"
              style={{ background: 'linear-gradient(135deg,#0EA5E9,#6B4EFF)', boxShadow: '0 8px 24px rgba(14,165,233,.3)' }}>
              {t.hero.btnMain}
            </button>
            <button onClick={() => scrollTo('projects')} className="text-sm font-semibold px-9 py-4 rounded-full transition-all hover:-translate-y-0.5 hover:border-violet-500 hover:text-violet-400"
              style={{ background: 'rgba(14,165,233,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#E8F5EC' }}>
              {t.hero.btnSec}
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[{n:'5+',l:t.hero.stat1},{n:'30+',l:t.hero.stat2},{n:'7',l:t.hero.stat3},{n:'∞',l:t.hero.stat4}].map((s,i) => (
              <div key={i} className="rounded-2xl px-7 py-4 text-center card-shimmer" style={{ background: 'linear-gradient(145deg,#0A1E35,#061522)', border: '1px solid rgba(14,165,233,.15)' }}>
                <div className="text-[28px] font-extrabold grad-text leading-none">{s.n}</div>
                <div className="text-xs font-medium mt-1.5" style={{ color: '#3D6B4A' }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Callback form */}
          <div className="max-w-sm mx-auto rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#0A1E35,#061522)', border: '1px solid rgba(14,165,233,.2)' }}>
            <p className="text-sm font-semibold mb-4" style={{ color: '#7AAF87' }}>📞 {t.hero.callbackTitle}</p>
            {!cbSuccess ? (
              <form onSubmit={sendCallback} className="flex flex-col gap-3">
                <input value={cbName} onChange={e=>setCbName(e.target.value)} placeholder={t.hero.callbackName} required className={inputStyle} />
                <input value={cbPhone} onChange={e=>setCbPhone(e.target.value)} placeholder={t.hero.callbackPhone} type="tel" required className={inputStyle} />
                <button type="submit" className="w-full py-3.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg,#0EA5E9,#6B4EFF)' }}>
                  {t.hero.callbackBtn}
                </button>
                <p className="text-[11px] text-center" style={{ color: '#3D6B4A' }}>
                  {t.hero.callbackConsent}{' '}<a href="#privacy" style={{ color: '#0EA5E9' }}>{t.hero.privacyPolicy}</a>
                </p>
              </form>
            ) : (
              <p className="text-sm font-semibold text-center" style={{ color: '#86EFAC' }}>{t.hero.callbackSuccess}</p>
            )}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden py-4 border-y" style={{ borderColor: 'rgba(14,165,233,.08)' }}>
        <div className="flex w-max animate-ticker">
          {[...(isRu ? ['Мобильные приложения','Сайты','Умные AI продукты','Голосовые помощники','AI видео и контент','Банковские приложения','Медицинские платформы','3D и шоу'] : ['Mobile Apps','Websites','Smart AI Products','Voice Assistants','AI Video Content','Banking Apps','Medical Platforms','3D & Shows'])].concat(isRu ? ['Мобильные приложения','Сайты','Умные AI продукты','Голосовые помощники','AI видео и контент','Банковские приложения','Медицинские платформы','3D и шоу'] : ['Mobile Apps','Websites','Smart AI Products','Voice Assistants','AI Video Content','Banking Apps','Medical Platforms','3D & Shows']).map((item, i) => (
            <span key={i} className="text-[13px] font-semibold px-10 whitespace-nowrap" style={{ color: '#3D6B4A' }}>
              {item} <span style={{ color: '#6B4EFF', marginLeft: '36px' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-24 px-5 max-w-[1100px] mx-auto">
        <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(14,165,233,.1)', color: '#0EA5E9' }}>{t.about.label}</div>
        <h2 className="font-extrabold leading-[1.15] mb-4" style={{ fontSize: 'clamp(28px,4vw,46px)', fontFamily: 'var(--font-jakarta)' }}>
          {t.about.title} <span className="grad-text">{t.about.titleEm}</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-5 mt-12">
          <div className="rounded-[28px] p-10 card-shimmer" style={{ background: 'linear-gradient(145deg,#0A1E35,#04111E)', border: '1px solid rgba(14,165,233,.18)' }}>
            <p className="text-base leading-[1.85] mb-5" style={{ color: '#7AAF87' }}>{t.about.p1}</p>
            <p className="text-base leading-[1.85] mb-5" style={{ color: '#7AAF87' }}><strong style={{ color: '#E8F5EC' }}>{t.about.p2.split(',')[0]}</strong>{t.about.p2.substring(t.about.p2.indexOf(','))}</p>
            <p className="text-base leading-[1.85]" style={{ color: '#7AAF87' }}>{t.about.p3}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {(isRu ? ['Системная Архитектура','AI Интеграция','Real-Time Системы','Voice AI','Prompt Engineering','Облачный Деплой','UI/UX Дизайн','Кросс-платформа','WebSocket','Видеогенерация','Docker / AWS','API Проектирование'] : ['System Architecture','AI Integration','Real-Time Systems','Voice AI','Prompt Engineering','Cloud Deployment','UI/UX Design','Cross-Platform','WebSocket','Video Generation','Docker / AWS','API Design']).map((chip,i) => (
                <span key={i} className="text-xs font-medium px-3.5 py-1.5 rounded-full transition-all hover:border-violet-500 hover:text-violet-400 cursor-default"
                  style={{ background: '#0A1E35', border: '1px solid rgba(14,165,233,.12)', color: '#7AAF87' }}>{chip}</span>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] p-10 card-shimmer" style={{ background: 'linear-gradient(145deg,#0E2040,#061830)', border: '1px solid rgba(14,165,233,.25)' }}>
            <div className="font-extrabold leading-none mb-2 grad-text" style={{ fontSize: '88px', fontFamily: 'var(--font-jakarta)' }}>5+</div>
            <div className="text-lg font-bold text-white mb-2">{t.about.expLabel}</div>
            <p className="text-sm mb-8 leading-[1.7]" style={{ color: '#7AAF87' }}>{t.about.expDesc}</p>
            <div className="flex flex-col gap-3.5">
              {t.about.expItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm" style={{ color: '#7AAF87' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#6B4EFF' }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICE BANNER */}
      <div className="py-10 px-5 text-center" style={{ background: 'linear-gradient(135deg,rgba(107,78,255,.12),rgba(14,165,233,.08))', borderTop: '1px solid rgba(107,78,255,.2)', borderBottom: '1px solid rgba(107,78,255,.2)' }}>
        <div className="max-w-2xl mx-auto">
          <p className="font-extrabold mb-3" style={{ fontSize: 'clamp(18px,3vw,28px)', fontFamily: 'var(--font-jakarta)', color: '#E8F5EC' }}>
            💎 {isRu ? 'Любой проект — ' : 'Every project — '}
            <span className="grad-text">{isRu ? 'на 30% дешевле' : '30% cheaper'}</span>
            {isRu ? ', чем в любом агентстве' : ' than any agency'}
          </p>
          <p className="text-sm mb-6" style={{ color: '#7AAF87' }}>{isRu ? 'Не верите? Получите наше предложение и сравните сами.' : "Don't believe it? Get our quote and compare yourself."}</p>
          <a href="tel:+79653932841" className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full font-bold text-white text-sm transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#0EA5E9,#6B4EFF)', boxShadow: '0 8px 24px rgba(14,165,233,.3)' }}>
            📞 {isRu ? 'Позвонить и узнать цену' : 'Call and Get a Quote'}
          </a>
        </div>
      </div>

      {/* SERVICES */}
      <div id="services" className="py-24 px-5" style={{ background: 'rgba(6,18,34,.5)' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(14,165,233,.1)', color: '#0EA5E9' }}>{t.services.label}</div>
          <h2 className="font-extrabold mb-3" style={{ fontSize: 'clamp(28px,4vw,46px)', fontFamily: 'var(--font-jakarta)' }}>
            {t.services.title} <span className="grad-text">{t.services.titleEm}</span>
          </h2>
          <p className="text-base mb-12" style={{ color: '#7AAF87' }}>{t.services.sub}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.services.items.map((svc, i) => (
              <div key={i} className={`rounded-[28px] p-9 card-shimmer transition-all duration-300 hover:-translate-y-1 ${(svc as any).wide ? 'md:col-span-3' : ''}`}
                style={{ background: 'linear-gradient(145deg,#0A1E35,#04111E)', border: '1px solid rgba(14,165,233,.12)' }}>
                <div className="w-14 h-14 rounded-[18px] flex items-center justify-center text-2xl mb-6" style={{ background: 'linear-gradient(135deg,#0E2A45,#061A2E)', border: '1px solid rgba(14,165,233,.2)' }}>{svc.icon}</div>
                <div className="text-base font-bold text-white mb-4">{svc.name}</div>
                <div className={`flex flex-col gap-2.5 ${(svc as any).wide ? 'md:grid md:grid-cols-3' : ''}`}>
                  {svc.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-2.5 text-sm leading-[1.5]" style={{ color: '#7AAF87' }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0" style={{ background: '#6B4EFF' }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-5 max-w-[1100px] mx-auto">
        <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(14,165,233,.1)', color: '#0EA5E9' }}>{t.projects.label}</div>
        <h2 className="font-extrabold mb-3" style={{ fontSize: 'clamp(28px,4vw,46px)', fontFamily: 'var(--font-jakarta)' }}>
          {t.projects.title} <span className="grad-text">{t.projects.titleEm}</span>
        </h2>
        <p className="text-base mb-12" style={{ color: '#7AAF87' }}>{t.projects.sub}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.projects.items.map((proj, i) => (
            <div key={i} className={`relative rounded-[28px] p-9 overflow-hidden transition-all duration-300 hover:-translate-y-1 min-h-[260px] flex flex-col justify-end card-shimmer ${proj.featured ? 'md:col-span-2 min-h-[300px]' : ''}`}
              style={{ background: 'linear-gradient(145deg,#0A1E35,#04111E)', border: '1px solid rgba(14,165,233,.15)' }}>
              <div className="absolute inset-0 rounded-[28px]" style={{ background: 'linear-gradient(to top, rgba(2,11,24,.95) 45%, transparent)' }} />
              <div className="absolute top-6 left-6 z-10 text-xs font-semibold px-4 py-1.5 rounded-full" style={{ background: 'rgba(14,165,233,.12)', border: '1px solid rgba(14,165,233,.25)', color: '#0EA5E9' }}>{proj.tag}</div>
              <div className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full flex items-center justify-center text-base transition-all" style={{ background: '#0A1E35', border: '1px solid rgba(14,165,233,.2)', color: '#7AAF87' }}>↗</div>
              <div className="relative z-10">
                <div className="text-lg font-bold text-white mb-2">{proj.name}</div>
                <p className="text-sm mb-4 leading-[1.6]" style={{ color: '#7AAF87' }}>{proj.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.chips.map((chip, j) => (
                    <span key={j} className="text-xs font-medium px-3.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)', color: '#3D6B4A' }}>{chip}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="py-24 px-5 max-w-[1100px] mx-auto">
        <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(14,165,233,.1)', color: '#0EA5E9' }}>{isRu ? 'Технологии' : 'Tech Stack'}</div>
        <h2 className="font-extrabold mb-3" style={{ fontSize: 'clamp(28px,4vw,46px)', fontFamily: 'var(--font-jakarta)' }}>
          {isRu ? 'На чём мы ' : 'What We '}<span className="grad-text">{isRu ? 'это делаем' : 'Use'}</span>
        </h2>
        <p className="text-base mb-12 max-w-lg" style={{ color: '#7AAF87' }}>
          {isRu ? 'Вам не нужно разбираться в этих инструментах — это наша работа.' : "You don't need to understand these tools — that's our job."}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {stackItems.map((item, i) => (
            <span key={i} className="text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:border-cyan-500 hover:text-cyan-400 cursor-default"
              style={{ background: 'rgba(10,30,53,.8)', border: '1px solid rgba(14,165,233,.12)', color: '#7AAF87' }}>{item}</span>
          ))}
        </div>
      </section>

      {/* WHY */}
      <div id="why" className="py-24 px-5" style={{ background: 'rgba(6,18,34,.5)' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(14,165,233,.1)', color: '#0EA5E9' }}>{isRu ? 'Почему мы' : 'Why Us'}</div>
          <h2 className="font-extrabold mb-12" style={{ fontSize: 'clamp(28px,4vw,46px)', fontFamily: 'var(--font-jakarta)' }}>
            {isRu ? 'Почему выбирают ' : 'Why Clients Choose '}<span className="grad-text">{isRu ? 'нас' : 'Us'}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {whyItems.map((w, i) => (
              <div key={i} className="rounded-[28px] p-9 card-shimmer transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'linear-gradient(145deg,#0A1E35,#04111E)', border: '1px solid rgba(14,165,233,.12)' }}>
                <div className="font-extrabold leading-none mb-4 opacity-20 grad-text" style={{ fontSize: '44px', fontFamily: 'var(--font-jakarta)' }}>{w.n}</div>
                <div className="text-base font-bold text-white mb-2.5">{w.title}</div>
                <p className="text-sm leading-[1.7]" style={{ color: '#7AAF87' }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CALCULATOR */}
      <section id="calc" className="py-24 px-5 max-w-[900px] mx-auto">
        <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(14,165,233,.1)', color: '#0EA5E9' }}>{t.calculator.label}</div>
        <h2 className="font-extrabold mb-3" style={{ fontSize: 'clamp(28px,4vw,42px)', fontFamily: 'var(--font-jakarta)' }}>
          {t.calculator.title} <span className="grad-text">{t.calculator.titleEm}</span>
        </h2>
        <p className="text-base mb-12" style={{ color: '#7AAF87' }}>{t.calculator.sub}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {t.calculator.services.map((svc, i) => (
            <button key={i} onClick={() => toggleCalc(i)}
              className={`text-left rounded-[20px] p-7 transition-all duration-200 hover:-translate-y-0.5 ${calcSelected.has(i) ? 'shadow-[0_0_24px_rgba(14,165,233,.15)]' : ''}`}
              style={{ background: calcSelected.has(i) ? 'linear-gradient(145deg,#0E2A45,#061A2E)' : 'linear-gradient(145deg,#0A1E35,#04111E)', border: `2px solid ${calcSelected.has(i) ? '#0EA5E9' : 'rgba(14,165,233,.1)'}` }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl mb-2.5">{svc.icon}</div>
                  <div className="text-base font-bold text-white mb-1.5">{svc.name}</div>
                  <div className="text-sm" style={{ color: '#7AAF87' }}>{svc.desc}</div>
                </div>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-all ${calcSelected.has(i) ? 'text-white' : 'text-transparent'}`}
                  style={{ background: calcSelected.has(i) ? '#0EA5E9' : 'rgba(14,165,233,.1)', border: `2px solid ${calcSelected.has(i) ? '#0EA5E9' : 'rgba(14,165,233,.2)'}` }}>✓</div>
              </div>
              <div className="mt-4 text-base font-bold" style={{ color: '#0EA5E9' }}>{isRu ? 'от ' : 'from '}{fmt(svc.min)}</div>
            </button>
          ))}
        </div>
        {calcSelected.size === 0 ? (
          <p className="text-center py-10 text-sm" style={{ color: '#3D6B4A' }}>{t.calculator.empty}</p>
        ) : (
          <div className="rounded-[24px] p-9 flex flex-wrap items-center justify-between gap-5" style={{ background: 'linear-gradient(145deg,#0E2040,#061830)', border: '1px solid rgba(14,165,233,.3)', animation: 'fadeUp .4s ease' }}>
            <div>
              <p className="text-sm mb-2" style={{ color: '#7AAF87' }}>{t.calculator.resultLabel}</p>
              <p className="font-extrabold grad-text" style={{ fontSize: 'clamp(28px,4vw,44px)', fontFamily: 'var(--font-jakarta)' }}>
                {isRu ? 'от ' : 'from '}{fmt(calcTotal)}
              </p>
              <p className="text-sm mt-2" style={{ color: '#3D6B4A' }}>{t.calculator.resultNote}</p>
            </div>
            <button onClick={() => scrollTo('contact')} className="px-8 py-3.5 rounded-full font-bold text-white text-sm transition-all hover:-translate-y-0.5 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg,#0EA5E9,#6B4EFF)', boxShadow: '0 8px 24px rgba(14,165,233,.3)' }}>
              {t.calculator.ctaBtn}
            </button>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-5" style={{ background: 'rgba(6,18,34,.5)' }}>
        <div className="max-w-[800px] mx-auto">
          <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(14,165,233,.1)', color: '#0EA5E9' }}>{t.faq.label}</div>
          <h2 className="font-extrabold mb-12" style={{ fontSize: 'clamp(28px,4vw,42px)', fontFamily: 'var(--font-jakarta)' }}>
            {t.faq.title} <span className="grad-text">{t.faq.titleEm}</span>
          </h2>
          <div className="flex flex-col gap-1">
            {t.faq.items.map((item, i) => (
              <div key={i} className="rounded-[20px] overflow-hidden transition-all" style={{ background: 'linear-gradient(145deg,#0A1E35,#04111E)', border: '1px solid rgba(14,165,233,.12)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-8 py-7 text-left cursor-pointer">
                  <span className="text-base font-bold text-white">{item.q}</span>
                  <span className="text-xl flex-shrink-0 transition-transform" style={{ color: '#0EA5E9', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-7 text-sm leading-[1.75]" style={{ color: '#7AAF87' }}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="how" className="py-24 px-5">
        <div className="max-w-[1100px] mx-auto">
          <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(14,165,233,.1)', color: '#0EA5E9' }}>{t.how.label}</div>
          <h2 className="font-extrabold mb-3" style={{ fontSize: 'clamp(28px,4vw,46px)', fontFamily: 'var(--font-jakarta)' }}>
            {t.how.title} <span className="grad-text">{t.how.titleEm}</span>
          </h2>
          <p className="text-base mb-12 max-w-lg" style={{ color: '#7AAF87' }}>{t.how.sub}</p>
          <div className="flex flex-col gap-1">
            {t.how.steps.map((step, i) => (
              <div key={i}>
                <div className="flex gap-8 items-start p-9 rounded-[24px] card-shimmer" style={{ background: 'linear-gradient(145deg,#0A1E35,#04111E)', border: i === t.how.steps.length - 1 ? '1px solid rgba(134,239,172,.2)' : '1px solid rgba(14,165,233,.15)' }}>
                  <div className="w-16 h-16 rounded-[20px] flex items-center justify-center text-3xl flex-shrink-0" style={{ background: 'linear-gradient(135deg,#0EA5E9,#6B4EFF)' }}>{step.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <span className="text-lg font-bold text-white">{step.name}</span>
                      <span className="text-xs font-bold px-3.5 py-1 rounded-full" style={{ background: 'rgba(14,165,233,.15)', border: '1px solid rgba(14,165,233,.3)', color: '#0EA5E9' }}>⚡ {step.time}</span>
                    </div>
                    <p className="text-sm leading-[1.7]" style={{ color: '#7AAF87' }}>{step.desc}</p>
                  </div>
                  <div className="font-extrabold opacity-[0.05] grad-text hidden md:block" style={{ fontSize: '48px', fontFamily: 'var(--font-jakarta)', lineHeight: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                {i < t.how.steps.length - 1 && (
                  <div className="w-[2px] h-5 ml-[59px]" style={{ background: 'linear-gradient(to bottom, rgba(14,165,233,.3), rgba(107,78,255,.3))' }} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => scrollTo('contact')} className="px-10 py-4 rounded-full font-bold text-white text-sm transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#0EA5E9,#6B4EFF)', boxShadow: '0 8px 24px rgba(14,165,233,.3)' }}>
              {t.how.ctaBtn}
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-5 flex items-center justify-center">
        <div className="max-w-[700px] w-full rounded-[28px] p-16 text-center relative overflow-hidden animate-border-pulse"
          style={{ background: 'linear-gradient(145deg,#0E2040,#061830)', border: '1px solid rgba(14,165,233,.3)' }}>
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(107,78,255,.2) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5" style={{ background: 'rgba(14,165,233,.1)', color: '#0EA5E9' }}>{t.contact.label}</div>
            <h2 className="font-extrabold mb-3" style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--font-jakarta)' }}>
              {t.contact.title}<br /><span className="grad-text">{t.contact.titleEm}</span>
            </h2>
            <p className="text-base mb-8 mx-auto max-w-md leading-[1.8]" style={{ color: '#7AAF87' }}>{t.contact.sub}</p>
            {!ctSuccess ? (
              <form onSubmit={sendContact} className="flex flex-col gap-3.5 text-left max-w-lg mx-auto">
                <div className="grid grid-cols-2 gap-3.5">
                  <input value={ctName} onChange={e=>setCtName(e.target.value)} placeholder={t.contact.name} required className={inputStyle} />
                  <input value={ctPhone} onChange={e=>setCtPhone(e.target.value)} placeholder={t.contact.phone} type="tel" required className={inputStyle} />
                </div>
                <input value={ctEmail} onChange={e=>setCtEmail(e.target.value)} placeholder={t.contact.email} type="email" className={inputStyle} />
                <textarea value={ctMsg} onChange={e=>setCtMsg(e.target.value)} placeholder={t.contact.message} rows={4} className={inputStyle + ' resize-y'} />
                <button type="submit" className="w-full py-4 rounded-full font-bold text-white text-sm transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg,#0EA5E9,#6B4EFF)', boxShadow: '0 8px 24px rgba(14,165,233,.3)' }}>
                  {t.contact.submit}
                </button>
                <p className="text-[11px] text-center" style={{ color: '#3D6B4A' }}>
                  {t.contact.consent} <a href="#privacy" style={{ color: '#0EA5E9' }}>{t.hero.privacyPolicy}</a>
                </p>
              </form>
            ) : (
              <p className="text-base font-semibold" style={{ color: '#86EFAC' }}>{t.contact.success}</p>
            )}
            <div className="flex flex-wrap justify-center gap-2.5 mt-6">
              <a href="tel:+79653932841" className="text-sm font-bold px-5 py-3 rounded-full transition-all hover:scale-[1.02]" style={{ background: 'rgba(14,165,233,.15)', border: '1px solid rgba(14,165,233,.4)', color: '#0EA5E9' }}>📞 +7 (965) 393-28-41</a>
              <a href="https://max.ru/+79653932841" target="_blank" className="text-sm font-semibold px-5 py-3 rounded-full transition-all hover:border-cyan-500" style={{ background: 'rgba(14,165,233,.08)', border: '1px solid rgba(14,165,233,.2)', color: '#7AAF87' }}>💬 MAX</a>
              <a href="mailto:m.moleva@mail.ru" className="text-sm font-semibold px-5 py-3 rounded-full transition-all hover:border-cyan-500" style={{ background: 'rgba(14,165,233,.08)', border: '1px solid rgba(14,165,233,.2)', color: '#7AAF87' }}>✉️ m.moleva@mail.ru</a>
              <a href="https://t.me/+79653932841" target="_blank" className="text-sm font-semibold px-5 py-3 rounded-full opacity-60 transition-all" style={{ background: 'rgba(14,165,233,.06)', border: '1px solid rgba(14,165,233,.15)', color: '#7AAF87' }}>Telegram*</a>
              <a href="https://wa.me/79653932841" target="_blank" className="text-sm font-semibold px-5 py-3 rounded-full opacity-60 transition-all" style={{ background: 'rgba(14,165,233,.06)', border: '1px solid rgba(14,165,233,.15)', color: '#7AAF87' }}>WhatsApp*</a>
            </div>
            <p className="text-[11px] mt-3" style={{ color: '#3D6B4A' }}>{t.contact.messengerNote}</p>
          </div>
        </div>
      </section>

      {/* PRIVACY POLICY */}
      <section id="privacy" className="py-20 px-5" style={{ background: 'rgba(6,18,34,.6)', borderTop: '1px solid rgba(14,165,233,.06)' }}>
        <div className="max-w-[800px] mx-auto">
          <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(14,165,233,.1)', color: '#0EA5E9' }}>{t.privacy.label}</div>
          <h2 className="font-extrabold mb-8" style={{ fontSize: 'clamp(22px,3vw,34px)', fontFamily: 'var(--font-jakarta)' }}>{t.privacy.title}</h2>
          <div className="flex flex-col gap-4 text-sm leading-[1.9]" style={{ color: '#7AAF87' }}>
            {isRu ? <>
              <p><strong style={{color:'#E8F5EC'}}>1. Общие положения.</strong> Настоящая политика действует в отношении информации, которую ИП Молева Марианна Владимировна (ИНН 502984920107, ОГРНИП 321508100437464) получает о пользователе.</p>
              <p><strong style={{color:'#E8F5EC'}}>2. Какие данные мы собираем.</strong> Имя, телефон, email — только при добровольном заполнении форм.</p>
              <p><strong style={{color:'#E8F5EC'}}>3. Цель сбора данных.</strong> Данные используются исключительно для связи с вами и не передаются третьим лицам.</p>
              <p><strong style={{color:'#E8F5EC'}}>4. Защита данных.</strong> Принимаем все необходимые меры в соответствии с ФЗ №152 «О персональных данных».</p>
              <p><strong style={{color:'#E8F5EC'}}>5. Cookie.</strong> Сайт использует файлы cookie. Вы можете отключить их в настройках браузера.</p>
              <p><strong style={{color:'#E8F5EC'}}>6. Контакты.</strong> <a href="mailto:m.moleva@mail.ru" style={{color:'#0EA5E9'}}>m.moleva@mail.ru</a> · <a href="tel:+79653932841" style={{color:'#0EA5E9'}}>+7 (965) 393-28-41</a></p>
            </> : <>
              <p><strong style={{color:'#E8F5EC'}}>1. General.</strong> This policy applies to information that IP Moleva Marianna Vladimirovna (TIN 502984920107) receives from users.</p>
              <p><strong style={{color:'#E8F5EC'}}>2. Data We Collect.</strong> Name, phone, email — only when voluntarily submitted through forms.</p>
              <p><strong style={{color:'#E8F5EC'}}>3. Purpose.</strong> Data is used solely to contact you and is never shared with third parties.</p>
              <p><strong style={{color:'#E8F5EC'}}>4. Data Protection.</strong> We take all necessary measures in accordance with applicable law.</p>
              <p><strong style={{color:'#E8F5EC'}}>5. Cookies.</strong> The site uses cookies. You can disable them in browser settings.</p>
              <p><strong style={{color:'#E8F5EC'}}>6. Contact.</strong> <a href="mailto:m.moleva@mail.ru" style={{color:'#0EA5E9'}}>m.moleva@mail.ru</a> · <a href="tel:+79653932841" style={{color:'#0EA5E9'}}>+7 (965) 393-28-41</a></p>
            </>}
          </div>
        </div>
      </section>

      {/* CITIES */}
      <div className="py-14 px-5 text-center" style={{ borderTop: '1px solid rgba(14,165,233,.06)' }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[11px] font-bold tracking-[2px] uppercase mb-5" style={{ color: '#3D6B4A' }}>{t.footer.worksWith}</p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {(isRu ? CITIES_RU : CITIES_EN).map((city, i) => (
              <span key={i} className="text-xs px-4 py-1.5 rounded-full" style={{ color: '#3D6B4A', border: '1px solid rgba(14,165,233,.07)' }}>{city}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="px-6 pt-12 pb-8 max-w-[1100px] mx-auto" style={{ borderTop: '1px solid rgba(14,165,233,.1)' }}>
        <div className="flex flex-wrap items-center justify-between gap-5 mb-8">
          <span className="font-extrabold text-base tracking-widest" style={{ fontFamily: 'var(--font-jakarta)' }}>N<span style={{color:'#0EA5E9'}}>.</span>DEV</span>
          <div className="flex flex-wrap gap-4">
            {[{id:'about',l:t.nav.about},{id:'services',l:t.nav.services},{id:'projects',l:t.nav.projects},{id:'contact',l:t.nav.contact}].map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-sm transition-colors hover:text-white" style={{ color: '#3D6B4A' }}>{item.l}</button>
            ))}
          </div>
          <a href="tel:+79653932841" className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:scale-[1.02]" style={{ background: 'rgba(14,165,233,.15)', border: '1px solid rgba(14,165,233,.3)', color: '#0EA5E9' }}>📞 +7 (965) 393-28-41</a>
        </div>
        <div className="h-px mb-8" style={{ background: 'rgba(14,165,233,.08)' }} />
        <div className="flex flex-wrap gap-10 justify-between mb-8 text-sm" style={{ color: '#3D6B4A' }}>
          <div>
            <p className="text-[11px] font-bold tracking-[2px] uppercase mb-3" style={{ color: '#0EA5E9' }}>{t.footer.requisites}</p>
            <p>ИП Молева Марианна Владимировна</p>
            <p>{t.footer.inn}: 502984920107</p>
            <p>{t.footer.ogrn}: 321508100437464</p>
            <p>{t.footer.regDate}: 09.09.2021</p>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[2px] uppercase mb-3" style={{ color: '#0EA5E9' }}>{t.footer.address}</p>
            <p>{t.footer.city}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[2px] uppercase mb-3" style={{ color: '#0EA5E9' }}>{t.footer.contacts}</p>
            <a href="tel:+79653932841" className="block hover:text-cyan-400 transition-colors" style={{ color: '#7AAF87' }}>+7 (965) 393-28-41</a>
            <a href="mailto:m.moleva@mail.ru" className="block hover:text-cyan-400 transition-colors" style={{ color: '#7AAF87' }}>m.moleva@mail.ru</a>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[2px] uppercase mb-3" style={{ color: '#0EA5E9' }}>{t.footer.docs}</p>
            <a href="#privacy" className="block hover:text-cyan-400 transition-colors" style={{ color: '#7AAF87' }}>{t.footer.privacy}</a>
            <a href="#privacy" className="block hover:text-cyan-400 transition-colors" style={{ color: '#7AAF87' }}>{t.footer.terms}</a>
          </div>
        </div>
        <div className="h-px mb-6" style={{ background: 'rgba(14,165,233,.08)' }} />
        <p className="text-xs text-center" style={{ color: '#3D6B4A' }}>{t.footer.copy}</p>
      </footer>

    </div>
  )
}
