import { useState, useMemo } from "react";
import { Search, ChevronDown, ThumbsUp, ThumbsDown, BookOpen } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({});

  // Fetch all articles
  const { data: allArticles = [] } = trpc.knowledgeBase.getAll.useQuery();

  // Search articles
  const { data: searchResults = [] } = trpc.knowledgeBase.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length > 0 }
  );

  // Get articles by category
  const { data: categoryArticles = [] } = trpc.knowledgeBase.getByCategory.useQuery(
    { category: selectedCategory || "" },
    { enabled: !!selectedCategory }
  );

  // Record feedback mutation
  const recordFeedbackMutation = trpc.knowledgeBase.recordFeedback.useMutation();

  // Determine which articles to display
  const displayedArticles = useMemo(() => {
    if (searchQuery.length > 0) {
      return searchResults;
    }
    if (selectedCategory) {
      return categoryArticles;
    }
    return allArticles;
  }, [searchQuery, searchResults, selectedCategory, categoryArticles, allArticles]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allArticles.map((article) => article.category));
    return Array.from(cats).sort();
  }, [allArticles]);

  const handleFeedback = async (articleId: string, isHelpful: boolean) => {
    try {
      await recordFeedbackMutation.mutateAsync({ articleId, isHelpful });
      setFeedbackGiven((prev) => ({ ...prev, [articleId]: isHelpful }));
    } catch (error) {
      console.error("Error recording feedback:", error);
    }
  };

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
                <BookOpen size={16} /> Base de Conocimientos
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Encuentra Respuestas Rápidas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Explora nuestra base de conocimientos con artículos detallados sobre automatización, IA, diseño web y más.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Busca un tema, pregunta o palabra clave..."
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
                    Todas las categorías
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
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No se encontraron artículos. Intenta con otra búsqueda.
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
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {article.summary || article.content.substring(0, 100) + "..."}
                          </p>
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
                        <div className="px-6 py-4 border-t border-border bg-background/50">
                          <div className="prose prose-invert max-w-none text-foreground">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">
                              {article.content}
                            </p>
                          </div>

                          {/* Star Rating */}
                          <div className="mt-6 pt-4 border-t border-border">
                            <StarRating
                              articleId={article.articleId}
                              userEmail="anonymous@flaxnet.es"
                            />
                          </div>

                          {/* Feedback Section */}
                          <div className="mt-6 pt-4 border-t border-border flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">¿Fue útil?</span>
                            <button
                              onClick={() => handleFeedback(article.articleId, true)}
                              disabled={feedbackGiven[article.articleId] !== undefined}
                              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${
                                feedbackGiven[article.articleId] === true
                                  ? "bg-accent/20 text-accent"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                              } disabled:opacity-50`}
                            >
                              <ThumbsUp size={16} />
                              <span className="text-xs">{article.helpful}</span>
                            </button>
                            <button
                              onClick={() => handleFeedback(article.articleId, false)}
                              disabled={feedbackGiven[article.articleId] !== undefined}
                              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${
                                feedbackGiven[article.articleId] === false
                                  ? "bg-destructive/20 text-destructive"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                              } disabled:opacity-50`}
                            >
                              <ThumbsDown size={16} />
                              <span className="text-xs">{article.notHelpful}</span>
                            </button>
                          </div>

                          {/* Article Stats */}
                          <div className="mt-4 text-xs text-muted-foreground">
                            {article.views} vistas • Actualizado{" "}
                            {new Date(article.updatedAt).toLocaleDateString("es-ES")}
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
