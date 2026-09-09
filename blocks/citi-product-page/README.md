# Credit card product page blocks

Author the page in Word, Docs, or DA. Code only decorates the tables you add.
Set page metadata:

| Metadata | |
| --- | --- |
| Title | Citi Double Cash® Credit Card |
| Description | Earn unlimited cash back with the Citi Double Cash® Card. |
| Image | Card image |
| Template | citi-card |
| Product | true |
| Product Order | 10 |
| Cashback | Unlimited 2% cash back |
| Annual Fee | $0 |
| Card Benefits | No caps; No category enrollment; 5% on select Citi Travel |

`Product: true` opts the published page into the automatic `/credit-card`
listing. Use a unique `Product Order` to control its position. Separate card
benefits with semicolons so the listing can render them as bullets.

Use `---` between sections. Optional section styles: `hero`, `bleed`, `pale`, `centered`, `disclaimer`, `sticky`.

Images in `blocks/citi-product-page/assets/` can be uploaded into the document.

## Product Hero

Section style: `hero`. Extra rows become the two hero stats. Omit any row you do not need.

| Product Hero | |
| --- | --- |
| Citi Double Cash® Card | ![Hero](double-cash-hero.webp) |
| # Earn cash back | |
| Earn unlimited 2% cash back: 1% when you buy and 1% as you pay. | |
| **[Apply now](https://www.citi.com/credit-cards/citi-double-cash-credit-card)** | |
| $0 | Annual fee |
| No caps | On the cash back you earn |

You can also put the heading, body, and button together in the first cell and keep only the image in the second cell.

## Stat Grid

Place a heading and intro in the same section (style `centered`), then:

| Stat Grid | |
| --- | --- |
| Annual fee | $0 |
| Category enrollment | None |
| Cash back cap | None |

## Feature Grid

Three cards. Use 3 columns for a number or icon, or 2 columns for title and text.

| Feature Grid | | |
| --- | --- | --- |
| 01 | No caps and no category enrollment | Earn cash back without activating categories. |
| 02 | Earn 5% on select travel | Earn additional cash back on hotels booked through Citi Travel. |
| 03 | Cash back as ThankYou® Points | Redeem points for cash back or other options. |

For the centered “Your points” row, name the table **Feature Grid (centered)** and use an icon or short label in the first column. Put the block in a `pale` section.

## Overlay Tiles

Section style: `bleed`.

| Overlay Tiles | |
| --- | --- |
| ![Zero liability](zero-liability.webp) | $0 liability on unauthorized charges |
| ![Warranty](extended-warranty.webp) | Extended warranty |
| ![Offers](merchant-offers.webp) | Citi® Merchant Offers |

## Accordion

FAQs: two columns, question and answer.

| Accordion | |
| --- | --- |
| What kind of card is Citi Double Cash®? | The Citi Double Cash® Card earns cash back as ThankYou® Points. |
| How do you redeem rewards? | Redeem for statement credit, direct deposit, or check. |

Benefit groups: name the table **Accordion (grid)** and put multiple headings plus paragraphs in the answer cell.

## Split Cta

Section style: `pale`.

| Split Cta | |
| --- | --- |
| Citi Double Cash® Card | ![Card](double-cash-card.webp) |
| ## Unlimited 2% cash back on purchases | |
| Earn 2% cash back with no category enrollment, caps, or annual fee. **[Apply now](https://www.citi.com/credit-cards/citi-double-cash-credit-card)** *[See if you’re pre-qualified](/credit-cards/pre-qualified-credit-cards)* | |

If the table has one content row, put all copy in the left cell and the image in the right cell.

## Product Cards

| Product Cards | |
| --- | --- |
| ![Strata](citi-strata-card.webp) | ### Citi Strata℠ Card [Card details](/credit-cards) |
| ![Diamond](citi-diamond-preferred-card.webp) | ### Citi® Diamond Preferred® Card [Card details](/credit-cards) |
| ![Simplicity](citi-simplicity-card.webp) | ### Citi Simplicity® Card [Card details](/credit-cards) |

## Sticky Cta

Section style: `sticky`. Last section on the page.

| Sticky Cta | |
| --- | --- |
| Citi Double Cash® Card | **[Apply now](https://www.citi.com/credit-cards/citi-double-cash-credit-card)** |

## Suggested page order

1. Product Hero (`hero`)
2. Disclaimer paragraph (`disclaimer`)
3. Intro heading + Stat Grid (`centered`)
4. Feature Grid (`pale`)
5. Feature Grid (centered)
6. Overlay Tiles (`bleed`)
7. Accordion (grid) for benefits
8. Accordion for FAQs
9. Split Cta (`pale`)
10. Product Cards
11. Accordion for pricing details
12. Sticky Cta (`sticky`)

Author `/nav` and `/footer` as usual. This page does not hardcode navigation or product copy.
