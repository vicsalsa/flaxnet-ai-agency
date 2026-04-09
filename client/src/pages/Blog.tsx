import { ArrowRight, User, Tag, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "Todos" },
    { id: "automation", label: "Automatización" },
    { id: "ia", label: "Inteligencia Artificial" },
    { id: "seo", label: "SEO" },
    { id: "design", label: "Diseño Web" },
    { id: "business", label: "Negocios" },
  ];

  const posts = [
    {
      id: 9,
      title: "IA en tu Móvil: Guía Completa",
      excerpt:
        "Cómo ejecutar Inteligencia Artificial localmente en tu smartphone. Convierte tu móvil en un laboratorio de IA portátil.",
      category: "ia",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/ai-agents-collaboration-bdf3hkEZmQAidhhRuMiEE4.webp",
      date: "9 de Abril, 2026",
      author: "Carlos Martínez",
      readTime: "6 min",
      slug: "ia-movil-guia",
      link: "/blog/ia-movil",
    },
    {
      id: 8,
      title: "Hardware para IA Local: Requisitos",
      excerpt:
        "Guía completa de hardware para implementar LLMs en tu empresa. VRAM, GPUs y alternativas para pyme.",
      category: "ia",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/data-analytics-dashboard-ewdyQczXYKkNxUatKoEfpZ.webp",
      date: "9 de Abril, 2026",
      author: "Carlos Martínez",
      readTime: "10 min",
      slug: "hardware-ia-local-requisitos",
      link: "/blog/hardware-ia-local",
    },
    {
      id: 7,
      title: "IA Local para Empresas: Privacidad y Seguridad",
      excerpt:
        "La privacidad absoluta y la soberanía del dato son los beneficios fundamentales de implementar un LLM de forma local. Descubre cómo proteger tus datos sensibles.",
      category: "ia",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/hero-ai-neural-network-3ymCmcMVpN3acshu95Ar3K.webp",
      date: "9 de Abril, 2026",
      author: "Carlos Martínez",
      readTime: "8 min",
      slug: "ia-local-empresas-privacidad",
      link: "/blog/ia-local-empresas",
    },
    {
      id: 1,
      title: "Cómo Automatizar tu Empresa con n8n en 2024",
      excerpt:
        "Guía completa para implementar flujos de trabajo automáticos que ahorran horas de trabajo manual cada semana.",
      category: "automation",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/automation-workflow-visual-BAqZv8vsdNEnVXU2Z6X2vQ.webp",
      date: "28 de Marzo, 2024",
      author: "Alejandro Torres",
      readTime: "8 min",
      slug: "automatizar-empresa-n8n-2024",
      link: "/blog/n8n-que-es",
    },
    {
      id: 2,
      title: "El Futuro de los Agentes de IA en Atención al Cliente",
      excerpt:
        "Descubre cómo los agentes autonomous de IA están transformando la atención al cliente y qué esperar en los próximos años.",
      category: "ia",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/ai-agents-collaboration-bdf3hkEZmQAidhhRuMiEE4.webp",
      date: "25 de Marzo, 2024",
      author: "María García",
      readTime: "6 min",
      slug: "agentes-ia-atencion-cliente",
      link: "/servicios/agentes-ia",
    },
    {
      id: 3,
      title: "SEO Avanzado: Estrategias que Funcionan en 2024",
      excerpt:
        "Las últimas técnicas de posicionamiento web impulsadas por inteligencia artificial que están dando resultados.",
      category: "seo",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/hero-ai-neural-network-3ymCmcMVpN3acshu95Ar3K.webp",
      date: "20 de Marzo, 2024",
      author: "Carlos Martínez",
      readTime: "10 min",
      slug: "seo-avanzado-estrategias-2024",
      link: "/servicios/seo",
    },
    {
      id: 4,
      title: "Diseño UX que Convierte: Principios Esenciales",
      excerpt:
        "Aprende los principios de diseño que transforman visitantes en clientes potenciales.",
      category: "design",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/data-analytics-dashboard-ewdyQczXYKkNxUatKoEfpZ.webp",
      date: "15 de Marzo, 2024",
      author: "Laura Sánchez",
      readTime: "7 min",
      slug: "diseno-ux-convierte-principios",
      link: "/servicios/diseno-web",
    },
    {
      id: 5,
      title: "Cómo Reducir Costos Operativos con IA",
      excerpt:
        "Caso de estudio: cómo una empresa mediana redujo sus costos en un 40% implementando automatización.",
      category: "business",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/digital-transformation-abstract-4nxgXB9wgyQYjTecaBG3WL.webp",
      date: "10 de Marzo, 2024",
      author: "Carlos Martínez",
      readTime: "5 min",
      slug: "reducir-costos-operativos-ia",
      link: "/casos-exito",
    },
    {
      id: 6,
      title: "Integración MCP: Conecta tu IA con tus Datos",
      excerpt:
        "Tutorial paso a paso para implementar Model Context Protocol en tu empresa.",
      category: "ia",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/ai-agents-collaboration-bdf3hkEZmQAidhhRuMiEE4.webp",
      date: "5 de Marzo, 2024",
      author: "María García",
      readTime: "12 min",
      slug: "integracion-mcp-paso-a-paso",
      link: "/servicios/mcp",
    },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Artículos, guías y noticias sobre automatización, IA y
            transformación digital.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar artículos..."
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === category.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-card border border-border text-muted-foreground hover:border-accent/50"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10"
              >
                {/* Image */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={14} className="text-accent" />
                    <span className="text-accent text-sm font-semibold uppercase">
                      {categories.find(c => c.id === post.category)?.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <Link href={post.link || "/blog"}>
                    <span className="w-full px-4 py-2 border border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center gap-2 group cursor-pointer">
                      Leer Artículo
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No se encontraron artículos que coincidan con tu búsqueda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 text-accent hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Suscríbete a Nuestro Newsletter
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Recibe las últimas noticias, guías y artículos directamente en tu
            email. Sin spam, solo contenido de valor.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
