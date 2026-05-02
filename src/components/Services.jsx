import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import translations from '../translations'

/**
 * Custom SVG / Emoji icons mapped to each Hindu ritual/deity.
 * Rendered inside styled gradient boxes.
 */

// Ganesha elephant head (SVG)
const GanapathiIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="36" fill="white">🐘</text>
  </svg>
)

// Lotus — Lakshmi (SVG)
const LakshmiIcon = () => (
  <svg viewBox="0 0 64 64" className="w-7 h-7">
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="34" fill="white">🪷</text>
  </svg>
)

// Sudarshana Chakra — spinning wheel (SVG custom)
const SudarshanaIcon = () => (
  <svg viewBox="0 0 64 64" fill="white" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="12" stroke="white" strokeWidth="3" fill="none"/>
    <circle cx="32" cy="32" r="3" fill="white"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
      const rad = (angle * Math.PI) / 180
      const x1 = 32 + 14 * Math.cos(rad)
      const y1 = 32 + 14 * Math.sin(rad)
      const x2 = 32 + 28 * Math.cos(rad)
      const y2 = 32 + 28 * Math.sin(rad)
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    })}
    <circle cx="32" cy="32" r="28" stroke="white" strokeWidth="2" fill="none" strokeDasharray="4 3"/>
  </svg>
)

// Trishul — Shiva (custom SVG)
const TrishulIcon = () => (
  <svg viewBox="0 0 64 64" fill="white" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
    {/* Center prong */}
    <rect x="30" y="12" width="4" height="38" rx="2" fill="white"/>
    {/* Left prong */}
    <path d="M32 21 C22 18 18 10 20 6 C24 12 28 16 32 21Z" fill="white"/>
    {/* Right prong */}
    <path d="M32 21 C42 18 46 10 44 6 C40 12 36 16 32 21Z" fill="white"/>
    {/* Cross bar */}
    <rect x="22" y="27" width="20" height="3" rx="1.5" fill="white"/>
    {/* Handle end */}
    <ellipse cx="32" cy="52" rx="5" ry="2.5" fill="white" opacity="0.7"/>
  </svg>
)

// Navagraha — nine planets arrangement
const NavargahaIcon = () => (
  <svg viewBox="0 0 64 64" fill="white" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
    {/* Center planet */}
    <circle cx="32" cy="32" r="7" fill="white"/>
    {/* Surrounding 8 planets */}
    {[0,45,90,135,180,225,270,315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180
      const cx = 32 + 20 * Math.cos(rad)
      const cy = 32 + 20 * Math.sin(rad)
      return <circle key={i} cx={cx} cy={cy} r="4" fill="white" opacity="0.75"/>
    })}
    {/* Orbit ring */}
    <circle cx="32" cy="32" r="20" stroke="white" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="3 2"/>
  </svg>
)

// Bhoomi (Earth) — pot / kalash
const BhoomiIcon = () => (
  <svg viewBox="0 0 64 64" fill="white" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
    {/* Kalash body */}
    <path d="M22 40 Q18 32 22 22 L42 22 Q46 32 42 40 Z" fill="white"/>
    {/* Neck */}
    <rect x="26" y="16" width="12" height="7" rx="2" fill="white"/>
    {/* Rim */}
    <rect x="23" y="40" width="18" height="3" rx="1.5" fill="white"/>
    {/* Base plate */}
    <rect x="20" y="43" width="24" height="3" rx="1.5" fill="white"/>
    {/* Coconut top */}
    <ellipse cx="32" cy="14" rx="7" ry="5" fill="white"/>
    {/* Mango leaves */}
    <path d="M25 16 Q20 10 24 8 Q27 12 25 16Z" fill="white" opacity="0.85"/>
    <path d="M39 16 Q44 10 40 8 Q37 12 39 16Z" fill="white" opacity="0.85"/>
  </svg>
)

// Ruthu Shanthi — auspicious flower/feminine
const RuthuIcon = () => (
  <svg viewBox="0 0 64 64" className="w-7 h-7">
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="34" fill="white">🌸</text>
  </svg>
)

// Punyahavachanam — holy water / kamandalu
const PunyahaIcon = () => (
  <svg viewBox="0 0 64 64" fill="white" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
    {/* Water drops */}
    <path d="M32 10 Q38 22 38 28 A6 6 0 0 1 26 28 Q26 22 32 10Z" fill="white"/>
    <path d="M20 24 Q24 32 24 36 A4 4 0 0 1 16 36 Q16 32 20 24Z" fill="white" opacity="0.7"/>
    <path d="M44 24 Q48 32 48 36 A4 4 0 0 1 40 36 Q40 32 44 24Z" fill="white" opacity="0.7"/>
    {/* Base bowl */}
    <path d="M16 44 Q16 54 32 54 Q48 54 48 44 Z" fill="white" opacity="0.85"/>
    <rect x="16" y="42" width="32" height="4" rx="2" fill="white"/>
  </svg>
)

// Aayushya Homam — Om/fire agni
const AayushyaIcon = () => (
  <svg viewBox="0 0 64 64" fill="white" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="34" fontFamily="serif" fill="white">ॐ</text>
  </svg>
)

// Graha Pravesham — house/temple entrance
const GrahaIcon = () => (
  <svg viewBox="0 0 64 64" fill="white" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
    {/* Temple gopuram style */}
    <polygon points="32,6 8,26 56,26" fill="white"/>
    <polygon points="32,12 14,26 50,26" fill="white" opacity="0.6"/>
    {/* Wall */}
    <rect x="12" y="26" width="40" height="28" rx="1" fill="white"/>
    {/* Door */}
    <path d="M26 54 L26 38 Q32 34 38 38 L38 54 Z" fill="none" stroke="rgba(255,100,0,0.8)" strokeWidth="2.5" strokeLinejoin="round"/>
    {/* Diya at top */}
    <ellipse cx="32" cy="8" rx="3" ry="2" fill="gold" opacity="0.9"/>
  </svg>
)

// Namakaranam — baby / cradle
const NamaIcon = () => (
  <svg viewBox="0 0 64 64" className="w-7 h-7">
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="34" fill="white">👶</text>
  </svg>
)

// Sarva Devatha Pooja — folded hands / prayer
const SarvaIcon = () => (
  <svg viewBox="0 0 64 64" className="w-7 h-7">
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="34" fill="white">🙏</text>
  </svg>
)

const serviceIcons = [
  <GanapathiIcon />,    // Maha Ganapathi Homam — Ganesha elephant 🐘
  <LakshmiIcon />,      // Maha Lakshmi Homam — Lotus 🪷
  <SudarshanaIcon />,   // Sudharshana Chakra — spinning chakra wheel
  <TrishulIcon />,      // Mruthunjaya (Shiva) — Trishul trident
  <NavargahaIcon />,    // Navagraha — 9 planets
  <BhoomiIcon />,       // Bhoomi Pooja — Kalash/pot
  <RuthuIcon />,        // Ruthu Shanthi — flower blossom 🌸
  <PunyahaIcon />,      // Punyahavachanam — holy water drops
  <AayushyaIcon />,     // Aayushya Homam — Om symbol ॐ
  <GrahaIcon />,        // Graha Pravesham — temple house
  <NamaIcon />,         // Namakaranam — baby 👶
  <SarvaIcon />,        // Sarva Devatha Pooja — prayer hands 🙏
]

const colors = [
  'from-orange-500 to-red-600',       // Ganapathi — saffron-red
  'from-yellow-400 to-pink-500',      // Lakshmi — lotus pink-gold
  'from-indigo-500 to-blue-700',      // Sudarshana — deep blue
  'from-slate-600 to-gray-800',       // Mruthunjaya/Shiva — dark/ash
  'from-violet-500 to-purple-700',    // Navagraha — cosmic purple
  'from-green-600 to-emerald-700',    // Bhoomi — earth green
  'from-pink-400 to-rose-500',        // Ruthu Shanthi — soft pink
  'from-cyan-500 to-teal-600',        // Punyahavachanam — water blue
  'from-amber-500 to-orange-600',     // Aayushya — agni flame
  'from-red-700 to-rose-800',         // Graha Pravesham — deep red
  'from-sky-400 to-blue-500',         // Namakaranam — baby blue
  'from-rose-500 to-fuchsia-600',     // Sarva Devatha — devotional
]

export default function Services() {
  const { lang } = useLang()
  const t = translations[lang].services
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => el.classList.add('visible'))
            entry.target.querySelectorAll('.service-card-anim').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80)
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
      id="services"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-cream to-[#FFF3E0] dark:from-divine-dark dark:to-incense-grey transition-colors duration-500"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-saffron/5 text-[200px] font-playfair select-none">ॐ</div>
        <div className="absolute bottom-10 right-10 text-saffron/5 text-[150px] font-playfair select-none">🪔</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block font-poppins text-saffron font-medium text-sm tracking-widest uppercase mb-3">{t.tag}</span>
          <h2 className="section-heading">{t.heading}</h2>
          <div className="gold-line" />
          <p className="font-poppins text-gray-500 max-w-2xl mx-auto mt-4 text-sm md:text-base">{t.desc}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {t.items.map((service, i) => (
            <div key={i} className="service-card service-card-anim reveal group">
              <div className="flex items-start gap-4">
                {/* Icon Box */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[i]}
                    flex items-center justify-center flex-shrink-0
                    shadow-md group-hover:scale-110 group-hover:shadow-lg
                    transition-all duration-300 overflow-hidden`}
                  title={service.name}
                >
                  {serviceIcons[i]}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-playfair font-bold text-maroon text-base mb-1 leading-tight">{service.name}</h3>
                  <p className="font-poppins text-gray-500 text-xs leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sarva Shanthi Special Card */}
        <div className="reveal">
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #800000, #B22222, #CC5500, #FF9933)' }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            </div>
            <div className="relative z-10 p-6 sm:p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
                <div className="text-5xl md:text-6xl animate-float">🕉</div>
                <div className="flex-1 text-center">
                  <h3 className="font-playfair text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">{t.specialTitle}</h3>
                  <p className="font-poppins text-white/80 text-sm leading-relaxed mb-2">
                    {t.specialPara1} <strong className="text-gold">{t.specialBold}</strong>
                  </p>
                  <p className="font-poppins text-white/70 text-sm leading-relaxed">
                    {t.specialPara2} <strong className="text-gold">{t.specialBold2}</strong> {t.specialPara2b}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1 w-full md:w-auto">
                  <button
                    onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full md:w-auto flex-shrink-0 bg-white text-maroon font-poppins font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl
                      shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                    id="services-cta-btn"
                  >
                    {t.bookBtn}
                  </button>
                  <p className="font-poppins text-white/80 text-xs mt-1 text-center">
                    <strong className="text-sm font-semibold text-gold">Pre-Book</strong> before 10 days itself
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
