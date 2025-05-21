// src/components/GoogleReview.tsx
import React from "react";
import { AiFillStar } from "react-icons/ai";

const reviewDate = new Date("2024-02-01");

function calculateTimeAgo(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
  if (diffMonths < 12) {
    return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
  }
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
}

const GoogleReview: React.FC = () => {
  const stars = Array.from({ length: 5 }).map((_, i) => (
      <AiFillStar key={i} className="inline-block text-yellow-400 h-5 w-5" />
  ));

  return (
      <div className="
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      rounded-lg shadow p-6 space-y-4
      text-left text-gray-900 dark:text-gray-100
      transition-colors
    ">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <img
              className="h-9 w-9 rounded-full"
              src="https://lh3.googleusercontent.com/a-/ALV-UjXJOlnsoHjjOeSdTnk5c3iXU8GvzwQUkeLb-gCPgeZZVVBqOcHf=w60-h60-p-rp-mo-br100"
              alt="Reviewer Avatar"
          />
          <div className="flex flex-col text-sm">
            <a
                href="https://www.google.com/maps/contrib/109289351835221596617?hl=en-US"
                className="font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
              Amy Languell
            </a>
            <span className="text-gray-500 dark:text-gray-400">11 reviews · 3 photos</span>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            {stars}
            <span className="font-bold">{calculateTimeAgo(reviewDate)}</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400">Take out</p>
          <p className="text-gray-700 dark:text-gray-200">
            Santiago and Pedro are super nice and always make sure my order is
            just right. The pastor and asada is so good and not too dry or too
            fatty like I’ve experienced at other places. Prices are so cheap and
            you get a ton of meat. And they put grilled pineapple on the pastor
            tacos which I love!
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 text-sm">
          <div className="space-x-2 text-gray-600 dark:text-white">
            <span><b>Food</b>: 5/5</span>
            <span>|</span>
            <span><b>Service</b>: 5/5</span>
            <span>|</span>
            <span><b>Atmosphere</b>: 5/5</span>
          </div>
          <div className="flex items-center space-x-2">
            <img
                className="h-5"
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google Logo"
            />
            <a
                href="https://tinyurl.com/taqueria-google-reviews"
                className="text-blue-600 dark:text-blue-200 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
              See all reviews
            </a>
          </div>
        </div>
      </div>
  );
};

export default GoogleReview;
