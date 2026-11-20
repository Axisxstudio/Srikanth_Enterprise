export const business = {
  name: 'Srikantha Enterprises',
  address: 'No. 511/1A, Galle Road, Rawathawatta, Moratuwa, Sri Lanka',
  location: 'Rawathawatta, Moratuwa',
  telephones: ['011 264 2829'],
  mobile: '077 775 5880',
  whatsapp: '94777755880',
  email: '',
  openingHours: 'Mon – Sat: 8:00 AM – 6:00 PM',
  facebookUrl: 'https://www.facebook.com/SRIKANTHAENTERPRISES/',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Srikantha+Enterprises+511%2F1A+Galle+Road+Rawathawatta+Moratuwa',
  rainbowPagesUrl: 'https://rainbowpages.lk/constructions/hardware-retail/srikantha-enterprises/?utm_source=chatgpt.com',
  logo: '/images/logo.png',
}

export const HERO_INTERVAL = 6000

export function whatsappLink(message) {
  const number = business.whatsapp ? business.whatsapp.replace(/\D/g, '') : ''
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
