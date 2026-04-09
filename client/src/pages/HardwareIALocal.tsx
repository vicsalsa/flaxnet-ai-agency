import {
  ArrowRight,
  Check,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Apple,
  Zap,
  Gauge,
  Layers,
} from "lucide-react";
import { Link as RouterLink } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function HardwareIALocal() {
  const gpuRecommendations = [
    {
      model: "NVIDIA RTX 4090",
      vram: "24 GB",
      price: "~1.600 USD",
      performance: "30-50 tokens/seg",
      models: "24B (Q4/Q8)",
      recommendation: "Recomendado",
      color: "bg-accent/20 border-accent",
    },
    {
      model: "NVIDIA RTX 4080 Super",
      vram: "16 GB",
      price: "~1.000 USD",
      performance: "20-35 tokens/seg",
      models: "14B (Q4/Q8)",
      recommendation: "Muy buena opción",
      color: "bg-card border-border",
    },
    {
      model: "NVIDIA RTX 4070 Ti Super",
      vram: "16 GB",
      price: "~800 USD",
      performance: "15-28 tokens/seg",
      models: "12-14B (Q4)",
      recommendation: "Buena relación precio",
      color: "bg-card border-border",
    },
    {
      model: "NVIDIA RTX 4070",
      vram: "12 GB",
      price: "~550 USD",
      performance: "10-20 tokens/seg",
      models: "12B (Q4)",
      recommendation: "Entrada",
      color: "bg-card border-border",
    },
  ];

  const appleOptions = [
    {
      model: "Mac Studio M3 Max",
      memory: "64 GB unificada",
      price: "~3.200 USD",
      performance: "Excelente",
      models: "24B (Q4)",
      note: "Sin cuellos de botella de VRAM",
    },
    {
      model: "Mac Mini M4 Pro",
      memory: "48 GB unificada",
      price: "~1.400 USD",
      performance: "Muy buena",
      models: "12-14B (Q4)",
      note: "Excelente relación precio-rendimiento",
    },
  ];

  const modelRequirements = [
    {
      size: "24B",
      example: "Mistral Small 3 24B, Devstral-Small-2-24B",
      fp16: "48 GB",
      int8: "24 GB",
      int4: "12-16 GB",
      description: "Punto de equilibrio ideal para producción empresarial",
    },
    {
      size: "12B-14B",
      example: "Gemma 3 12B, Qwen 2.5 14B",
      fp16: "24-32 GB",
      int8: "12-24 GB",
      int4: "6-12 GB",
      description: "Categoría profesional para tareas complejas",
    },
  ];

  const considerations = [
    {
      icon: Layers,
      title: "Ventana de Contexto",
      description:
        "La VRAM del modelo solo incluye sus pesos. El contexto largo (documentos largos, historial de chat) consume VRAM adicional mediante la caché KV. Siempre margen extra.",
    },
    {
      icon: MemoryStick,
      title: "RAM del Sistema",
      description:
        "La RAM del servidor debe ser al menos 1.5x el tamaño del modelo. Sin esto, el sistema usará paginación (swap en disco) y el modelo será extremadamente lento.",
    },
    {
      icon: Zap,
      title: "Cuantización Q4 (Sweet Spot)",
      description:
        "Para casi todas las tareas de negocio, Q4_K_M ofrece 72% menos memoria con solo 3-5% de pérdida de precisión. Para programación crítica, usar Q8.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-4">
            <span className="text-accent text-sm font-semibold">Hardware</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Requisitos Hardware para IA Local
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Guía completa de hardware para implementar LLMs en tu empresa. VRAM,
            GPUs y alternativas para pyme.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/data-analytics-dashboard-ewdyQczXYKkNxUatKoEfpZ.webp"
            alt="Hardware para IA Local"
            className="w-full rounded-2xl"
          />
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                El Factor Crítico: VRAM
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Para implementar LLMs a nivel local en una pyme, el factor
                limitante más crítico es la memoria de video (VRAM) de las
                tarjetas gráficas (GPU).
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                La cuantización (reducción de precisión a 8 bits o 4 bits)
                disminuye el requerimiento de memoria entre un 50% y un 75%,
                haciendo modelos avanzados viables económicamente.
              </p>
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-xl">
                <p className="text-accent font-semibold">
                  Punto dulce: 4 bits (Q4_K_M) = 72% menos memoria, solo 3-5%
                  pérdida de precisión
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {modelRequirements.map((model, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-card border border-border rounded-xl"
                >
                  <h3 className="font-bold text-foreground mb-2">
                    Modelo {model.size}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {model.description}
                  </p>
                  <p className="text-xs text-accent">{model.example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Model Requirements Table */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Requisitos por Tamaño de Modelo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              VRAM necesaria según precisión y cuantización.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground font-bold">
                    Modelo
                  </th>
                  <th className="text-left p-4 text-foreground font-bold">
                    FP16
                  </th>
                  <th className="text-left p-4 text-foreground font-bold">
                    INT8
                  </th>
                  <th className="text-left p-4 text-foreground font-bold">
                    INT4
                  </th>
                  <th className="text-left p-4 text-foreground font-bold">
                    Uso Recomendado
                  </th>
                </tr>
              </thead>
              <tbody>
                {modelRequirements.map((model, idx) => (
                  <tr key={idx} className="border-b border-border">
                    <td className="p-4 text-foreground font-semibold">
                      {model.size}
                    </td>
                    <td className="p-4 text-muted-foreground">{model.fp16}</td>
                    <td className="p-4 text-muted-foreground">{model.int8}</td>
                    <td className="p-4 text-accent font-semibold">
                      {model.int4}
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {model.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* GPU Recommendations */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              GPUs Recomendadas para PYMEs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Opciones de hardware para ejecutar LLMs localmente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gpuRecommendations.map((gpu, idx) => (
              <div key={idx} className={`p-6 rounded-xl border ${gpu.color}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {gpu.model}
                  </h3>
                  <span className="text-sm text-accent font-semibold">
                    {gpu.recommendation}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">VRAM</p>
                    <p className="text-foreground font-semibold">{gpu.vram}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Precio</p>
                    <p className="text-foreground font-semibold">{gpu.price}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rendimiento</p>
                    <p className="text-foreground font-semibold">
                      {gpu.performance}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Modelos</p>
                    <p className="text-foreground font-semibold">
                      {gpu.models}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apple Silicon */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Apple className="text-foreground" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold">
                Alternativa Apple Silicon
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Si no deseas configurar servidores con GPUs dedicadas, los equipos
              Apple son excelentes opciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {appleOptions.map((mac, idx) => (
              <div
                key={idx}
                className="p-6 bg-card border border-border rounded-xl"
              >
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {mac.model}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Memoria</span>
                    <span className="text-foreground font-semibold">
                      {mac.memory}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Precio</span>
                    <span className="text-foreground font-semibold">
                      {mac.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rendimiento</span>
                    <span className="text-accent font-semibold">
                      {mac.performance}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modelos</span>
                    <span className="text-foreground font-semibold">
                      {mac.models}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{mac.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Considerations */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Consideraciones para el Despliegue
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Factores críticos para un rendimiento estable sin latencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {considerations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-card border border-border rounded-xl"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Necesitas Ayuda con tu Infraestructura?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Te asesoramos en la selección de hardware y configuración de tu
            sistema de IA local.
          </p>
          <RouterLink href="/contacto">
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg flex items-center justify-center gap-2 group mx-auto cursor-pointer">
              Consultar Configuración
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </RouterLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}
