import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clipboard, Mail, MessageCircle, Trash2 } from 'lucide-react'
import { business, whatsappLink } from '../config/business'
import { productPath } from '../data/catalogue'
import { Dialog } from './dialogs'
import { useEnquiry } from './enquiry-state'

function ItemQuantity({ item, onUpdate }) {
  const [draft, setDraft] = useState(null)
  const [invalid, setInvalid] = useState(false)
  const errorId = `quantity-error-${item.product.slug}`
  return <>
    <input className="quantity-input" type="number" min="1" max="9999" step="1" required inputMode="numeric"
      aria-label={`Quantity for ${item.product.name}`} value={draft ?? item.quantity}
      aria-invalid={invalid} aria-describedby={invalid ? errorId : undefined}
      onChange={event => {
        setDraft(event.target.value)
        setInvalid(!event.target.validity.valid)
        onUpdate(item.product.slug, event.target.valueAsNumber)
      }}
      onBlur={() => { setDraft(null); setInvalid(false) }} />
    {invalid && <span className="form-error quantity-error" id={errorId}>Enter a whole number between 1 and 9,999.</span>}
  </>
}

export function EnquiryItems({ onNavigate }) {
  const { items, update, remove } = useEnquiry()
  if (!items.length) return <p className="muted">Your enquiry list is empty. You can browse products or ask a general question.</p>
  return <ul className="enquiry-items">
    {items.map(item => <li key={item.product.slug}>
      <Link to={productPath(item.product.slug)} onClick={onNavigate}>{item.product.name}</Link>
      <ItemQuantity item={item} onUpdate={update} />
      <button type="button" className="icon-button remove-button" aria-label={`Remove ${item.product.name}`} onClick={() => remove(item.product.slug)}><Trash2 size={17} /></button>
    </li>)}
  </ul>
}

export function EnquiryDrawer() {
  const { open, setOpen, count } = useEnquiry()
  const close = () => setOpen(false)
  return open && <Dialog title="Your enquiry" onClose={close} kind="enquiry-drawer">
    <p className="drawer-description">{count ? `${count} ${count === 1 ? 'item' : 'items'} selected. Review your quantities before requesting a quote.` : 'Choose products for a quote or contact us with a general enquiry.'}</p>
    {count > 0 && <EnquiryItems onNavigate={close} />}
    <div className="drawer-actions">
      <Link className="button button-primary" to="/contact" onClick={close}>{count ? 'Continue to Quotation' : 'Request a Quote'} <ArrowRight size={19} /></Link>
      <Link className="button button-outline" to="/products" onClick={close}>Browse Products</Link>
    </div>
  </Dialog>
}

const initial = { name: '', phone: '', email: '', message: '', location: '' }
const maxMessage = 1200
const fields = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', required: true, maxLength: 100 },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', required: true, maxLength: 35 },
  { name: 'email', label: 'Email (optional)', type: 'email', autoComplete: 'email', maxLength: 160 },
  { name: 'location', label: 'Delivery location (optional)', type: 'text', autoComplete: 'address-level2', maxLength: 160 },
]

function validate(values, items) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Enter your name.'
  const digits = values.phone.replace(/\D/g, '').length
  if (!/^\+?[\d ()-]+$/.test(values.phone.trim()) || digits < 7 || digits > 15) errors.phone = 'Enter a phone number with 7 to 15 digits.'
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!items.length && !values.message.trim()) errors.message = 'Add a product or tell us what you need.'
  if (values.message.length > maxMessage) errors.message = `Keep your message under ${maxMessage + 1} characters.`
  return errors
}

function formatSummary(values, items) {
  return [
    `Quotation enquiry for ${business.name}`,
    '',
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    values.email.trim() ? `Email: ${values.email.trim()}` : null,
    values.location.trim() ? `Delivery location: ${values.location.trim()}` : null,
    ...(items.length ? ['', 'Products and quantities', ...items.map(({ product, quantity }) => `- ${product.name} × ${quantity}`)] : []),
    ...(values.message.trim() ? ['', `Message: ${values.message.trim()}`] : []),
  ].filter(line => line !== null).join('\n')
}

export function QuoteForm() {
  const { items } = useEnquiry()
  const [values, setValues] = useState(initial)
  const [submitted, setSubmitted] = useState(false)
  const [prepared, setPrepared] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const summaryField = useRef(null)
  const errors = submitted ? validate(values, items) : {}
  const summary = prepared && Object.keys(errors).length === 0 ? formatSummary(values, items) : ''
  const whatsapp = summary && whatsappLink(summary)
  const email = summary && business.email ? `mailto:${business.email}?subject=${encodeURIComponent('Quotation enquiry')}&body=${encodeURIComponent(summary)}` : ''

  function change(event) {
    const { name, value } = event.target
    setValues(previous => ({ ...previous, [name]: value }))
    setCopyStatus('')
  }

  function prepare(event) {
    event.preventDefault()
    setSubmitted(true)
    const issues = validate(values, items)
    const problem = Object.keys(issues)[0]
    if (problem) return event.currentTarget.elements[problem].focus()
    setPrepared(true)
    requestAnimationFrame(() => summaryField.current?.focus())
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopyStatus('Enquiry summary copied.')
    } catch {
      summaryField.current?.select()
      setCopyStatus('Summary selected. Use your device’s copy command.')
    }
  }

  return <div className="quote-form-panel">
    <form noValidate onSubmit={prepare}>
      <div className="form-grid">
        {fields.map(({ name, label, ...attributes }) => <div className="form-field" key={name}>
          <label htmlFor={`quote-${name}`}>{label}</label>
          <input {...attributes} name={name} id={`quote-${name}`} value={values[name]} onChange={change}
            aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `error-${name}` : undefined} />
          {errors[name] && <span className="form-error" id={`error-${name}`}>{errors[name]}</span>}
        </div>)}
      </div>
      <div className="quote-products">
        <h2>Products and quantities</h2>
        <EnquiryItems />
      </div>
      <div className="form-field">
        <label htmlFor="quote-message">Message</label>
        <textarea id="quote-message" name="message" value={values.message} onChange={change} maxLength={maxMessage}
          rows="5" placeholder="Tell us about the products or specifications you need…" aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message message-limit' : 'message-limit'} />
        {errors.message && <span id="error-message" className="form-error">{errors.message}</span>}
        <span className="muted character-count" id="message-limit">{values.message.length} / {maxMessage}</span>
      </div>
      <button type="submit" className="button button-primary">Prepare Enquiry <ArrowRight size={19} /></button>
    </form>
    {summary && <section className="summary-panel" aria-labelledby="summary-title">
      <h2 id="summary-title">Your enquiry summary</h2>
      <p>{whatsapp || email ? 'Copy your summary or open it in your preferred contact app.' : 'Your enquiry summary is ready to copy and share.'}</p>
      <textarea ref={summaryField} readOnly rows="8" aria-label="Enquiry summary" value={summary} />
      <div className="summary-actions">
        <button type="button" className="button button-primary" onClick={copy}><Clipboard size={17} /> Copy Enquiry</button>
        {whatsapp && <a className="button button-outline" href={whatsapp}><MessageCircle size={17} /> Open WhatsApp</a>}
        {email && <a className="button button-outline" href={email}><Mail size={17} /> Open Email</a>}
      </div>
      <p className="copy-status" role="status">{copyStatus}</p>
    </section>}
  </div>
}
