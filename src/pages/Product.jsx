import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ChevronDown, Minus, Plus } from 'lucide-react'
import { whatsappLink } from '../config/business'
import { approvedImages, categoryBySlug, categoryPath, productBySlug, products, selectedQuoteOptions } from '../data/catalogue'
import { Breadcrumbs, SectionHeading, usePageMeta } from '../components/common'
import { useEnquiry } from '../components/enquiry-state'
import { ProductInformation } from '../components/product-information'
import { ProductGallery, ProductGrid } from '../components/products'
import NotFound from './NotFound'
import '../styles/product-detail.css'

const WhatsAppIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

function QuotationPanel({ product }) {
  const options = product.quoteOptions ?? []
  const [selection, setSelection] = useState(() => Object.fromEntries(
    options.map(({ id, values, defaultValue }) => [id, defaultValue ?? values[0]]),
  ))
  const [quantity, setQuantity] = useState('1')
  const { add } = useEnquiry()
  const amount = Number(quantity)
  const validQuantity = Number.isInteger(amount) && amount >= 1 && amount <= 9999
  const choices = selectedQuoteOptions(product, selection).map(({ label, value }) => `${label}: ${value}`)
  const ask = whatsappLink(
    `Hello, I'd like a quotation for ${product.name}.\n${[...choices, `Quantity: ${quantity}`].join('\n')}`,
  )

  return (
    <section className="detail-quote" aria-labelledby="product-quotation">
      <h2 id="product-quotation">Request a quotation</h2>
      <p>Contact our team for current pricing and availability.</p>
      <form className="detail-actions" onSubmit={event => {
        event.preventDefault()
        if (validQuantity) add(product, amount, selection)
      }}>
        {options.map(({ id, label, values, control }) => {
          const change = event => setSelection(previous => ({ ...previous, [id]: event.target.value }))
          return control === 'select' ? (
            <div className="detail-option" key={id}>
              <label htmlFor={`product-${id}`}>{label}</label>
              <div className="detail-select">
                <select id={`product-${id}`} value={selection[id]} onChange={change}>
                  {values.map(value => <option key={value}>{value}</option>)}
                </select>
                <ChevronDown size={17} aria-hidden="true" />
              </div>
            </div>
          ) : (
            <fieldset className="detail-option" key={id}>
              <legend>{label}</legend>
              <div className="option-chips">
                {values.map(value => (
                  <label className="option-chip" key={value}>
                    <input type="radio" name={id} value={value} checked={selection[id] === value} onChange={change} />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )
        })}
        <div className="detail-option">
          <label htmlFor="product-quantity">Quantity</label>
          <div className="quantity-stepper">
            <button type="button" aria-label="Decrease quantity"
              onClick={() => setQuantity(String(Math.max(1, amount - 1)))}
              disabled={!validQuantity || amount === 1}><Minus size={18} /></button>
            <input id="product-quantity" type="number" min="1" max="9999" step="1" required inputMode="numeric"
              value={quantity} onChange={event => setQuantity(event.target.value)} />
            <button type="button" aria-label="Increase quantity"
              onClick={() => setQuantity(String(validQuantity ? amount + 1 : 1))}
              disabled={validQuantity && amount === 9999}><Plus size={18} /></button>
          </div>
        </div>
        <button className="button detail-submit" type="submit">Add to Enquiry</button>
      </form>
      <a className="button detail-whatsapp" href={ask} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon /> Enquire on WhatsApp
      </a>
      <p className="detail-quote-note">Your selected size, thickness and quantity will be included.</p>
      <Link className="text-link detail-help" to="/contact">Need help choosing? Contact our team</Link>
    </section>
  )
}

function ProductDetails({ product }) {
  const category = categoryBySlug[product.category]
  const related = products.filter(item => item.category === product.category && item.slug !== product.slug).slice(0, 4)
  usePageMeta(product.name, product.description, approvedImages(product)[0]?.src)

  return (
    <div className="product-page">
      <div className="container product-page-intro">
        <Breadcrumbs items={[
          { to: categoryPath(category.slug), label: category.name },
          { label: product.name },
        ]} />
        <div className="product-detail">
          <ProductGallery product={product} />
          <div className="detail-copy">
            <Link className="eyebrow" to={categoryPath(category.slug)}>{category.name}</Link>
            <h1>{product.name}</h1>
            <p className="detail-description">{product.description}</p>
            <QuotationPanel product={product} />
          </div>
        </div>
        <ProductInformation product={product} category={category} />
      </div>
      <div className="product-page-more">
        <div className="container">
          {related.length > 0 && (
            <section className="related-section" aria-label="Related products">
              <SectionHeading eyebrow="Explore More" title="Related products" action={{ to: categoryPath(category.slug), label: 'View category' }} />
              <ProductGrid items={related} compact />
            </section>
          )}
          <section className="product-project-cta">
            <div>
              <h2>Need materials for a larger project?</h2>
              <p>Build your enquiry list and share your requirements with our team.</p>
            </div>
            <Link className="button detail-submit" to="/contact">Request a Quote <ArrowRight size={18} /></Link>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function Product() {
  const { productSlug } = useParams()
  const product = Object.hasOwn(productBySlug, productSlug) ? productBySlug[productSlug] : null
  return product ? <ProductDetails key={product.slug} product={product} /> : <NotFound />
}
