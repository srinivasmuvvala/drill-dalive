const PRODUCT_ROOT = '/credit-card/';

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizePath(value) {
  return cleanString(value).replace(/\.html$/, '').replace(/\/$/, '');
}

function isDirectChild(path, root = PRODUCT_ROOT) {
  if (!path.startsWith(root)) return false;
  const relativePath = path.slice(root.length);
  return Boolean(relativePath) && !relativePath.includes('/');
}

function isOptedIn(value) {
  return value === true || cleanString(value).toLowerCase() === 'true';
}

function isNoIndex(value) {
  return cleanString(value)
    .toLowerCase()
    .split(/[\s,]+/)
    .map((token) => token.trim())
    .includes('noindex');
}

function parseOrder(value) {
  const order = Number.parseInt(value, 10);
  return Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER;
}

export function parseBenefits(value) {
  if (Array.isArray(value)) return value.map(cleanString).filter(Boolean);
  return cleanString(value)
    .split(/[;|\n]+/)
    .map((benefit) => benefit.trim())
    .filter(Boolean);
}

export function normalizeProduct(item, root = PRODUCT_ROOT) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return null;

  const path = normalizePath(item.path);
  const title = cleanString(item.title);
  if (!isDirectChild(path, root) || !title || !isOptedIn(item.product)) return null;
  if (isNoIndex(item.robots)) return null;

  return {
    path,
    title,
    description: cleanString(item.description),
    image: cleanString(item.image),
    cashback: cleanString(item.cashback),
    annualFee: cleanString(item.annualFee),
    benefits: parseBenefits(item.cardBenefits),
    order: parseOrder(item.productOrder),
  };
}

export function getProducts(payload, root = PRODUCT_ROOT) {
  if (!payload || !Array.isArray(payload.data)) {
    throw new TypeError('Product index response must contain a data array.');
  }

  return payload.data
    .map((item) => normalizeProduct(item, root))
    .filter(Boolean)
    .sort((left, right) => left.order - right.order
      || left.title.localeCompare(right.title));
}
