import { createContext, useContext, useEffect, useState } from 'react'
import { productBySlug, selectedQuoteOptions } from '../data/catalogue'

const EnquiryContext = createContext(null)
const storageKey = 'ske-enquiry-v1'

const validQuantity = quantity => Number.isInteger(quantity) && quantity > 0 && quantity <= 9999

function enquiryLine(product, quantity, selection) {
  const options = selectedQuoteOptions(product, selection)
  const slug = product.slug
  const id = options.length ? `${slug}:${JSON.stringify(options.map(({ id, value }) => [id, value]))}` : slug
  return { id, slug, quantity, options: Object.fromEntries(options.map(({ id, value }) => [id, value])) }
}

function getSavedItems() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '{}')
    const rows = {}
    for (const [key, value] of Object.entries(stored)) {
      const { slug, quantity, options } = typeof value === 'number' ? { slug: key, quantity: value } : value ?? {}
      if (!Object.hasOwn(productBySlug, slug) || !validQuantity(quantity)) continue
      const row = enquiryLine(productBySlug[slug], quantity, options)
      if (rows[row.id]) row.quantity = Math.min(9999, rows[row.id].quantity + quantity)
      rows[row.id] = row
    }
    return rows
  } catch {
    return {}
  }
}

export function EnquiryProvider({ children }) {
  const [lines, setLines] = useState(getSavedItems)
  const [notice, setNotice] = useState(null)
  const [open, setOpen] = useState(false)
  const items = Object.values(lines).map(({ id, slug, quantity, options }) => ({
    id, product: productBySlug[slug], quantity, options: selectedQuoteOptions(productBySlug[slug], options),
  }))
  const count = items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(lines))
    } catch {
      // The current session remains usable when browser storage is unavailable.
    }
  }, [lines])

  useEffect(() => {
    if (!notice) return
    const timeout = setTimeout(() => setNotice(null), 4500)
    return () => clearTimeout(timeout)
  }, [notice])

  function add(product, quantity = 1, selection) {
    if (!validQuantity(quantity)) return
    const row = enquiryLine(product, quantity, selection)
    setLines(previous => ({
      ...previous, [row.id]: { ...row, quantity: Math.min(9999, (previous[row.id]?.quantity || 0) + quantity) },
    }))
    setNotice({ text: `${product.name} added to your enquiry.` })
  }

  function update(id, quantity) {
    if (!validQuantity(quantity)) return
    setLines(previous => !previous[id] || previous[id].quantity === quantity ? previous : {
      ...previous, [id]: { ...previous[id], quantity },
    })
  }

  function remove(id) {
    setLines(previous => {
      const next = { ...previous }
      delete next[id]
      return next
    })
  }

  return <EnquiryContext.Provider value={{ items, count, add, update, remove, notice, open, setOpen }}>
    {children}
  </EnquiryContext.Provider>
}

export function useEnquiry() {
  return useContext(EnquiryContext)
}
