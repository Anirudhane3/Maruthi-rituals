import { useEffect, useRef } from 'react'
import { Phone, Mail } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import translations from '../translations'

const contactIcons = [
  <Phone size={24} />,
  <Mail size={24} />,
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>,
]

const contactMeta = [
  { href: 'tel:+919342372557', gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/10', hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-900/20', textColor: 'text-blue-700 dark:text-blue-300', id: 'contact-phone' },
  { href: 'mailto:kingofpeacock125@gmail.com', gradient: 'from-red-500 to-pink-500', bg: 'bg-red-50 dark:bg-red-900/10', hoverBg: 'hover:bg-red-100 dark:hover:bg-red-900/20', textColor: 'text-red-700 dark:text-red-300', id: 'contact-email' },
  { href: 'https://wa.me/919342372557?text=Namaste%20Sri%20Mayurarajan%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.', gradient: 'from-green-500 to-emerald-400', bg: 'bg-green-50 dark:bg-green-900/10', hoverBg: 'hover:bg-green-100 dark:hover:bg-green-900/20', textColor: 'text-green-700 dark:text-green-300', id: 'contact-whatsapp', external: true },
]

export default function Contact() {
  const { lang } = useLang()
  const t = translations[lang].contact
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#FFF3E0] to-[#FFF8F0] dark:from-incense-grey dark:to-divine-dark transition-colors duration-500"
    >
      <div className="absolute top-10 left-10 w-64 h-64 bg-saffron/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block font-poppins text-saffron font-medium text-sm tracking-widest uppercase mb-3">{t.tag}</span>
          <h2 className="section-heading">{t.heading}</h2>
          <div className="gold-line" />
          <p className="font-poppins text-gray-500 max-w-xl mx-auto mt-4 text-sm">{t.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {t.items.map((item, i) => {
            const meta = contactMeta[i]
            return (
              <a key={i} id={meta.id} href={meta.href}
                target={meta.external ? '_blank' : undefined}
                rel={meta.external ? 'noopener noreferrer' : undefined}
                className={`reveal group block ${meta.bg} ${meta.hoverBg} rounded-3xl p-6 border border-orange-100 dark:border-saffron/10 shadow-md dark:shadow-none
                  hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(255,215,0,0.05)] hover:-translate-y-1 transition-all duration-500 text-center`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${meta.gradient} text-white flex items-center justify-center mx-auto mb-4
                  shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {contactIcons[i]}
                </div>
                <h3 className="font-playfair font-bold text-maroon dark:text-diya-gold text-lg mb-1">{item.label}</h3>
                <p className={`font-poppins font-semibold ${meta.textColor} text-sm mb-2 break-all`}>{item.value}</p>
                <p className="font-poppins text-gray-500 dark:text-amber-100/60 text-xs">{item.detail}</p>
              </a>
            )
          })}
        </div>

        <div className="reveal">
          <a id="whatsapp-main-cta"
            href="https://wa.me/919342372557?text=Namaste%20Sri%20Mayurarajan%2C%20I%20would%20like%20to%20book%20a%20pooja%20service."
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-4 bg-gradient-to-r from-green-500 to-emerald-400
              text-white font-poppins font-bold text-lg py-5 px-8 rounded-2xl
              shadow-2xl shadow-green-500/30 hover:shadow-green-400/50
              hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 max-w-lg mx-auto">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.whatsappBtn}
          </a>
        </div>
      </div>
    </section>
  )
}
