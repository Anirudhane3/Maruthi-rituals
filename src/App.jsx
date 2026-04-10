import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import PreBookBanner from './components/PreBookBanner'
import Services from './components/Services'
import Gallery from './components/Gallery'
import BookingForm from './components/BookingForm'
import Location from './components/Location'
import ReviewInline from './components/ReviewInline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import SplashScreen from './components/SplashScreen'
import { useState, useEffect } from 'react'

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('hasSeenSplash')
  })

  const handleSplashFinish = () => {
    setIsLoading(false)
    sessionStorage.setItem('hasSeenSplash', 'true')
  }

  return (
    <LanguageProvider>
      {isLoading && <SplashScreen onFinish={handleSplashFinish} />}
      <div className={`font-poppins ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <PreBookBanner />
          <Services />
          <Gallery />
          <BookingForm />
          <Location />
          <ReviewInline />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  )
}
