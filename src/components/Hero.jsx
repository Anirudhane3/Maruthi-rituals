import { useLang } from '../context/LanguageContext'
import translations from '../translations'
import DeityMandala from './DeityMandala'
import velImg from '../img/vel.png'

export default function Hero() {
  const { lang } = useLang()
  const t = translations[lang].hero

  const scrollToBooking = () =>
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToAbout = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3D0000 0%, #800000 30%, #B22222 55%, #CC5500 80%, #FF9933 100%)',
      }}
    >
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-gold/10 blur-3xl top-10 -left-20 animate-pulse" />
        <div className="absolute w-80 h-80 rounded-full bg-saffron/15 blur-3xl bottom-20 -right-10 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute w-64 h-64 rounded-full bg-white/5 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Decorative Om symbols (hidden on very small screens) */}
      <div className="absolute top-1/4 left-10 text-gold/10 text-8xl font-playfair select-none animate-float hidden sm:block" style={{ animationDelay: '0.5s' }}>ॐ</div>

      {/* Decorative border */}
      <div
        className="absolute inset-2 sm:inset-4 md:inset-8 rounded-3xl border border-gold/20 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 80px rgba(255,215,0,0.05)' }}
      />

      {/* ── Layout: stacked on mobile, side-by-side on lg ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 pt-28 pb-20 lg:py-28">

        {/* ── LEFT: Text Content ── */}
        <div className="flex-1 text-center lg:text-left w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold rounded-full px-4 py-1.5 text-xs sm:text-sm font-poppins font-medium mb-5 backdrop-blur-sm animate-fade-in">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            {t.badge}
          </div>

          {/* Om Symbol */}
          <div className="text-5xl sm:text-6xl md:text-7xl font-playfair text-gold mb-3 animate-float" style={{ textShadow: '0 0 40px rgba(255,215,0,0.5)' }}>
            ॐ
          </div>

          {/* Main Heading */}
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold text-white leading-tight mb-3">
            <span className="block">{t.title1}</span>
            <span className="block text-gradient">{t.title2}</span>
          </h1>

          {/* Subtitle */}
          <p className="font-poppins text-white/80 text-base md:text-xl mb-2 tracking-wide">{t.subtitle}</p>
          <p className="font-poppins text-white/60 text-sm md:text-lg mb-8">{t.desc}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
            <button
              id="hero-book-btn"
              onClick={scrollToBooking}
              className="btn-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-2xl animate-pulse-glow w-full sm:w-auto"
            >
              {t.bookBtn}
            </button>
            <button
              id="hero-about-btn"
              onClick={scrollToAbout}
              className="flex items-center justify-center gap-2 text-white/80 hover:text-gold font-poppins font-medium
                border border-white/30 hover:border-gold/50 px-7 py-3 sm:py-4 rounded-2xl
                backdrop-blur-sm transition-all duration-300 hover:bg-white/5 w-full sm:w-auto text-sm sm:text-base"
            >
              {t.learnMore}
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:mx-0">
            {t.stats.map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <div className="font-playfair text-gold font-bold text-xl sm:text-2xl md:text-3xl">{value}</div>
                <div className="font-poppins text-white/60 text-[10px] sm:text-xs md:text-sm mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Deity Image with Rangoli Mandala ── */}
        {/* On mobile: smaller and centered below text */}
        <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-auto">
          <DeityMandala />
        </div>

      </div>

      {/* Bottom scroll cue */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center gap-1.5 text-white/50 animate-bounce">
        <span className="font-poppins text-[10px] tracking-widest uppercase">{t.scroll}</span>
        <img src={velImg} alt="Scroll Down" className="h-8 sm:h-10 w-auto opacity-75 object-contain" />
      </div>

    </section>
  )
}
