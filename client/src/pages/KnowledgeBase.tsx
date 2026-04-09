import { useState, useMemo } from "react";
import { Search, ChevronDown, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// Importamos los datos directamente del JSON
import knowledgeData from "../data/knowledge.json";

// Definimos la interfaz para TypeScript
interface Article {
  articleId: string;
  title: string;
  category: string;
  keywords: string;
  content: string;
  summary: string;
  isActive: boolean;
}

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  // 1. Filtrar artículos activos y aplicar búsqueda/categoría
  const displayedArticles = useMemo(() => {
    let articles = (knowledgeData as Article[]).filter(a => a.isActive);

    // Filtrar por búsqueda
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.content.toLowerCase().includes(query) ||
          a.keywords.toLowerCase().includes(query)
      );
    }

    // Filtrar por categoría
    if (selectedCategory) {
      articles = articles.filter((a) => a.category === selectedCategory);
    }

    return articles;
  }, [searchQuery, selectedCategory]);

  // 2. Obtener categorías únicas para el sidebar
  const categories = useMemo(() => {
    const cats = new Set(knowledgeData.map((article) => article.category));
    return Array.from(cats).sort();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6">
              <span className="text-accent text-sm font-semibold flex items-center gap-2">
                <BookOpen size={16} /> Base de Conocimientos (Local)
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Flaxnet Intelligence
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Documentación técnica y guías sobre IA, automatización y desarrollo avanzado.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Busca tecnología, conceptos o guías..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories and Articles */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-lg font-bold mb-4 text-foreground">Categorías</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === null
                        ? "bg-accent text-accent-foreground"
                        : "bg-card text-foreground hover:bg-card/80"
                    }`}
                  >
                    Todos los artículos
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all capitalize ${
                        selectedCategory === category
                          ? "bg-accent text-accent-foreground"
                          : "bg-card text-foreground hover:bg-card/80"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Articles */}
            <div className="lg:col-span-3">
              {displayedArticles.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border border-dashed border-border">
                  <p className="text-muted-foreground text-lg">
                    No hemos encontrado nada para "{searchQuery}".
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayedArticles.map((article) => (
                    <div
                      key={article.articleId}
                      className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all"
                    >
                      <button
                        onClick={() =>
                          setExpandedArticle(
                            expandedArticle === article.articleId ? null : article.articleId
                          )
                        }
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/80 transition-colors"
                      >
                        <div className="text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-accent/20 text-accent rounded">
                              {article.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {article.title}
                          </h3>
                        </div>
                        <ChevronDown
                          size={20}
                          className={`text-accent transition-transform ${
                            expandedArticle === article.articleId ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Expanded Content */}
                      {expandedArticle === article.articleId && (
                        <div className="px-6 py-6 border-t border-border bg-background/30">
                          <div className="prose prose-invert max-w-none">
                            <p className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                              {article.content}
                            </p>
                          </div>
                          
                          <div className="mt-8 pt-4 border-t border-border/50">
                            <p className="text-xs text-muted-foreground italic">
                              Palabras clave: {article.keywords}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
