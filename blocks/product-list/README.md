# Product list

Renders published credit-card PDPs from an EDS query index. Authors add the
block once to `/credit-card`; publishing a new opted-in child PDP updates the
listing without editing the PLP.

## PLP authoring

Create `/credit-card/index` in DA with:

| Product List |
| --- |
| |

The block defaults to `/credit-card-index.json`.

## PDP metadata

Every PDP lives at `/credit-card/<product-name>` and uses:

| Metadata | |
| --- | --- |
| Title | Product name |
| Description | Short product description |
| Image | Card image |
| Product | true |
| Product Order | 10 |
| Cashback | Unlimited 2% cash back |
| Annual Fee | $0 |
| Card Benefits | Benefit one; Benefit two; Benefit three |

`Product` must equal `true`. `Product Order` is numeric; equal or missing
values fall back to title order. Separate benefits with semicolons.

## Index Admin configuration

Create a dedicated index using the Index Admin tool at tools.aem.live:

- Name: `credit-cards`
- Target: `/credit-card-index.json`
- Include: `/credit-card/**`

Add these properties:

| Property | Select | Value |
| --- | --- | --- |
| path | none | `path` |
| title | `head > meta[property="og:title"]` | `attribute(el, "content")` |
| description | `head > meta[name="description"]` | `attribute(el, "content")` |
| image | `head > meta[property="og:image"]` | `attribute(el, "content")` |
| product | `head > meta[name="product"]` | `attribute(el, "content")` |
| productOrder | `head > meta[name="product-order"]` | `attribute(el, "content")` |
| cashback | `head > meta[name="cashback"]` | `attribute(el, "content")` |
| annualFee | `head > meta[name="annual-fee"]` | `attribute(el, "content")` |
| cardBenefits | `head > meta[name="card-benefits"]` | `attribute(el, "content")` |
| robots | `head > meta[name="robots"]` | `attribute(el, "content")` |

Save and run **Reindex** once after creating or changing the index definition.
After that, preview and publish each PDP normally. Published pages update the
index; unpublishing removes them.

The PLP filters the index client-side to direct `/credit-card/*` children with
`Product: true`, and excludes `robots: noindex`.

## Debugging

- Inspect `/credit-card-index.json` on the `.aem.page` or `.aem.live` host.
- Run `aem up --print-index` while validating selectors.
- If a card is absent, confirm that the PDP is published and its metadata is
  present in page source as lowercase, hyphenated meta names.
