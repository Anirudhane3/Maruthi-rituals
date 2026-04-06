import { useEffect, useState } from 'react'
import { db } from '../firebase'
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore'
import { Star } from 'lucide-react'

export default function ReviewsDisplay() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [avgRating, setAvgRating] = useState(0)

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      orderBy('createdAt', 'desc'),
      limit(10)
    )

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setReviews(data)

      if (data.length > 0) {
        const avg = data.reduce((sum, r) => sum + (r.rating || 0), 0) / data.length
        setAvgRating(avg.toFixed(1))
      }

      setLoading(false)
    })

    return () => unsub()
  }, [])

  if (loading) return null

  if (reviews.length === 0) return null

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6">
      {/* Aggregate Rating */}
      <div className="flex flex-col items-center gap-1 mb-6">
        <div className="flex items-center gap-2">
          <span className="font-playfair text-3xl font-bold text-maroon">{avgRating}</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={18}
                className={`${parseFloat(avgRating) >= s ? 'fill-gold text-gold' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <p className="font-poppins text-gray-400 text-xs">
          Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Review Cards */}
      <div className="flex flex-wrap justify-center gap-3">
        {reviews.map((r, i) => (
          <div
            key={r.id}
            className="bg-white/60 backdrop-blur-sm border border-orange-100 rounded-2xl px-4 py-3 max-w-xs w-full shadow-sm"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={13}
                  className={`${r.rating >= s ? 'fill-gold text-gold' : 'text-gray-200'}`}
                />
              ))}
            </div>

            {/* Review text */}
            {r.review && (
              <p className="font-poppins text-gray-600 text-xs leading-relaxed mb-2 line-clamp-3">
                "{r.review}"
              </p>
            )}

            {/* Name & date */}
            <div className="flex items-center justify-between">
              <span className="font-poppins text-xs font-semibold text-maroon">
                {r.name || 'Anonymous'}
              </span>
              {r.createdAt && (
                <span className="text-gray-300 text-[10px]">
                  {new Date(r.createdAt.toDate()).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
