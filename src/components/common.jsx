import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, ImageOff, Layers3, PackageOpen, Settings2, SwatchBook, Wrench } from 'lucide-react'
import { motion } from 'motion/react'
import { bannerSources } from '../data/catalogue'
import { business } from '../config/business'

export function useMedia(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])
  return matches
}

export function usePageMeta(title, description, image = '/images/banners/01-home-hero.webp') {
  useEffect(() => {
    document.title = `${title} | ${business.name}`
    document.querySelector('meta[name="description"]').content = description
    document.querySelector('meta[property="og:title"]').content = document.title
    document.querySelector('meta[property="og:description"]').content = description
    document.querySelector('meta[property="og:image"]').content = new URL(image, window.location.origin).href
  }, [title, description, image])
}

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label={business.name + ' home'}>
      {business.logo ? <img src={business.logo} alt={business.name} /> : <>
        <span className="brand-name">SRIKANTHA<span>.</span></span>
        <span className="brand-sub">ENTERPRISES</span>
      </>}
    </Link>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Home</Link></li>
        {items.map(({ label, to }) => (
          <li key={label}><ChevronRight size={14} aria-hidden="true" />
            {to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function SectionHeading({ eyebrow, title, action, children }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {children}
      </div>
      {action && <Link className="text-link" to={action.to}>{action.label}<ArrowRight size={19} /></Link>}
    </div>
  )
}

export function Reveal({ children, className, delay = 0, as = 'div' }) {
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const Component = motion[as]
  return <Component className={className} initial={reduced ? false : { y: 9 }} whileInView={{ y: 0 }}
    viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? 0 : 0.34, delay: reduced ? 0 : delay }}>
    {children}
  </Component>
}

export function BannerImage({ banner, priority, sizes = '100vw', className, ...props }) {
  return <img {...bannerSources(banner)} width={banner.width} height={banner.height} sizes={sizes} alt=""
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined}
    className={className} style={{ '--focal': banner.position }} {...props} />
}

const placeholderIcons = { layers: Layers3, swatch: SwatchBook, machine: Settings2, tool: Wrench }

export function ProductImage({ image, icon, loading = 'lazy', showLabel = true }) {
  const [failedSrc, setFailedSrc] = useState('')
  const PlaceholderIcon = placeholderIcons[icon] || ImageOff
  return image && failedSrc !== image.src ? (
    <img src={image.src} alt={image.alt} width="1600" height="1600" loading={loading}
      onError={() => setFailedSrc(image.src)} />
  ) : (
    <div className="image-placeholder">
      <span className="placeholder-symbol"><PlaceholderIcon size={30} strokeWidth={1.45} aria-hidden="true" /></span>
      {showLabel && <span>Image coming soon</span>}
    </div>
  )
}

export function EmptyState({ title, description, children }) {
  return <div className="empty-state"><PackageOpen aria-hidden="true" size={29} />
    <h2>{title}</h2><p>{description}</p>{children}
  </div>
}
