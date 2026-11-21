import { useEffect, useRef, useState } from 'react'
import { preload } from 'react-dom'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { HERO_INTERVAL } from '../config/business'
import { bannerSources, banners, categoryPath } from '../data/catalogue'
import { BannerImage, useMedia } from './common'

const slides = [
  {
    label: 'Boards & Sheets',
    eyebrow: 'Srikantha Enterprises',
    heading: 'Better materials. Smarter machinery.',
    description: 'Explore boards, decorative finishes and woodworking equipment for your next project.',
    actions: [['Browse Products', '/products'], ['Request a Quote', '/contact']],
    banner: banners.workshop,
  },
  {
    label: 'Woodworking Machinery',
    eyebrow: 'Woodworking Machinery',
    heading: 'Build better.\nWork\nsmarter.',
    description: 'Machinery and materials for your next big project.',
    actions: [['Explore Machinery', categoryPath('woodworking-machinery'), ArrowRight], ['Enquire Now', '/contact']],
    banner: banners.machinery,
  },
  {
    label: 'Decorative Finishes',
    eyebrow: 'Boards & Decorative Finishes',
    heading: 'The right finish starts with the right board.',
    description: 'Discover boards and decorative materials for furniture and interior projects.',
    actions: [['Explore Boards', categoryPath('boards-sheets')], ['View Melamine & Finishes', categoryPath('melamine-finishes')]],
    banner: banners.materials,
  },
]

export function HeroCarousel() {
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const desktopMotion = useMedia('(min-width: 961px) and (prefers-reduced-motion: no-preference)')
  const { scrollY } = useScroll()
  const imageOffset = useTransform(scrollY, [0, 520], [0, 40])
  const [position, setPosition] = useState({ index: 0, revision: 0 })
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(() => !document.hidden)
  const [firstSettled, setFirstSettled] = useState(false)
  const touch = useRef(null)
  const active = slides[position.index]
  const running = visible && !hovered && !focused

  const { src, srcSet } = bannerSources(slides[0].banner)
  preload(src, { as: 'image', imageSrcSet: srcSet, imageSizes: '100vw', fetchPriority: 'high' })

  useEffect(() => {
    const handleVisibility = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  useEffect(() => {
    if (!running) return
    const timer = setTimeout(() => {
      setPosition(previous => ({ index: (previous.index + 1) % slides.length, revision: previous.revision + 1 }))
    }, HERO_INTERVAL)
    return () => clearTimeout(timer)
  }, [running, position.revision])

  function move(offset) {
    setPosition(previous => ({ index: (previous.index + offset + slides.length) % slides.length, revision: previous.revision + 1 }))
  }

  return (
    <section className="hero" aria-label="Featured ranges" aria-roledescription="carousel"
      onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true) }}
      onPointerLeave={event => { if (event.pointerType === 'mouse') setHovered(false) }}
      onFocus={() => setFocused(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
      onTouchStart={event => { touch.current = [event.changedTouches[0].clientX, event.changedTouches[0].clientY] }}
      onTouchCancel={() => { touch.current = null }}
      onTouchEnd={event => {
        if (!touch.current) return
        const x = event.changedTouches[0].clientX - touch.current[0]
        const y = event.changedTouches[0].clientY - touch.current[1]
        touch.current = null
        if (Math.abs(x) > 55 && Math.abs(x) > Math.abs(y) * 1.5) move(x < 0 ? 1 : -1)
      }}>
      <div className="hero-stage">
        <motion.div className={`hero-images${desktopMotion ? ' hero-images-scroll' : ''}`} aria-hidden="true"
          style={desktopMotion ? { y: imageOffset } : undefined}>
          {slides.map(({ banner }, index) => (index === 0 || position.index === index || firstSettled) && (
            <BannerImage key={banner.file} banner={banner} priority={index === 0}
              className={`hero-image hero-image-${index}${position.index === index ? ' is-active' : ''}`}
              onLoad={index === 0 ? () => setFirstSettled(true) : undefined}
              onError={index === 0 ? () => setFirstSettled(true) : undefined} />
          ))}
        </motion.div>
        <div className="hero-overlay" />
        <div className="container hero-inner">
          <div className="hero-copy" aria-live={running ? 'off' : 'polite'} role="group"
            aria-roledescription="slide" aria-label={`${position.index + 1} of ${slides.length}`}>
            <motion.div key={position.index} initial={reduced ? false : { opacity: 0.5, y: 8 }}
              animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.38 }}>
              <p className="eyebrow">{active.eyebrow}</p>
              <h1>{active.heading}</h1>
              <p className="hero-description">{active.description}</p>
              <div className="hero-actions">
                {active.actions.map(([label, path, Icon], index) => (
                  <Link key={path} className={`button ${index === 0 ? 'button-primary' : 'button-light-outline'}`} to={path}>
                    {label}{Icon && <Icon size={19} aria-hidden="true" />}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="hero-index">
        <div className="container hero-indicators" aria-label="Choose a slide">
          {slides.map((slide, index) => (
            <button type="button" key={slide.label} aria-current={position.index === index ? 'true' : undefined}
              onClick={() => setPosition(previous => ({ index, revision: previous.revision + 1 }))}>
              <span className="indicator-number">0{index + 1}</span><span className="indicator-divider" aria-hidden="true">/</span><span>{slide.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
