export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  // Definimos las variables una sola vez con valores de respaldo (fallback)
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL || "https://placeholder.com";
  const appId = import.meta.env.VITE_APP_ID || "default-id";
  
  const redirectUri = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/oauth/callback`
    : 'http://localhost:3000/api/oauth/callback';
    
  const state = btoa(redirectUri);

  try {
    // El constructor de URL ahora siempre recibirá un string válido
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    return url.toString();
  } catch (e) {
    console.error("Error crítico construyendo Login URL:", e);
    return "#"; 
  }
};
