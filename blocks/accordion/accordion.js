import { hasContent } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const items = document.createElement('div');
  items.className = 'accordion-items';
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const title = cells[0];
    const body = cells[1];
    if (!hasContent(title)) return;
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.append(...title.childNodes);
    details.append(summary);
    if (hasContent(body)) {
      const content = document.createElement('div');
      content.className = 'accordion-item-body';
      content.append(...body.childNodes);
      details.append(content);
    }
    items.append(details);
  });
  block.replaceChildren(items);
}
