import { hasContent, replacePictures } from '../../scripts/block-utils.js';

function createStat(valueCell, labelCell) {
  const item = document.createElement('div');
  const value = document.createElement('strong');
  value.textContent = valueCell.textContent.trim();
  item.append(value);
  if (labelCell && hasContent(labelCell)) {
    const label = document.createElement('span');
    label.textContent = labelCell.textContent.trim();
    item.append(label);
  }
  return item;
}

function isStatRow(cells) {
  if (cells.length !== 2) return false;
  const rich = cells.some((cell) => cell.querySelector('h1, h2, h3, a, picture'));
  if (rich) return false;
  return cells[0].textContent.trim().length < 48;
}

function appendCopy(copy, cells) {
  cells.forEach((cell) => {
    if (cell.querySelector('picture')) return;
    copy.append(...cell.childNodes);
  });
}

export default function decorate(block) {
  const rows = [...block.children];
  const first = rows[0];
  if (!first) return;

  const cols = [...first.children];
  const copy = cols.find((col) => !col.querySelector('picture')) || cols[0];
  const media = cols.find((col) => col.querySelector('picture'))
    || rows
      .flatMap((row) => [...row.children])
      .find((col) => col.querySelector('picture'));
  if (copy) copy.classList.add('product-hero-copy');
  if (media) media.classList.add('product-hero-art');

  const extraRows = rows.slice(1).filter((row) => [...row.children].some(hasContent));
  if (copy && extraRows.length) {
    const stats = document.createElement('div');
    stats.className = 'product-hero-stats';
    extraRows.forEach((row) => {
      const cells = [...row.children].filter(hasContent);
      if (!cells.length) return;
      if (isStatRow(cells)) stats.append(createStat(cells[0], cells[1]));
      else appendCopy(copy, cells);
    });
    if (stats.children.length) {
      const cta = copy.querySelector('.button-wrapper, a.button, a[href]');
      if (cta) {
        const host = cta.closest('.button-wrapper') || cta;
        host.before(stats);
      } else {
        copy.append(stats);
      }
    }
  }

  const eyebrow = copy?.querySelector('p');
  if (eyebrow && !eyebrow.querySelector('a')) eyebrow.classList.add('product-hero-eyebrow');
  const lede = copy?.querySelector('h1 + p, .product-hero-eyebrow + p');
  if (lede) lede.classList.add('product-hero-lede');

  block.replaceChildren(...[copy, media].filter(Boolean));
  replacePictures(block, true);
}
