export const banners = {
  workshop: { file: '01-home-hero', width: 1920, height: 800, position: '74% center' },
  machinery: { file: '02-machinery-banner', width: 1920, height: 720, position: '75% center' },
  materials: { file: '03-board-display-banner', width: 1600, height: 961, position: '75% 61%' },
}

export const categories = [
  { slug: 'boards-sheets', name: 'Boards & Sheets', icon: 'layers', imageProduct: 'hmr-boards', description: 'Board and sheet materials for furniture, interiors and workshop projects.' },
  { slug: 'melamine-finishes', name: 'Melamine & Finishes', icon: 'swatch', imageProduct: 'white-mdf-melamine', description: 'Explore decorative boards, woodgrain finishes and edge bands.' },
  { slug: 'woodworking-machinery', name: 'Woodworking Machinery', icon: 'machine', imageProduct: 'multi-boring-machine', description: 'Find equipment for cutting panels, applying edge bands and drilling.' },
  { slug: 'tools-handling', name: 'Tools & Handling', icon: 'tool', imageProduct: 'pallet-truck', description: 'Browse tools for finishing and material handling around the workshop.' },
]

const [boards, finishes, machinery, tools] = categories.map(category => category.slug)
const photo = (folder, view, alt, role = 'product') => ({
  src: `/images/products/${folder}/${folder}-${view}.webp`,
  alt,
  role,
  approval: 'approved',
})

function entry(slug, name, category, description, options = {}) {
  return { id: slug, slug, name, category, description, specifications: {}, images: [], assetKey: slug, featured: false, ...options }
}

export const products = [
  entry('hmr-boards', 'HMR Boards', boards, 'High moisture resistance (HMR) boards for furniture and interior projects.', {
    featured: true, images: [photo('hmr-boards', 'board-detail', 'Edges of stacked green HMR boards', 'detail')],
  }),
  entry('osb-boards', 'OSB Boards', boards, 'Oriented strand board (OSB) with a visible wood-strand surface.', {
    featured: true, images: [photo('osb-boards', 'board-edge-detail', 'Wood strands and edges of stacked OSB sheets', 'detail')],
  }),
  entry('pvc-eco-boards', 'PVC Eco Boards', boards, 'PVC sheet material for cabinetry and interior projects.', {
    featured: true, assetKey: 'pvc-eco-board', specifications: { Material: 'PVC' }, images: [photo('pvc-eco-board', 'main', 'Stack of white PVC Eco boards')],
  }),
  entry('white-mdf-melamine', 'White MDF Melamine', finishes, 'MDF board with a white melamine finish for furniture and interior panels.', {
    featured: true, specifications: { Core: 'MDF', Finish: 'White melamine' }, images: [photo('white-mdf-melamine', 'main', 'White melamine boards showing their MDF edges')],
  }),
  entry('jungle-teak-melamine', 'Jungle Teak Melamine', finishes, 'Melamine board in a Jungle Teak woodgrain finish.', {
    featured: true, specifications: { Finish: 'Jungle Teak woodgrain' }, images: [photo('jungle-teak-melamine', 'main', 'Jungle Teak woodgrain melamine board')],
  }),
  entry('high-gloss-white-melamine', 'High-gloss White Melamine', finishes, 'White melamine with a high-gloss surface for furniture and cabinets.', {
    featured: true, specifications: { Finish: 'High-gloss white melamine' }, images: [photo('high-gloss-white-melamine', 'application-kitchen-close', 'Example of glossy white melamine used on kitchen cabinet fronts', 'application')],
  }),
  entry('pvc-edge-bands', 'PVC Edge Bands', finishes, 'PVC bands for finishing exposed board edges.', {
    featured: true, assetKey: 'pvc-edge-band', specifications: { Material: 'PVC' }, images: [photo('pvc-edge-band', 'main', 'PVC edge band rolls in solid and wood-look finishes')],
  }),
  entry('fully-automatic-edge-bander', 'Fully Automatic Edge Bander', machinery, 'An automatic machine for applying edge banding to panel edges.', { featured: true }),
  entry('sliding-table-panel-saw', 'Sliding Table Panel Saw', machinery, 'A woodworking saw with a sliding table for cutting panels.', { featured: true, assetKey: 'sliding-table-panel-saw-3200' }),
  entry('portable-edge-bander', 'Portable Edge Bander', machinery, 'Portable equipment for applying edging to furniture panels.', {
    featured: true, images: [photo('portable-edge-bander', 'main', 'Portable edge bander shown from the front')],
  }),
  entry('pneumatic-trimming-tool', 'Pneumatic Trimming Tool', tools, 'An air-powered hand tool for trimming and finishing edges.', { featured: true, specifications: { Power: 'Pneumatic' } }),
  entry('pallet-truck', 'Pallet Truck', tools, 'A workshop and warehouse tool for moving palletised materials.', {
    featured: true, images: [photo('pallet-truck', 'application-warehouse', 'Example of a pallet truck in warehouse use', 'application')],
  }),
  entry('hardboard', 'Hardboard', boards, 'A dense wood-fibre sheet with a smooth face.', {
    images: [photo('hardboard', 'main', 'Brown hardboard sheets'), photo('hardboard', 'stack-detail', 'Close view of stacked hardboard edges', 'detail')],
  }),
  entry('cmp-sheets', 'CMP Sheets', boards, 'Sheet material for furniture and interior projects, shown in a dark finish.', {
    assetKey: 'cmp-sheet', images: [photo('cmp-sheet', 'product-detail', 'Edge and surface of a dark CMP sheet', 'detail'), photo('cmp-sheet', 'application-kitchen', 'Example of dark CMP sheets used in a kitchen', 'application')],
  }),
  entry('melamine-mdf', 'Melamine MDF', finishes, 'Melamine-faced MDF in a light woodgrain finish.', {
    assetKey: 'melamine-mdf-light-wood', specifications: { Core: 'MDF', Finish: 'Light woodgrain' },
  }),
  entry('white-melamine', 'White Melamine', finishes, 'White melamine board for furniture and interior surfaces.', {
    specifications: { Finish: 'White melamine' }, images: [photo('white-melamine', 'main', 'Plain white melamine board')],
  }),
  entry('four-function-edge-bander', 'Four-function Edge Banding Machine', machinery, 'An edge banding machine for applying and finishing panel edging.', {
    specifications: { Functions: 'Gluing, fine trimming, scraping and buffing' },
  }),
  entry('table-edge-bander', 'Table Edge Bander', machinery, 'A table-style machine for applying edge banding to panels.'),
  entry('portable-panel-saw', 'Portable Panel Saw', machinery, 'A portable saw for cutting panels in woodworking projects.', {
    images: [photo('portable-panel-saw', 'saw-table-detail', 'Close view of the portable panel saw table', 'detail')],
  }),
  entry('multi-boring-machine', 'Multi-boring Machine', machinery, 'A multi-boring machine for drilling multiple holes in woodworking panels.', {
    specifications: { 'Model shown': 'MZ73212' }, images: [photo('multi-boring-machine', 'main', 'Front view of the MZ73212 multi-boring machine')],
  }),
]

export const categoryBySlug = Object.fromEntries(categories.map(category => [category.slug, category]))
export const productBySlug = Object.fromEntries(products.map(product => [product.slug, product]))
export const approvedImages = product => product.images.filter(image => image.approval === 'approved')
export const categoryPath = slug => `/category/${slug}`
export const productPath = slug => `/products/${slug}`

export function matchProduct(product, query) {
  const text = [product.name, categoryBySlug[product.category].name, product.description, ...Object.values(product.specifications)]
    .join(' ').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ')
  const terms = query.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []
  return terms.every(term => text.includes(term))
}

export function bannerSources(banner) {
  const base = `/images/banners/${banner.file}`
  return { src: `${base}.webp`, srcSet: `${base}-768w.webp 768w, ${base}-1280w.webp 1280w, ${base}.webp ${banner.width}w` }
}
