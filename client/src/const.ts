export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Genera la URL de login en tiempo de ejecución de forma segura
export const getLoginUrl = () => {
  // Definimos las variables con valores de respaldo para evitar "Invalid URL"
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL || "https://placeholder.com";
  const appId = import.meta.env.VITE_APP_ID || "default-id";
  
  const redirectUri = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/oauth/callback`
    : 'http://localhost:3000/api/oauth/callback';
    
  const state = btoa(redirectUri);

  try {
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
