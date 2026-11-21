import { ExternalLink, MapPin, MessageCircle } from 'lucide-react'
import { business, whatsappLink } from '../config/business'

export function StoreLocation() {
  return (
    <section className="store-map" aria-labelledby="store-location-heading">
      <div className="store-map-header">
        <div>
          <h2 id="store-location-heading">Visit {business.name}</h2>
          <address className="store-map-address">
            <MapPin size={19} aria-hidden="true" />
            <span>{business.address}</span>
          </address>
        </div>
        <div className="store-map-actions">
          <a className="button button-primary" href={business.mapUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps <ExternalLink size={16} aria-hidden="true" />
          </a>
          {business.whatsapp && (
            <a className="button button-whatsapp" target="_blank" rel="noopener noreferrer"
              href={whatsappLink(`Hi ${business.name}, could you please share your shop location pin and directions?`)}>
              <MessageCircle size={18} aria-hidden="true" /> Ask on WhatsApp
            </a>
          )}
        </div>
      </div>
      <iframe
        className="store-map-frame"
        title={`Google Maps location for ${business.name}`}
        src={business.mapEmbedUrl}
        height="380"
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </section>
  )
}
