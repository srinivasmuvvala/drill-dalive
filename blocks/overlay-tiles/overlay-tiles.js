import { hasContent, replacePictures } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => {
    const cells = [...row.children].filter(hasContent);
    if (!cells.length) return;
    const item = document.createElement('li');
    cells.forEach((cell) => {
      cell.className = cell.querySelector('picture') ? 'overlay-tiles-image' : 'overlay-tiles-body';
      item.append(cell);
    });
    list.append(item);
  });
  replacePictures(list);
  block.replaceChildren(list);
}
