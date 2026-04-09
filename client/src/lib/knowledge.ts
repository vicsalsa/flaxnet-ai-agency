import knowledgeData from "../data/knowledge.json";

export interface Article {
  articleId: string;
  title: string;
  category: string;
  keywords: string;
  content: string;
  summary: string;
  isActive: boolean;
}

export const getArticles = (): Article[] => {
  return (knowledgeData as Article[]).filter(a => a.isActive);
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return (knowledgeData as Article[]).find(a => a.articleId === slug);
};

export const getCategories = (): string[] => {
  const categories = (knowledgeData as Article[]).map(a => a.category);
  return [...new Set(categories)];
};
