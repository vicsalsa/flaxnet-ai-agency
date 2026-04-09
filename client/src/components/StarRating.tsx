import { useState } from "react";
import { Star } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface StarRatingProps {
  articleId: string;
  userEmail?: string;
  onRatingSubmitted?: (rating: number) => void;
}

export default function StarRating({ articleId, userEmail, onRatingSubmitted }: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch average rating
  const { data: averageRating = 0 } = trpc.knowledgeBase.getAverageRating.useQuery({
    articleId,
  });

  // Fetch rating stats
  const { data: ratingStats } = trpc.knowledgeBase.getRatingStats.useQuery({
    articleId,
  });

  // Create rating mutation
  const createRatingMutation = trpc.knowledgeBase.createRating.useMutation();

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setShowReviewForm(true);
  };

  const handleSubmitRating = async () => {
    if (!selectedRating || !userEmail) return;

    try {
      await createRatingMutation.mutateAsync({
        articleId,
        rating: selectedRating,
        userEmail,
        review: review || undefined,
      });

      setSubmitted(true);
      onRatingSubmitted?.(selectedRating);

      // Reset form after 2 seconds
      setTimeout(() => {
        setSelectedRating(0);
        setReview("");
        setShowReviewForm(false);
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Califica este artículo</h3>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={`cursor-pointer transition-colors ${
                  star <= (hoveredRating || averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {averageRating > 0 ? `${averageRating.toFixed(1)}/5` : "Sin valoraciones"}
          </span>
        </div>
      </div>

      {/* Rating Distribution */}
      {ratingStats && ratingStats.totalRatings > 0 && (
        <div className="mb-4 space-y-1">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-4">{rating}</span>
              <div className="flex gap-1">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{
                    width: `${
                      (ratingStats.ratingDistribution[rating] / ratingStats.totalRatings) * 100
                    }%`,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-8 text-right">
                {ratingStats.ratingDistribution[rating]}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Rating Form */}
      {!submitted && (
        <>
          {!showReviewForm ? (
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    size={24}
                    className={`transition-colors ${
                      star <= (hoveredRating || selectedRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-foreground mb-2">
                  Tu valoración: {selectedRating} de 5 estrellas
                </p>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Comparte tu opinión (opcional)..."
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSubmitRating}
                  disabled={createRatingMutation.isPending}
                  className="flex-1 px-3 py-2 bg-accent text-accent-foreground rounded text-sm font-medium hover:shadow-lg hover:shadow-accent/50 transition-all disabled:opacity-50"
                >
                  {createRatingMutation.isPending ? "Enviando..." : "Enviar valoración"}
                </button>
                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setSelectedRating(0);
                    setReview("");
                  }}
                  className="px-3 py-2 bg-muted text-foreground rounded text-sm font-medium hover:bg-muted/80 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Success Message */}
      {submitted && (
        <div className="text-center py-2">
          <p className="text-sm text-green-400">✓ ¡Gracias por tu valoración!</p>
        </div>
      )}

      {/* Total Ratings */}
      {ratingStats && ratingStats.totalRatings > 0 && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          {ratingStats.totalRatings} {ratingStats.totalRatings === 1 ? "valoración" : "valoraciones"}
        </p>
      )}
    </div>
  );
}
