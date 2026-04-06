import { useState } from 'react'
import { Star, Send } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import ReviewsDisplay from './ReviewsDisplay'

export default function ReviewInline() {
  const { lang } = useLang()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0) {
      alert(lang === 'en' ? 'Please select a rating' : 'தயவுசெய்து மதிப்பிடவும்')
      return
    }

    setSaving(true)
    try {
      // Save to Firestore
      await addDoc(collection(db, 'reviews'), {
        name: name.trim() || 'Anonymous',
        rating,
        review: review.trim(),
        lang,
        createdAt: serverTimestamp(),
      })
    } catch (err) {
      console.error('Failed to save review:', err)
    } finally {
      setSaving(false)
    }

    // Also send to WhatsApp
    const text = `Namaste Sri Mayurarajan,\n\nI would like to share my feedback:\nName: ${name.trim() || 'Anonymous'}\nRating: ${rating} Star${rating > 1 ? 's' : ''}\n${review.trim() ? `Review: ${review}` : ''}`
    const whatsappUrl = `https://wa.me/919342372557?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    setSubmitted(true)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 z-10 relative">

      {/* Live reviews from other users */}
      <ReviewsDisplay />

      {/* Divider */}
      <div className="flex items-center gap-3 max-w-sm mx-auto mb-6">
        <div className="flex-1 h-px bg-orange-100" />
        <span className="font-poppins text-orange-300 text-xs tracking-widest uppercase">
          {lang === 'en' ? 'Your Experience' : 'உங்கள் அனுபவம்'}
        </span>
        <div className="flex-1 h-px bg-orange-100" />
      </div>

      {submitted ? (
        <div className="text-center py-6">
          <div className="flex justify-center mb-3">
            <Star className="fill-saffron text-saffron" size={28} />
          </div>
          <h4 className="font-playfair text-maroon text-2xl font-bold mb-2">
            {lang === 'en' ? 'Thank You for Your Feedback' : 'உங்கள் நல்வாழ்த்துக்களுக்கு நன்றி'}
          </h4>
          <p className="font-poppins text-gray-500 text-sm">
            {lang === 'en' ? 'Your review helps us serve devotees better.' : 'உங்கள் மதிப்புரை பக்தர்களுக்கு சிறப்பாக சேவை செய்ய உதவுகிறது.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <h4 className="font-playfair text-maroon text-xl font-bold mb-3">
            {lang === 'en' ? 'Share Your Experience' : 'உங்கள் அனுபவத்தை பகிரவும்'}
          </h4>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-3">

            {/* Star Rating */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={24}
                    className={`transition-colors duration-200 ${(hoveredRating || rating) >= star ? 'fill-gold text-gold' : 'text-gray-300'}`}
                  />
                </button>
              ))}
            </div>

            {/* Name field */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'en' ? 'Your name (optional)' : 'உங்கள் பெயர் (விருப்பத்தேர்வு)'}
              className="w-full max-w-md bg-transparent border-b-2 border-orange-200 py-2 px-1 font-poppins text-gray-700 placeholder-gray-400 focus:outline-none focus:border-saffron transition-colors text-center text-sm"
            />

            {/* Review textarea */}
            <div className="relative w-full max-w-md group">
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder={lang === 'en' ? 'Write a brief review...' : 'விமர்சனம் எழுதவும்...'}
                rows={1}
                className="w-full bg-transparent border-b-2 border-orange-200 py-2 px-1 pr-8 font-poppins text-gray-700 placeholder-gray-400 focus:outline-none focus:border-saffron resize-none overflow-hidden transition-colors text-center"
                style={{ minHeight: '40px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto'
                  e.target.style.height = (e.target.scrollHeight) + 'px'
                }}
              />
              <button
                type="submit"
                disabled={saving}
                className="absolute right-0 bottom-2 text-orange-300 hover:text-saffron transition-colors cursor-pointer disabled:opacity-50"
                title={lang === 'en' ? 'Submit Review' : 'சமர்ப்பிக்க'}
              >
                <Send size={18} />
              </button>
            </div>

          </form>
        </div>
      )}
    </div>
  )
}
