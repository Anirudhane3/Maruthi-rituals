import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DeityMandala from './DeityMandala'

export default function SplashScreen({ onFinish }) {
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Start fade out after 2.8 seconds to allow animations to play
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 2800)

    // Complete loading after fade out (add 800ms for transition)
    const finishTimer = setTimeout(() => {
      onFinish()
    }, 3600)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(finishTimer)
    }
  }, [onFinish])

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #3D0000 0%, #800000 30%, #B22222 55%, #CC5500 80%, #FF9933 100%)',
      }}
    >
      {/* Animated Background Circles matching Hero style */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1.5 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute w-96 h-96 rounded-full bg-gold/10 blur-3xl top-10 -left-20 animate-pulse" />
        <div className="absolute w-80 h-80 rounded-full bg-saffron/15 blur-3xl bottom-20 -right-10 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute w-64 h-64 rounded-full bg-white/5 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
      </motion.div>
      
      {/* Decorative border */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
        className="absolute inset-4 md:inset-8 rounded-3xl border border-gold/20 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 80px rgba(255,215,0,0.05)' }}
      />
      
      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.1, y: 50 }}
        animate={{ opacity: 1, scale: 0.65, y: 0 }}
        transition={{ 
          delay: 0.7, 
          type: "spring", 
          stiffness: 110, 
          damping: 20 
        }}
        className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        <DeityMandala variant="om" />
      </motion.div>
    </motion.div>
  )
}
