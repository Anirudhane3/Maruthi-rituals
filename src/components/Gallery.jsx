import { useEffect, useRef, useState, useCallback } from 'react'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import translations from '../translations'
import { X, ChevronLeft, ChevronRight, Images, ChevronDown, Upload, Trash2, Loader2 } from 'lucide-react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { db, auth } from '../firebase'
import { collection, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp, orderBy, query } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const CLOUDINARY_CLOUD = 'dvw39k3zb'
const CLOUDINARY_PRESET = 'ml_gallery'

const ADMIN_EMAIL = 'kingofpeacock125@gmail.com'.toLowerCase()

// ─── Static local images ──────────────────────────────────────────────────────
const imageModules = import.meta.glob(
  '../img/gallery/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)
const staticItems = Object.entries(imageModules).map(([path, mod], index) => ({
  id: `static-${index}`,
  src: mod.default,
  title: path.split('/').pop().replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
  isStatic: true,
}))

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ items, activeIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose, onPrev, onNext])

  const item = items[activeIndex]
  if (!item) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(26,13,13,0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <button onClick={onClose} aria-label="Close"
        style={{
          position: 'absolute', top: 20, right: 20,
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff',
        }}
      ><X size={20} /></button>

      {items.length > 1 && (
        <button aria-label="Previous"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
          }}
        ><ChevronLeft size={24} /></button>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 860, width: '100%', padding: '0 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
      >
        <img src={item.src} alt={item.title}
          style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: 16, boxShadow: '0 0 60px rgba(255,215,0,0.15)' }}
        />
        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
          {activeIndex + 1} / {items.length}
        </p>
      </div>

      {items.length > 1 && (
        <button aria-label="Next"
          onClick={(e) => { e.stopPropagation(); onNext() }}
          style={{
            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
          }}
        ><ChevronRight size={24} /></button>
      )}
    </div>
  )
}

// ─── All Photos Panel ─────────────────────────────────────────────────────────
function AllPhotosPanel({ items, onClose, onOpenLightbox, onDelete, isAdmin, theme }) {
  const isDark = theme === 'dark'
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        background: 'rgba(26,13,13,0.7)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeInOverlay 0.25s ease',
      }}
    >
      <style>{`
        @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
        @keyframes slideUpPanel  { from{transform:translateY(60px);opacity:0} to{transform:translateY(0);opacity:1} }
        .aph-thumb { transition: transform 0.22s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.22s; }
        .aph-thumb:hover { transform: translateY(-4px) scale(1.03) !important; }
        .aph-grid::-webkit-scrollbar { width:4px; }
        .aph-grid::-webkit-scrollbar-thumb { background:#e5c9a0; border-radius:4px; }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 580, maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          borderRadius: '24px 24px 0 0', overflow: 'hidden',
          background: isDark ? 'linear-gradient(180deg,#2a1212,#1a0d0d)' : 'linear-gradient(180deg,#fffbf5,#fff8ee)',
          boxShadow: '0 -16px 48px rgba(30,15,15,0.5)',
          border: isDark ? '1px solid rgba(255,215,0,0.15)' : '1px solid rgba(180,83,9,0.12)',
          animation: 'slideUpPanel 0.32s cubic-bezier(0.34,1.1,0.64,1)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px 14px',
          borderBottom: isDark ? '1px solid rgba(255,215,0,0.1)' : '1px solid rgba(180,83,9,0.12)',
          flexShrink: 0,
        }}>
          <div>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#b45309', marginBottom: 4 }}>
              Photo Gallery
            </p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: isDark ? '#fff' : '#1a1a2e', margin: 0 }}>
              {items.length} Photo{items.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(180,83,9,0.08)', border: '1px solid rgba(180,83,9,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#b45309',
            }}
          ><X size={16} /></button>
        </div>

        {/* Grid */}
        <div className="aph-grid" style={{ overflowY: 'auto', flex: 1, padding: 16, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {items.map((item) => (
            <div key={item.id} style={{ position: 'relative' }}>
              <div
                className="aph-thumb"
                onClick={() => onOpenLightbox(item.id)}
                style={{
                  borderRadius: 12, overflow: 'hidden',
                  border: '2px solid #fff',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.10)',
                  cursor: 'pointer', aspectRatio: '4/3',
                  background: '#f5ede0',
                }}
              >
                <LazyLoadImage
                  src={item.src} alt={item.title} effect="blur"
                  wrapperProps={{ style: { display: 'block', width: '100%', height: '100%' } }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              {/* Admin delete button */}
              {isAdmin && !item.isStatic && (
                <button
                  onClick={() => onDelete(item)}
                  aria-label="Delete photo"
                  style={{
                    position: 'absolute', top: 4, right: 4,
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'rgba(220,38,38,0.85)', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#fff', zIndex: 5,
                  }}
                ><Trash2 size={13} /></button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Fan Spread ───────────────────────────────────────────────────────────────
function FanSpread({ items, onOpen, theme }) {
  const isDark = theme === 'dark'
  const count  = Math.min(5, items.length)
  const step   = items.length <= 5 ? 1 : Math.floor(items.length / 5)
  const picked = Array.from({ length: count }, (_, i) => items[i * step])

  return (
    <div style={{ position: 'relative', width: '100%', height: 'clamp(180px,55vw,280px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {picked.map((item, i) => {
        const mid = Math.floor(count / 2)
        const rel = i - mid
        const rotate = rel * 9
        const txVw   = rel * 18
        const ty     = Math.abs(rel) * 6
        const zIndex = count - Math.abs(rel)
        const isCenter = rel === 0
        return (
          <div
            key={item.id}
            onClick={() => onOpen(item.id)}
            style={{
              position: 'absolute',
              width: isCenter ? '32%' : '27%',
              maxWidth: isCenter ? 200 : 170,
              height: isCenter ? '90%' : '78%',
              maxHeight: isCenter ? 245 : 215,
              minWidth: isCenter ? 80 : 64, minHeight: isCenter ? 100 : 84,
              borderRadius: 'clamp(12px,3vw,20px)', overflow: 'hidden',
              transform: `translateX(${txVw}vw) translateY(${ty}px) rotate(${rotate}deg)`,
              zIndex,
              boxShadow: isCenter
                ? (isDark ? '0 20px 60px rgba(0,0,0,0.8)' : '0 20px 60px rgba(0,0,0,0.28)')
                : (isDark ? '0 10px 32px rgba(0,0,0,0.6)' : '0 10px 32px rgba(0,0,0,0.20)'),
              cursor: 'pointer',
              transition: 'transform 0.28s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.28s',
              border: isDark ? '2px solid rgba(255,255,255,0.15)' : '2px solid #fff',
              background: isDark ? '#2a1b1b' : '#f5ede0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `translateX(${txVw}vw) translateY(${ty - 14}px) rotate(${rotate}deg) scale(1.06)`
              e.currentTarget.style.zIndex = 20
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `translateX(${txVw}vw) translateY(${ty}px) rotate(${rotate}deg) scale(1)`
              e.currentTarget.style.zIndex = zIndex
            }}
          >
            <LazyLoadImage
              src={item.src} alt={item.title} effect="blur"
              wrapperProps={{ style: { display: 'block', width: '100%', height: '100%' } }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
            />
          </div>
        )
      })}
    </div>
  )
}

// ─── Admin Bar ────────────────────────────────────────────────────────────────
function AdminBar({ isAdmin, onUpload, uploading, progress }) {
  const fileRef = useRef()
  if (!isAdmin) return null

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 10, marginBottom: 18, flexWrap: 'wrap',
    }}>
      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 11, color: '#b45309', fontWeight: 600 }}>
        ✓ Admin Mode
      </span>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => onUpload(Array.from(e.target.files))}
      />
      <button
        onClick={() => fileRef.current.click()}
        disabled={uploading}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'Poppins,sans-serif', fontSize: 11, fontWeight: 600,
          color: '#fff', background: '#b45309',
          border: 'none', borderRadius: 100,
          padding: '7px 16px', cursor: uploading ? 'not-allowed' : 'pointer',
          opacity: uploading ? 0.7 : 1,
          boxShadow: '0 2px 10px rgba(180,83,9,0.30)',
        }}
      >
        {uploading ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={13} />}
        {uploading ? `Uploading… ${progress}%` : 'Add Photos'}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ─── Main Gallery Section ─────────────────────────────────────────────────────
export default function Gallery() {
  const { lang }  = useLang()
  const { theme } = useTheme()
  const t         = translations[lang].gallery

  const [user,         setUser]         = useState(null)
  const [dbPhotos,     setDbPhotos]     = useState([])
  const [uploading,    setUploading]    = useState(false)
  const [progress,     setProgress]     = useState(0)
  const [lightboxIdx,  setLightboxIdx]  = useState(null)
  const [showPanel,    setShowPanel]    = useState(false)

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL

  // ── Auth listener
  useEffect(() => onAuthStateChanged(auth, setUser), [])

  // ── Firestore listener for uploaded photos
  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'))
    return onSnapshot(q, (snap) => {
      setDbPhotos(snap.docs.map((d) => ({ id: d.id, ...d.data(), isStatic: false })))
    })
  }, [])

  // ── Merge static + db photos
  const allItems = [...dbPhotos, ...staticItems]

  // ── Lightbox helpers (use index into allItems)
  const openLightbox  = useCallback((id) => setLightboxIdx(allItems.findIndex((g) => g.id === id)), [allItems])
  const closeLightbox = () => setLightboxIdx(null)
  const prevImage     = () => setLightboxIdx((i) => (i - 1 + allItems.length) % allItems.length)
  const nextImage     = () => setLightboxIdx((i) => (i + 1) % allItems.length)

  // ── Upload photos to Cloudinary + save URL in Firestore
  const handleUpload = async (files) => {
    if (!isAdmin || !files.length) return
    setUploading(true)
    let done = 0
    for (const file of files) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', CLOUDINARY_PRESET)
        formData.append('folder', 'gallery')

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
          { method: 'POST', body: formData }
        )
        const data = await res.json()
        if (!res.ok) throw new Error(data.error?.message || 'Upload failed')

        await addDoc(collection(db, 'gallery'), {
          src:       data.secure_url,
          publicId:  data.public_id,
          title:     file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          createdAt: serverTimestamp(),
        })

        done++
        setProgress(Math.round((done / files.length) * 100))
      } catch (err) {
        console.error('Upload error:', err)
        alert('Upload failed: ' + err.message)
      }
    }
    setUploading(false)
    setProgress(0)
  }

  // ── Delete photo — removes Firestore doc (Cloudinary asset stays but is no longer shown)
  const handleDelete = async (item) => {
    if (!isAdmin || item.isStatic) return
    if (!confirm(`Delete "${item.title}"?`)) return
    try {
      await deleteDoc(doc(db, 'gallery', item.id))
    } catch (err) {
      console.error(err)
      alert('Delete failed: ' + err.message)
    }
  }

  return (
    <section
      id="gallery"
      className="py-20 relative overflow-hidden bg-gradient-to-b from-[#fdf8f2] via-[#f9f1e7] to-[#fdf8f2] dark:from-divine-dark dark:via-incense-grey/50 dark:to-divine-dark transition-colors duration-500"
    >
      <div className="absolute bottom-4 right-5 text-[180px] opacity-[0.03] font-serif pointer-events-none select-none leading-none text-maroon">🕉</div>

      <div className="max-w-[900px] mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-10">
          <p className="font-poppins text-[11px] font-semibold tracking-[0.18em] uppercase text-maroon dark:text-diya-gold mb-1.5">
            {t.tag}
          </p>
          <h2 className="font-playfair text-[clamp(24px,5vw,34px)] font-bold text-[#1a1a2e] dark:text-white m-0 leading-[1.2]">
            {t.heading}
          </h2>
          <div className="w-12 h-[3px] rounded-sm bg-gradient-to-r from-[#b45309] to-[#f59e0b] mx-auto mt-3.5" />
          <p className="font-poppins text-[13px] text-[#78716c] dark:text-amber-100/60 mt-3 leading-[1.7]">
            {t.desc}
          </p>
        </div>

        {/* Admin bar */}
        <AdminBar
          isAdmin={isAdmin}
          onUpload={handleUpload}
          uploading={uploading}
          progress={progress}
        />

        {allItems.length === 0 ? (
          <div className="text-center py-16">
            <Images size={48} className="text-[#d1c9be] mx-auto mb-3 block" />
            <p className="font-poppins text-[#a8a29e] text-sm">{t.empty}</p>
          </div>
        ) : (
          <>
            <FanSpread items={allItems} onOpen={openLightbox} theme={theme} />

            <div className="text-center mt-9">
              <button
                onClick={() => setShowPanel(true)}
                className="inline-flex items-center gap-2 font-poppins text-xs font-semibold tracking-wider text-[#b45309] dark:text-diya-gold bg-transparent border border-[rgba(180,83,9,0.40)] rounded-full py-2.5 px-6 cursor-pointer transition-all hover:bg-[rgba(180,83,9,0.08)] hover:-translate-y-1"
              >
                <Images size={14} />
                View All {allItems.length} Photos
                <ChevronDown size={14} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* All Photos Panel */}
      {showPanel && (
        <AllPhotosPanel
          items={allItems}
          onClose={() => setShowPanel(false)}
          onOpenLightbox={(id) => { setShowPanel(false); openLightbox(id) }}
          onDelete={handleDelete}
          isAdmin={isAdmin}
          theme={theme}
        />
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          items={allItems}
          activeIndex={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  )
}
