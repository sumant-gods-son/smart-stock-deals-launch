// API helper functions for client-side use
export async function applyManualDiscount(
  productId: string, 
  variantId: string, 
  price: number, 
  compareAtPrice: number
) {
  const response = await fetch('/.netlify/functions/shopify-api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'applyManualDiscount',
      productId,
      variantId,
      price,
      compareAtPrice,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to apply manual discount');
  }

  return response.json();
}

export async function createAutomaticDiscount(
  title: string,
  percentage: number,
  productIds: string[]
) {
  const response = await fetch('/.netlify/functions/shopify-api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'createAutomaticDiscount',
      title,
      percentage,
      productIds,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create automatic discount');
  }

  return response.json();
}

export async function getProducts() {
  const response = await fetch('/.netlify/functions/shopify-api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'getProducts',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}