import { useState, useRef, useEffect } from 'react'
import { User, Phone, Calendar, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import translations from '../translations'

// WhatsApp SVG icon (reusable)
const WAIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

/** Build the WhatsApp URL with all booking details embedded in the message */
function buildWhatsAppURL(form) {
  const dateFormatted = form.date
    ? new Date(form.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : form.date

  const message =
    `🙏 *Pooja Booking Request*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Name:* ${form.name}\n` +
    `📞 *Phone:* ${form.phone}\n` +
    `📅 *Date:* ${dateFormatted}\n` +
    `🪔 *Pooja / Event:* ${form.event}\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `Namaste Sri Mayurarajan, please confirm my booking. 🙏`

  return `https://wa.me/919342372557?text=${encodeURIComponent(message)}`
}

export default function BookingForm() {
  const { lang } = useLang()
  const t = translations[lang].booking
  const [form, setForm] = useState({ name: '', phone: '', date: '', event: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | success
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = t.errors.name
    if (!form.phone.trim()) {
      newErrors.phone = t.errors.phoneEmpty
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = t.errors.phoneInvalid
    }
    if (!form.date) newErrors.date = t.errors.date
    if (!form.event.trim()) newErrors.event = t.errors.event
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  /** On submit: validate → open WhatsApp with prefilled message → show success */
  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    // Open WhatsApp with all booking details
    const url = buildWhatsAppURL(form)
    window.open(url, '_blank', 'noopener,noreferrer')
    // Show success state & reset form
    setStatus('success')
    setForm({ name: '', phone: '', date: '', event: '' })
  }

  /** Quick WhatsApp button — opens with whatever the user has typed so far (or empty template) */
  const handleQuickWhatsApp = () => {
    const hasData = form.name || form.phone || form.date || form.event
    const url = hasData
      ? buildWhatsAppURL({
          name: form.name || '(not provided)',
          phone: form.phone || '(not provided)',
          date: form.date || '(not provided)',
          event: form.event || '(not provided)',
        })
      : `https://wa.me/919342372557?text=${encodeURIComponent('🙏 Namaste Sri Mayurarajan, I would like to book a pooja service. Please share details.')}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #3D0000 0%, #800000 40%, #B22222 70%, #CC5500 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-saffron/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-20 text-white/5 text-[180px] font-playfair select-none">ॐ</div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block font-poppins text-gold font-medium text-sm tracking-widest uppercase mb-3">
            {t.tag}
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">{t.heading}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-gold mx-auto rounded-full mb-4" />
          <p className="font-poppins text-white/70 text-sm">{t.desc}</p>
        </div>

        {/* Card */}
        <div className="reveal">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/20 shadow-2xl">

            {/* ── SUCCESS STATE ── */}
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className="font-playfair text-white text-2xl font-bold mb-3">{t.successTitle}</h3>
                <p className="font-poppins text-white/80 mb-2">{t.successMessage}</p>
                <p className="font-poppins text-green-300 text-sm mb-8">
                  ✅ {lang === 'en'
                    ? 'Your booking details have been sent to Sri Mayurarajan via WhatsApp.'
                    : 'உங்கள் பதிவு விவரங்கள் வாட்ஸ்அப் மூலம் ஸ்ரீ மயூரராஜனுக்கு அனுப்பப்பட்டன.'}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-saffron text-maroon font-poppins font-bold px-8 py-3 rounded-xl hover:bg-gold transition-colors duration-300"
                >
                  {t.anotherBtn}
                </button>
              </div>
            ) : (

              /* ── FORM ── */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">

                {/* Info banner */}
                <div className="flex items-start gap-3 bg-green-500/15 border border-green-400/30 rounded-2xl px-4 py-3">
                  <WAIcon className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <p className="font-poppins text-green-200 text-xs leading-relaxed">
                    {lang === 'en'
                      ? 'After filling this form, clicking "Book Pooja Now" will open WhatsApp with all your details pre-filled and send them directly to Sri Mayurarajan.'
                      : '"பூஜை பதிவு செய்க" என்பதை கிளிக் செய்தால் உங்கள் அனைத்து விவரங்களும் வாட்ஸ்அப்பில் ஸ்ரீ மயூரராஜனுக்கு அனுப்பப்படும்.'}
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block font-poppins text-white/90 text-sm font-medium mb-2">
                    <User size={14} className="inline mr-1" /> {t.nameLabel} *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    className={`form-input ${errors.name ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 flex items-center gap-1 text-red-300 text-xs font-poppins">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-poppins text-white/90 text-sm font-medium mb-2">
                    <Phone size={14} className="inline mr-1" /> {t.phoneLabel} *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t.phonePlaceholder}
                    className={`form-input ${errors.phone ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                    autoComplete="tel"
                    maxLength={10}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 flex items-center gap-1 text-red-300 text-xs font-poppins">
                      <AlertCircle size={12} /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block font-poppins text-white/90 text-sm font-medium mb-2">
                    <Calendar size={14} className="inline mr-1" /> {t.dateLabel} *
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={today}
                    className={`form-input ${errors.date ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                  />
                  {errors.date && (
                    <p className="mt-1.5 flex items-center gap-1 text-red-300 text-xs font-poppins">
                      <AlertCircle size={12} /> {errors.date}
                    </p>
                  )}
                </div>

                {/* Event Details */}
                <div>
                  <label className="block font-poppins text-white/90 text-sm font-medium mb-2">
                    <FileText size={14} className="inline mr-1" /> {t.eventLabel} *
                  </label>
                  <textarea
                    id="booking-event"
                    name="event"
                    value={form.event}
                    onChange={handleChange}
                    placeholder={t.eventPlaceholder}
                    rows={4}
                    className={`form-input resize-none ${errors.event ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                  />
                  {errors.event && (
                    <p className="mt-1.5 flex items-center gap-1 text-red-300 text-xs font-poppins">
                      <AlertCircle size={12} /> {errors.event}
                    </p>
                  )}
                </div>

                {/* ── MAIN SUBMIT BUTTON → sends to WhatsApp ── */}
                <button
                  id="booking-submit-btn"
                  type="submit"
                  className="w-full flex items-center justify-center gap-3
                    bg-gradient-to-r from-maroon via-red-700 to-saffron
                    text-white font-poppins font-bold text-base py-4 rounded-2xl
                    shadow-lg hover:shadow-2xl hover:-translate-y-0.5 hover:scale-[1.02]
                    transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
                >
                  <WAIcon className="w-5 h-5" />
                  {t.submitBtn}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 text-white/30">
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="font-poppins text-xs">
                    {lang === 'en' ? 'or' : 'அல்லது'}
                  </span>
                  <div className="flex-1 h-px bg-white/20" />
                </div>

                {/* ── QUICK WHATSAPP BUTTON (no validation needed) ── */}
                <button
                  id="booking-whatsapp-btn"
                  type="button"
                  onClick={handleQuickWhatsApp}
                  className="w-full flex items-center justify-center gap-3
                    bg-green-500 hover:bg-green-400 text-white font-poppins font-semibold
                    py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <WAIcon className="w-5 h-5" />
                  {t.whatsappBtn}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
