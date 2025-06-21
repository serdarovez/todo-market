"use client";

import { useEffect, useState } from 'react';
import { sanitize } from '@/utils/sanitizeHtml';

interface ReviewListProps {
  initialReviews: { id: number; text: string }[];
}

export const ReviewList = ({ initialReviews }: ReviewListProps) => {
  const [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
    // You can remove this if reviews won't change dynamically
    setReviews(initialReviews);
  }, [initialReviews]);

  return (
    <div className="lg:grid-cols-2 grid-cols-1 gap-4 grid">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white text-black p-3 rounded-lg"
          dangerouslySetInnerHTML={{
            __html: sanitize(review.text),
          }}
        />
      ))}
    </div>
  );
};
