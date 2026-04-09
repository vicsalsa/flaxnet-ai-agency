import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import KnowledgeBase from "./pages/KnowledgeBase";
import ChatBot from "./components/ChatBot";
import About from "./pages/About";
import Blog from "./pages/Blog";
import CasosExito from "./pages/CasosExito";
import N8nPage from "./pages/N8nPage";
import N8nFaq from "./pages/N8nFaq";
import N8nVSCode from "./pages/N8nVSCode";
import AgentesIA from "./pages/AgentesIA";
import SEOPage from "./pages/SEOPage";
import SEOFaq from "./pages/SEOFaq";
import DisenoWeb from "./pages/DisenoWeb";
import IALocalEmpresas from "./pages/IALocalEmpresas";
import HardwareIALocal from "./pages/HardwareIALocal";
import IAMovil from "./pages/IAMovil";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"\\"} component={Home} />
      <Route path={"/servicios"} component={Services} />
      <Route path={"/servicios/n8n"} component={N8nPage} />
      <Route path={"/servicios/agentes-ia"} component={AgentesIA} />
      <Route path={"/servicios/diseno-web"} component={DisenoWeb} />
      <Route path={"/servicios/seo"} component={SEOPage} />
      <Route path={"/servicios/mcp"} component={Services} />
      <Route path={"/contacto"} component={Contact} />
      <Route path={"/base-conocimientos"} component={KnowledgeBase} />
      <Route path={"/sobre-nosotros"} component={About} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/n8n-que-es"} component={N8nPage} />
      <Route path={"/blog/n8n-faq"} component={N8nFaq} />
      <Route path={"/blog/n8n-vscode"} component={N8nVSCode} />
      <Route path={"/blog/seo-faq"} component={SEOFaq} />
      <Route path={"/blog/ia-local-empresas"} component={IALocalEmpresas} />
      <Route path={"/blog/hardware-ia-local"} component={HardwareIALocal} />
      <Route path={"/blog/ia-movil"} component={IAMovil} />
      <Route path={"/casos-exito"} component={CasosExito} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <ChatBot />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
