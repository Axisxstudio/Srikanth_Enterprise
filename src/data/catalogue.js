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
const photo = (folder, view, alt, role = 'product', previewWidth) => ({
  src: view ? `/images/products/${folder}/${folder}-${view}.webp` : `/images/products/${folder}/${folder}.webp`,
  alt,
  role,
  previewWidth,
  approval: 'approved',
})

function entry(slug, name, category, description, options = {}) {
  return { id: slug, slug, name, category, description, specifications: {}, images: [], assetKey: slug, featured: false, ...options }
}

export const products = [
  // ── Boards & Sheets ────────────────────────────────────────────────────────
  entry('hmr-boards', 'HMR Boards', boards, 'High moisture resistance (HMR) boards for kitchens, bathrooms and humid-area furniture.', {
    featured: true,
    overview: {
      title: 'Built to handle moisture.',
      description: 'HMR boards are engineered for high-humidity environments such as kitchens and bathrooms. The green-tinted core resists swelling and warping, making them the reliable choice for cabinet carcasses and interior furniture where moisture is a concern.',
    },
    specifications: {
      'Sheet size': '8 × 4 ft',
      'Thickness options': '9, 12, 15, 18 mm',
      Material: 'High Moisture Resistance (HMR) particleboard',
      Finish: 'Raw / uncoated',
    },
    quoteOptions: [
      { id: 'sheet-size', label: 'Sheet size', values: ['8 × 4 ft'], control: 'select' },
      { id: 'thickness', label: 'Thickness', values: ['9 mm', '12 mm', '15 mm', '18 mm'], defaultValue: '18 mm' },
    ],
    images: [
      photo('hmr-boards', '', 'High Moisture Resistance HMR boards'),
      photo('hmr-boards', 'board-detail', 'Edges of stacked green HMR boards', 'detail'),
    ],
  }),

  entry('osb-boards', 'OSB Boards', boards, 'Oriented strand board (OSB) with a visible wood-strand surface for structural and decorative use.', {
    featured: true,
    overview: {
      title: 'Strength in every strand.',
      description: 'OSB (Oriented Strand Board) is made by compressing layers of wood strands in alternating orientations. It offers excellent structural strength and is widely used in flooring, roofing, wall sheathing and industrial shelving. The distinctive textured surface also works well for rustic interior projects.',
    },
    specifications: {
      'Sheet size': '8 × 4 ft',
      'Thickness options': '9, 12, 15, 18 mm',
      Material: 'Oriented Strand Board (OSB)',
      Finish: 'Raw wood-strand face',
    },
    quoteOptions: [
      { id: 'sheet-size', label: 'Sheet size', values: ['8 × 4 ft'], control: 'select' },
      { id: 'thickness', label: 'Thickness', values: ['9 mm', '12 mm', '15 mm', '18 mm'], defaultValue: '18 mm' },
    ],
    images: [
      photo('osb-boards', '', 'Oriented Strand Board (OSB) sheets'),
      photo('osb-boards', 'board-edge-detail', 'Wood strands and edges of stacked OSB sheets', 'detail'),
    ],
  }),

  entry('pvc-eco-boards', 'PVC Eco Boards', boards, 'Lightweight PVC sheet boards for cabinetry, wet areas and interior projects.', {
    featured: true,
    assetKey: 'pvc-eco-board',
    overview: {
      title: 'Waterproof and easy to work with.',
      description: 'PVC Eco Boards are a lightweight, fully waterproof alternative to wood-based panels. They resist moisture, termites and rot — ideal for bathroom vanities, outdoor furniture and any application where conventional boards would degrade. Easy to cut, drill and finish.',
    },
    specifications: {
      'Sheet size': '8 × 4 ft',
      'Thickness options': '5, 8, 10, 12, 15, 18 mm',
      Material: 'PVC (Polyvinyl Chloride)',
      Finish: 'Smooth white face',
    },
    quoteOptions: [
      { id: 'sheet-size', label: 'Sheet size', values: ['8 × 4 ft'], control: 'select' },
      { id: 'thickness', label: 'Thickness', values: ['5 mm', '8 mm', '10 mm', '12 mm', '15 mm', '18 mm'], defaultValue: '12 mm' },
    ],
    images: [
      photo('pvc-eco-board', '', 'Stack of white PVC Eco boards'),
      photo('pvc-eco-board', 'main', 'Stack of white PVC Eco boards', 'product', 900),
    ],
  }),

  entry('hardboard', 'Hardboard', boards, 'A dense, smooth-faced wood-fibre sheet for backing panels, templates and light-duty shelving.', {
    overview: {
      title: 'A smooth, dense panel for everyday use.',
      description: 'Hardboard is a high-density wood-fibre panel with a smooth face and a textured reverse. Its consistent thickness and flat surface make it ideal for backing cabinets and wardrobes, drawer bases, templates and thin panel applications. Confirm the available sizes and thickness with our team.',
    },
    specifications: {
      'Sheet size': '8 × 4 ft',
      'Thickness options': '3, 4 mm',
      Material: 'High-density wood fibre (HDF)',
      Finish: 'Smooth face / rough back',
    },
    quoteOptions: [
      { id: 'sheet-size', label: 'Sheet size', values: ['8 × 4 ft'], control: 'select' },
      { id: 'thickness', label: 'Thickness', values: ['3 mm', '4 mm'], defaultValue: '4 mm' },
    ],
    images: [
      photo('hardboard', '', 'High-density hardboard panel sheets'),
      photo('hardboard', 'main', 'Brown hardboard sheets'),
      photo('hardboard', 'stack-detail', 'Close view of stacked hardboard edges', 'detail'),
    ],
  }),

  entry('cmp-sheets', 'CMP Sheets', boards, 'Colour-matched panels (CMP) for furniture, interior joinery and cabinet carcasses.', {
    assetKey: 'cmp-sheet',
    overview: {
      title: 'Colour-matched for clean interiors.',
      description: 'CMP sheets are pre-laminated panels with a solid colour finish on both faces, designed for cabinet carcasses, shelving and interior joinery where a clean, finished look is required inside and out. Ask our team about available colours and board sizes.',
    },
    specifications: {
      'Sheet size': '8 × 4 ft',
      'Thickness options': '9, 12, 15, 18 mm',
      Material: 'Particle board core with laminate faces',
      Finish: 'Solid colour laminate (both faces)',
    },
    quoteOptions: [
      { id: 'sheet-size', label: 'Sheet size', values: ['8 × 4 ft'], control: 'select' },
      { id: 'thickness', label: 'Thickness', values: ['9 mm', '12 mm', '15 mm', '18 mm'], defaultValue: '18 mm' },
    ],
    images: [
      photo('cmp-sheet', '', 'Colour-matched panel (CMP) sheets'),
      photo('cmp-sheet', 'product-detail', 'Edge and surface of a dark CMP sheet', 'detail'),
      photo('cmp-sheet', 'application-kitchen', 'Example of dark CMP sheets used in a kitchen', 'application'),
    ],
  }),

  // ── Melamine & Finishes ───────────────────────────────────────────────────
  entry('white-mdf-melamine', 'White MDF Melamine', finishes, 'White-faced MDF boards for furniture and interior applications.', {
    featured: true,
    overview: {
      title: 'A clean finish for your next project.',
      description: 'Explore white MDF melamine for cabinetry, shelving and interior furniture. Confirm the required thickness and application with our team before ordering.',
    },
    specifications: {
      'Sheet size': '8 × 4 ft',
      'Thickness options': '5, 9, 12, 15, 18 mm',
      Finish: 'White melamine',
    },
    quoteOptions: [
      { id: 'sheet-size', label: 'Sheet size', values: ['8 × 4 ft'], control: 'select' },
      { id: 'thickness', label: 'Thickness', values: ['5 mm', '9 mm', '12 mm', '15 mm', '18 mm'], defaultValue: '18 mm' },
    ],
    images: [
      photo('white-mdf-melamine', '', 'White MDF Melamine boards'),
      photo('white-mdf-melamine', 'main', 'White melamine boards showing their MDF edges'),
    ],
  }),

  entry('jungle-teak-melamine', 'Jungle Teak Melamine', finishes, 'Melamine board in a rich Jungle Teak woodgrain finish for furniture and interior panels.', {
    featured: true,
    overview: {
      title: 'Warm woodgrain for every interior.',
      description: 'Jungle Teak Melamine brings a rich, natural teak texture to furniture, wardrobe panels and interior joinery — without the cost of solid timber. The melamine surface is easy to clean and durable for everyday use. Confirm sheet size and thickness availability with our team.',
    },
    specifications: {
      'Sheet size': '8 × 4 ft',
      'Thickness options': '9, 12, 15, 18 mm',
      Finish: 'Jungle Teak woodgrain',
    },
    quoteOptions: [
      { id: 'sheet-size', label: 'Sheet size', values: ['8 × 4 ft'], control: 'select' },
      { id: 'thickness', label: 'Thickness', values: ['9 mm', '12 mm', '15 mm', '18 mm'], defaultValue: '18 mm' },
    ],
    images: [
      photo('jungle-teak-melamine', '', 'Jungle Teak woodgrain melamine board'),
      photo('jungle-teak-melamine', 'main', 'Jungle Teak woodgrain melamine board surface'),
    ],
  }),

  entry('high-gloss-white-melamine', 'High-gloss White Melamine', finishes, 'White melamine with a high-gloss surface for modern furniture and kitchen cabinets.', {
    featured: true,
    overview: {
      title: 'A mirror-smooth finish for modern spaces.',
      description: 'High-gloss white melamine delivers a sleek, reflective surface that suits contemporary kitchens, wardrobe doors and display cabinetry. The durable gloss face resists fingerprints and is easy to wipe clean. Confirm thickness and sheet availability before ordering.',
    },
    specifications: {
      'Sheet size': '8 × 4 ft',
      'Thickness options': '9, 12, 15, 18 mm',
      Finish: 'High-gloss white melamine',
    },
    quoteOptions: [
      { id: 'sheet-size', label: 'Sheet size', values: ['8 × 4 ft'], control: 'select' },
      { id: 'thickness', label: 'Thickness', values: ['9 mm', '12 mm', '15 mm', '18 mm'], defaultValue: '18 mm' },
    ],
    images: [
      photo('high-gloss-white-melamine', '', 'High-gloss White Melamine board'),
      photo('high-gloss-white-melamine', 'application-kitchen-close', 'Example of glossy white melamine used on kitchen cabinet fronts', 'application'),
    ],
  }),

  entry('melamine-mdf', 'Melamine MDF', finishes, 'Melamine-faced MDF in a light woodgrain finish for furniture and interior panels.', {
    assetKey: 'melamine-mdf-light-wood',
    overview: {
      title: 'A natural woodgrain on a stable core.',
      description: 'Melamine MDF pairs a smooth MDF core with a light woodgrain melamine surface — ideal for shelving, cabinet doors and interior joinery that requires a consistent finish and stable dimensions. Contact our team to confirm available colours, sheet sizes and thicknesses.',
    },
    specifications: {
      'Sheet size': '8 × 4 ft',
      'Thickness options': '9, 12, 15, 18 mm',
      Core: 'MDF',
      Finish: 'Light woodgrain melamine',
    },
    quoteOptions: [
      { id: 'sheet-size', label: 'Sheet size', values: ['8 × 4 ft'], control: 'select' },
      { id: 'thickness', label: 'Thickness', values: ['9 mm', '12 mm', '15 mm', '18 mm'], defaultValue: '18 mm' },
    ],
    images: [photo('melamine-mdf-light-wood', '', 'Melamine MDF board with light woodgrain finish')],
  }),

  entry('white-melamine', 'White Melamine', finishes, 'White melamine board for furniture, shelving and interior surfaces.', {
    overview: {
      title: 'A versatile white finish board.',
      description: 'White melamine boards are a cost-effective solution for shelving, cabinet interiors and furniture panels where a plain, clean finish is required. The melamine surface is easy to clean and resists everyday wear. Ask our team about sheet sizes and thickness options.',
    },
    specifications: {
      'Sheet size': '8 × 4 ft',
      'Thickness options': '9, 12, 15, 18 mm',
      Finish: 'White melamine',
    },
    quoteOptions: [
      { id: 'sheet-size', label: 'Sheet size', values: ['8 × 4 ft'], control: 'select' },
      { id: 'thickness', label: 'Thickness', values: ['9 mm', '12 mm', '15 mm', '18 mm'], defaultValue: '18 mm' },
    ],
    images: [
      photo('white-melamine', '', 'Plain white melamine board'),
      photo('white-melamine', 'main', 'White melamine board surface'),
    ],
  }),

  entry('pvc-edge-bands', 'PVC Edge Bands', finishes, 'PVC edge bands for finishing exposed board edges in a range of colours and woodgrain patterns.', {
    featured: true,
    assetKey: 'pvc-edge-band',
    overview: {
      title: 'The finishing touch for every panel.',
      description: 'PVC edge bands seal and protect exposed board edges on melamine, MDF and particleboard panels. Available in solid colours and woodgrain patterns to match common board finishes. Confirm compatibility with your board colour and banding machine before ordering.',
    },
    specifications: {
      Material: 'PVC (Polyvinyl Chloride)',
      'Thickness options': '0.4, 1, 2 mm',
      'Width options': '19, 22, 44 mm',
      Finish: 'Solid colours and woodgrain patterns',
    },
    images: [
      photo('pvc-edge-band', '', 'PVC edge band rolls in solid and wood-look finishes', 'product', 950),
      photo('pvc-edge-band', 'main', 'PVC edge band rolls in solid and wood-look finishes', 'product', 950),
    ],
  }),

  // ── Woodworking Machinery ─────────────────────────────────────────────────
  entry('fully-automatic-edge-bander', 'Fully Automatic Edge Bander', machinery, 'An automatic machine for gluing, trimming and buffing edge banding on panel edges.', {
    featured: true,
    overview: {
      title: 'Professional edge banding, automated.',
      description: 'The fully automatic edge bander handles gluing, end trimming, flush trimming, corner rounding and buffing in a single pass — delivering a factory-quality edge finish at high throughput. Suitable for furniture workshops and production facilities. Contact our team to confirm model specifications and availability.',
    },
    specifications: {
      Operation: 'Fully automatic',
      Functions: 'Gluing, end trimming, flush trimming, corner rounding, buffing',
      'Edge band compatibility': 'PVC, ABS, veneer',
    },
    images: [photo('fully-automatic-edge-bander', '', 'Fully automatic edge bander machine for professional panel edging')],
  }),

  entry('sliding-table-panel-saw', 'Sliding Table Panel Saw', machinery, 'A woodworking saw with a sliding table for accurate rip and cross-cuts on large panels.', {
    featured: true,
    assetKey: 'sliding-table-panel-saw-3200',
    overview: {
      title: 'Precision panel cutting for the workshop.',
      description: 'The sliding table panel saw is the centrepiece of any panel processing workshop, enabling accurate rip cuts, cross-cuts and angle cuts on full sheets. The sliding table supports large panels throughout the cut for consistent, square results. Contact our team to confirm the available model and blade specifications.',
    },
    specifications: {
      Operation: 'Manual sliding table',
      'Sliding table length': '3200 mm (model shown)',
      'Blade diameter': '300 mm (typical)',
    },
    images: [photo('sliding-table-panel-saw-3200', '', 'Industrial sliding table panel saw with 3200 mm sliding table')],
  }),

  entry('portable-edge-bander', 'Portable Edge Bander', machinery, 'Portable equipment for applying PVC edge banding to furniture panels on-site or in small workshops.', {
    featured: true,
    overview: {
      title: 'Edge banding wherever you need it.',
      description: 'The portable edge bander lets small workshops and site joiners apply professional PVC edge banding without a fixed machine. Compact and easy to set up, it handles straight panel edges and common PVC band widths. Ask our team about compatible edge band thicknesses and feed speeds.',
    },
    specifications: {
      Operation: 'Portable / handheld-feed',
      'Edge band compatibility': 'PVC up to 2 mm thick',
    },
    images: [
      photo('portable-edge-bander', '', 'Portable edge bander machine for workshop and site work'),
      photo('portable-edge-bander', 'main', 'Portable edge bander shown from the front'),
    ],
  }),

  entry('four-function-edge-bander', 'Four-function Edge Banding Machine', machinery, 'An edge banding machine that glues, trims, scrapes and buffs panel edges in sequence.', {
    overview: {
      title: 'Four steps to a finished edge.',
      description: 'The four-function edge banding machine performs gluing, fine trimming, edge scraping and surface buffing — producing a smooth, clean edge finish on melamine and MDF panels. Ideal for mid-size furniture workshops needing consistent output without a fully automatic line.',
    },
    specifications: {
      Functions: 'Gluing, fine trimming, scraping and buffing',
      'Edge band compatibility': 'PVC, ABS',
    },
    images: [photo('four-function-edge-bander', '', 'Four-function edge banding machine for gluing, trimming, scraping and buffing')],
  }),

  entry('table-edge-bander', 'Table Edge Bander', machinery, 'A table-mounted machine for applying and trimming edge banding on furniture panels.', {
    overview: {
      title: 'A table-style solution for edge banding.',
      description: 'The table edge bander is mounted on a fixed stand for stable, repeatable edge banding of furniture panels. It applies and trims PVC banding with consistent results, making it a practical upgrade for workshops moving beyond portable equipment. Confirm model specifications with our team.',
    },
    specifications: {
      Operation: 'Table-mounted',
      'Edge band compatibility': 'PVC up to 2 mm thick',
    },
    images: [photo('table-edge-bander', '', 'Table-mounted edge bander machine on workshop stand')],
  }),

  entry('portable-panel-saw', 'Portable Panel Saw', machinery, 'A portable saw for cutting full-size panels accurately in the workshop or on-site.', {
    overview: {
      title: 'Accurate cuts wherever you work.',
      description: 'The portable panel saw allows accurate cutting of large boards and panels without a fixed sliding table saw. It is well-suited for site work and smaller workshops where space is limited. Contact our team to confirm the cutting capacity and blade size.',
    },
    specifications: {
      Operation: 'Portable',
      'Typical cut capacity': 'Full 8 × 4 ft sheet',
    },
    images: [
      photo('portable-panel-saw', '', 'Portable panel saw machine for precision cuts'),
      photo('portable-panel-saw', 'saw-table-detail', 'Close view of the portable panel saw table', 'detail'),
    ],
  }),

  entry('multi-boring-machine', 'Multi-boring Machine', machinery, 'A multi-boring machine for drilling rows of shelf-pin and fitting holes in furniture panels.', {
    overview: {
      title: 'Drill multiple holes in a single pass.',
      description: 'The multi-boring machine drills evenly spaced rows of holes for shelf pins, cabinet hinges and hardware fittings in a single operation. It is essential for high-volume cabinet production, dramatically reducing drilling time compared to handheld methods. Model MZ73212 is shown; contact our team to confirm current stock.',
    },
    specifications: {
      'Model shown': 'MZ73212',
      Operation: 'Multi-spindle boring',
      'Spindle spacing': '32 mm system',
    },
    images: [
      photo('multi-boring-machine', '', 'MZ73212 multi-boring machine for panel drilling'),
      photo('multi-boring-machine', 'main', 'Front view of the MZ73212 multi-boring machine'),
    ],
  }),

  // ── Tools & Handling ──────────────────────────────────────────────────────
  entry('pneumatic-trimming-tool', 'Pneumatic Trimming Tool', tools, 'An air-powered hand tool for trimming and flush-finishing PVC edge banding.', {
    featured: true,
    overview: {
      title: 'Fast, clean edge trimming.',
      description: 'The pneumatic trimming tool uses compressed air to power precise trimming of overhanging PVC edge banding flush with the panel face. Lightweight and ergonomic, it reduces hand fatigue during repetitive trimming tasks on the workshop floor. Confirm air pressure requirements with our team.',
    },
    specifications: {
      Power: 'Pneumatic (compressed air)',
      Application: 'PVC edge band trimming',
    },
    images: [photo('pneumatic-trimming-tool', '', 'Pneumatic air trimming tool for flush edge trimming')],
  }),

  entry('pallet-truck', 'Pallet Truck', tools, 'A workshop and warehouse pallet truck for moving stacked boards and heavy materials.', {
    featured: true,
    overview: {
      title: 'Move heavy loads with ease.',
      description: 'The pallet truck is an essential material handling tool for any board store or workshop. It allows one person to safely move full pallets of boards, sheet materials and machinery components across level floors. Contact our team to confirm load capacity and fork dimensions.',
    },
    specifications: {
      Operation: 'Manual hydraulic',
      'Load capacity': 'Up to 2,500 kg (confirm with team)',
      Application: 'Pallet and material handling',
    },
    images: [
      photo('pallet-truck', '', 'Heavy-duty hydraulic workshop pallet truck'),
      photo('pallet-truck', 'application-warehouse', 'Example of a pallet truck in warehouse use', 'application'),
    ],
  }),
]

export const categoryBySlug = Object.fromEntries(categories.map(category => [category.slug, category]))
export const productBySlug = Object.fromEntries(products.map(product => [product.slug, product]))
export const approvedImages = product => product.images.filter(image => image.approval === 'approved')
export const categoryPath = slug => `/category/${slug}`
export const productPath = slug => `/products/${slug}`

export function selectedQuoteOptions(product, selection = {}) {
  return (product.quoteOptions ?? [])
    .filter(option => option.values.includes(selection?.[option.id]))
    .map(option => ({ id: option.id, label: option.label, value: selection[option.id] }))
}

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
