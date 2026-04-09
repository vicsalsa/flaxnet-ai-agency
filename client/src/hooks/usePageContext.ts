import { useLocation } from "wouter";
import { useMemo } from "react";

export interface PageContext {
  path: string;
  pageName: string;
  category: string;
  keywords: string[];
  suggestedArticles: string[];
  description: string;
}

/**
 * Hook to detect current page context and suggest relevant KB articles
 */
export function usePageContext(): PageContext {
  const [location] = useLocation();

  const context = useMemo(() => {
    // Map routes to context information
    const contextMap: Record<string, PageContext> = {
      "/": {
        path: "/",
        pageName: "Inicio",
        category: "general",
        keywords: ["automatización", "IA", "servicios", "n8n", "MCP", "agentes"],
        suggestedArticles: ["kb-001", "kb-002", "kb-003", "kb-006"],
        description: "Página de inicio con información general sobre servicios",
      },
      "/servicios": {
        path: "/servicios",
        pageName: "Servicios",
        category: "services",
        keywords: ["n8n", "MCP", "agentes", "diseño web", "SEO", "marketing"],
        suggestedArticles: ["kb-001", "kb-002", "kb-003", "kb-006", "kb-010", "kb-011", "kb-012"],
        description: "Página de servicios detallados",
      },
      "/contacto": {
        path: "/contacto",
        pageName: "Contacto",
        category: "contact",
        keywords: ["contacto", "consulta", "presupuesto", "ticket", "soporte"],
        suggestedArticles: ["kb-004", "kb-005", "kb-008", "kb-009"],
        description: "Página de contacto y formulario",
      },
      "/base-conocimientos": {
        path: "/base-conocimientos",
        pageName: "Base de Conocimientos",
        category: "knowledge",
        keywords: ["FAQ", "preguntas frecuentes", "ayuda", "documentación"],
        suggestedArticles: [],
        description: "Página de base de conocimientos",
      },
    };

    // Default context
    const defaultContext: PageContext = {
      path: location,
      pageName: "Página",
      category: "general",
      keywords: ["ayuda", "soporte"],
      suggestedArticles: ["kb-001", "kb-004"],
      description: "Página del sitio",
    };

    // Find matching context or return default
    return contextMap[location] || defaultContext;
  }, [location]);

  return context;
}

/**
 * Get suggested articles based on page context
 */
export function getSuggestedArticlesForPage(path: string): string[] {
  const contextMap: Record<string, string[]> = {
    "/": ["kb-001", "kb-002", "kb-003", "kb-006"],
    "/servicios": ["kb-001", "kb-002", "kb-003", "kb-006", "kb-010", "kb-011", "kb-012"],
    "/contacto": ["kb-004", "kb-005", "kb-008", "kb-009"],
    "/base-conocimientos": [],
  };

  return contextMap[path] || ["kb-001", "kb-004"];
}
