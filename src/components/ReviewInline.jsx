import { useState } from 'react'
import { Star, Send } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function ReviewInline() {
  const { lang } = useLang()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) {
      alert(lang === 'en' ? 'Please select a rating' : 'தயவுசெய்து மதிப்பிடவும்')
      return
    }

    const text = `Namaste Sri Mayurarajan,\n\nI would like to share my feedback:\nRating: ${rating} Star${rating > 1 ? 's' : ''}\n${review.trim() ? `Review: ${review}` : ''}`
    const whatsappUrl = `https://wa.me/919342372557?text=${encodeURIComponent(text)}`
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8 text-center reveal visible z-10 relative">
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
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 z-10 relative">
      <div className="flex flex-col items-center justify-center text-center">
        
        {/* Subtle heading without massive section styling */}
        <h4 className="font-playfair text-maroon text-xl font-bold mb-3">
          {lang === 'en' ? 'Share Your Experience' : 'உங்கள் அனுபவத்தை பகிரவும்'}
        </h4>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-3">
          
          {/* Star Rating Inline */}
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

          <div className="relative w-full max-w-md mt-2 group">
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder={lang === 'en' ? 'Write a brief review...' : 'விமர்சனம் எழுதவும்...'}
                rows={1}
                className="w-full bg-transparent border-b-2 border-orange-200 py-2 px-1 pr-8 font-poppins text-gray-700 placeholder-gray-400 focus:outline-none focus:border-saffron resize-none overflow-hidden transition-colors text-center"
                style={{ minHeight: '40px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = (e.target.scrollHeight) + 'px';
                }}
              />
              <button
                type="submit"
                className="absolute right-0 bottom-2 text-orange-300 hover:text-saffron transition-colors cursor-pointer"
                title={lang === 'en' ? 'Submit Review' : 'சமர்ப்பிக்க'}
              >
                <Send size={18} />
              </button>
          </div>

        </form>
      </div>
    </div>
  )
}
