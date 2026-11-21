import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, Facebook, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { business } from '../config/business'
import { Breadcrumbs, usePageMeta } from '../components/common'
import { QuoteForm } from '../components/quote'

export default function Contact() {
  usePageMeta('Contact & Quotations', 'Prepare a quotation enquiry for materials and machinery from Srikantha Enterprises in Moratuwa, Sri Lanka.')
  return <div className="container route-container">
    <Breadcrumbs items={[{ label: 'Contact' }]} />
    <div className="page-intro">
      <p className="eyebrow">Contact &amp; Quotations</p>
      <h1>Request a Quote</h1>
      <p>Tell us what your project needs and prepare an enquiry with your product list and quantities.</p>
    </div>
    <div className="contact-layout">
      <QuoteForm />
      <aside className="contact-info" aria-label="Business information">
        <h2>{business.name}</h2>
        <address><MapPin size={19} /><span>{business.address}</span></address>
        {business.mapUrl && <a className="text-link" href={business.mapUrl} target="_blank" rel="noopener noreferrer">Get directions <ArrowRight size={17} /></a>}
        {business.telephones.map(number => <a key={number} href={`tel:${number.replace(/[^+\d]/g, '')}`}><Phone size={18} /> {number}</a>)}
        {business.mobile && <a href={`tel:${business.mobile.replace(/[^+\d]/g, '')}`}><Phone size={18} /> {business.mobile} (Mobile)</a>}
        {business.email && <a href={`mailto:${business.email}`}><Mail size={18} /> {business.email}</a>}
        {business.openingHours && <p><Clock3 size={18} /> {business.openingHours}</p>}
        {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer"><Facebook size={18} /> Find us on Facebook</a>}
        {business.rainbowPagesUrl && <a href={business.rainbowPagesUrl} target="_blank" rel="noopener noreferrer" className="rainbow-link">Verified on SLT Rainbow Pages ↗</a>}
        <Link to="/products" className="text-link">Browse Products <ArrowRight size={17} /></Link>
      </aside>
    </div>

    <section className="contact-map-section" aria-labelledby="store-location-heading">
      <div className="contact-map-card">
        <div className="contact-map-header">
          <div>
            <p className="eyebrow">Store Location</p>
            <h2 id="store-location-heading">Find Srikantha Enterprises on Google Maps</h2>
            <address className="contact-map-address">
              <MapPin size={20} className="pin-icon" />
              <span>{business.address}</span>
            </address>
          </div>
          <div className="contact-map-actions">
            <a
              className="button button-primary"
              href={business.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={18} /> Open in Google Maps ↗
            </a>
            {business.whatsapp && (
              <a
                className="button button-whatsapp"
                href={`https://wa.me/${business.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Srikantha Enterprises, could you please share your shop location pin and directions?')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} /> Ask on WhatsApp
              </a>
            )}
          </div>
        </div>
        <div className="contact-map-embed">
          <iframe
            title="Srikantha Enterprises Google Maps Location"
            src="https://maps.google.com/maps?q=Srikantha+Enterprises+511%2F1A+Galle+Road+Rawathawatta+Moratuwa+Sri+Lanka&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="380"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  </div>
}
