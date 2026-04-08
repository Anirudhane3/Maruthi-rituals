import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LanguageContext'
import translations from '../translations'
import { X, ChevronLeft, ChevronRight, Images, ChevronDown } from 'lucide-react'

// ─── Dynamically import all gallery images ────────────────────────────────────
const imageModules = import.meta.glob(
  '../public/img/gallery/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)

const galleryItems = Object.entries(imageModules).map(([path, mod], index) => {
  const filename = path.split('/').pop()
  return {
    id: index,
    src: mod.default,
    filename,
    title: filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
  }
})

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ items, activeIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const item = items[activeIndex]

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.93)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute', top: 20, right: 20,
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff', zIndex: 10,
        }}
      >
        <X size={20} />
      </button>

      {items.length > 1 && (
        <button
          aria-label="Previous"
          style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff', zIndex: 10,
          }}
          onClick={(e) => { e.stopPropagation(); onPrev() }}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <div
        style={{
          maxWidth: 860, width: '100%', padding: '0 64px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.title}
          style={{
            maxWidth: '100%', maxHeight: '78vh',
            objectFit: 'contain', borderRadius: 20,
            boxShadow: '0 0 80px rgba(180,83,9,0.22)',
          }}
        />
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.40)' }}>
          {activeIndex + 1} / {items.length}
        </p>
      </div>

      {items.length > 1 && (
        <button
          aria-label="Next"
          style={{
            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff', zIndex: 10,
          }}
          onClick={(e) => { e.stopPropagation(); onNext() }}
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  )
}

// ─── All Photos slide-up panel ────────────────────────────────────────────────
function AllPhotosPanel({ items, onClose, onOpenLightbox }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        background: 'rgba(60,30,0,0.42)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        animation: 'fadeInOverlay 0.25s ease',
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeInOverlay { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUpPanel  { from { transform: translateY(60px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .all-photo-thumb { transition: transform 0.22s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.22s; }
        .all-photo-thumb:hover { transform: translateY(-4px) scale(1.03) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.20) !important; }
        .all-photos-grid::-webkit-scrollbar { width: 4px; }
        .all-photos-grid::-webkit-scrollbar-track { background: transparent; }
        .all-photos-grid::-webkit-scrollbar-thumb { background: #e5c9a0; border-radius: 4px; }
      `}</style>

      <div
        style={{
          width: '100%', maxWidth: 580, maxHeight: '90vh',
          background: 'linear-gradient(180deg,#fffbf5 0%,#fff8ee 100%)',
          borderRadius: '24px 24px 0 0',
          border: '1px solid rgba(180,83,9,0.15)',
          boxShadow: '0 -16px 48px rgba(180,83,9,0.12), 0 -4px 16px rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column',
          animation: 'slideUpPanel 0.32s cubic-bezier(0.34,1.1,0.64,1)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px 14px',
          borderBottom: '1px solid rgba(180,83,9,0.12)',
          flexShrink: 0,
        }}>
          <div>
            <p style={{
              margin: 0, fontFamily: 'Poppins, sans-serif', fontSize: 10,
              fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#b45309',
            }}>
              Photo Gallery
            </p>
            <h3 style={{
              margin: '4px 0 0', fontFamily: "'Playfair Display', serif",
              fontSize: 18, fontWeight: 700, color: '#1a1a2e',
            }}>
              {items.length} Photo{items.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close gallery"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(180,83,9,0.08)', border: '1px solid rgba(180,83,9,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#b45309',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Grid */}
        <div
          className="all-photos-grid"
          style={{
            overflowY: 'auto', flex: 1,
            padding: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="all-photo-thumb"
              onClick={() => onOpenLightbox(item.id)}
              style={{
                borderRadius: 12, overflow: 'hidden',
                border: '2px solid #fff',
                boxShadow: '0 3px 12px rgba(0,0,0,0.10)',
                cursor: 'pointer', aspectRatio: '4/3',
                background: '#f5ede0',
              }}
            >
              <img
                src={item.src}
                alt={item.title}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Fan Spread ───────────────────────────────────────────────────────────────
function FanSpread({ items, onOpen }) {
  const count  = Math.min(5, items.length)
  const step   = items.length <= 5 ? 1 : Math.floor(items.length / 5)
  const picked = Array.from({ length: count }, (_, i) => items[i * step])

  return (
    // Use a responsive container — height scales with viewport width on small screens
    <div style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(180px, 55vw, 280px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {picked.map((item, i) => {
        const mid      = Math.floor(count / 2)
        const rel      = i - mid
        const rotate   = rel * 9
        // Use vw-based spacing so cards don't overflow on narrow screens
        // clamp: 18vw spacing on small, 130px on large
        const txVw     = rel * 18   // each step = 18vw
        const ty       = Math.abs(rel) * 6
        const zIndex   = count - Math.abs(rel)
        const isCenter = rel === 0

        // Card dims: relative to container so they scale
        const wPct  = isCenter ? '32%' : '27%'
        const hPct  = isCenter ? '90%' : '78%'

        return (
          <div
            key={item.id}
            onClick={() => onOpen(item.id)}
            style={{
              position: 'absolute',
              width: wPct,
              // max pixel size so they don't get huge on wide screens
              maxWidth: isCenter ? 200 : 170,
              height: hPct,
              maxHeight: isCenter ? 245 : 215,
              minWidth: isCenter ? 80 : 64,
              minHeight: isCenter ? 100 : 84,
              borderRadius: 'clamp(12px, 3vw, 20px)',
              overflow: 'hidden',
              transform: `translateX(${txVw}vw) translateY(${ty}px) rotate(${rotate}deg)`,
              zIndex,
              boxShadow: isCenter
                ? '0 20px 60px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.14)'
                : '0 10px 32px rgba(0,0,0,0.20)',
              cursor: 'pointer',
              transition: 'transform 0.28s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.28s',
              border: 'clamp(2px, 0.5vw, 3px) solid #fff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `translateX(${txVw}vw) translateY(${ty - 14}px) rotate(${rotate}deg) scale(1.06)`
              e.currentTarget.style.zIndex = 20
              e.currentTarget.style.boxShadow = '0 30px 72px rgba(0,0,0,0.32)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `translateX(${txVw}vw) translateY(${ty}px) rotate(${rotate}deg) scale(1)`
              e.currentTarget.style.zIndex = zIndex
              e.currentTarget.style.boxShadow = isCenter
                ? '0 20px 60px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.14)'
                : '0 10px 32px rgba(0,0,0,0.20)'
            }}
          >
            <img
              src={item.src}
              alt={item.title}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                pointerEvents: 'none',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

// ─── Main Gallery Section ─────────────────────────────────────────────────────
export default function Gallery() {
  const { lang }   = useLang()
  const t          = translations[lang].gallery
  const sectionRef = useRef(null)

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [showPanel,     setShowPanel]     = useState(false)

  const openLightbox  = (id) => {
    // If panel is open, keep panel open but also show lightbox
    setLightboxIndex(galleryItems.findIndex(g => g.id === id))
  }
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage     = () => setLightboxIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length)
  const nextImage     = () => setLightboxIndex((i) => (i + 1) % galleryItems.length)

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{
        padding: '72px 0 80px',
        background: 'linear-gradient(180deg,#fdf8f2 0%,#f9f1e7 60%,#fdf8f2 100%)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* decorative bg */}
      <div style={{
        position: 'absolute', bottom: 16, right: 20,
        fontSize: 180, opacity: 0.03, fontFamily: 'serif',
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
      }}>🕉</div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        {/* ── Section header ──────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#b45309', marginBottom: 6,
          }}>
            {t.tag}
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(24px, 5vw, 34px)',
            fontWeight: 700, color: '#1a1a2e', margin: 0, lineHeight: 1.2,
          }}>
            {t.heading}
          </h2>
          <div style={{
            width: 48, height: 3, borderRadius: 2,
            background: 'linear-gradient(90deg,#b45309,#f59e0b)',
            margin: '14px auto 0',
          }} />
          <p style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 13,
            color: '#78716c', marginTop: 12, lineHeight: 1.7,
          }}>
            {t.desc}
          </p>
        </div>

        {galleryItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Images size={48} style={{ color: '#d1c9be', margin: '0 auto 12px', display: 'block' }} />
            <p style={{ fontFamily: 'Poppins, sans-serif', color: '#a8a29e', fontSize: 14 }}>
              {t.empty}
            </p>
          </div>
        ) : (
          <>
            {/* ── Fan spread ──────────────────────────────────── */}
            <FanSpread items={galleryItems} onOpen={openLightbox} />

            {/* ── View All Photos button ──────────────────────── */}
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <button
                onClick={() => setShowPanel(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                  letterSpacing: '0.04em', color: '#b45309',
                  background: 'transparent',
                  border: '1px solid rgba(180,83,9,0.40)',
                  borderRadius: 100, padding: '9px 24px',
                  cursor: 'pointer',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(180,83,9,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(180,83,9,0.65)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(180,83,9,0.40)'
                }}
              >
                <Images size={14} />
                View All {galleryItems.length} Photos
                <ChevronDown size={14} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── All Photos panel ──────────────────────────────────── */}
      {showPanel && (
        <AllPhotosPanel
          items={galleryItems}
          onClose={() => setShowPanel(false)}
          onOpenLightbox={(id) => {
            setShowPanel(false)
            openLightbox(id)
          }}
        />
      )}

      {/* ── Lightbox ──────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          items={galleryItems}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  )
}
