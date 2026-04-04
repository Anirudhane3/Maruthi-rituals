import { useLang } from '../context/LanguageContext'
import translations from '../translations'
import deityImg from '../public/img/maruti_deity.PNG'
import velImg from '../public/img/vel.png'

export default function Hero() {
  const { lang } = useLang()
  const t = translations[lang].hero

  const scrollToBooking = () => {
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

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

      {/* Decorative Om symbols */}
      <div className="absolute top-1/4 left-10 text-gold/10 text-8xl font-playfair select-none animate-float" style={{ animationDelay: '0.5s' }}>ॐ</div>

      {/* Decorative border */}
      <div
        className="absolute inset-4 md:inset-8 rounded-3xl border border-gold/20 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 80px rgba(255,215,0,0.05)' }}
      />

      {/* ── Two-column layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 py-28">

        {/* ── LEFT: Text Content ── */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold rounded-full px-5 py-1.5 text-sm font-poppins font-medium mb-6 backdrop-blur-sm animate-fade-in">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            {t.badge}
          </div>

          {/* Om Symbol */}
          <div className="text-6xl md:text-7xl font-playfair text-gold mb-4 animate-float" style={{ textShadow: '0 0 40px rgba(255,215,0,0.5)' }}>
            ॐ
          </div>

          {/* Main Heading */}
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4">
            <span className="block">{t.title1}</span>
            <span className="block text-gradient">{t.title2}</span>
          </h1>

          {/* Subtitle */}
          <p className="font-poppins text-white/80 text-lg md:text-xl mb-2 tracking-wide">{t.subtitle}</p>
          <p className="font-poppins text-white/60 text-base md:text-lg mb-10">{t.desc}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <button
              id="hero-book-btn"
              onClick={scrollToBooking}
              className="btn-primary text-lg px-10 py-4 rounded-2xl animate-pulse-glow"
            >
              {t.bookBtn}
            </button>
            <button
              id="hero-about-btn"
              onClick={scrollToAbout}
              className="flex items-center gap-2 text-white/80 hover:text-gold font-poppins font-medium
                border border-white/30 hover:border-gold/50 px-8 py-4 rounded-2xl
                backdrop-blur-sm transition-all duration-300 hover:bg-white/5"
            >
              {t.learnMore}
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-sm lg:max-w-md">
            {t.stats.map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <div className="font-playfair text-gold font-bold text-2xl md:text-3xl">{value}</div>
                <div className="font-poppins text-white/60 text-xs md:text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Deity Image with Rangoli Mandala ── */}
        <div className="flex-shrink-0 flex items-center justify-center lg:justify-end">
          <div className="relative flex items-center justify-center" style={{ width: '480px', height: '480px' }}>

            {/* ══ LAYER 1: Outer ring — slow clockwise ══ */}
            <svg className="absolute inset-0" width="480" height="480" viewBox="0 0 480 480"
              style={{ animation: 'spin 26s linear infinite' }}>

              {/* Outermost bead chain (r=232) — big + small alternating */}
              {Array.from({ length: 72 }, (_, i) => {
                const a = (i / 72) * 2 * Math.PI
                const r = 232
                return <circle key={i} cx={240 + r * Math.cos(a)} cy={240 + r * Math.sin(a)}
                  r={i % 6 === 0 ? 3.5 : i % 2 === 0 ? 2 : 1.2}
                  fill="#FFD700" opacity={i % 6 === 0 ? 1 : 0.4} />
              })}

              {/* Second bead ring (r=224, saffron) */}
              {Array.from({ length: 36 }, (_, i) => {
                const a = ((i + 0.5) / 36) * 2 * Math.PI
                const r = 224
                return <circle key={i} cx={240 + r * Math.cos(a)} cy={240 + r * Math.sin(a)}
                  r={i % 3 === 0 ? 2.5 : 1.5} fill="#FF9933" opacity={i % 3 === 0 ? 0.9 : 0.5} />
              })}

              <circle cx="240" cy="240" r="218" fill="none" stroke="#FFD700" strokeWidth="0.8" opacity="0.3" />

              {/* 24 Rangoli curved petals — bezier teardrops */}
              {Array.from({ length: 24 }, (_, i) => {
                const ang = (i / 24) * 360
                const bR = 182, tR = 216, w = 10, h = (tR - bR) * 0.38
                const d = `M 240,${240 - bR} C ${240 + w},${240 - bR - h} ${240 + w},${240 - tR + h} 240,${240 - tR} C ${240 - w},${240 - tR + h} ${240 - w},${240 - bR - h} 240,${240 - bR} Z`
                return (
                  <g key={i} transform={`rotate(${ang} 240 240)`}>
                    <path d={d} fill="#FFD700" opacity="0.5" />
                    <path d={d} fill="none" stroke="#FF9933" strokeWidth="1.1" opacity="0.95" />
                    <circle cx="240" cy={240 - tR - 3} r="2" fill="#FFD700" opacity="1" />
                  </g>
                )
              })}

              {/* Scalloped wave ring — 24-fold curved arcs (r=175, inward depth=11) */}
              <path
                d={Array.from({ length: 24 }, (_, i) => {
                  const a1 = (i / 24) * 2 * Math.PI
                  const am = ((i + 0.5) / 24) * 2 * Math.PI
                  const a2 = ((i + 1) / 24) * 2 * Math.PI
                  const r = 175, dep = 11
                  const x1 = 240 + r * Math.cos(a1), y1 = 240 + r * Math.sin(a1)
                  const mx = 240 + (r - dep) * Math.cos(am), my = 240 + (r - dep) * Math.sin(am)
                  const x2 = 240 + r * Math.cos(a2), y2 = 240 + r * Math.sin(a2)
                  return `${i === 0 ? `M ${x1},${y1}` : `L ${x1},${y1}`} Q ${mx},${my} ${x2},${y2}`
                }).join(' ') + ' Z'}
                fill="none" stroke="#FFD700" strokeWidth="1.8" opacity="0.7"
              />

              {/* Double boundary ring */}
              <circle cx="240" cy="240" r="163" fill="none" stroke="#FFD700" strokeWidth="1.2" opacity="0.45" />
              <circle cx="240" cy="240" r="160" fill="none" stroke="#FF9933" strokeWidth="0.7" opacity="0.3" strokeDasharray="5 4" />

              {/* 12 Diamond ornaments at r=166 between petals */}
              {Array.from({ length: 12 }, (_, i) => {
                const a = ((i + 0.5) / 12) * 2 * Math.PI
                const r = 166
                const cx = 240 + r * Math.cos(a), cy = 240 + r * Math.sin(a)
                const rot = ((i + 0.5) / 12) * 360
                return (
                  <g key={i} transform={`translate(${cx},${cy}) rotate(${rot})`}>
                    <polygon points="0,-6 4.5,0 0,6 -4.5,0" fill="#FFD700" opacity="0.9" />
                  </g>
                )
              })}
            </svg>

            {/* ══ LAYER 2: Middle ring — counter-clockwise ══ */}
            <svg className="absolute inset-0" width="480" height="480" viewBox="0 0 480 480"
              style={{ animation: 'spin-reverse 16s linear infinite' }}>

              {/* 12 Mango/rangoli curved petals — wider bezier */}
              {Array.from({ length: 12 }, (_, i) => {
                const ang = (i / 12) * 360
                const bR = 116, tR = 156, w = 15, h = (tR - bR) * 0.42
                const d = `M 240,${240 - bR} C ${240 + w},${240 - bR - h} ${240 + w},${240 - tR + h} 240,${240 - tR} C ${240 - w},${240 - tR + h} ${240 - w},${240 - bR - h} 240,${240 - bR} Z`
                return (
                  <g key={i} transform={`rotate(${ang} 240 240)`}>
                    <path d={d} fill="#FFD700" opacity="0.4" />
                    <path d={d} fill="none" stroke="#FFD700" strokeWidth="1.3" opacity="1" />
                    {/* Dashed inner vein */}
                    <line x1="240" y1={240 - bR - 2} x2="240" y2={240 - tR + 4}
                      stroke="#FF9933" strokeWidth="0.9" opacity="0.85" strokeDasharray="3 3" />
                    <circle cx="240" cy={240 - tR + 4} r="2.5" fill="#FF9933" opacity="1" />
                  </g>
                )
              })}

              {/* 12 Small teardrop buds between petals */}
              {Array.from({ length: 12 }, (_, i) => {
                const ang = ((i + 0.5) / 12) * 360
                const bR = 137, tR = 154, w = 5, h = (tR - bR) * 0.4
                const d = `M 240,${240 - bR} C ${240 + w},${240 - bR - h} ${240 + w},${240 - tR + h} 240,${240 - tR} C ${240 - w},${240 - tR + h} ${240 - w},${240 - bR - h} 240,${240 - bR} Z`
                return (
                  <g key={i} transform={`rotate(${ang} 240 240)`}>
                    <path d={d} fill="#FFD700" opacity="0.65" />
                    <circle cx="240" cy={240 - tR - 2} r="1.8" fill="#FFD700" opacity="0.9" />
                  </g>
                )
              })}

              {/* Scalloped inner wave (18-fold, r=110, depth=8) */}
              <path
                d={Array.from({ length: 18 }, (_, i) => {
                  const a1 = (i / 18) * 2 * Math.PI
                  const am = ((i + 0.5) / 18) * 2 * Math.PI
                  const a2 = ((i + 1) / 18) * 2 * Math.PI
                  const r = 110, dep = 8
                  const x1 = 240 + r * Math.cos(a1), y1 = 240 + r * Math.sin(a1)
                  const mx = 240 + (r - dep) * Math.cos(am), my = 240 + (r - dep) * Math.sin(am)
                  const x2 = 240 + r * Math.cos(a2), y2 = 240 + r * Math.sin(a2)
                  return `${i === 0 ? `M ${x1},${y1}` : `L ${x1},${y1}`} Q ${mx},${my} ${x2},${y2}`
                }).join(' ') + ' Z'}
                fill="none" stroke="#FF9933" strokeWidth="1.6" opacity="0.75"
              />

              {/* Dot ring at r=113 — 24 beads */}
              {Array.from({ length: 24 }, (_, i) => {
                const a = (i / 24) * 2 * Math.PI
                const r = 113
                return <circle key={i} cx={240 + r * Math.cos(a)} cy={240 + r * Math.sin(a)}
                  r={i % 2 === 0 ? 2.8 : 1.4} fill="#FFD700" opacity={i % 2 === 0 ? 0.95 : 0.5} />
              })}
            </svg>

            {/* ══ LAYER 3: Core ring — slow clockwise ══ */}
            <svg className="absolute inset-0" width="480" height="480" viewBox="0 0 480 480"
              style={{ animation: 'spin 38s linear infinite' }}>

              {/* 8 inner flame petals */}
              {Array.from({ length: 8 }, (_, i) => {
                const ang = (i / 8) * 360
                const bR = 70, tR = 100, w = 9, h = (tR - bR) * 0.4
                const d = `M 240,${240 - bR} C ${240 + w},${240 - bR - h} ${240 + w},${240 - tR + h} 240,${240 - tR} C ${240 - w},${240 - tR + h} ${240 - w},${240 - bR - h} 240,${240 - bR} Z`
                return (
                  <g key={i} transform={`rotate(${ang} 240 240)`}>
                    <path d={d} fill="#FF9933" opacity="0.45" />
                    <path d={d} fill="none" stroke="#FFD700" strokeWidth="1.3" opacity="1" />
                  </g>
                )
              })}

              {/* 8 small buds between flame petals */}
              {Array.from({ length: 8 }, (_, i) => {
                const ang = ((i + 0.5) / 8) * 360
                const bR = 68, tR = 82, w = 5, h = (tR - bR) * 0.4
                const d = `M 240,${240 - bR} C ${240 + w},${240 - bR - h} ${240 + w},${240 - tR + h} 240,${240 - tR} C ${240 - w},${240 - tR + h} ${240 - w},${240 - bR - h} 240,${240 - bR} Z`
                return (
                  <g key={i} transform={`rotate(${ang} 240 240)`}>
                    <path d={d} fill="#FFD700" opacity="0.6" />
                  </g>
                )
              })}

              {/* Dot ring at r=65 */}
              {Array.from({ length: 16 }, (_, i) => {
                const a = (i / 16) * 2 * Math.PI
                const r = 65
                return <circle key={i} cx={240 + r * Math.cos(a)} cy={240 + r * Math.sin(a)}
                  r={i % 2 === 0 ? 2.5 : 1.3} fill="#FFD700" opacity={i % 2 === 0 ? 0.9 : 0.5} />
              })}

              {/* 6-petal rangoli lotus (inner) */}
              {Array.from({ length: 6 }, (_, i) => {
                const ang = (i / 6) * 360
                const bR = 10, tR = 50, w = 12, h = (tR - bR) * 0.42
                const d = `M 240,${240 - bR} C ${240 + w},${240 - bR - h} ${240 + w},${240 - tR + h} 240,${240 - tR} C ${240 - w},${240 - tR + h} ${240 - w},${240 - bR - h} 240,${240 - bR} Z`
                return (
                  <g key={i} transform={`rotate(${ang} 240 240)`}>
                    <path d={d} fill="#FFD700" opacity="0.7" />
                    <path d={d} fill="none" stroke="#FF9933" strokeWidth="0.9" opacity="0.95" />
                  </g>
                )
              })}

              {/* 12-point rangoli star */}
              <polygon
                points={Array.from({ length: 12 }, (_, i) => {
                  const a = (i / 12) * 2 * Math.PI - Math.PI / 2
                  const r = i % 2 === 0 ? 34 : 19
                  return `${240 + r * Math.cos(a)},${240 + r * Math.sin(a)}`
                }).join(' ')}
                fill="#FFD700" opacity="0.5" stroke="#FF9933" strokeWidth="0.8"
              />

              {/* Center dot cluster */}
              <circle cx="240" cy="240" r="9" fill="#FFD700" opacity="0.8" />
              <circle cx="240" cy="240" r="5" fill="#FF9933" opacity="1" />
              <circle cx="240" cy="240" r="2" fill="#FFD700" opacity="1" />
            </svg>

            {/* Glow behind image */}
            <div className="absolute rounded-full animate-pulse" style={{
              width: '210px', height: '210px',
              background: 'radial-gradient(circle, rgba(255,215,0,0.35) 0%, rgba(255,153,51,0.2) 50%, transparent 75%)',
              filter: 'blur(14px)',
            }} />

            {/* Image circle */}
            <div className="relative rounded-full overflow-hidden border-2 border-gold/60 shadow-2xl" style={{
              width: '196px', height: '196px',
              boxShadow: '0 0 50px rgba(255,215,0,0.4), 0 0 100px rgba(255,153,51,0.2)',
            }}>
              <img src={deityImg} alt="Sri Maruti Deity" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                background: 'radial-gradient(circle at center, transparent 52%, rgba(128,0,0,0.55) 78%, rgba(61,0,0,0.9) 100%)',
              }} />
            </div>

            {/* Ambient outer glow */}
            <div className="absolute rounded-full pointer-events-none" style={{
              width: '500px', height: '500px',
              background: 'radial-gradient(circle, transparent 46%, rgba(255,153,51,0.07) 70%, transparent 100%)',
            }} />
          </div>
        </div>

      </div>

      {/* Bottom scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="font-poppins text-xs tracking-widest uppercase">{t.scroll}</span>
        <img src={velImg} alt="Scroll Down" className="h-10 w-auto opacity-75 object-contain" />
      </div>

      {/* Spin keyframe inline */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  )
}
