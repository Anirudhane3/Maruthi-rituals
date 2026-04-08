import { useLang } from '../context/LanguageContext'

export default function PreBookBanner() {
  const { lang } = useLang()

  return (
    <div
      className="relative w-full z-20 text-center overflow-hidden flex items-center justify-center"
      style={{ background: '#FFF8F0', minHeight: 'clamp(160px, 40vw, 260px)', padding: '24px 16px' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&display=swap');
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>

      {/* Divine Mandala Background — scales with viewport */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div
          className="relative flex items-center justify-center"
          style={{ width: 'clamp(240px, 70vw, 480px)', height: 'clamp(240px, 70vw, 480px)' }}
        >
          {/* Outer Rotating Ring */}
          <svg
            className="absolute inset-0 w-full h-full drop-shadow-lg"
            viewBox="0 0 480 480"
            style={{ animation: 'spin-slow 60s linear infinite' }}
          >
            <circle cx="240" cy="240" r="230" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.3" />
            <circle cx="240" cy="240" r="163" fill="none" stroke="#FF9933" strokeWidth="1.5" opacity="0.4" />
            {Array.from({ length: 24 }, (_, i) => {
              const ang = (i / 24) * 360
              const bR = 182, tR = 216, w = 10, h = (tR - bR) * 0.38
              const d = `M 240,${240 - bR} C ${240 + w},${240 - bR - h} ${240 + w},${240 - tR + h} 240,${240 - tR} C ${240 - w},${240 - tR + h} ${240 - w},${240 - bR - h} 240,${240 - bR} Z`
              return (
                <g key={i} transform={`rotate(${ang} 240 240)`}>
                  <path d={d} fill="#FFD700" opacity="0.2" />
                  <path d={d} fill="none" stroke="#CC5500" strokeWidth="1.2" opacity="0.5" />
                  <circle cx="240" cy={240 - tR - 4} r="2.5" fill="#FF9933" opacity="0.6" />
                </g>
              )
            })}
          </svg>

          {/* Inner Rotating Ring */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 480 480"
            style={{ animation: 'spin-reverse-slow 40s linear infinite' }}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const ang = (i / 12) * 360
              const bR = 116, tR = 156, w = 15, h = (tR - bR) * 0.42
              const d = `M 240,${240 - bR} C ${240 + w},${240 - bR - h} ${240 + w},${240 - tR + h} 240,${240 - tR} C ${240 - w},${240 - tR + h} ${240 - w},${240 - bR - h} 240,${240 - bR} Z`
              return (
                <g key={i} transform={`rotate(${ang} 240 240)`}>
                  <path d={d} fill="#CC5500" opacity="0.15" />
                  <path d={d} fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.7" />
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Arched Text — scales responsively */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex items-center justify-center drop-shadow-2xl"
        style={{ height: 'clamp(100px, 25vw, 180px)' }}
      >
        <svg
          viewBox="0 0 600 200"
          width="100%"
          height="100%"
          className="overflow-visible"
          style={{ maxWidth: '100%' }}
        >
          <defs>
            <path id="archTextPath" d="M 50,150 Q 300,20 550,150" fill="transparent" />
            <linearGradient id="divineTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#B22222" />
              <stop offset="25%"  stopColor="#800000" />
              <stop offset="50%"  stopColor="#CC5500" />
              <stop offset="75%"  stopColor="#FF9933" />
              <stop offset="100%" stopColor="#B22222" />
            </linearGradient>
          </defs>
          <text
            textAnchor="middle"
            style={{
              fontFamily: "'Yatra One', cursive",
              fontSize: '44px',
              fill: 'url(#divineTextGrad)',
              filter: 'drop-shadow(0px 2px 4px rgba(128,0,0,0.3))',
            }}
          >
            <textPath href="#archTextPath" startOffset="50%">
              Pre-Book <tspan fontSize="30px" fill="#800000" opacity="0.9">before 10 days itself</tspan>
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  )
}
