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
    { label: t.about, href: '#about' },
    { label: t.services, href: '#services' },
    { label: t.gallery, href: '#gallery' },
    { label: t.booking, href: '#booking' },
    { label: t.location, href: '#location' },
    { label: t.contact, href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          : 'bg-gradient-to-b from-black/60 to-transparent py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-gold bg-maroon flex items-center justify-center">
              <img
                src={logoImg}
                alt="Maruthi Prohitham Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-playfair text-white font-bold text-lg leading-none tracking-wide">
                {lang === 'en' ? 'Maruthi Prohitham' : 'மாருதி புரோஹிதம்'}
              </h1>
              <p className="text-gold text-xs font-poppins tracking-widest">
                {lang === 'en' ? 'VEDIC PRIEST SERVICES' : 'வேத புரோஹிதர் சேவைகள்'}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  className="relative text-white/90 hover:text-gold font-poppins font-medium px-4 py-2 text-sm tracking-wide
                    transition-colors duration-300 group"
                >
                  {label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold rounded-full transition-all duration-300 group-hover:w-4/5" />
                </button>
              </li>
            ))}

            {/* Language Toggle */}
            <li>
              <button
                id="lang-toggle-btn"
                onClick={toggleLang}
                className="ml-2 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-gold/60
                  text-white hover:text-gold font-poppins font-semibold px-4 py-2 rounded-full text-sm
                  backdrop-blur-sm transition-all duration-300 hover:scale-105"
                title={lang === 'en' ? 'Switch to Tamil' : 'Switch to English'}
              >
                <span className="text-base">{lang === 'en' ? '🇮🇳' : '🌐'}</span>
                {t.langBtn}
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavClick('#booking')}
                className="ml-2 bg-gradient-to-r from-saffron to-gold text-maroon font-poppins font-bold
                  px-5 py-2 rounded-full text-sm tracking-wide shadow-lg
                  hover:shadow-saffron/50 hover:scale-105 transition-all duration-300"
              >
                {t.bookBtn}
              </button>
            </li>
          </ul>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-2">
            {/* Language Toggle Mobile */}
            <button
              id="lang-toggle-mobile-btn"
              onClick={toggleLang}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 border border-white/30
                text-white hover:text-gold font-poppins font-semibold px-3 py-1.5 rounded-full text-xs
                backdrop-blur-sm transition-all duration-300"
            >
              <span>{lang === 'en' ? '🇮🇳' : '🌐'}</span>
              {t.langBtn}
            </button>

            {/* Hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gold transition-colors duration-300 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-maroon/95 backdrop-blur-md rounded-2xl p-4 border border-saffron/20 shadow-2xl">
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className="block w-full text-left text-white/90 hover:text-gold font-poppins font-medium
                  px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-sm"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#booking')}
              className="mt-2 w-full bg-gradient-to-r from-saffron to-gold text-maroon font-poppins font-bold
                py-3 rounded-xl text-sm tracking-wide shadow-lg hover:shadow-saffron/50"
            >
              {t.bookBtn}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
