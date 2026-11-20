import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronDown, Facebook, MapPin, Menu, Search } from 'lucide-react'
import { business } from '../config/business'
import { categories, categoryPath, productPath, products } from '../data/catalogue'
import { Brand, useMedia } from './common'
import { MobileMenu, SearchDialog } from './dialogs'
import { useEnquiry } from './enquiry-state'

function CategoryNavigation() {
  const [open, setOpen] = useState('')
  const nav = useRef(null)
  const inputMode = useRef('')
  const { pathname } = useLocation()

  useEffect(() => setOpen(''), [pathname])
  useEffect(() => {
    const outsideClick = event => { if (!nav.current?.contains(event.target)) setOpen('') }
    document.addEventListener('pointerdown', outsideClick)
    return () => document.removeEventListener('pointerdown', outsideClick)
  }, [])

  return <nav className="desktop-nav" ref={nav} aria-label="Product categories">
    <ul>
      {categories.map(category => {
        const expanded = open === category.slug
        const panelId = `dropdown-${category.slug}`
        const active = pathname === categoryPath(category.slug)
        return <li key={category.slug} className="nav-entry"
          onMouseEnter={() => { inputMode.current = 'hover'; setOpen(category.slug) }}
          onMouseLeave={event => {
            if (inputMode.current === 'hover' && !event.currentTarget.querySelector('.category-dropdown')?.contains(document.activeElement)) setOpen('')
          }}
          onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(previous => previous === category.slug ? '' : previous) }}
          onKeyDown={event => {
            if (event.key === 'Escape' && expanded) {
              event.stopPropagation()
              setOpen('')
              event.currentTarget.querySelector('button').focus()
            }
          }}>
          <button type="button" className={`category-trigger${active ? ' active' : ''}`} aria-expanded={expanded} aria-controls={panelId}
            onClick={() => {
              const alreadyPinned = inputMode.current === 'click'
              inputMode.current = 'click'
              setOpen(expanded && alreadyPinned ? '' : category.slug)
            }}
            onKeyDown={event => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                inputMode.current = 'keyboard'
                setOpen(category.slug)
                requestAnimationFrame(() => document.getElementById(panelId)?.querySelector('a')?.focus())
              }
            }}>
            {category.name}<ChevronDown size={15} aria-hidden="true" />
          </button>
          <div id={panelId} className="category-dropdown" hidden={!expanded}>
            <Link className="dropdown-all" to={categoryPath(category.slug)} onClick={() => setOpen('')}>View {category.name}<ArrowRight size={16} /></Link>
            {products.filter(product => product.category === category.slug).map(product =>
              <Link key={product.slug} to={productPath(product.slug)} onClick={() => setOpen('')}>{product.name}</Link>
            )}
          </div>
        </li>
      })}
    </ul>
  </nav>
}

export function SiteHeader() {
  const [panel, setPanel] = useState('')
  const mobile = useMedia('(max-width: 960px)')
  const { pathname } = useLocation()
  const { count, setOpen } = useEnquiry()
  const close = () => setPanel('')

  useEffect(() => {
    if (!mobile && panel === 'menu') setPanel('')
  }, [mobile, panel])
  useEffect(() => setPanel(''), [pathname])

  return <header className="site-header">
    <div className="utility-bar">
      <div className="container utility-inner">
        <span>Materials &amp; machinery for your workshop</span>
        <span><MapPin size={15} aria-hidden="true" />{business.location}</span>
      </div>
    </div>
    <div className="container nav-inner">
      <Brand />
      <CategoryNavigation />
      <div className="nav-actions">
        <button className="icon-button header-search" type="button" aria-label="Search catalogue" onClick={() => setPanel('search')}><Search size={23} /></button>
        <button className="button button-primary header-quote" type="button" onClick={() => setOpen(true)}>
          Get a Quote {count > 0 && <span className="count">{count}</span>}
        </button>
        <button className="icon-button hamburger" type="button" aria-label={count ? `Open menu, ${count} ${count === 1 ? 'item' : 'items'} in enquiry` : 'Open menu'} aria-expanded={panel === 'menu'} onClick={() => setPanel('menu')}>
          <Menu size={26} />{count > 0 && <span className="mobile-count">{count}</span>}
        </button>
      </div>
    </div>
    {panel === 'menu' && <MobileMenu onClose={close} onEnquiry={() => { close(); setOpen(true) }} />}
    {panel === 'search' && <SearchDialog onClose={close} />}
  </header>
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-inner">
      <div className="footer-brand"><Brand /><span>{business.address}</span></div>
      <nav className="footer-categories" aria-label="Footer categories">
        {categories.map(category => <Link key={category.slug} to={categoryPath(category.slug)}>{category.name}</Link>)}
      </nav>
      <nav className="footer-company" aria-label="Company">
        <Link to="/about">About</Link><Link to="/contact">Contact</Link>
        {business.facebookUrl && <a href={business.facebookUrl} aria-label="Srikantha Enterprises on Facebook" className="social-link"><Facebook size={18} /></a>}
      </nav>
    </div>
  </footer>
}
