import { useEffect, useState } from 'react'
import { useMedia } from './common'

export function ScrollControls({ viewport, controls, label }) {
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

  function move(direction) {
    const row = viewport.current
    const current = row.scrollLeft
    const start = row.getBoundingClientRect().left + parseFloat(getComputedStyle(row).paddingLeft)
    const positions = Array.from(row.children, item => current + item.getBoundingClientRect().left - start)
    const left = direction > 0
      ? positions.find(position => position > current + 2) ?? row.scrollWidth - row.clientWidth
      : positions.reverse().find(position => position < current - 2) ?? 0
    row.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' })
  }

  if (!edges.previous && !edges.next) return null

  return (
    <div className="scroll-controls" role="group" aria-label={`Scroll ${label}`}>
      <button type="button" aria-label={`Previous in ${label}`} aria-controls={controls} disabled={!edges.previous} onClick={() => move(-1)}>Previous</button>
      <button type="button" aria-label={`Next in ${label}`} aria-controls={controls} disabled={!edges.next} onClick={() => move(1)}>Next</button>
    </div>
  )
}
