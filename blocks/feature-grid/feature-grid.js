import { hasContent } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => {
    const cells = [...row.children].filter(hasContent);
    if (!cells.length) return;
    const item = document.createElement('li');
    if (cells.length >= 3) {
      cells[0].className = 'feature-grid-index';
      cells[1].className = 'feature-grid-title';
      cells[2].className = 'feature-grid-body';
    } else if (cells.length === 2) {
      cells[0].className = 'feature-grid-title';
      cells[1].className = 'feature-grid-body';
    }
    cells.forEach((cell) => item.append(cell));
    list.append(item);
  });
  block.replaceChildren(list);
}
