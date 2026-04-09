import { useEffect, useState } from "react";
import { BookOpen, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { usePageContext } from "@/hooks/usePageContext";

interface KBArticle {
  articleId: string;
  title: string;
  summary: string | null;
  category: string;
}

interface KBSuggestionsProps {
  onArticleClick?: (article: KBArticle) => void;
  onClose?: () => void;
}

export default function KBSuggestions({ onArticleClick, onClose }: KBSuggestionsProps) {
  const pageContext = usePageContext();
  const [suggestedArticles, setSuggestedArticles] = useState<KBArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  // Fetch all KB articles
  const { data: allArticles = [] } = trpc.knowledgeBase.getAll.useQuery();

  useEffect(() => {
    // Don't show suggestions on knowledge base page
    if (pageContext.category === "knowledge") {
      setIsLoading(false);
      return;
    }

    // Filter articles based on page context
    if (allArticles.length > 0) {
      const filtered = allArticles.filter((article) =>
        pageContext.suggestedArticles.includes(article.articleId)
      );

      // Shuffle and take top 3
      const shuffled = filtered.sort(() => Math.random() - 0.5).slice(0, 3);
      setSuggestedArticles(shuffled);
      setIsLoading(false);
    }
  }, [allArticles, pageContext]);

  if (isLoading || isDismissed || suggestedArticles.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-t border-accent/20 rounded-t-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen size={18} className="text-accent" />
          <span className="text-sm font-semibold text-foreground">
            Artículos Recomendados
          </span>
        </div>
        <button
          onClick={() => {
            setIsDismissed(true);
            onClose?.();
          }}
          className="p-1 hover:bg-background/50 rounded transition-colors"
        >
          <X size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-2">
        {suggestedArticles.map((article) => (
          <button
            key={article.articleId}
            onClick={() => {
              onArticleClick?.(article);
              setIsDismissed(true);
            }}
            className="w-full text-left p-2 bg-background/50 hover:bg-background border border-border/50 hover:border-accent/50 rounded transition-all text-sm"
          >
            <p className="font-medium text-foreground truncate">{article.title}</p>
            <p className="text-xs text-muted-foreground truncate">
              {article.summary || "Artículo de ayuda"}
            </p>
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        💡 Sugerencias basadas en la página que estás visitando
      </p>
    </div>
  );
}
