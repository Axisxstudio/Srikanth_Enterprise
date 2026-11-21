import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, useScroll } from 'motion/react'
import {
  ArrowRight,
  ChevronDown,
  Clock,
  ExternalLink,
  Facebook,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react'
import { business } from '../config/business'
import { categories, categoryPath, productPath, products } from '../data/catalogue'
import { Brand, useMedia } from './common'
import { MobileMenu } from './dialogs'
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

  return (
    <nav className="desktop-nav" ref={nav} aria-label="Product categories">
      <ul>
        {categories.map(category => {
          const expanded = open === category.slug
          const panelId = `dropdown-${category.slug}`
          const active = pathname === categoryPath(category.slug)
          return (
            <li key={category.slug} className="nav-entry"
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
          )
        })}
      </ul>
    </nav>
  )
}

function HomeScrollProgress() {
  const { scrollYProgress } = useScroll()
  return <motion.div className="home-scroll-progress" aria-hidden="true" style={{ scaleX: scrollYProgress }} />
}

export function SiteHeader() {
  const [panel, setPanel] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchInputRef = useRef(null)
  const searchToggleRef = useRef(null)
  const restoreSearchFocus = useRef(false)
  const mobile = useMedia('(max-width: 960px)')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { count, setOpen } = useEnquiry()
  const close = () => setPanel('')

  const previousPath = useRef(pathname)
  useEffect(() => {
    if (!mobile && panel === 'menu') setPanel('')
  }, [mobile, panel])

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname
      setPanel('')
      setSearchOpen(false)
    }
  }, [pathname])

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus()
    } else if (restoreSearchFocus.current) {
      restoreSearchFocus.current = false
      searchToggleRef.current?.focus()
    }
  }, [searchOpen])

  function handleSearchSubmit(event) {
    event.preventDefault()
    const trimmed = query.trim()
    setSearchOpen(false)
    if (trimmed) {
      navigate(`/products?q=${encodeURIComponent(trimmed)}`)
    } else {
      navigate('/products')
    }
  }

  function closeSearch() {
    restoreSearchFocus.current = true
    setSearchOpen(false)
  }

  function handleSearchKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeSearch()
    }
  }

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Materials &amp; machinery for your workshop</span>
          <span><MapPin size={15} aria-hidden="true" />{business.location}</span>
        </div>
      </div>
      <div className={`container nav-inner${searchOpen ? ' is-search-open' : ''}`}>
        <Brand />

        {!searchOpen && <CategoryNavigation />}

        <div id="header-catalogue-search" className={`nav-search-wrapper${searchOpen ? ' is-active' : ''}`}>
          <form className="nav-search-form" role="search" aria-label="Catalogue" onSubmit={handleSearchSubmit} onKeyDown={handleSearchKeyDown}>
            <Search size={19} className="nav-search-icon" aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="search"
              className="nav-search-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={mobile ? 'Search products…' : 'Search products, materials, machinery…'}
              aria-label="Search catalogue"
            />
            {query && (
              <button
                type="button"
                className="nav-search-clear"
                onClick={() => { setQuery(''); searchInputRef.current?.focus() }}
                aria-label="Clear search text"
              >
                <X size={16} />
              </button>
            )}
            <button type="submit" className="button button-primary nav-search-submit">Search</button>
            <button
              type="button"
              className="icon-button nav-search-close"
              onClick={closeSearch}
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </form>
        </div>

        <div className="nav-actions">
          {!searchOpen && (
            <button
              ref={searchToggleRef}
              className="icon-button header-search"
              type="button"
              aria-label="Search catalogue"
              aria-controls="header-catalogue-search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={22} />
            </button>
          )}
          <button className="button button-primary header-quote" type="button" onClick={() => setOpen(true)}>
            Get a Quote {count > 0 && <span className="count">{count}</span>}
          </button>
          <button className="icon-button hamburger" type="button" aria-label={count ? `Open menu, ${count} ${count === 1 ? 'item' : 'items'} in enquiry` : 'Open menu'} aria-expanded={panel === 'menu'} onClick={() => setPanel('menu')}>
            <Menu size={26} />{count > 0 && <span className="mobile-count">{count}</span>}
          </button>
        </div>
      </div>
      {pathname === '/' && <HomeScrollProgress />}
      {panel === 'menu' && <MobileMenu onClose={close} onEnquiry={() => { close(); setOpen(true) }} />}
    </header>
  )
}

export function SiteFooter() {
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent('Hello Srikantha Enterprises, I would like to inquire about your products.')}`

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        {/* Col 1: Brand & About */}
        <div className="footer-col footer-col-brand">
          <Brand />
          <p className="footer-tagline">
            Materials &amp; machinery for your workshop. Trusted supplier of boards, melamine finishes and woodworking equipment in Sri Lanka since 1998.
          </p>
          <div className="footer-trust-links">
            <a
              href={business.rainbowPagesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rainbow-pages-badge"
              title="Verified in SLT Rainbow Pages"
            >
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Verified on SLT Rainbow Pages</span>
              <ExternalLink size={12} aria-hidden="true" />
            </a>
            {business.facebookUrl && (
              <a
                href={business.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-facebook-link"
                aria-label="Srikantha Enterprises on Facebook"
              >
                <Facebook size={16} aria-hidden="true" />
                <span>Follow on Facebook</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* Col 2: Categories */}
        <div className="footer-col">
          <h3 className="footer-heading">Product Categories</h3>
          <ul className="footer-links">
            {categories.map(category => (
              <li key={category.slug}>
                <Link to={categoryPath(category.slug)}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div className="footer-col">
          <h3 className="footer-heading">Company &amp; Help</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/about">About Srikantha Enterprises</Link></li>
            <li><Link to="/contact">Request a Quote</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact Information */}
        <div className="footer-col footer-col-contact">
          <h3 className="footer-heading">Contact Information</h3>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={17} className="contact-icon" aria-hidden="true" />
              <div>
                <span>{business.address}</span>
                <a
                  href={business.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-map-link"
                >
                  📍 Find on Google Maps <ExternalLink size={12} />
                </a>
              </div>
            </li>
            <li>
              <Phone size={17} className="contact-icon" aria-hidden="true" />
              <div>
                <span className="contact-label">Telephone:</span>
                <a href="tel:0112642829" className="contact-phone-link">011 264 2829</a>
              </div>
            </li>
            <li>
              <Smartphone size={17} className="contact-icon" aria-hidden="true" />
              <div>
                <span className="contact-label">Mobile / WhatsApp:</span>
                <a href="tel:0777755880" className="contact-phone-link">077 775 5880</a>
              </div>
            </li>
            <li>
              <Clock size={17} className="contact-icon" aria-hidden="true" />
              <div>
                <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved. Since 1998.</p>
          <div className="footer-bottom-links">
            <span>Rawathawatta, Moratuwa, Sri Lanka</span>
            <span>•</span>
            <a href={business.rainbowPagesUrl} target="_blank" rel="noopener noreferrer">SLT Rainbow Pages Listed</a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        className="whatsapp-float"
        aria-label="Chat with Srikantha Enterprises on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  )
}
