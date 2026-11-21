import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, Facebook, Mail, MapPin, Phone } from 'lucide-react'
import { business } from '../config/business'
import { Breadcrumbs, usePageMeta } from '../components/common'
import { QuoteForm } from '../components/quote'
import { StoreLocation } from '../components/store-location'

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
        <a className="text-link" href={business.mapDirectionsUrl} target="_blank" rel="noopener noreferrer">Get directions <ArrowRight size={17} /></a>
        {business.telephones.map(number => <a key={number} href={`tel:${number.replace(/[^+\d]/g, '')}`}><Phone size={18} /> {number}</a>)}
        {business.mobile && <a href={`tel:${business.mobile.replace(/[^+\d]/g, '')}`}><Phone size={18} /> {business.mobile} (Mobile)</a>}
        {business.email && <a href={`mailto:${business.email}`}><Mail size={18} /> {business.email}</a>}
        {business.openingHours && <p><Clock3 size={18} /> {business.openingHours}</p>}
        {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer"><Facebook size={18} /> Find us on Facebook</a>}
        {business.rainbowPagesUrl && <a href={business.rainbowPagesUrl} target="_blank" rel="noopener noreferrer" className="rainbow-link">Verified on SLT Rainbow Pages ↗</a>}
        <Link to="/products" className="text-link">Browse Products <ArrowRight size={17} /></Link>
      </aside>
    </div>

    <StoreLocation />
  </div>
}
