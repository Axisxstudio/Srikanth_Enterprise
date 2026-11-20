import { lazy, StrictMode, Suspense, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { SiteFooter, SiteHeader } from './components/layout'
import { EnquiryProvider, useEnquiry } from './components/enquiry-state'
import { EnquiryDrawer } from './components/quote'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './styles/site.css'

const Catalogue = lazy(() => import('./pages/Catalogue'))
const Product = lazy(() => import('./pages/Product'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

function EnquiryFeedback() {
  const { notice, setOpen, open } = useEnquiry()
  return <div className={`enquiry-feedback${notice && !open ? ' visible' : ''}`}>
    <p role="status">{notice && !open ? notice.text : ''}</p>
    {notice && !open && <button className="text-link" type="button" onClick={() => setOpen(true)}>View enquiry</button>}
  </div>
}

function App() {
  const { pathname } = useLocation()
  const navType = useNavigationType()
  const previousPath = useRef(pathname)
  const main = useRef(null)
  const navState = useRef({ path: pathname, positions: new Map() })
  const { setOpen } = useEnquiry()

  useEffect(() => {
    if (previousPath.current === pathname) return
    const { positions, path } = navState.current
    positions.set(path, window.scrollY)
    navState.current.path = pathname
    previousPath.current = pathname
    setOpen(false)
    main.current?.focus({ preventScroll: true })
    window.scrollTo(0, navType === 'POP' ? positions.get(pathname) || 0 : 0)
  }, [pathname, navType, setOpen])

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    <main id="main-content" ref={main} tabIndex="-1">
      <Suspense fallback={<div className="container route-container" role="status">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Catalogue />} />
          <Route path="/category/:categorySlug" element={<Catalogue />} />
          <Route path="/products/:productSlug" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
    <SiteFooter />
    <EnquiryDrawer />
    <EnquiryFeedback />
  </>
}

createRoot(document.getElementById('root')).render(
  <StrictMode><BrowserRouter><EnquiryProvider><App /></EnquiryProvider></BrowserRouter></StrictMode>,
)
