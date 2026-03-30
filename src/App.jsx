import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import BookingForm from './components/BookingForm'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <LanguageProvider>
      <div className="font-poppins">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Gallery />
          <BookingForm />
          <Location />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  )
}
