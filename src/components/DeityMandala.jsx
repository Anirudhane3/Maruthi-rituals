import React from 'react'
import deityImg from '../img/maruti_deity.PNG'

export default function DeityMandala({ variant = 'deity' }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        // Scales smoothly: 260px on 320px viewport → 480px at 768px+
        width:  'clamp(260px, 60vw, 480px)',
        height: 'clamp(260px, 60vw, 480px)',
      }}
    >
      {/* ══ LAYER 1: Outer ring — slow clockwise ══ */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480"
        style={{ animation: 'spin 26s linear infinite' }}>

        {Array.from({ length: 72 }, (_, i) => {
          const a = (i / 72) * 2 * Math.PI
          const r = 232
          return <circle key={i} cx={240 + r * Math.cos(a)} cy={240 + r * Math.sin(a)}
            r={i % 6 === 0 ? 3.5 : i % 2 === 0 ? 2 : 1.2}
            fill="#FFD700" opacity={i % 6 === 0 ? 1 : 0.4} />
        })}

        {Array.from({ length: 36 }, (_, i) => {
          const a = ((i + 0.5) / 36) * 2 * Math.PI
          const r = 224
          return <circle key={i} cx={240 + r * Math.cos(a)} cy={240 + r * Math.sin(a)}
            r={i % 3 === 0 ? 2.5 : 1.5} fill="#FF9933" opacity={i % 3 === 0 ? 0.9 : 0.5} />
        })}

        <circle cx="240" cy="240" r="218" fill="none" stroke="#FFD700" strokeWidth="0.8" opacity="0.3" />

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

        <circle cx="240" cy="240" r="163" fill="none" stroke="#FFD700" strokeWidth="1.2" opacity="0.45" />
        <circle cx="240" cy="240" r="160" fill="none" stroke="#FF9933" strokeWidth="0.7" opacity="0.3" strokeDasharray="5 4" />

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
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480"
        style={{ animation: 'spin-reverse 16s linear infinite' }}>

        {Array.from({ length: 12 }, (_, i) => {
          const ang = (i / 12) * 360
          const bR = 116, tR = 156, w = 15, h = (tR - bR) * 0.42
          const d = `M 240,${240 - bR} C ${240 + w},${240 - bR - h} ${240 + w},${240 - tR + h} 240,${240 - tR} C ${240 - w},${240 - tR + h} ${240 - w},${240 - bR - h} 240,${240 - bR} Z`
          return (
            <g key={i} transform={`rotate(${ang} 240 240)`}>
              <path d={d} fill="#FFD700" opacity="0.4" />
              <path d={d} fill="none" stroke="#FFD700" strokeWidth="1.3" opacity="1" />
              <line x1="240" y1={240 - bR - 2} x2="240" y2={240 - tR + 4}
                stroke="#FF9933" strokeWidth="0.9" opacity="0.85" strokeDasharray="3 3" />
              <circle cx="240" cy={240 - tR + 4} r="2.5" fill="#FF9933" opacity="1" />
            </g>
          )
        })}

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

        {Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * 2 * Math.PI
          const r = 113
          return <circle key={i} cx={240 + r * Math.cos(a)} cy={240 + r * Math.sin(a)}
            r={i % 2 === 0 ? 2.8 : 1.4} fill="#FFD700" opacity={i % 2 === 0 ? 0.95 : 0.5} />
        })}
      </svg>

      {/* ══ LAYER 3: Core ring — slow clockwise ══ */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480"
        style={{ animation: 'spin 38s linear infinite' }}>

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

        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * 2 * Math.PI
          const r = 65
          return <circle key={i} cx={240 + r * Math.cos(a)} cy={240 + r * Math.sin(a)}
            r={i % 2 === 0 ? 2.5 : 1.3} fill="#FFD700" opacity={i % 2 === 0 ? 0.9 : 0.5} />
        })}

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

        <polygon
          points={Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * 2 * Math.PI - Math.PI / 2
            const r = i % 2 === 0 ? 34 : 19
            return `${240 + r * Math.cos(a)},${240 + r * Math.sin(a)}`
          }).join(' ')}
          fill="#FFD700" opacity="0.5" stroke="#FF9933" strokeWidth="0.8"
        />

        <circle cx="240" cy="240" r="9" fill="#FFD700" opacity="0.8" />
        <circle cx="240" cy="240" r="5" fill="#FF9933" opacity="1" />
        <circle cx="240" cy="240" r="2" fill="#FFD700" opacity="1" />
      </svg>

      {/* Glow behind image */}
      <div className="absolute rounded-full animate-pulse" style={{
        width: '43%', height: '43%',
        background: 'radial-gradient(circle, rgba(255,215,0,0.35) 0%, rgba(255,153,51,0.2) 50%, transparent 75%)',
        filter: 'blur(14px)',
      }} />

      {/* Image / Om circle — also scales with container */}
      <div className={`relative rounded-full overflow-hidden border-2 border-gold/60 shadow-2xl flex items-center justify-center ${variant === 'om' ? 'bg-maroon/50' : ''}`} style={{
        width: '41%', height: '41%',
        boxShadow: '0 0 50px rgba(255,215,0,0.4), 0 0 100px rgba(255,153,51,0.2)',
      }}>
        {variant === 'om' ? (
          <div className="text-5xl sm:text-6xl md:text-7xl font-playfair text-gold pt-2 animate-pulse" style={{ textShadow: '0 0 40px rgba(255,215,0,0.5)' }}>
            ॐ
          </div>
        ) : (
          <>
            <img src={deityImg} alt="Sri Maruti Deity" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 rounded-full pointer-events-none" style={{
              background: 'radial-gradient(circle at center, transparent 52%, rgba(128,0,0,0.55) 78%, rgba(61,0,0,0.9) 100%)',
            }} />
          </>
        )}
      </div>

      {/* Ambient outer glow */}
      <div className="absolute rounded-full pointer-events-none" style={{
        width: '104%', height: '104%',
        background: 'radial-gradient(circle, transparent 46%, rgba(255,153,51,0.07) 70%, transparent 100%)',
      }} />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}
