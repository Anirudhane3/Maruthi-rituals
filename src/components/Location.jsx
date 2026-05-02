import { useEffect, useRef } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import translations from '../translations'

export default function Location() {
  const { lang } = useLang()
  const t = translations[lang].location
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="location" ref={sectionRef} className="py-24 bg-cream dark:bg-divine-dark relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-80 h-80 bg-saffron/5 dark:bg-gold/15 rounded-full blur-3xl pointer-events-none transition-colors duration-500" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block font-poppins text-saffron font-medium text-sm tracking-widest uppercase mb-3">{t.tag}</span>
          <h2 className="section-heading">{t.heading}</h2>
          <div className="gold-line" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Address Card */}
          <div className="reveal-left">
            <div className="bg-white dark:bg-incense-grey/50 rounded-3xl shadow-xl dark:shadow-[0_0_20px_rgba(255,215,0,0.05)] border border-orange-100 dark:border-saffron/10 overflow-hidden transition-colors duration-500">
              <div className="p-6" style={{ background: 'linear-gradient(135deg, #800000, #CC5500)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-playfair text-white font-bold text-xl">{t.cardTitle}</h3>
                    <p className="font-poppins text-white/70 text-xs">{t.cardSub}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {t.address.map((line, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-saffron flex-shrink-0" />
                      <span className="font-poppins text-gray-700 dark:text-amber-100/90 text-base">{line}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-orange-100 dark:border-gold/10">
                  <a href="https://maps.google.com/?q=Karuvadikuppam+Pondicherry+605008"
                    target="_blank" rel="noopener noreferrer" id="get-directions-btn"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-saffron to-gold
                      text-white font-poppins font-semibold py-3 px-6 rounded-xl
                      shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm w-full">
                    <Navigation size={16} />
                    {t.directionsBtn}
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {[t.hours, t.days].map(({ emoji, title, detail }) => (
                <div key={title} className="bg-white dark:bg-incense-grey/50 rounded-2xl p-4 shadow-md border border-orange-100 dark:border-saffron/10 text-center transition-colors duration-500">
                  <div className="text-2xl mb-2 drop-shadow-sm">{emoji}</div>
                  <p className="font-playfair text-maroon dark:text-diya-gold font-bold text-sm">{title}</p>
                  <p className="font-poppins text-gray-500 dark:text-amber-100/60 text-xs mt-1">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="reveal-right">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-incense-grey/80 transition-colors duration-500" style={{ height: '420px' }}>
              <iframe
                title="Maruthi Prohitham Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.7529870023!2d79.82743407483!3d11.93484088825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5361d6e4d60f8f%3A0x5f3c0b0a01f32456!2sKaruvadikuppam%2C%20Puducherry%2C%20605008!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
