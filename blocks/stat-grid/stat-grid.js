import { hasContent } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => {
    const cells = [...row.children].filter(hasContent);
    if (!cells.length) return;
    const item = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = cells[0].textContent.trim();
    item.append(label);
    if (cells[1]) {
      const value = document.createElement('strong');
      value.textContent = cells[1].textContent.trim();
      item.append(value);
    }
    list.append(item);
  });
  block.replaceChildren(list);
}
