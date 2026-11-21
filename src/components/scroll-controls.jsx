import { useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useInView } from 'motion/react'
import { useMedia } from './common'

function moveRail(row, direction, behavior = 'smooth') {
  const current = row.scrollLeft
  const start = row.getBoundingClientRect().left + parseFloat(getComputedStyle(row).paddingLeft)
  const positions = Array.from(row.children, item => current + item.getBoundingClientRect().left - start)
  const left = direction > 0
    ? positions.find(position => position > current + 2) ?? row.scrollWidth - row.clientWidth
    : positions.reverse().find(position => position < current - 2) ?? 0
  row.scrollTo({ left, behavior })
}

function AutoAdvance({ viewport, controls, label, delay }) {
  const inView = useInView(viewport, { amount: 0.25 })
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || !inView) return
    const row = viewport.current
    const hover = window.matchMedia('(hover: hover)')
    let timer

    function schedule() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (!document.hidden && !row.matches(':active, :focus-within') && !(hover.matches && row.matches(':hover'))) {
          if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 2) row.scrollTo({ left: 0, behavior: 'smooth' })
          else moveRail(row, 1)
        }
        schedule()
      }, delay)
    }

    row.addEventListener('scroll', schedule, { passive: true })
    row.addEventListener('pointerdown', schedule, { passive: true })
    schedule()
    return () => {
      clearTimeout(timer)
      row.removeEventListener('scroll', schedule)
      row.removeEventListener('pointerdown', schedule)
    }
  }, [delay, inView, paused, viewport])

  return (
    <button type="button" className="scroll-autoplay" aria-label={`${paused ? 'Resume' : 'Pause'} automatic scrolling in ${label}`}
      aria-controls={controls} onClick={() => setPaused(previous => !previous)}>
      {paused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
    </button>
  )
}

export function ScrollControls({ viewport, controls, label, autoAdvance = 0 }) {
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const [edges, setEdges] = useState({ previous: false, next: false })

  useEffect(() => {
    const row = viewport.current
    const update = () => {
      const previous = row.scrollLeft > 2
      const next = row.scrollLeft + row.clientWidth < row.scrollWidth - 2
      setEdges(current => current.previous === previous && current.next === next ? current : { previous, next })
    }
    const observer = new ResizeObserver(update)
    observer.observe(row)
    row.addEventListener('scroll', update, { passive: true })
    update()
    return () => {
      observer.disconnect()
      row.removeEventListener('scroll', update)
    }
  }, [viewport])

  if (!edges.previous && !edges.next) return null

  return (
    <div className="scroll-controls" role="group" aria-label={`Scroll ${label}`}>
      <button type="button" aria-label={`Previous in ${label}`} aria-controls={controls} disabled={!edges.previous}
        onClick={() => moveRail(viewport.current, -1, reduced ? 'auto' : 'smooth')}>Previous</button>
      <button type="button" aria-label={`Next in ${label}`} aria-controls={controls} disabled={!edges.next}
        onClick={() => moveRail(viewport.current, 1, reduced ? 'auto' : 'smooth')}>Next</button>
      {autoAdvance > 0 && !reduced && <AutoAdvance viewport={viewport} controls={controls} label={label} delay={autoAdvance} />}
    </div>
  )
}
