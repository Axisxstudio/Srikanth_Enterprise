import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { usePageMeta } from '../components/common'

export default function NotFound() {
  usePageMeta('Page Not Found', 'Find boards, decorative finishes, machinery and workshop equipment in the Srikantha Enterprises catalogue.')
  return <div className="container route-container missing-page">
    <p className="eyebrow">Page Not Found</p>
    <h1>We couldn’t find that page.</h1>
    <p>Browse the catalogue to find the product or category you were looking for.</p>
    <div className="hero-actions">
      <Link to="/products" className="button button-primary">Browse Products <ArrowRight size={19} /></Link>
      <Link to="/" className="button button-outline">Back to Home</Link>
    </div>
  </div>
}
