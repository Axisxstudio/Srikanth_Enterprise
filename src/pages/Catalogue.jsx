import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { categoryBySlug, categoryPath, matchProduct, products } from '../data/catalogue'
import { Breadcrumbs, EmptyState, usePageMeta } from '../components/common'
import { ProductFilters, ProductGrid } from '../components/products'
import NotFound from './NotFound'

const pageSize = 12
const orders = ['az', 'za']

export default function Catalogue() {
  const { categorySlug } = useParams()
  const category = Object.hasOwn(categoryBySlug, categorySlug) ? categoryBySlug[categorySlug] : null
  if (categorySlug && !category) return <NotFound />
  return <CatalogueContent category={category} />
}

function CatalogueContent({ category }) {
  const [params, setParams] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const query = params.get('q') || ''
  const selected = category?.slug || (Object.hasOwn(categoryBySlug, params.get('category')) ? params.get('category') : '')
  const sort = orders.includes(params.get('sort')) ? params.get('sort') : 'featured'
  const page = Math.max(1, Number.parseInt(params.get('page'), 10) || 1)
  const title = category?.name || 'All Products'
  const description = category?.description || 'Browse boards, finishes, machinery and tools for your next workshop project.'
  usePageMeta(title, description)

  const results = products.filter(product => (!selected || product.category === selected) && matchProduct(product, query))
  if (sort === 'az') results.sort((a, b) => a.name.localeCompare(b.name))
  if (sort === 'za') results.sort((a, b) => b.name.localeCompare(a.name))
  const visible = results.slice(0, page * pageSize)

  function update(changes, replace = false) {
    const next = new URLSearchParams(params)
    if (!Object.hasOwn(changes, 'page')) next.delete('page')
    Object.entries(changes).forEach(([key, value]) => value ? next.set(key, value) : next.delete(key))
    setParams(next, { replace })
  }

  function selectCategory(slug) {
    if (!category) return update({ category: slug })
    const next = new URLSearchParams(params)
    next.delete('category')
    next.delete('page')
    navigate({ pathname: slug ? categoryPath(slug) : '/products', search: next.toString() })
  }

  function clear() {
    navigate({ pathname, search: '' })
  }

  return <div className="container route-container">
    <Breadcrumbs items={category ? [{ label: 'Products', to: '/products' }, { label: title }] : [{ label: 'Products' }]} />
    <div className="page-intro">
      <p className="eyebrow">Product Catalogue</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
    <ProductFilters query={query} onQuery={value => update({ q: value }, true)} category={selected} onCategory={selectCategory}
      sort={sort} onSort={value => update({ sort: value === 'featured' ? '' : value })} onClear={clear} />
    <p className="result-count" role="status">{results.length} {results.length === 1 ? 'product' : 'products'}{visible.length < results.length && ` · Showing ${visible.length}`}</p>
    {results.length ? <ProductGrid items={visible} /> :
      <EmptyState title="No products found" description="Try a different search or clear the filters.">
        <button className="button button-outline" type="button" onClick={clear}>Clear filters</button>
      </EmptyState>}
    {visible.length < results.length && <div className="center-action">
      <button className="button button-outline" type="button" onClick={() => update({ page: page + 1 })}>Load More Products</button>
    </div>}
  </div>
}
