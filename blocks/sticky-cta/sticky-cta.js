import { hasContent } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const row = [...block.children].find((candidate) => [...candidate.children].some(hasContent));
  if (!row) return;
  const cells = [...row.children].filter(hasContent);
  if (!cells.length) return;
  const label = cells[0];
  const action = cells[1];
  if (label) label.classList.add(action ? 'sticky-cta-label' : 'sticky-cta-action');
  if (action) action.classList.add('sticky-cta-action');
  const cta = (action || label).querySelector('a');
  if (cta) cta.classList.add('button', 'primary');
  block.replaceChildren(...[label, action].filter(Boolean));
}
