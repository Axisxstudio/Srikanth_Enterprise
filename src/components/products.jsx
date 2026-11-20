import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Plus, Search, SlidersHorizontal } from 'lucide-react'
import { approvedImages, categories, categoryBySlug, productPath } from '../data/catalogue'
import { ProductImage, Reveal, useMedia } from './common'
import { useEnquiry } from './enquiry-state'

export function ProductCard({ product }) {
  const category = categoryBySlug[product.category]
  const image = approvedImages(product)[0]
  const { add } = useEnquiry()
  return <article className="product-card">
    <Link to={productPath(product.slug)} className="product-image-link" tabIndex={-1} aria-hidden="true">
      <ProductImage image={image} icon={category.icon} />
    </Link>
    <div className="product-copy">
      <p className="product-category">{category.name}</p>
      <h3>{product.name}</h3>
      <p className="product-price">Request price</p>
      <div className="product-actions">
        <Link className="text-link" to={productPath(product.slug)} aria-label={`View Product: ${product.name}`}>View Product <ArrowRight size={16} /></Link>
        <button type="button" className="add-button" aria-label={`Add ${product.name} to enquiry`} title="Add to Enquiry" onClick={() => add(product)}><Plus size={18} /></button>
      </div>
    </div>
  </article>
}

export function ProductGrid({ items }) {
  return <div className="product-grid">
    {items.map((product, index) => <Reveal key={product.slug} delay={(index % 4) * 0.035}><ProductCard product={product} /></Reveal>)}
  </div>
}

export function SearchField({ value, onChange, id = 'product-search' }) {
  const compact = useMedia('(max-width: 480px)')
  return <div className="search-field">
    <Search size={22} aria-hidden="true" />
    <label htmlFor={id} className="sr-only">Search products, materials or machines</label>
    <input id={id} type="search" value={value} onChange={event => onChange(event.target.value)}
      placeholder={compact ? 'Search the catalogue…' : 'Search products, materials or machines…'} />
  </div>
}

export function CategoryChips({ value, onChange }) {
  return <div className="filter-chips" role="group" aria-label="Filter by category">
    {[{ slug: '', name: 'All Products' }, ...categories].map(category =>
      <button key={category.name} className="filter-chip" type="button" aria-pressed={category.slug === value} onClick={() => onChange(category.slug)}>{category.name}</button>
    )}
  </div>
}

export function ProductFilters({ query, onQuery, category, onCategory, sort, onSort, onClear }) {
  const [expanded, setExpanded] = useState(false)
  return <div className="catalogue-filters">
    <SearchField value={query} onChange={onQuery} />
    <button className="button button-outline mobile-filter-toggle" type="button" aria-expanded={expanded} aria-controls="filter-options" onClick={() => setExpanded(!expanded)}>
      <SlidersHorizontal size={17} /> Filters &amp; sort <ChevronDown size={17} />
    </button>
    <div id="filter-options" className={`filter-options${expanded ? ' expanded' : ''}`}>
      <CategoryChips value={category} onChange={onCategory} />
      <div className="filter-tools">
        <label htmlFor="catalogue-sort">Sort</label>
        <select id="catalogue-sort" value={sort} onChange={event => onSort(event.target.value)}>
          <option value="featured">Featured first</option>
          <option value="az">Name A–Z</option>
          <option value="za">Name Z–A</option>
        </select>
        <button type="button" className="clear-button" onClick={onClear}>Clear filters</button>
      </div>
    </div>
  </div>
}

export function ProductGallery({ product }) {
  const [selected, setSelected] = useState(0)
  const images = approvedImages(product)
  const image = images[selected]
  return <div className="product-gallery">
    <figure className="gallery-figure">
      <div className="gallery-main">
        <ProductImage image={image} icon={categoryBySlug[product.category].icon} loading="eager" />
      </div>
      {image?.role === 'application' && <figcaption>Application example</figcaption>}
      {image?.role === 'detail' && <figcaption>Product detail</figcaption>}
    </figure>
    {images.length > 1 && <div className="gallery-thumbnails" role="group" aria-label="Product views">
      {images.map((view, index) => <button key={view.src} type="button" aria-label={`View ${index + 1}: ${view.alt}`}
        aria-pressed={index === selected} onClick={() => setSelected(index)}><ProductImage image={view} showLabel={false} /></button>
      )}
    </div>}
  </div>
}
