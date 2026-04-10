export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const getLoginUrl = () => {
  // Verificación extra: solo usar la variable si empieza por http
  const envUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const oauthPortalUrl = (envUrl && envUrl.startsWith('http')) 
    ? envUrl 
    : "https://placeholder.com";

  const appId = import.meta.env.VITE_APP_ID || "default-id";
  
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const redirectUri = `${origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  try {
    // Si oauthPortalUrl es válido, esto no fallará
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
