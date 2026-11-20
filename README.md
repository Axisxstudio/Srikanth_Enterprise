# Srikantha Enterprises

React and Vite product catalogue and quotation site for Srikantha Enterprises in Rawathawatta, Moratuwa, Sri Lanka.

## Run locally

Use Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vite prints the local URL. The production build goes to `dist/`.

## Update business details

Edit [src/config/business.js](src/config/business.js) to set the full address, telephone numbers, WhatsApp number, email, opening hours, Facebook link, map link or logo path. Supply a verified WhatsApp number in international format with its country code. The site uses the verified locality and the supplied Facebook URL. Phone numbers, WhatsApp, email, opening hours, a more detailed address and map coordinates still need confirmation. With no quotation destination configured, the form prepares a summary the customer can copy. Enquiry items are stored in the current browser.

The archive has no standalone SKE logo. The site uses a temporary text wordmark. When you receive the approved logo, place it in `public/`, set its URL in the business configuration and add a matching favicon in `index.html`.

## Maintain the catalogue and images

- Edit [src/data/catalogue.js](src/data/catalogue.js) to add a product with a unique slug and one of the existing category slugs. Add factual descriptions, verified specifications and the featured flag as needed.
- [src/data/image-review.json](src/data/image-review.json) records the source and review status from the supplied inventory. The original files and notes are extracted locally in `supplied-assets/`. The review file stays outside the browser bundle.
- Confirm each replacement’s product identity, finish or model, native image quality and publication rights. Then copy the WebP to `public/images/products/<product>/`, update the review record and add the image to that product with approval set to `approved`. The first approved image is the card and gallery default. Further approved views become gallery thumbnails. Use descriptive alt text and set the image role to `detail` or `application` where appropriate.
- The catalogue uses clean crops from the supplied posters and the supplied exact-photo match for the MZ73212 multi-boring machine. Verify reuse rights for that sourced match before a public launch. Products without a suitable photo use a placeholder. Some supplied product images are close views or application examples. The three banner scenes are marketing illustrations.
- Change `HERO_INTERVAL` in [src/config/business.js](src/config/business.js) to adjust the six-second carousel interval. Banner subjects and responsive sources are defined in the catalogue data.

## Static hosting

Serve `dist/` from the domain root. Configure the host to serve existing files normally and rewrite other requests to `/index.html` with HTTP 200. This supports direct product and category links, browser refreshes and the React not-found page. The build includes `_redirects` for hosts that support its syntax. On nginx, use `try_files $uri $uri/ /index.html;`. Use the host’s equivalent rewrite configuration elsewhere.

The site has client-side page titles, descriptions and Open Graph updates. Crawlers that read only the initial HTML receive the shared metadata. Add prerendering at the hosting layer if individual product pages need crawler-visible metadata or social previews.
