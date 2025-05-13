import { createApp } from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge/utilities';
import { Redirect } from '@shopify/app-bridge/actions';

const CLIENT_ID = 'a31b78cdd873908481b515858c1ecd70a';
const SCOPES = 'write_products,write_discounts';
const APP_URL = 'https://precious-unicorn-9227ae.netlify.app';

// Initialize App Bridge
export function initializeAppBridge() {
  const host = new URL(window.location.href).searchParams.get('host');
  
  if (!host) {
    return null;
  }

  return createApp({
    apiKey: CLIENT_ID,
    host,
    forceRedirect: true
  });
}

// Generate install URL
export function getInstallUrl(shop: string): string {
  const redirectUri = `${APP_URL}/auth/callback`;
  const installUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  
  installUrl.searchParams.append('client_id', CLIENT_ID);
  installUrl.searchParams.append('scope', SCOPES);
  installUrl.searchParams.append('redirect_uri', redirectUri);
  
  return installUrl.toString();
}

// Get session token for API calls
export async function getAuthToken(app: any): Promise<string> {
  try {
    return await getSessionToken(app);
  } catch (error) {
    console.error('Error getting session token:', error);
    throw error;
  }
}

// Handle client-side navigation
export function handleClientRouting(app: any) {
  const redirect = Redirect.create(app);
  
  // Listen for URL changes
  window.addEventListener('popstate', () => {
    const path = window.location.pathname.replace('/apps/smart-stock-deals', '');
    redirect.dispatch(Redirect.Action.APP, path);
  });
}