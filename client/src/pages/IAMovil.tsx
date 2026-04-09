import {
  ArrowRight,
  Check,
  Smartphone,
  Wifi,
  Zap,
  Shield,
  Cpu,
  Download,
  Settings,
  MessageSquare,
  Image,
  Mic,
  Globe,
} from "lucide-react";
import { Link as RouterLink } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function IAMovil() {
  const advantages = [
    {
      icon: Shield,
      title: "Privacidad Absoluta",
      description:
        "Tus datos, fotos, audios y conversaciones nunca salen de tu teléfono. Control total y confidencialidad.",
    },
    {
      icon: Wifi,
      title: "100% Offline",
      description:
        "Utiliza tu asistente de IA, transcribe audios o analiza imágenes sin necesidad de conexión a Internet.",
    },
    {
      icon: Zap,
      title: "Baja Latencia",
      description:
        "Al no depender de la nube, las respuestas son prácticamente instantáneas.",
    },
    {
      icon: Cpu,
      title: "Eficiencia Energética",
      description:
        "Modelos optimizados permiten procesar tareas hasta 4 veces más rápido, reduciendo consumo energético un 60%.",
    },
  ];

  const apps = [
    {
      name: "Google AI Edge Gallery",
      description:
        "Aplicación experimental de Google como escaparate de posibilidades reales. Ejecuta modelos avanzados como Gemma 4.",
      features: [
        "Ask Image: Analiza fotos y responde preguntas localmente",
        "Audio Scribe: Transcribe y traduce audio preservando privacidad",
        "Agent Skills: IA asiste en flujos de múltiples pasos",
        "Prompt Lab: Espacio para configuraciones avanzadas",
      ],
      platform: "iOS & Android",
      price: "Gratis",
    },
    {
      name: "PocketPal AI",
      description:
        "Aplicación de código abierto desarrollada por Asghar Ghorbani. Funciona completamente sin conexión.",
      features: [
        "Compatibilidad multiplataforma",
        "Integración con Hugging Face",
        "Descarga de cientos de modelos",
        "Pals: Personalidades predefinidas",
      ],
      platform: "iOS & Android",
      price: "Gratis",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Verificar Requisitos",
      description:
        "Android 12+ o iOS 17+. El rendimiento depende de CPU, GPU y RAM de tu dispositivo.",
    },
    {
      step: "2",
      title: "Descargar la App",
      description:
        "Desde App Store (iOS) o Google Play Store (Android). También APK desde GitHub oficial.",
    },
    {
      step: "3",
      title: "Configurar Modelo",
      description:
        "Crea cuenta gratuita en Hugging Face. Descarga modelos como Gemma-3-1B-IT o Qwen 3 4B.",
    },
    {
      step: "4",
      title: "Comenzar a Experimentar",
      description:
        "Sin conexión a Internet. Prueba chat, subir imágenes o evalúa el rendimiento.",
    },
  ];

  const recommendedModels = [
    { name: "Gemma-4-E4B-it", type: "Avanzado", requirements: "Alto" },
    { name: "Gemma3-1B-IT", type: "Equilibrado", requirements: "Medio" },
    { name: "Qwen 3 4B", type: "Mejor relación", requirements: "Medio" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-4">
            <span className="text-accent text-sm font-semibold">Mobile</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            IA en tu Móvil
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Cómo ejecutar Inteligencia Artificial localmente en tu smartphone.
            Convierte tu móvil en un laboratorio de IA portátil.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/ai-agents-collaboration-bdf3hkEZmQAidhhRuMiEE4.webp"
            alt="IA en tu Móvil"
            className="w-full rounded-2xl"
          />
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">La IA en tu Bolsillo</h2>
            <p className="text-lg text-muted-foreground">
              La inteligencia artificial ha dado un paso de gigante al salir de
              la nube para alojarse directamente en nuestros bolsillos. Hoy en
              día, es posible convertir un smartphone en un "pequeño laboratorio
              de IA portátil" capaz de ejecutar modelos de lenguaje complejos de
              forma local.
            </p>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              🚀 Ventajas de IA Local en el Móvil
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ejecutar modelos de IA directamente en el hardware de tu teléfono
              (edge AI) ofrece beneficios transformadores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-card border border-border rounded-xl"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {adv.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {adv.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apps */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              📱 Principales Aplicaciones
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Excelentes opciones de código abierto para iOS y Android.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apps.map((app, idx) => (
              <div
                key={idx}
                className="p-6 bg-card border border-border rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {app.name}
                  </h3>
                  <span className="text-sm text-accent font-semibold">
                    {app.price}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{app.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                    {app.platform}
                  </span>
                </div>
                <ul className="space-y-2">
                  {app.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-sm">
                      <Check
                        size={14}
                        className="text-accent mt-1 flex-shrink-0"
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              🛠 Pasos para Instalar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proceso de instalación accesible para cualquier usuario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Modelos Recomendados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elige el modelo que se adapte a las capacidades de tu móvil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {recommendedModels.map((model, idx) => (
              <div
                key={idx}
                className="p-6 bg-card border border-border rounded-xl text-center"
              >
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {model.name}
                </h3>
                <div className="flex justify-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                    {model.type}
                  </span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    {model.requirements}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/30 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              El Futuro de la IA Móvil
            </h2>
            <p className="text-lg text-muted-foreground">
              Ya está aquí. Estas herramientas marcan el inicio de una era donde
              cualquier usuario puede experimentar la potencia de la
              inteligencia artificial de manera rápida, accesible y lo más
              importante: de forma totalmente privada.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Necesitas Ayuda para Configurar?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Te ayudamos a implementar IA local en tus dispositivos. Consulta
            gratuita.
          </p>
          <RouterLink href="/contacto">
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg flex items-center justify-center gap-2 group mx-auto cursor-pointer">
              Contactar Ahora
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
