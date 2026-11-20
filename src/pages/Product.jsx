import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, MessageCircle, Plus } from 'lucide-react'
import { whatsappLink } from '../config/business'
import { approvedImages, categoryBySlug, categoryPath, productBySlug, products } from '../data/catalogue'
import { Breadcrumbs, SectionHeading, usePageMeta } from '../components/common'
import { useEnquiry } from '../components/enquiry-state'
import { ProductGallery, ProductGrid } from '../components/products'
import NotFound from './NotFound'

function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState('1')
  const { add, setOpen } = useEnquiry()
  const category = categoryBySlug[product.category]
  const specs = Object.entries(product.specifications)
  const related = products.filter(item => item.category === product.category && item.slug !== product.slug).slice(0, 4)
  const ask = whatsappLink(`Hello, I’d like to enquire about ${product.name} (quantity: ${quantity || 1}).`)
  usePageMeta(product.name, product.description, approvedImages(product)[0]?.src)

  return <div className="container route-container">
    <Breadcrumbs items={[
      { to: '/products', label: 'Products' },
      { to: categoryPath(category.slug), label: category.name },
      { label: product.name },
    ]} />
    <div className="product-detail">
      <ProductGallery product={product} />
      <div className="detail-copy">
        <Link className="eyebrow" to={categoryPath(category.slug)}>{category.name}</Link>
        <h1>{product.name}</h1>
        <p className="detail-description">{product.description}</p>
        {specs.length > 0 && <section className="specifications">
          <h2>Specifications</h2>
          <dl>{specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </section>}
        <div className="detail-quote">
          <p>Request price</p>
          <form className="detail-actions" onSubmit={event => {
            event.preventDefault()
            add(product, Number(quantity))
          }}>
            <label htmlFor="product-quantity">Quantity</label>
            <div>
              <input id="product-quantity" className="quantity-input" type="number" min="1" max="9999" step="1" required
                inputMode="numeric" value={quantity} onChange={event => setQuantity(event.target.value)} />
              <button className="button button-primary" type="submit"><Plus size={19} /> Add to Enquiry</button>
            </div>
          </form>
          <button className="text-link" type="button" onClick={() => setOpen(true)}>View your enquiry <ArrowRight size={17} /></button>
          {ask && <a className="button button-outline" href={ask}><MessageCircle size={19} /> Enquire on WhatsApp</a>}
        </div>
      </div>
    </div>
    <section className="related-section" aria-label="Related products">
      <SectionHeading title="Related Products" action={{ to: categoryPath(category.slug), label: `View ${category.name}` }} />
      <ProductGrid items={related} />
    </section>
  </div>
}

export default function Product() {
  const { productSlug } = useParams()
  const product = Object.hasOwn(productBySlug, productSlug) ? productBySlug[productSlug] : null
  return product ? <ProductDetails key={product.slug} product={product} /> : <NotFound />
}
