// src/components/GoogleReview.tsx
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useTranslation } from "../i18n/useTranslation";
import reviewer from "../assets/reviewer.png"

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
  const t = useTranslation;
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
              src={reviewer}
              alt={t("reviewerAvatarAlt")}
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
            <span className="text-gray-500 dark:text-gray-400">
            {t("reviewsCountPhotos")}
          </span>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            {stars}
            <span className="font-bold">{calculateTimeAgo(reviewDate)}</span>
          </div>
          <p className="text-gray-700 dark:text-white">{t("reviewText")}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 text-sm">
          <div className="space-x-2 text-gray-600 dark:text-gray-200">
            <span><b>{t("ratingFoodLabel")}</b>: 5/5</span>
            <span>|</span>
            <span><b>{t("ratingServiceLabel")}</b>: 5/5</span>
            <span>|</span>
            <span><b>{t("ratingAtmosphereLabel")}</b>: 5/5</span>
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
              {t("seeAllReviews")}
            </a>
          </div>
        </div>
      </div>
  );
};

export default GoogleReview;
