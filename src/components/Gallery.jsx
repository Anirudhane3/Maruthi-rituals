import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LanguageContext'
import translations from '../translations'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

// ─── Dynamically import all images from src/public/img ───────────────────────
// Gallery.jsx lives at src/components/, so public/img is one level up then into public/img
const imageModules = import.meta.glob('../public/img/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
})

/**
 * Build gallery items array from the imported modules.
 * Excludes logo.jpeg (used as site logo, not a gallery photo).
 */
const galleryItems = Object.entries(imageModules)
  .filter(([path]) => {
    const name = path.toLowerCase()
    return !name.includes('logo') && !name.includes('maruti_deity') && !name.includes('rajan_profile')
  })
  .map(([path, mod], index) => {
    const filename = path.split('/').pop()
    const src = mod.default
    return {
      id: index,
      src,
      filename,
      title: filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
    }
  })

// ─── Lightbox ────────────────────────────────────────────────────────────────
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
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.93)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 text-white/80 hover:text-gold transition-colors duration-300
          bg-white/10 hover:bg-white/20 rounded-full p-2 z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Prev */}
      {items.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-gold
            bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 z-10"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label="Previous"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-4xl max-h-[85vh] w-full px-16 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.title}
          className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
          style={{ boxShadow: '0 0 60px rgba(255,153,51,0.25)' }}
        />
        <p className="font-poppins text-white/70 text-sm tracking-wide capitalize">{item.title}</p>
        <p className="font-poppins text-white/30 text-xs">{activeIndex + 1} / {items.length}</p>
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-gold
            bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 z-10"
          onClick={(e) => { e.stopPropagation(); onNext() }}
          aria-label="Next"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  )
}

// ─── Image Card ───────────────────────────────────────────────────────────────
function GalleryCard({ item, index, onOpen }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="gallery-card-anim reveal group relative rounded-2xl overflow-hidden cursor-pointer
        border border-orange-100 hover:border-saffron shadow-md hover:shadow-2xl
        transition-all duration-500 hover:-translate-y-2 bg-white"
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => onOpen(index)}
    >
      {/* Image wrapper with fixed aspect ratio */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '75%' }}>
        {/* Placeholder shimmer */}
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-saffron/10 animate-pulse" />
        )}
        <img
          src={item.src}
          alt={item.title}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
            group-hover:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: 'linear-gradient(to top, rgba(128,0,0,0.7) 0%, transparent 60%)' }}
        />

        {/* Zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/40 -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <ZoomIn size={22} className="text-white" />
          </div>
        </div>
      </div>


    </div>
  )
}

// ─── Main Gallery Section ─────────────────────────────────────────────────────
export default function Gallery() {
  const { lang } = useLang()
  const t = translations[lang].gallery
  const sectionRef = useRef(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Scroll-reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .gallery-card-anim').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length)
  const nextImage = () => setLightboxIndex((i) => (i + 1) % galleryItems.length)

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF3E0 60%, #FFF8F0 100%)' }}
    >
      {/* Background decorative text */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 text-saffron/5 text-[200px] font-playfair select-none">📸</div>
        <div className="absolute bottom-10 left-10 text-saffron/5 text-[150px] font-playfair select-none">🕉</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block font-poppins text-saffron font-medium text-sm tracking-widest uppercase mb-3">
            {t.tag}
          </span>
          <h2 className="section-heading">{t.heading}</h2>
          <div className="gold-line" />
          <p className="font-poppins text-gray-500 max-w-2xl mx-auto mt-4 text-sm md:text-base">
            {t.desc}
          </p>
        </div>

        {/* Gallery Grid */}
        {galleryItems.length === 0 ? (
          <div className="text-center py-20 reveal">
            <div className="text-6xl mb-4">🖼</div>
            <p className="font-poppins text-gray-400 text-base">{t.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} onOpen={openLightbox} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {galleryItems.length > 0 && (
          <div className="text-center mt-16 reveal">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-poppins text-sm font-medium
                text-maroon border border-saffron/30 bg-saffron/5 hover:bg-saffron/10 transition-colors duration-300"
            >
              <span className="text-lg">🕉</span>
              <span>{t.count.replace('{n}', galleryItems.length)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
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
