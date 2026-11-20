import { createContext, useContext, useEffect, useState } from 'react'
import { productBySlug } from '../data/catalogue'

const EnquiryContext = createContext(null)
const storageKey = 'ske-enquiry-v1'

function getSavedItems() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '{}')
    return Object.fromEntries(Object.entries(stored).filter(([slug, quantity]) =>
      Object.hasOwn(productBySlug, slug) && Number.isInteger(quantity) && quantity > 0 && quantity <= 9999))
  } catch {
    return {}
  }
}

export function EnquiryProvider({ children }) {
  const [quantities, setQuantities] = useState(getSavedItems)
  const [notice, setNotice] = useState(null)
  const [open, setOpen] = useState(false)
  const items = Object.entries(quantities).map(([slug, quantity]) => ({ product: productBySlug[slug], quantity }))
  const count = items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(quantities))
    } catch {
      // The current session remains usable when browser storage is unavailable.
    }
  }, [quantities])

  useEffect(() => {
    if (!notice) return
    const timeout = setTimeout(() => setNotice(null), 4500)
    return () => clearTimeout(timeout)
  }, [notice])

  function add(product, quantity = 1) {
    setQuantities(previous => ({
      ...previous, [product.slug]: Math.min(9999, (previous[product.slug] || 0) + quantity),
    }))
    setNotice({ text: `${product.name} added to your enquiry.` })
  }

  function update(slug, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 9999) return
    setQuantities(previous => ({ ...previous, [slug]: quantity }))
  }

  function remove(slug) {
    setQuantities(previous => {
      const next = { ...previous }
      delete next[slug]
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
