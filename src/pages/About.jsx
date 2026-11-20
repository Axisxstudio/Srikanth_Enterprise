import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { business } from '../config/business'
import { banners, categories, categoryPath } from '../data/catalogue'
import { BannerImage, Breadcrumbs, usePageMeta } from '../components/common'

export default function About() {
  usePageMeta('About Us', 'Learn about Srikantha Enterprises, a supplier of workshop materials and woodworking equipment in Moratuwa, Sri Lanka.', '/images/banners/03-board-display-banner.webp')
  return <div className="container route-container">
    <Breadcrumbs items={[{ label: 'About' }]} />
    <section className="about-feature">
      <div className="about-copy">
        <p className="eyebrow">About Us</p>
        <h1>{business.name}</h1>
        <p>Based in Rawathawatta, Moratuwa, we supply boards, decorative materials, woodworking machinery and workshop equipment.</p>
        <p>Browse the range by category or tell us what you’re working on when you request a quotation.</p>
        <Link className="button button-primary" to="/contact">Get in Touch <ArrowRight size={18} /></Link>
      </div>
      <div className="about-image"><BannerImage banner={banners.materials} sizes="(min-width: 800px) 55vw, 95vw" /></div>
    </section>
    <section className="about-ranges">
      <h2>Explore our range</h2>
      <div className="category-grid">
        {categories.map(category => <Link className="about-range" key={category.slug} to={categoryPath(category.slug)}>
          <h3>{category.name}</h3><p>{category.description}</p><ArrowRight size={22} aria-hidden="true" />
        </Link>)}
      </div>
    </section>
  </div>
}
