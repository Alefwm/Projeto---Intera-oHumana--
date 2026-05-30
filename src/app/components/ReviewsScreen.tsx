import { X, Star, ThumbsUp, Camera } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { reviewsByRestaurant, getRatingDistribution } from '../data/reviewsData';
import { useLanguage } from '../contexts/LanguageContext';

interface ReviewsScreenProps {
  dishName: string;
  restaurantName: string;
  averageRating: number;
  totalReviews: number;
  onClose: () => void;
}

export default function ReviewsScreen({
  dishName,
  restaurantName,
  averageRating,
  totalReviews,
  onClose
}: ReviewsScreenProps) {
  const { t } = useLanguage();
  const reviews = reviewsByRestaurant[restaurantName] || [];
  const ratingDistribution = getRatingDistribution(restaurantName);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center animate-fadeIn"
      onClick={onClose}
    >
      {/* Reviews Container - 393px width */}
      <div
        className="w-full max-w-[393px] h-[90vh] bg-white dark:bg-[#121212] rounded-t-3xl overflow-hidden flex flex-col animate-slideUp transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#1E1E1E] border-b border-gray-100 dark:border-gray-700 px-5 py-4 z-10 flex-shrink-0 transition-colors">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="active:scale-90 transition-transform"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">{dishName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{restaurantName}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Rating Summary */}
          <div className="bg-gradient-to-br from-[#7FDBCA]/10 to-[#FFB088]/10 dark:from-[#7FDBCA]/20 dark:to-[#FFB088]/20 px-5 py-6 border-b border-gray-100 dark:border-gray-700 transition-colors">
            <div className="flex items-start gap-6">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex gap-1 mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{totalReviews} {t('reviews.reviews')}</p>
              </div>

              {/* Rating Distribution */}
              <div className="flex-1 space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item.stars}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#7FDBCA] to-[#FFB088]"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Count */}
            <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Camera className="w-4 h-4" />
                <span>47 {t('reviews.photos')}</span>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {reviews.map((review) => (
              <div key={review.id} className="px-5 py-5">
                {/* User Info */}
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                      {review.userName}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-0.5">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Review Comment */}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  {review.comment}
                </p>

                {/* Review Photos */}
                {review.photos && review.photos.length > 0 && (
                  <div className="mb-3 -mx-5 px-5 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-2 w-max">
                      {review.photos.map((photo, index) => (
                        <div
                          key={index}
                          className="relative rounded-xl overflow-hidden w-48 h-48 flex-shrink-0"
                        >
                          <ImageWithFallback
                            src={photo}
                            alt={`Foto ${index + 1} da avaliação`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Helpful Button */}
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#2A2A2A] hover:bg-gray-200 dark:hover:bg-[#353535] active:scale-95 rounded-full transition-all">
                  <ThumbsUp className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {t('reviews.helpful')} ({review.helpful})
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}