import { useEffect, useState, useRef, useCallback } from 'react'
import { db } from '../firebase'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { Star, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X } from 'lucide-react'

/* ─── helpers ─────────────────────────────────────────────── */
function Stars({ rating, size = 13 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          style={{
            fill: rating >= s ? '#f5c842' : 'transparent',
            color: rating >= s ? '#f5c842' : '#444',
          }}
        />
      ))}
    </div>
  )
}

function initials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function Avatar({ name, size = 36 }) {
  const colors = [
    ['#7c3aed', '#a78bfa'],
    ['#b45309', '#fcd34d'],
    ['#0e7490', '#67e8f9'],
    ['#be185d', '#f9a8d4'],
    ['#1d4ed8', '#93c5fd'],
  ]
  const idx = (name || '').charCodeAt(0) % colors.length
  const [bg, fg] = colors[idx]

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: size * 0.36,
        fontWeight: 700,
        color: fg,
        letterSpacing: 0.5,
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {initials(name) || '?'}
    </div>
  )
}

function formatDate(ts) {
  if (!ts) return ''
  return new Date(ts.toDate()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/* ─── card geometry ───────────────────────────────────────── */
function getCardStyle(offset) {
  const abs = Math.abs(offset)
  if (abs > 1) return { display: 'none' }

  const isCenter = offset === 0
  const sign = offset < 0 ? -1 : 1

  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: isCenter ? '62%' : '47%',
    minHeight: isCenter ? 220 : 190,
    borderRadius: 20,
    background: isCenter
      ? 'linear-gradient(160deg,#fffbf5 0%,#fff8ee 100%)'
      : 'linear-gradient(160deg,#fdf6ec 0%,#faf0e2 100%)',
    border: isCenter
      ? '1px solid rgba(180,83,9,0.18)'
      : '1px solid rgba(180,83,9,0.10)',
    boxShadow: isCenter
      ? '0 16px 48px rgba(180,83,9,0.12), 0 2px 8px rgba(0,0,0,0.06)'
      : '0 4px 16px rgba(0,0,0,0.07)',
    transform: isCenter
      ? 'translate(-50%,-50%) scale(1)'
      : `translate(calc(-50% + ${sign * 56}%), -50%) scale(0.82)`,
    opacity: isCenter ? 1 : 0.6,
    zIndex: isCenter ? 10 : 5,
    transition: 'all 0.45s cubic-bezier(0.34,1.1,0.64,1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: isCenter ? '20px 20px 16px' : '16px 14px 12px',
    cursor: isCenter ? 'default' : 'pointer',
    userSelect: 'none',
    willChange: 'transform, opacity',
  }
}

/* ─── All-reviews expanded panel ──────────────────────────── */
function AllReviewsPanel({ reviews, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        background: 'rgba(60,30,0,0.40)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        animation: 'fadeInOverlay 0.25s ease',
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeInOverlay { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUpPanel  { from { transform: translateY(60px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .all-review-card:hover { background: #fff5e8 !important; border-color: rgba(180,83,9,0.30) !important; }
        .all-reviews-list::-webkit-scrollbar { width: 4px; }
        .all-reviews-list::-webkit-scrollbar-track { background: transparent; }
        .all-reviews-list::-webkit-scrollbar-thumb { background: #e5c9a0; border-radius: 4px; }
      `}</style>

      <div
        style={{
          width: '100%',
          maxWidth: 540,
          maxHeight: '88vh',
          background: 'linear-gradient(180deg,#fffbf5 0%,#fff8ee 100%)',
          borderRadius: '24px 24px 0 0',
          border: '1px solid rgba(180,83,9,0.15)',
          boxShadow: '0 -16px 48px rgba(180,83,9,0.12), 0 -4px 16px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUpPanel 0.3s cubic-bezier(0.34,1.1,0.64,1)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 20px 14px',
            borderBottom: '1px solid rgba(180,83,9,0.12)',
            flexShrink: 0,
          }}
        >
          <div>
            <p style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#b45309' }}>
              All Testimonials
            </p>
            <h3 style={{ margin: '4px 0 0', fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#1a1a2e' }}>
              {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close reviews"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(180,83,9,0.08)',
              border: '1px solid rgba(180,83,9,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#b45309',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable list */}
        <div
          className="all-reviews-list"
          style={{
            overflowY: 'auto',
            flex: 1,
            padding: '16px 16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {reviews.map((r) => (
            <div
              key={r.id}
              className="all-review-card"
              style={{
                background: '#fffbf5',
                border: '1px solid rgba(180,83,9,0.12)',
                borderRadius: 16,
                padding: '14px 16px',
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              {/* top row: avatar + name + date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Avatar name={r.name || 'Anonymous'} size={38} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>
                    {r.name || 'Anonymous'}
                  </p>
                  <p style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontSize: 10, color: '#92400e' }}>
                    Verified Client · {formatDate(r.createdAt)}
                  </p>
                </div>
                <Stars rating={r.rating || 5} size={11} />
              </div>

              {/* service pill */}
              {r.service && (
                <span style={{
                  display: 'inline-block', marginBottom: 8,
                  background: 'rgba(180,83,9,0.10)', border: '1px solid rgba(180,83,9,0.22)',
                  borderRadius: 100, padding: '2px 9px',
                  fontFamily: 'Poppins, sans-serif', fontSize: 9, color: '#92400e', fontWeight: 600,
                }}>
                  {r.service}
                </span>
              )}

              {/* review text */}
              {r.review && (
                <p style={{
                  margin: 0, fontFamily: 'Poppins, sans-serif', fontSize: 12,
                  color: '#57534e', lineHeight: 1.65,
                }}>
                  {r.review}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── main component ──────────────────────────────────────── */
export default function ReviewsDisplay() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [avgRating, setAvgRating] = useState(0)
  const [active, setActive] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const touchStartX = useRef(null)

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(50))
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setReviews(data)
      if (data.length > 0) {
        const avg = data.reduce((s, r) => s + (r.rating || 0), 0) / data.length
        setAvgRating(avg.toFixed(1))
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  // Only latest 5 for the carousel
  const carouselReviews = reviews.slice(0, 5)
  const hasMore = reviews.length > 5

  const prev = useCallback(
    () => setActive((a) => (a - 1 + carouselReviews.length) % carouselReviews.length),
    [carouselReviews.length]
  )
  const next = useCallback(
    () => setActive((a) => (a + 1) % carouselReviews.length),
    [carouselReviews.length]
  )

  // Reset active index if carouselReviews shrinks
  useEffect(() => {
    if (carouselReviews.length > 0 && active >= carouselReviews.length) {
      setActive(0)
    }
  }, [carouselReviews.length, active])

  // touch / swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
    touchStartX.current = null
  }

  if (loading || reviews.length === 0) return null

  const total = carouselReviews.length

  function offset(i) {
    let d = i - active
    if (d > total / 2) d -= total
    if (d < -total / 2) d += total
    return d
  }

  /* ─── render ────────────────────────────────────────────── */
  return (
    <>
      {showAll && (
        <AllReviewsPanel reviews={reviews} onClose={() => setShowAll(false)} />
      )}

      <section
        style={{
          width: '100%',
          padding: '40px 0 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          background: 'transparent',
        }}
      >
        {/* ── Section heading ─────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 32, padding: '0 16px' }}>
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#b45309',
              marginBottom: 6,
            }}
          >
            Testimonials
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(22px, 5vw, 30px)',
              fontWeight: 700,
              color: '#1a1a2e',
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            What Our Clients Say
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              marginTop: 8,
            }}
          >
            <Stars rating={Math.round(parseFloat(avgRating))} size={14} />
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 12,
                color: '#6b7280',
              }}
            >
              {avgRating} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* ── Carousel track ──────────────────────────────── */}
        <div
          style={{
            width: '100%',
            maxWidth: 480,
            position: 'relative',
            height: 280,
            overflow: 'visible',
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {carouselReviews.map((r, i) => {
            const off = offset(i)
            const style = getCardStyle(off)
            if (style.display === 'none') return null

            const isCenter = off === 0

            return (
              <div
                key={r.id}
                style={style}
                onClick={() => !isCenter && setActive(i)}
              >
                {/* pill badge */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span
                    style={{
                      background: 'rgba(180,83,9,0.07)',
                      border: '1px solid rgba(180,83,9,0.15)',
                      borderRadius: 100,
                      padding: '3px 10px',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 10,
                      color: '#92400e',
                      fontWeight: 500,
                      letterSpacing: '0.03em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.createdAt
                      ? new Date(r.createdAt.toDate()).toLocaleDateString('en-IN', {
                        month: 'short',
                        year: 'numeric',
                      })
                      : 'Verified Client'}
                  </span>
                  {r.service && (
                    <span
                      style={{
                        background: 'rgba(180,83,9,0.12)',
                        border: '1px solid rgba(180,83,9,0.25)',
                        borderRadius: 100,
                        padding: '3px 10px',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 10,
                        color: '#92400e',
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {r.service}
                    </span>
                  )}
                </div>

                {/* stars */}
                <div style={{ marginBottom: 8 }}>
                  <Stars rating={r.rating || 5} size={isCenter ? 13 : 11} />
                </div>

                {/* title / excerpt */}
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isCenter ? 15 : 13,
                    fontWeight: 700,
                    color: '#1a1a2e',
                    lineHeight: 1.35,
                    margin: '0 0 6px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {r.review
                    ? `"${r.review.slice(0, 60)}${r.review.length > 60 ? '…' : ''}"`
                    : '"Wonderful experience."'}
                </p>

                {/* full text (center only) */}
                {isCenter && r.review && r.review.length > 0 && (
                  <p
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 11,
                      color: '#57534e',
                      lineHeight: 1.6,
                      margin: '0 0 12px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {r.review}
                  </p>
                )}

                {/* spacer */}
                <div style={{ flex: 1 }} />

                {/* avatar + name row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    paddingTop: 10,
                    borderTop: '1px solid rgba(180,83,9,0.12)',
                  }}
                >
                  <Avatar name={r.name || 'Anonymous'} />
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#1a1a2e',
                        lineHeight: 1.2,
                      }}
                    >
                      {r.name || 'Anonymous'}
                    </p>
                    {isCenter && (
                      <p
                        style={{
                          margin: 0,
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: 10,
                          color: '#92400e',
                          lineHeight: 1.3,
                        }}
                      >
                        Verified Client
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Controls ────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginTop: 24,
            width: '100%',
            maxWidth: 480,
            justifyContent: 'space-between',
            padding: '0 24px',
          }}
        >
          {/* left arrow */}
          <button
            onClick={prev}
            aria-label="Previous review"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#fff8ee',
              border: '1px solid rgba(180,83,9,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#b45309',
              boxShadow: '0 4px 12px rgba(180,83,9,0.10)',
              transition: 'transform 0.15s, background 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fde9c8' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fff8ee' }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* dot + count */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            {/* dots */}
            <div style={{ display: 'flex', gap: 5 }}>
              {carouselReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to review ${i + 1}`}
                  style={{
                    width: i === active ? 20 : 6,
                    height: 6,
                    borderRadius: 100,
                    background: i === active ? '#b45309' : '#e5c9a0',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 0.3s, background 0.3s',
                  }}
                />
              ))}
            </div>
            {/* count */}
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 11,
                color: '#92400e',
              }}
            >
              {String(active + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* right arrow */}
          <button
            onClick={next}
            aria-label="Next review"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#fff8ee',
              border: '1px solid rgba(180,83,9,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#b45309',
              boxShadow: '0 4px 12px rgba(180,83,9,0.10)',
              transition: 'transform 0.15s, background 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fde9c8' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fff8ee' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ── View More Reviews button ─────────────────────── */}
        {hasMore && (
          <button
            onClick={() => setShowAll(true)}
            style={{
              marginTop: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'transparent',
              border: '1px solid rgba(180,83,9,0.40)',
              borderRadius: 100,
              padding: '8px 20px',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              color: '#b45309',
              letterSpacing: '0.04em',
              transition: 'background 0.2s, border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(180,83,9,0.10)'
              e.currentTarget.style.borderColor = 'rgba(180,83,9,0.70)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(180,83,9,0.40)'
            }}
          >
            View More Reviews
            <ChevronDown size={14} />
          </button>
        )}
      </section>
    </>
  )
}

