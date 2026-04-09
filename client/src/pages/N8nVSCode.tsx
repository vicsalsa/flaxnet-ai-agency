import {
  ArrowRight,
  Check,
  Code,
  GitBranch,
  Cpu,
  Sparkles,
  FileJson,
  GitMerge,
  Terminal,
  Zap,
  Brain,
  Database,
  Globe,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function N8nVSCode() {
  const tools = [
    {
      name: "n8n-as-code",
      description:
        "Puente entre VS Code y n8n con sincronización en tiempo real. Permite usar IA para generar flujos.",
      features: [
        "Sincronización real-time",
        "Generación con IA",
        "GitOps y control de versiones",
      ],
      icon: Code,
    },
    {
      name: "n8n Atom",
      description:
        "Extensión que integra el entorno visual de n8n directamente en VS Code y Cursor.",
      features: ["Archivos .n8n", "Vibe Coding con IA", "Desarrollo local"],
      icon: Sparkles,
    },
    {
      name: "n8n utils",
      description:
        "Para desarrolladores que crean nodos personalizados. Ejecuta n8n dentro de VS Code con hot reload.",
      features: [
        "Lanzador integrado",
        "Inspección de parámetros",
        "Estadísticas locales",
      ],
      icon: Terminal,
    },
  ];

  const benefits = [
    {
      icon: Brain,
      title: "IA como Copiloto",
      description:
        "La IA escribe JSON más rápido de lo que tú arrastras cajas. Pide: 'Genera un flujo que extraiga noticias y las envíe a Slack'.",
    },
    {
      icon: GitBranch,
      title: "GitOps Completo",
      description:
        "Sube flujos a GitHub, controla versiones, y trabaja en equipo sin miedo a romper nada.",
    },
    {
      icon: Zap,
      title: "Velocidad Radical",
      description:
        "Edición masiva de parámetros, búsqueda y reemplazo, y refactorización instantánea.",
    },
    {
      icon: Terminal,
      title: "Desarrollo Local",
      description:
        "Prueba flujos en tu entorno local antes de desplegarlos a producción.",
    },
    {
      icon: Database,
      title: "Portabilidad",
      description:
        "Flujos como código facilitan sharing, backup y migración entre instancias.",
    },
    {
      icon: FileJson,
      title: "Formato Limpio",
      description:
        "JSON estructurado que cualquier herramienta puede leer y modificar.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-4">
            <span className="text-accent text-sm font-semibold">
              Desarrollo
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            n8n desde VS Code
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trabaja con n8n como verdadero código fuente. Sincronización
            real-time, generación con IA y GitOps.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/automation-workflow-visual-BAqZv8vsdNEnVXU2Z6X2vQ.webp"
                alt="n8n en VS Code"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Código Fuente, No Cajas</h2>
              <p className="text-lg text-muted-foreground">
                Olvídate de hacer clics en una interfaz visual. VS Code te
                permite tratar tus flujos de trabajo como verdadero código
                fuente, versionarlos con Git y colaborar en equipo.
              </p>
              <ul className="space-y-3">
                {[
                  "Edición con autocompletado",
                  "Búsqueda y reemplazo global",
                  "Generación con Inteligencia Artificial",
                  "Control de versiones con Git",
                  "Refactorización instantánea",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check size={18} className="text-accent flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Herramientas para VS Code
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tres enfoques principales para integrar n8n con tu editor
              favorito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {tool.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {tool.description}
                  </p>
                  <ul className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check size={14} className="text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Por Qué Usar VS Code?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Beneficios que cambian el paradigma de la automatización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Example */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ejemplo: Generación con IA
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cómo un flujo se construye solo con una instrucción.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-4 bg-card border border-border rounded-xl">
              <p className="text-muted-foreground">
                <span className="text-accent font-semibold">Usuario:</span>{" "}
                "Genera un JSON para un flujo que extraiga noticias de RSS y las
                envíe a Slack"
              </p>
            </div>
            <div className="flex justify-center">
              <ArrowRight
                className="text-accent rotate-90 md:rotate-90"
                size={24}
              />
            </div>
            <div className="p-4 bg-accent/10 border border-accent/30 rounded-xl">
              <p className="text-foreground font-mono text-sm">
                La IA escribe el JSON, guardas el archivo, y el flujo aparece en
                n8n listo para ejecutarse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo paralevel Up?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Te enseñamos a trabajar con n8n desde VS Code. Curso intensivo para
            empresas.
          </p>
          <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg flex items-center justify-center gap-2 group mx-auto">
            Solicitar Información
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
