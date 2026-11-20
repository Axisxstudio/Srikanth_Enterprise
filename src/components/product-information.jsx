import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'enquiry', label: 'Enquiry Information' },
]

function ProductFacts({ title, rows }) {
  return <table className="product-facts">
    <caption>{title}</caption>
    <tbody>
      {rows.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}
    </tbody>
  </table>
}

export function ProductInformation({ product, category }) {
  const [active, setActive] = useState(0)
  const buttons = useRef([])
  const options = product.quoteOptions ?? []
  const optionRows = options.map(({ label, values }) => [
    values.length > 1 ? `${label} options` : label,
    values.join(', '),
  ])
  const specifications = Object.entries(product.specifications)

  function navigateTabs(event, index) {
    let target
    switch (event.key) {
      case 'ArrowLeft': target = (index - 1 + tabs.length) % tabs.length; break
      case 'ArrowRight': target = (index + 1) % tabs.length; break
      case 'Home': target = 0; break
      case 'End': target = tabs.length - 1; break
      default: return
    }
    event.preventDefault()
    setActive(target)
    buttons.current[target]?.focus()
  }

  return <section className="product-information" aria-label="Product information">
    <div className="product-tabs" role="tablist" aria-label="Product information tabs">
      {tabs.map(({ id, label }, index) => <button key={id} type="button" role="tab" id={`tab-${id}`}
        aria-selected={active === index} aria-controls={`panel-${id}`} tabIndex={active === index ? 0 : -1}
        ref={node => { buttons.current[index] = node }}
        onClick={() => setActive(index)} onKeyDown={event => navigateTabs(event, index)}>{label}</button>)}
    </div>
    <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" tabIndex={0} hidden={active !== 0} className="product-panel overview-panel">
      <div>
        <h2>{product.overview?.title ?? 'Product overview'}</h2>
        <p>{product.overview?.description ?? product.description}</p>
      </div>
      <div>
        <ProductFacts title="Product at a glance" rows={ [['Product', product.name], ['Category', category.name], ...specifications] } />
        {options.length > 0 && <p className="facts-note">Confirm current options when requesting a quotation.</p>}
      </div>
    </div>
    <div id="panel-specifications" role="tabpanel" aria-labelledby="tab-specifications" tabIndex={0} hidden={active !== 1} className="product-panel information-panel">
      <div>
        <h2>Specifications</h2>
        <p>Contact our team to confirm the details for your project.</p>
      </div>
      {specifications.length || optionRows.length
        ? <div><ProductFacts title="Product details" rows={[...optionRows, ...specifications]} />
          {options.length > 0 && <p className="facts-note">Confirm current options when requesting a quotation.</p>}
        </div>
        : <p>Ask about dimensions, configuration or compatibility when you request a quote.</p>}
    </div>
    <div id="panel-enquiry" role="tabpanel" aria-labelledby="tab-enquiry" tabIndex={0} hidden={active !== 2} className="product-panel information-panel">
      <div>
        <h2>Enquiry information</h2>
        <p>Add the product to your enquiry list and include any project requirements our team should know.</p>
      </div>
      <div>
        <h3>Pricing and availability</h3>
        <p>Request a quotation with your required quantity and any selected options to confirm current pricing and availability.</p>
        <Link className="text-link" to="/contact">Continue to quotation <ArrowRight size={17} /></Link>
      </div>
    </div>
  </section>
}
