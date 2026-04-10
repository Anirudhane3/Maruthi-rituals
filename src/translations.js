const translations = {
  en: {
    // Navbar
    nav: {
      about: 'About',
      services: 'Services',
      gallery: 'Gallery',
      booking: 'Booking',
      location: 'Location',
      contact: 'Contact',
      bookBtn: '🕉 Book Pooja',
      langBtn: 'தமிழ்',
    },

    // Gallery
    gallery: {
      tag: '📸 Sacred Moments',
      heading: 'Our Gallery',
      desc: 'Glimpses of auspicious rituals, sacred ceremonies, and divine blessings performed with devotion and authenticity.',
      empty: 'No images found. Add images to the img folder.',
      count: 'Showcasing {n} sacred moments',
    },

    // Hero
    hero: {
      badge: 'Authentic Vedic Rituals Since Tirupur Vidhya Peeta',
      title1: 'MARUTHI',
      title2: 'PROHITHAM',
      subtitle: '🕉 Sri Mayurarajan — Professional Vedic Priest',
      desc: 'Poojas • Homas • Marriage Rituals • All Auspicious Events',
      bookBtn: '🪔 Book Pooja Now',
      learnMore: 'Learn More →',
      stats: [
        { value: '500+', label: 'Poojas Performed' },
        { value: '5+', label: 'Years Experience' },
        { value: '100%', label: 'Vedic Authenticity' },
      ],
      scroll: 'Scroll',
    },

    // About
    about: {
      tag: '🙏 Who We Are',
      heading: 'About Sri Mayurarajan',
      role: 'Professional Vedic Priest',
      subtitle: 'Serving with Devotion & Authenticity',
      para1:
        'My name is Sri Mayurarajan, a professional Prohith who has completed Vedic studies at Tirupur Vidhya Peeta. With deep knowledge and unwavering dedication, I perform all types of poojas, homas, and auspicious rituals with authenticity.',
      para1Bold1: 'Sri Mayurarajan',
      para1Bold2: 'Tirupur Vidhya Peeta',
      para2:
        'Every ritual is conducted strictly in accordance with Vedic traditions, featuring the sacred singing of Nama Sankirtanam (devotional chanting) in the style of Bhajans — organized with great excellence and magnificence.',
      para2Bold: 'Vedic traditions',
      para2Bold2: 'Nama Sankirtanam',
      highlights: [
        'Vedic Studies from Tirupur Vidhya Peeta',
        'Expert in all types of Poojas & Homas',
        '100% Authentic Vedic Traditions',
      ],
      badge1: 'Certified Prohith',
      badge2: 'Tirupur Vidhya Peeta',
      priestLabel: 'Sri Mayurarajan',
      priestSub: 'Professional Vedic Priest',
      bookBtn: '📅 Book a Ritual',
    },

    // Services
    services: {
      tag: '🔥 Sacred Rituals',
      heading: 'Our Vedic Services',
      desc: 'We perform all auspicious rituals with strict adherence to Vedic scriptures, featuring devotional chanting and sacred fire ceremonies.',
      items: [
        { name: 'Sri Maha Ganapathi Homam', desc: 'Remove obstacles and seek blessings of Lord Ganesha for new beginnings.' },
        { name: 'Sri Maha Lakshmi Homam', desc: 'Invoke the goddess of wealth for prosperity, abundance and good fortune.' },
        { name: 'Sri Sudharshana Chakra Homam', desc: "Seek divine protection and the blessings of Lord Vishnu's sacred Sudarshana." },
        { name: 'Sri Mruthunjaya Homam', desc: 'Invoke Lord Shiva for good health, longevity and victory over illness.' },
        { name: 'Sri Navagraha Homam', desc: 'Appease the nine planetary deities for harmony and positive cosmic energy.' },
        { name: 'Sri Bhoomi Pooja', desc: 'Sacred ground-breaking ceremony for construction of homes and buildings.' },
        { name: 'Ruthu Shanthi', desc: 'Auspicious coming-of-age ceremony performed with full Vedic traditions.' },
        { name: 'Sudhi Punyahavachanam', desc: 'Purification ceremony to cleanse and sanctify individuals and spaces.' },
        { name: 'Aayushya Homam', desc: 'Fire ritual to bless individuals with long life, health and well-being.' },
        { name: 'Graha Pravesham', desc: 'Sacred housewarming ceremony to purify and bless a new home.' },
        { name: 'Namakaranam', desc: 'Traditional Hindu naming ceremony blessing the newborn with divine grace.' },
        { name: 'Sarva Devatha Pooja', desc: 'Comprehensive pooja seeking the blessings of all deities for overall well-being.' },
      ],
      specialTitle: 'Sarva Shanthi Homam & Custom Rituals',
      specialPara1:
        'If you are commencing any auspicious undertaking at home — whether to ensure its success, to ensure proceedings unfold without obstacles, or to ward off all afflictions such as the evil eye — we can perform',
      specialBold: 'Homams tailored specifically to your needs.',
      specialPara2:
        'All such events will be organized with great excellence, featuring',
      specialBold2: 'Nama Sankirtanam',
      specialPara2b: '(devotional chanting) in the style of Bhajans — conducted in a truly magnificent manner, strictly in accordance with Vedic traditions.',
      bookBtn: 'Book Now →',
    },

    // Booking
    booking: {
      tag: '📅 Schedule a Ritual',
      heading: 'Book a Pooja',
      desc: 'Fill in the details below and Sri Mayurarajan will contact you to confirm your booking.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '10-digit mobile number',
      dateLabel: 'Preferred Date',
      eventLabel: 'Event / Pooja Details',
      eventPlaceholder: 'Describe the pooja or ritual you need (e.g., Graha Pravesham, Navagraha Homam, etc.)',
      submitBtn: '🪔 Book Pooja Now',
      submitting: 'Submitting...',
      successTitle: 'Booking Received! 🙏',
      successMessage: 'Thank you, your booking request has been submitted successfully. Sri Mayurarajan will contact you shortly to confirm.',
      anotherBtn: 'Book Another Pooja',
      whatsappBtn: 'Quick Book via WhatsApp',
      errors: {
        name: 'Please enter your full name.',
        phoneEmpty: 'Please enter your phone number.',
        phoneInvalid: 'Enter a valid 10-digit Indian mobile number.',
        date: 'Please select a date for the ritual.',
        event: 'Please describe the event or pooja you need.',
      },
    },

    // Location
    location: {
      tag: '📍 Find Us',
      heading: 'Our Location',
      cardTitle: 'Our Address',
      cardSub: 'Visit us for all ritual services',
      address: ['No. 10, Vishnu Nagar,', 'Iyyanar Kovil Street,', 'Karuvadikuppam,', 'Pondicherry — 605008'],
      directionsBtn: 'Get Directions on Google Maps',
      hours: { emoji: '🕐', title: 'Available Hours', detail: '6:00 AM – 9:00 PM' },
      days: { emoji: '📆', title: 'Days Available', detail: 'All Days (incl. Holidays)' },
    },

    // Contact
    contact: {
      tag: '📞 Reach Out',
      heading: 'Contact Us',
      desc: "Ready to book a ritual or have questions? Get in touch — we're available every day.",
      items: [
        { label: 'Phone', value: '9342372557', detail: 'Call us anytime between 6 AM – 9 PM' },
        { label: 'Email', value: 'kingofpeacock125@gmail.com', detail: 'Send us your queries anytime' },
        { label: 'WhatsApp', value: '+91 9342372557', detail: 'Message us on WhatsApp for quick reply' },
      ],
      whatsappBtn: 'Chat with Us on WhatsApp',
    },

    // Footer
    footer: {
      tagline: 'Professional Vedic priest services with authentic rituals, devotional chanting, and strict adherence to ancient Vedic traditions.',
      whatsappBtn: 'WhatsApp Us',
      quickLinks: 'Quick Links',
      ourServices: 'Our Services',
      contactInfo: 'Contact Info',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      copyright: `© ${new Date().getFullYear()} Maruthi Prohitham. All rights reserved. | Sri Mayurarajan – Professional Prohith`,
      motto: 'Serving with Devotion & Authenticity',
      links: ['About', 'Services', 'Book a Pooja', 'Location', 'Contact'],
      serviceList: ['Maha Ganapathi Homam', 'Maha Lakshmi Homam', 'Navagraha Homam', 'Graha Pravesham', 'Namakaranam', 'Sarva Shanthi Homam'],
      addressLines: ['No. 10, Vishnu Nagar,', 'Iyyanar Kovil Street,', 'Karuvadikuppam,', 'Pondicherry — 605008'],
    },
  },

  ta: {
    // Navbar
    nav: {
      about: 'எங்களை பற்றி',
      services: 'சேவைகள்',
      gallery: 'படக்கொத்து',
      booking: 'முன்பதிவு',
      location: 'இடம்',
      contact: 'தொடர்பு',
      bookBtn: '🕉 பூஜை பதிவு',
      langBtn: 'English',
    },

    // Gallery
    gallery: {
      tag: '📸 புனித தருணங்கள்',
      heading: 'எங்கள் படக்கொத்து',
      desc: 'அர்ப்பணிப்பு மற்றும் நம்பகத்தன்மையுடன் நடத்தப்பட்ட மங்கல பூஜைகள், புனித நிகழ்வுகள் மற்றும் தெய்வீக ஆசிகளின் தோற்றங்கள்.',
      empty: 'படங்கள் கிடைக்கவில்லை. img கோப்புறையில் படங்களை சேர்க்கவும்.',
      count: '{n} புனித தருணங்கள் காட்சிப்படுத்தப்படுகின்றன',
    },

    // Hero
    hero: {
      badge: 'திருப்பூர் வித்யா பீடத்தில் கற்ற அசல் வேத சடங்குகள்',
      title1: 'மாருதி',
      title2: 'புரோஹிதம்',
      subtitle: '🕉 ஸ்ரீ மயூரராஜன் — தொழில்முறை வேத புரோஹிதர்',
      desc: 'பூஜைகள் • ஹோமங்கள் • திருமண சடங்குகள் • அனைத்து மங்கலகரமான நிகழ்வுகள்',
      bookBtn: '🪔 இப்போதே பூஜை பதிவு செய்க',
      learnMore: 'மேலும் அறிக →',
      stats: [
        { value: '500+', label: 'நடத்திய பூஜைகள்' },
        { value: '5+', label: 'ஆண்டுகள் அனுபவம்' },
        { value: '100%', label: 'வேத நம்பகத்தன்மை' },
      ],
      scroll: 'கீழே தள்ளு',
    },

    // About
    about: {
      tag: '🙏 நாங்கள் யார்',
      heading: 'ஸ்ரீ மயூரராஜன் பற்றி',
      role: 'தொழில்முறை வேத புரோஹிதர்',
      subtitle: 'அர்ப்பணிப்பு மற்றும் நம்பகத்தன்மையுடன் சேவை',
      para1:
        'என் பெயர் ஸ்ரீ மயூரராஜன், திருப்பூர் வித்யா பீடத்தில் வேத கல்வி கற்ற ஒரு தொழில்முறை புரோஹிதர். ஆழமான அறிவு மற்றும் அசைக்கமுடியாத அர்ப்பணிப்புடன், நான் அனைத்து வகையான பூஜைகள், ஹோமங்கள் மற்றும் மங்கல சடங்குகளை நம்பகத்தன்மையுடன் செய்கிறேன்.',
      para1Bold1: 'ஸ்ரீ மயூரராஜன்',
      para1Bold2: 'திருப்பூர் வித்யா பீடம்',
      para2:
        'ஒவ்வொரு சடங்கும் வேத மரபுகளுக்கு கண்டிப்பாக இணங்க நடத்தப்படுகிறது, பஜன் பாணியில் நாம சங்கீர்த்தனம் (பக்தி கீர்த்தனம்) பாடுவதுடன் — மிகுந்த சிறப்பாகவும் மாட்சியுடனும் ஏற்பாடு செய்யப்படுகிறது.',
      para2Bold: 'வேத மரபுகளுக்கு',
      para2Bold2: 'நாம சங்கீர்த்தனம்',
      highlights: [
        'திருப்பூர் வித்யா பீடத்தில் வேத கல்வி',
        'அனைத்து வகை பூஜைகள் & ஹோமங்களில் நிபுணர்',
        '100% அசல் வேத மரபுகள்',
      ],
      badge1: 'சான்றிதழ் பெற்ற புரோஹிதர்',
      badge2: 'திருப்பூர் வித்யா பீடம்',
      priestLabel: 'ஸ்ரீ மயூரராஜன்',
      priestSub: 'தொழில்முறை வேத புரோஹிதர்',
      bookBtn: '📅 ஒரு சடங்கு பதிவு செய்க',
    },

    // Services
    services: {
      tag: '🔥 புனித சடங்குகள்',
      heading: 'எங்கள் வேத சேவைகள்',
      desc: 'வேத சாஸ்திரங்களுக்கு கண்டிப்பாக இணங்க, பக்தி கீர்த்தனம் மற்றும் புனித அக்னி சடங்குகளுடன் அனைத்து மங்கல சடங்குகளையும் நடத்துகிறோம்.',
      items: [
        { name: 'ஸ்ரீ மஹா கணபதி ஹோமம்', desc: 'புதிய தொடக்கங்களுக்கு தடைகளை நீக்கி கணேஷ் ஆசி பெறுக.' },
        { name: 'ஸ்ரீ மஹா லக்ஷ்மி ஹோமம்', desc: 'செல்வ தேவியை அழைத்து செழிப்பு, வளம் மற்றும் நல்வாழ்வு பெறுக.' },
        { name: 'ஸ்ரீ சுதர்சன சக்ர ஹோமம்', desc: 'விஷ்ணுவின் புனித சுதர்சன ஆசி மற்றும் தெய்வீக பாதுகாப்பு பெறுக.' },
        { name: 'ஸ்ரீ மிருத்யுஞ்சய ஹோமம்', desc: 'நல்ல ஆரோக்கியம், நீண்ட ஆயுள் மற்றும் நோயிலிருந்து வெற்றிக்கு சிவனை வேண்டுக.' },
        { name: 'ஸ்ரீ நவகிரஹ ஹோமம்', desc: 'இணக்கம் மற்றும் நேர்மறை அண்டவெளி ஆற்றலுக்கு ஒன்பது கிரக தேவதைகளை வணங்குக.' },
        { name: 'ஸ்ரீ பூமி பூஜை', desc: 'வீடுகள் மற்றும் கட்டிடங்கள் கட்டுமானத்திற்கு புனித அடிக்கல் நாட்டு சடங்கு.' },
        { name: 'ருது சாந்தி', desc: 'முழு வேத மரபுகளுடன் கொண்டாடப்படும் மங்கல வயதுவரும் சடங்கு.' },
        { name: 'சுத்தி புண்யாஹவாசனம்', desc: 'நபர்களையும் இடங்களையும் தூய்மைப்படுத்தும் சுத்திகரிப்பு சடங்கு.' },
        { name: 'ஆயுஷ்ய ஹோமம்', desc: 'நீண்ட வாழ்க்கை, ஆரோக்கியம் மற்றும் நலனுக்கு ஆசி வழங்கும் அக்னி சடங்கு.' },
        { name: 'கிரஹ பிரவேசம்', desc: 'புதிய வீட்டை தூய்மைப்படுத்தி ஆசி வழங்கும் புனித கிரஹமேலை சடங்கு.' },
        { name: 'நாமகரணம்', desc: 'புதிய குழந்தைக்கு தெய்வீக அருளுடன் ஆசி வழங்கும் பாரம்பரிய பெயரிடு சடங்கு.' },
        { name: 'சர்வ தேவதை பூஜை', desc: 'ஒட்டுமொத்த நலனுக்கு அனைத்து தெய்வங்களின் ஆசி பெறும் விரிவான பூஜை.' },
      ],
      specialTitle: 'சர்வ சாந்தி ஹோமம் & தனிப்பயன் சடங்குகள்',
      specialPara1: 'நீங்கள் வீட்டில் ஏதேனும் மங்கல நடவடிக்கையை தொடங்க இருந்தால் — வெற்றியை உறுதிப்படுத்த, தடையின்றி நடைபெற, அல்லது திருஷ்டி போன்ற தீய பார்வைகளை விலக்க — நாங்கள்',
      specialBold: 'உங்கள் தேவைக்கேற்ப ஹோமங்கள் செய்வோம்.',
      specialPara2: 'இத்தகைய அனைத்து மங்கல நிகழ்வுகளும் சிறப்பாக ஏற்பாடு செய்யப்படும்,',
      specialBold2: 'நாம சங்கீர்த்தனம்',
      specialPara2b: '(பக்தி கீர்த்தனம்) பஜன் வடிவில் பாடப்படும் — வேத மரபுகளுக்கு கண்டிப்பாக இணங்க மிக மாட்சியுடன் நடத்தப்படும்.',
      bookBtn: 'இப்போதே பதிவு செய் →',
    },

    // Booking
    booking: {
      tag: '📅 சடங்கு திட்டமிடல்',
      heading: 'பூஜை பதிவு செய்க',
      desc: 'கீழே உள்ள விவரங்களை நிரப்பவும், ஸ்ரீ மயூரராஜன் உங்கள் பதிவை உறுதிப்படுத்த உங்களை தொடர்பு கொள்வார்.',
      nameLabel: 'முழு பெயர்',
      namePlaceholder: 'உங்கள் முழு பெயரை உள்ளிடவும்',
      phoneLabel: 'தொலைபேசி எண்',
      phonePlaceholder: '10 இலக்க மொபைல் எண்',
      dateLabel: 'விரும்பிய தேதி',
      eventLabel: 'நிகழ்வு / பூஜை விவரங்கள்',
      eventPlaceholder: 'நீங்கள் விரும்பும் பூஜை அல்லது சடங்கை விவரிக்கவும் (எ.கா., கிரஹ பிரவேசம், நவகிரஹ ஹோமம், போன்றவை)',
      submitBtn: '🪔 இப்போதே பூஜை பதிவு செய்க',
      submitting: 'சமர்ப்பிக்கிறது...',
      successTitle: 'பதிவு பெறப்பட்டது! 🙏',
      successMessage: 'நன்றி, உங்கள் பதிவு கோரிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது. ஸ்ரீ மயூரராஜன் விரைவில் உங்களை தொடர்பு கொள்வார்.',
      anotherBtn: 'மற்றொரு பூஜை பதிவு செய்க',
      whatsappBtn: 'வாட்ஸ்அப் மூலம் பதிவு செய்க',
      errors: {
        name: 'உங்கள் முழு பெயரை உள்ளிடவும்.',
        phoneEmpty: 'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்.',
        phoneInvalid: 'சரியான 10 இலக்க இந்திய மொபைல் எண்ணை உள்ளிடவும்.',
        date: 'சடங்கிற்கான தேதியை தேர்ந்தெடுக்கவும்.',
        event: 'நீங்கள் விரும்பும் நிகழ்வு அல்லது பூஜையை விவரிக்கவும்.',
      },
    },

    // Location
    location: {
      tag: '📍 எங்களை கண்டுபிடிக்க',
      heading: 'எங்கள் இடம்',
      cardTitle: 'எங்கள் முகவரி',
      cardSub: 'அனைத்து பூஜை சேவைகளுக்கும் எங்களை சந்திக்கவும்',
      address: ['எண் 10, விஷ்ணு நகர்,', 'ஐயனார் கோவில் தெரு,', 'கருவடிக்குப்பம்,', 'புதுச்சேரி — 605008'],
      directionsBtn: 'Google Maps இல் திசை பெறுக',
      hours: { emoji: '🕐', title: 'கிடைக்கும் நேரம்', detail: 'காலை 6:00 – இரவு 9:00' },
      days: { emoji: '📆', title: 'கிடைக்கும் நாட்கள்', detail: 'அனைத்து நாட்களிலும் (விடுமுறை உட்பட)' },
    },

    // Contact
    contact: {
      tag: '📞 தொடர்பு கொள்ளுங்கள்',
      heading: 'தொடர்பு கொள்க',
      desc: 'பூஜை பதிவு செய்ய அல்லது கேள்விகள் கேட்க தொடர்பு கொள்ளுங்கள் — நாங்கள் தினமும் கிடைக்கிறோம்.',
      items: [
        { label: 'தொலைபேசி', value: '9342372557', detail: 'காலை 6 – இரவு 9 மணிக்குள் அழைக்கவும்' },
        { label: 'மின்னஞ்சல்', value: 'kingofpeacock125@gmail.com', detail: 'எப்போது வேண்டுமானாலும் உங்கள் கேள்விகளை அனுப்பவும்' },
        { label: 'வாட்ஸ்அப்', value: '+91 9342372557', detail: 'விரைவான பதிலுக்கு வாட்ஸ்அப்பில் தொடர்பு கொள்ளவும்' },
      ],
      whatsappBtn: 'வாட்ஸ்அப்பில் அரட்டை அடிக்கவும்',
    },

    // Footer
    footer: {
      tagline: 'அசல் சடங்குகள், பக்தி கீர்த்தனம் மற்றும் பண்டைய வேத மரபுகளுக்கு கண்டிப்பாக இணங்கும் தொழில்முறை வேத புரோஹிதர் சேவைகள்.',
      whatsappBtn: 'வாட்ஸ்அப்',
      quickLinks: 'விரைவு இணைப்புகள்',
      ourServices: 'எங்கள் சேவைகள்',
      contactInfo: 'தொடர்பு தகவல்',
      address: 'முகவரி',
      phone: 'தொலைபேசி',
      email: 'மின்னஞ்சல்',
      copyright: `© ${new Date().getFullYear()} மாருதி புரோஹிதம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. | ஸ்ரீ மயூரராஜன் – தொழில்முறை புரோஹிதர்`,
      motto: 'அர்ப்பணிப்பு மற்றும் நம்பகத்தன்மையுடன் சேவை',
      links: ['எங்களை பற்றி', 'சேவைகள்', 'பூஜை பதிவு', 'இடம்', 'தொடர்பு'],
      serviceList: ['மஹா கணபதி ஹோமம்', 'மஹா லக்ஷ்மி ஹோமம்', 'நவகிரஹ ஹோமம்', 'கிரஹ பிரவேசம்', 'நாமகரணம்', 'சர்வ சாந்தி ஹோமம்'],
      addressLines: ['எண் 10, விஷ்ணு நகர்,', 'ஐயனார் கோவில் தெரு,', 'கருவடிக்குப்பம்,', 'புதுச்சேரி — 605008'],
    },
  },
}

export default translations
