import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { business } from '../config/business'
import { approvedImages, banners, categories, categoryPath, matchProduct, productBySlug, products } from '../data/catalogue'
import { BannerImage, EmptyState, ProductImage, Reveal, SectionHeading, usePageMeta } from '../components/common'
import { HeroCarousel } from '../components/hero'
import { CategoryChips, ProductGrid, SearchField } from '../components/products'

function CategoryGrid() {
  return (
    <section className="category-section section-space" aria-labelledby="shop-categories">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">Shop by Category</p>
            <h2 id="shop-categories">Everything your workshop needs.</h2>
          </div>
          <Link to="/products" className="text-link section-action">Explore all categories <ArrowRight size={19} /></Link>
        </Reveal>
        <div className="category-scroll-container">
          <div className="category-track">
            {[...categories, ...categories].map((category, index) => (
              <div key={`${category.slug}-${index}`} className={`category-item-wrapper ${index >= categories.length ? 'mobile-only-clone' : ''}`}>
                <Link to={categoryPath(category.slug)} className={`category-card category-card-${category.slug}`}>
                  <div className="category-image" aria-hidden="true">
                    <ProductImage image={approvedImages(productBySlug[category.imageProduct])[0]} icon={category.icon} showLabel={false} />
                  </div>
                  <div className="category-copy">
                    <h3>{category.name}</h3>
                    <ArrowRight size={22} aria-hidden="true" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const items = products.filter(product => product.featured && (!category || product.category === category) && matchProduct(product, query)).slice(0, 12)
  const catalogueQuery = new URLSearchParams()
  if (query.trim()) catalogueQuery.set('q', query.trim())
  if (category) catalogueQuery.set('category', category)
  const viewAll = catalogueQuery.size ? `/products?${catalogueQuery}` : '/products'
  return <section className="featured-section section-space" aria-label="Featured products">
    <div className="container">
      <Reveal><SectionHeading eyebrow="Our Products" title="Find the right product for your project." /></Reveal>
      <SearchField value={query} onChange={setQuery} id="featured-search" />
      <CategoryChips value={category} onChange={setCategory} />
      {items.length ? <ProductGrid items={items} /> : <EmptyState title="No featured products found" description="Try another search or look through the full catalogue.">
        <button type="button" className="button button-outline" onClick={() => { setQuery(''); setCategory('') }}>Clear filters</button>
      </EmptyState>}
      <div className="center-action"><Link className="button button-outline" to={viewAll}>View All Products</Link></div>
    </div>
  </section>
}

function FeatureBanners() {
  return <div className="container home-features">
    <Reveal as="section" className="machinery-feature">
      <BannerImage banner={banners.machinery} sizes="(min-width: 1420px) 1360px, 96vw" />
      <div className="feature-copy">
        <h2>Equip your workshop<br />for what’s next.</h2>
        <Link className="button button-primary" to={categoryPath('woodworking-machinery')}>Explore Machinery <ArrowRight size={18} /></Link>
      </div>
    </Reveal>
    <Reveal as="section" className="materials-feature">
      <div className="materials-image"><BannerImage banner={banners.materials} sizes="(min-width: 900px) 55vw, 95vw" /></div>
      <div className="feature-copy">
        <p className="eyebrow">Boards &amp; Decorative Finishes</p>
        <h2>Start with the right board.</h2>
        <p>Explore materials and finishes for furniture, interiors and workshop projects.</p>
        <Link className="text-link" to="/about">About {business.name} <ArrowRight size={19} /></Link>
      </div>
    </Reveal>
    <Reveal as="section" className="quote-strip">
      <h2>Need help choosing the right product?</h2>
      <Link className="button button-orange-outline" to="/contact">Talk to Our Team <ArrowRight size={18} /></Link>
    </Reveal>
  </div>
}

export default function Home() {
  usePageMeta('Materials & Woodworking Machinery', 'Explore boards, decorative finishes and woodworking equipment from Srikantha Enterprises in Moratuwa, Sri Lanka.')
  return <><HeroCarousel /><CategoryGrid /><FeaturedProducts /><FeatureBanners /></>
}
