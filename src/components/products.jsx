import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Maximize2, Plus, Search, SlidersHorizontal } from 'lucide-react'
import { approvedImages, categories, categoryBySlug, productPath } from '../data/catalogue'
import { ProductImage, Reveal, useMedia } from './common'
import { Dialog } from './dialogs'
import { useEnquiry } from './enquiry-state'

export function ProductCard({ product, compact = false }) {
  const category = categoryBySlug[product.category]
  const image = approvedImages(product)[0]
  const { add } = useEnquiry()

  return (
    <article className="product-card">
      <Link to={productPath(product.slug)} className="product-card-link" aria-label={`View ${product.name}`}>
        <div className="product-image-container">
          <ProductImage image={image} icon={category.icon} />
        </div>
        <div className="product-copy">
          <p className="product-category">{category.name}</p>
          <h3>{product.name}</h3>
          {!compact && <p className="product-price">Request price</p>}
        </div>
      </Link>
      {!compact && (
        <button
          type="button"
          className="add-button"
          aria-label={`Add ${product.name} to enquiry`}
          title="Add to Enquiry"
          onClick={event => {
            event.preventDefault()
            event.stopPropagation()
            add(product)
          }}
        >
          <Plus size={18} />
        </button>
      )}
    </article>
  )
}

export function ProductGrid({ items, compact = false }) {
  return <div className="product-grid">
    {items.map((product, index) => <Reveal key={product.slug} delay={(index % 4) * 0.035}><ProductCard product={product} compact={compact} /></Reveal>)}
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

export function ProductFilters({ query, onQuery, category, onCategory, sort, onSort, onClear, canClear }) {
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
        <button type="button" className="clear-button" onClick={onClear} disabled={!canClear}>Clear filters</button>
      </div>
    </div>
  </div>
}

export function ProductGallery({ product }) {
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const images = approvedImages(product)
  const image = images[selected]
  const icon = categoryBySlug[product.category].icon
  const move = delta => setSelected(index => (index + delta + images.length) % images.length)

  return <div className="product-gallery">
    <figure className="gallery-figure">
      <div className="gallery-main">
        <ProductImage image={image} icon={icon} loading="eager" />
        {image?.previewWidth && <button className="icon-button gallery-expand" type="button" onClick={() => setExpanded(true)} aria-label="Enlarge product image">
          <Maximize2 size={20} />
        </button>}
      </div>
      {image?.role === 'application' && <figcaption>Application example</figcaption>}
      {image?.role === 'detail' && <figcaption>Product detail</figcaption>}
    </figure>
    {images.length > 1 && <div className="gallery-rail" role="group" aria-label="Product views">
      <button className="icon-button gallery-arrow" type="button" onClick={() => move(-1)} aria-label="Previous product image"><ChevronLeft size={18} /></button>
      <div className="gallery-thumbnails">
        {images.map((view, index) => <button key={view.src} type="button" aria-label={`View ${index + 1}: ${view.alt}`}
          aria-pressed={index === selected} onClick={() => setSelected(index)}><ProductImage image={view} showLabel={false} /></button>
        )}
      </div>
      <button className="icon-button gallery-arrow" type="button" onClick={() => move(1)} aria-label="Next product image"><ChevronRight size={18} /></button>
    </div>}
    {expanded && <Dialog kind="gallery-dialog" title={product.name} onClose={() => setExpanded(false)}>
      <div className="gallery-preview" style={{ '--preview-width': `${image.previewWidth}px` }}>
        <ProductImage image={image} icon={icon} loading="eager" />
      </div>
    </Dialog>}
  </div>
}
