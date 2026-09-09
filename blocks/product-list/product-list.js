import { createOptimizedPicture } from '../../scripts/aem.js';
import { getProducts } from './product-list-data.js';

const INDEX_URL = '/credit-card-index.json';

function createStatus(message, type = 'status') {
  const status = document.createElement('p');
  status.className = `product-list-${type}`;
  status.setAttribute('role', type === 'error' ? 'alert' : 'status');
  status.textContent = message;
  return status;
}

function createPicture(product) {
  if (!product.image) return null;

  try {
    const picture = createOptimizedPicture(
      product.image,
      `${product.title} card`,
      false,
      [{ media: '(min-width: 900px)', width: '750' }, { width: '500' }],
    );
    const link = document.createElement('a');
    link.className = 'product-list-image';
    link.href = product.path;
    link.setAttribute('aria-label', `View ${product.title}`);
    link.append(picture);
    return link;
  } catch {
    return null;
  }
}

function createFacts(product) {
  const facts = document.createElement('dl');
  const values = [
    ['Cashback', product.cashback],
    ['Annual fee', product.annualFee],
  ].filter(([, value]) => value);

  values.forEach(([label, value]) => {
    const item = document.createElement('div');
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value;
    item.append(term, description);
    facts.append(item);
  });

  return facts.children.length ? facts : null;
}

function createBenefits(product) {
  if (!product.benefits.length) return null;

  const section = document.createElement('div');
  section.className = 'product-list-benefits';
  const heading = document.createElement('h3');
  heading.textContent = 'Card benefits';
  const list = document.createElement('ul');
  product.benefits.forEach((benefit) => {
    const item = document.createElement('li');
    item.textContent = benefit;
    list.append(item);
  });
  section.append(heading, list);
  return section;
}

function createCard(product) {
  const item = document.createElement('li');
  const article = document.createElement('article');
  const body = document.createElement('div');
  body.className = 'product-list-card-body';

  const picture = createPicture(product);
  const heading = document.createElement('h2');
  const titleLink = document.createElement('a');
  titleLink.href = product.path;
  titleLink.textContent = product.title;
  heading.append(titleLink);
  body.append(heading);

  const facts = createFacts(product);
  if (facts) body.append(facts);

  const benefits = createBenefits(product);
  if (benefits) body.append(benefits);
  else if (product.description) {
    const description = document.createElement('p');
    description.textContent = product.description;
    body.append(description);
  }

  const details = document.createElement('a');
  details.className = 'button primary product-list-cta';
  details.href = product.path;
  details.textContent = 'View card details';
  body.append(details);

  article.append(...[picture, body].filter(Boolean));
  item.append(article);
  return item;
}

function renderProducts(block, products) {
  if (!products.length) {
    block.replaceChildren(createStatus('No credit card products are available.', 'empty'));
    return;
  }

  const list = document.createElement('ul');
  products.forEach((product) => list.append(createCard(product)));
  block.replaceChildren(list);
}

export default async function decorate(block) {
  block.replaceChildren(createStatus('Loading credit cards…'));

  try {
    const response = await fetch(INDEX_URL);
    if (!response.ok) throw new Error(`Product index request failed: ${response.status}`);
    const payload = await response.json();
    renderProducts(block, getProducts(payload));
  } catch (error) {
    block.replaceChildren(createStatus('Credit cards could not be loaded. Please try again later.', 'error'));
    // eslint-disable-next-line no-console
    console.error('Product list loading failed', error);
  }
}
