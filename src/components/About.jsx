import { useEffect, useRef } from 'react'
import { Award, BookOpen, Star } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import translations from '../translations'
import rajanImg from '../public/img/rajan_profile.jpeg'

export default function About() {
  const { lang } = useLang()
  const t = translations[lang].about
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
              el.classList.add('visible')
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const icons = [<BookOpen size={20} />, <Award size={20} />, <Star size={20} />]

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-saffron/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block font-poppins text-saffron font-medium text-sm tracking-widest uppercase mb-3">{t.tag}</span>
          <h2 className="section-heading">{t.heading}</h2>
          <div className="gold-line" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="reveal-left">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-saffron/30 to-gold/30 rounded-3xl blur-lg" />
              <div className="relative bg-gradient-to-br from-maroon to-deep-maroon rounded-3xl p-1 shadow-2xl">
                <div className="w-full aspect-square rounded-2xl overflow-hidden relative">
                  <img
                    src={rajanImg}
                    alt={t.priestLabel}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Name overlay at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-4"
                    style={{ background: 'linear-gradient(to top, rgba(61,0,0,0.92) 0%, rgba(128,0,0,0.6) 60%, transparent 100%)' }}
                  >
                    <p className="text-white font-playfair font-bold text-base leading-tight">{t.priestLabel}</p>
                    <p className="text-gold font-poppins text-xs mt-0.5">{t.priestSub}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-orange-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="font-playfair text-maroon font-bold text-sm">{t.badge1}</p>
                    <p className="font-poppins text-gray-500 text-xs">{t.badge2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-right">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-maroon mb-2">{t.role}</h3>
            <h4 className="font-poppins text-saffron font-semibold mb-6 text-lg">{t.subtitle}</h4>
            <p className="font-poppins text-gray-600 leading-relaxed mb-4 text-base">{t.para1}</p>
            <p className="font-poppins text-gray-600 leading-relaxed mb-8 text-base">{t.para2}</p>

            <div className="space-y-3 mb-8">
              {t.highlights.map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-saffron/20 to-gold/20 flex items-center justify-center text-saffron flex-shrink-0">
                    {icons[i]}
                  </div>
                  <span className="font-poppins text-gray-700 text-sm">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-start gap-1">
              <button
                onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
                id="about-book-btn"
              >
                {t.bookBtn}
              </button>
              <p className="font-poppins text-gray-500 text-xs mt-1 ml-1">
                <strong className="text-sm font-semibold text-saffron">Pre-Book</strong> before 10 days itself
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
