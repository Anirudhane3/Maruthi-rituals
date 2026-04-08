import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import translations from '../translations'
import logoImg from '../public/img/logo.jpeg'

export default function Navbar() {
  const { lang, toggleLang } = useLang()
  const t = translations[lang].nav
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    { label: t.about,    href: '#about'    },
    { label: t.services, href: '#services' },
    { label: t.gallery,  href: '#gallery'  },
    { label: t.booking,  href: '#booking'  },
    { label: t.location, href: '#location' },
    { label: t.contact,  href: '#contact'  },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return
    const close = () => setIsOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [isOpen])

  const handleNavClick = (href) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-maroon/95 backdrop-blur-md shadow-2xl shadow-maroon/30 py-2'
          : 'bg-gradient-to-b from-black/60 to-transparent py-3'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <div
              className="flex-shrink-0 overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-gold bg-maroon flex items-center justify-center"
              style={{ width: 44, height: 44, borderRadius: '50%', minWidth: 44 }}
            >
              <img
                src={logoImg}
                alt="Maruthi Prohitham Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h1 className="font-playfair text-white font-bold text-sm sm:text-base leading-none tracking-wide whitespace-nowrap">
                {lang === 'en' ? 'Maruthi Prohitham' : 'மாருதி புரோஹிதம்'}
              </h1>
              <p className="text-gold text-[9px] sm:text-[10px] font-poppins tracking-widest whitespace-nowrap mt-0.5">
                {lang === 'en' ? 'VEDIC PRIEST SERVICES' : 'வேத புரோஹிதர் சேவைகள்'}
              </p>
            </div>
          </a>

          {/* ── Desktop Nav (lg+: 1024px and above) ── */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  className="relative text-white/90 hover:text-gold font-poppins font-medium px-3 py-2 text-sm tracking-wide
                    transition-colors duration-300 group"
                >
                  {label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold rounded-full transition-all duration-300 group-hover:w-4/5" />
                </button>
              </li>
            ))}

            {/* Language Toggle — desktop */}
            <li>
              <button
                id="lang-toggle-btn"
                onClick={toggleLang}
                className="ml-1 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-gold/60
                  text-white hover:text-gold font-poppins font-semibold px-3 py-1.5 rounded-full text-xs
                  backdrop-blur-sm transition-all duration-300 hover:scale-105"
                title={lang === 'en' ? 'Switch to Tamil' : 'Switch to English'}
              >
                <span>{lang === 'en' ? '🇮🇳' : '🌐'}</span>
                {t.langBtn}
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavClick('#booking')}
                className="ml-1 bg-gradient-to-r from-saffron to-gold text-maroon font-poppins font-bold
                  px-4 py-1.5 rounded-full text-xs tracking-wide shadow-lg
                  hover:shadow-saffron/50 hover:scale-105 transition-all duration-300"
              >
                {t.bookBtn}
              </button>
            </li>
          </ul>

          {/* ── Mobile / Tablet right side (below lg) ── */}
          <div className="lg:hidden flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {/* Language Toggle */}
            <button
              id="lang-toggle-mobile-btn"
              onClick={toggleLang}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 border border-white/30
                text-white font-poppins font-semibold px-2.5 py-1.5 rounded-full text-xs
                backdrop-blur-sm transition-all duration-300"
            >
              <span>{lang === 'en' ? '🇮🇳' : '🌐'}</span>
              {t.langBtn}
            </button>

            {/* Hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(v => !v)}
              className="text-white hover:text-gold transition-colors duration-300 p-1.5"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── Dropdown menu — mobile & tablet (below lg) ── */}
        <div
          className={`lg:hidden transition-all duration-400 overflow-hidden ${
            isOpen ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-maroon/96 backdrop-blur-md rounded-2xl p-3 border border-saffron/20 shadow-2xl">
            {/* Grid of nav links for tablet, list for mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mb-2">
              {navLinks.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className="text-white/90 hover:text-gold font-poppins font-medium
                    px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 text-sm text-left"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="border-t border-white/10 pt-2 mt-1">
              <button
                onClick={() => handleNavClick('#booking')}
                className="w-full bg-gradient-to-r from-saffron to-gold text-maroon font-poppins font-bold
                  py-2.5 rounded-xl text-sm tracking-wide shadow-lg hover:shadow-saffron/50 transition-all duration-300"
              >
                {t.bookBtn}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
