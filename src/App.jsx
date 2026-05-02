import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
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
import { useState } from 'react'

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('hasSeenSplash')
  })

  const handleSplashFinish = () => {
    setIsLoading(false)
    sessionStorage.setItem('hasSeenSplash', 'true')
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        {isLoading && <SplashScreen onFinish={handleSplashFinish} />}
        <div className={`font-poppins bg-white dark:bg-divine-dark dark:text-gray-200 min-h-screen transition-colors duration-500 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
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
    </ThemeProvider>
  )
}
