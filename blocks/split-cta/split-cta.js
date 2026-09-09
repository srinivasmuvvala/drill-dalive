import { hasContent, replacePictures } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const rows = [...block.children].filter((row) => [...row.children].some(hasContent));
  if (!rows.length) return;

  const firstCols = [...rows[0].children];
  const copy = firstCols.find((col) => !col.querySelector('picture')) || firstCols[0];
  const media = rows
    .flatMap((row) => [...row.children])
    .find((col) => col.querySelector('picture'));
  if (copy) copy.classList.add('split-cta-copy');
  if (media) media.classList.add('split-cta-media');

  rows.slice(1).forEach((row) => {
    [...row.children].filter(hasContent).forEach((cell) => {
      if (cell.querySelector('picture') || !copy) return;
      copy.append(...cell.childNodes);
    });
  });

  block.replaceChildren(...[copy, media].filter(Boolean));
  replacePictures(block);
}
