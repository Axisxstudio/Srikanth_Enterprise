export const business = {
  name: 'Srikantha Enterprises',
  address: 'Rawathawatta, Moratuwa, Sri Lanka',
  location: 'Moratuwa, Sri Lanka',
  telephones: [],
  whatsapp: '',
  email: '',
  openingHours: '',
  facebookUrl: 'https://www.facebook.com/SRIKANTHAENTERPRISES/',
  mapUrl: '',
  logo: '',
}

export const HERO_INTERVAL = 6000

export function whatsappLink(message) {
  return business.whatsapp
    ? `https://wa.me/${business.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    : ''
}
