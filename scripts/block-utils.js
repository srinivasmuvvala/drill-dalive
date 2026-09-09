import { createOptimizedPicture } from './aem.js';

export function hasContent(el) {
  if (!el) return false;
  return Boolean(el.textContent.trim() || el.querySelector('picture, img, a, ul, ol'));
}

export function replacePictures(root, eager = false) {
  root.querySelectorAll('picture > img').forEach((img) => {
    const picture = img.closest('picture');
    if (!picture) return;
    picture.replaceWith(createOptimizedPicture(
      img.src,
      img.alt,
      eager,
      [{ media: '(min-width: 900px)', width: '1200' }, { width: '750' }],
    ));
  });
}
