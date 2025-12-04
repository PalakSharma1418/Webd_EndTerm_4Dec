import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, MoreVertical } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.likes || 0);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={review.userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=f97316&color=fff`}
            alt={review.userName}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="font-bold text-gray-800">{review.userName}</h4>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="flex">
          {renderStars(review.rating)}
        </div>
        <span className="text-sm font-semibold text-gray-700">{review.rating}.0</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        {review.comment}
      </p>

      {/* Order Details */}
      {review.items && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Ordered:</span> {review.items.join(', ')}
          </p>
        </div>
      )}

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review ${index + 1}`}
              className="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-80 transition"
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-6 pt-4 border-t">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 transition ${
            liked ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span className="text-sm font-medium">{likeCount}</span>
        </button>
        
        <button className="flex items-center space-x-2 text-gray-500 hover:text-orange-500 transition">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Reply</span>
        </button>
      </div>

      {/* Restaurant Response */}
      {review.restaurantResponse && (
        <div className="mt-4 ml-8 bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Restaurant Response</p>
              <p className="text-xs text-gray-500">{review.responseDate}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {review.restaurantResponse}
          </p>
        </div>
      )}
    </div>
  );
};

// Example usage component with multiple reviews
const ReviewsList = () => {
  const sampleReviews = [
    {
      id: 1,
      userName: 'Sarah Johnson',
      userAvatar: null,
      rating: 5,
      date: '2 days ago',
      comment: 'Amazing food and super fast delivery! The pizza was still hot when it arrived. Definitely ordering again.',
      items: ['Margherita Pizza', 'Garlic Bread'],
      likes: 12,
      images: [
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop',
      ],
      restaurantResponse: 'Thank you so much for your kind words! We\'re thrilled you enjoyed your meal. Looking forward to serving you again!',
      responseDate: '1 day ago'
    },
    {
      id: 2,
      userName: 'Mike Chen',
      userAvatar: null,
      rating: 4,
      date: '5 days ago',
      comment: 'Great taste and good portions. Only suggestion would be to add more vegetarian options.',
      items: ['Chicken Burger', 'Fries'],
      likes: 8
    },
    {
      id: 3,
      userName: 'Priya Sharma',
      userAvatar: null,
      rating: 5,
      date: '1 week ago',
      comment: 'Best sushi in town! Fresh ingredients and beautifully presented. The California roll was perfection.',
      items: ['California Roll', 'Salmon Nigiri'],
      likes: 15,
      images: [
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=200&h=200&fit=crop'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition">
          Write a Review
        </button>
      </div>
      {sampleReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export { ReviewCard, ReviewsList };
export default ReviewCard;