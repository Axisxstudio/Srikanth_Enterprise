import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown, Search, X } from 'lucide-react'
import { categories, categoryPath, productPath, products } from '../data/catalogue'
import { useEnquiry } from './enquiry-state'

export function Dialog({ title, kind = 'drawer', onClose, initialFocus, children }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    const trigger = document.activeElement
    const overflow = document.body.style.overflow
    dialog.showModal()
    if (initialFocus) dialog.querySelector(initialFocus)?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      if (trigger instanceof HTMLElement && trigger.isConnected && trigger.getClientRects().length) trigger.focus({ preventScroll: true })
    }
  }, [initialFocus])

  return (
    <dialog ref={dialogRef} className={`site-dialog ${kind}`} aria-labelledby={`${kind}-title`}
      onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}>
      <div className="dialog-panel">
        <header className="dialog-header">
          <h2 id={`${kind}-title`}>{title}</h2>
          <button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={22} /></button>
        </header>
        {children}
      </div>
    </dialog>
  )
}

export function MobileMenu({ onClose, onEnquiry }) {
  const { count } = useEnquiry()
  return <Dialog title="Menu" onClose={onClose} kind="mobile-drawer">
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <Link to="/products" onClick={onClose}>All Products <ArrowRight size={18} /></Link>
      {categories.map(category => <details key={category.slug}>
        <summary>{category.name}<ChevronDown size={18} /></summary>
        <Link className="mobile-category" to={categoryPath(category.slug)} onClick={onClose}>View {category.name}</Link>
        {products.filter(product => product.category === category.slug).map(product =>
          <Link key={product.slug} to={productPath(product.slug)} onClick={onClose}>{product.name}</Link>
        )}
      </details>)}
      <Link to="/about" onClick={onClose}>About</Link>
      <Link to="/contact" onClick={onClose}>Contact</Link>
    </nav>
    <button type="button" className="button button-primary" onClick={onEnquiry}>Get a Quote {count > 0 && <span className="count">{count}</span>}</button>
  </Dialog>
}

export function SearchDialog({ onClose }) {
  const navigate = useNavigate()
  function submit(event) {
    event.preventDefault()
    const query = new FormData(event.currentTarget).get('q').trim()
    onClose()
    navigate(query ? `/products?${new URLSearchParams({ q: query })}` : '/products')
  }
  return <Dialog title="Search products" onClose={onClose} kind="search-dialog" initialFocus="#site-search">
    <form onSubmit={submit} className="dialog-search">
      <label className="sr-only" htmlFor="site-search">Search products, materials or machines</label>
      <div className="search-field"><Search size={21} aria-hidden="true" />
        <input id="site-search" name="q" type="search" placeholder="Search products, materials or machines…" />
      </div>
      <button className="button button-primary" type="submit">Search</button>
    </form>
    <Link to="/products" className="text-link" onClick={onClose}>Browse the full catalogue <ArrowRight size={17} /></Link>
  </Dialog>
}
