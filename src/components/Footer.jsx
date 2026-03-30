import { useLang } from '../context/LanguageContext'
import translations from '../translations'

export default function Footer() {
  const { lang } = useLang()
  const t = translations[lang].footer

  const linkHrefs = ['#about', '#services', '#booking', '#location', '#contact']

  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0000 0%, #3D0000 40%, #5C0000 70%, #800000 100%)' }}>
      <div className="h-1 bg-gradient-to-r from-gold via-saffron to-gold" />
      <div className="absolute top-10 right-10 text-white/5 text-[200px] font-playfair select-none pointer-events-none">ॐ</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-saffron flex items-center justify-center text-maroon font-playfair font-black text-xl shadow-lg">
                {lang === 'en' ? 'म' : 'ம'}
              </div>
              <div>
                <h3 className="font-playfair text-white font-bold text-lg leading-none">
                  {lang === 'en' ? 'Maruthi Prohitham' : 'மாருதி புரோஹிதம்'}
                </h3>
                <p className="text-gold text-xs font-poppins tracking-widest">
                  {lang === 'en' ? 'VEDIC PRIEST SERVICES' : 'வேத புரோஹிதர் சேவைகள்'}
                </p>
              </div>
            </div>
            <p className="font-poppins text-white/60 text-sm leading-relaxed mb-5">{t.tagline}</p>
            <a href="https://wa.me/919342372557" target="_blank" rel="noopener noreferrer" id="footer-whatsapp"
              className="inline-flex items-center gap-2 bg-green-600/80 hover:bg-green-500 text-white font-poppins font-medium
                text-sm px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.whatsappBtn}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-gold font-bold text-lg mb-5">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {t.links.map((label, i) => (
                <li key={i}>
                  <button onClick={() => handleNav(linkHrefs[i])}
                    className="font-poppins text-white/60 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron/50 group-hover:bg-gold transition-colors duration-300" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-gold font-bold text-lg mb-5">{t.ourServices}</h4>
            <ul className="space-y-2">
              {t.serviceList.map((service, i) => (
                <li key={i}>
                  <button onClick={() => handleNav('#services')}
                    className="font-poppins text-white/60 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 group text-left">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron/50 group-hover:bg-gold transition-colors duration-300 flex-shrink-0" />
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-gold font-bold text-lg mb-5">{t.contactInfo}</h4>
            <ul className="space-y-4">
              <li>
                <p className="font-poppins text-gold/60 text-xs uppercase tracking-widest mb-1">{t.address}</p>
                <p className="font-poppins text-white/70 text-sm leading-relaxed">
                  {t.addressLines.map((line, i) => (<span key={i}>{line}{i < t.addressLines.length - 1 && <br />}</span>))}
                </p>
              </li>
              <li>
                <p className="font-poppins text-gold/60 text-xs uppercase tracking-widest mb-1">{t.phone}</p>
                <a href="tel:+919342372557" id="footer-phone" className="font-poppins text-white/70 hover:text-gold text-sm transition-colors duration-300">
                  +91 9342372557
                </a>
              </li>
              <li>
                <p className="font-poppins text-gold/60 text-xs uppercase tracking-widest mb-1">{t.email}</p>
                <a href="mailto:kingofpeacock125@gmail.com" id="footer-email" className="font-poppins text-white/70 hover:text-gold text-sm transition-colors duration-300 break-all">
                  kingofpeacock125@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-poppins text-white/40 text-xs text-center sm:text-left">{t.copyright}</p>
          <div className="flex items-center gap-2 text-white/40 font-poppins text-xs">
            <span className="text-gold text-lg">🕉</span>
            <span>{t.motto}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
