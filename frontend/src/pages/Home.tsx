// src/pages/Home.tsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import ImageCarousel from "../components/ImageCarousel";
import GoogleReview from "../components/GoogleReview";
import { useTranslation } from "../i18n/useTranslation";
import foodTruck from "../assets/food-truck-img.png";
import logo from "../assets/taqueria-logo.png";
import logoDm from "../assets/taqueria-logo-darkmode.png";
import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";
import ScrollToTopButton from "../components/ScrollToTopButton.tsx";
import { scrollToTop } from "../utils/scrollToTop.tsx"

const Home: React.FC = () => {
  const location = useLocation();
  const heroTitle = useTranslation("heroTitle");
  const heroSubtitle = useTranslation("heroSubtitle");
  const seeMenu = useTranslation("seeMenu");
  const aboutText = useTranslation("aboutSection");
  const cateringTitle = useTranslation("cateringTitle");
  const cateringItems = useTranslation("cateringItems"); // expect array
  const cateringDescription = useTranslation("cateringDescription");
  const reservationText = useTranslation("reservationText");
  const bookNow = useTranslation("bookNow");
  const aboutUsTitle = useTranslation("aboutUsTitle");
  const shortAbout = useTranslation("shortAbout");
  const reviewsTitle = useTranslation("reviewsTitle");

  // Scroll-to-hash logic
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  return (
      <div className="flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-20">
        {/* Mobile‐only logo bar */}
        <div className="block sm:hidden text-center py-[var(--space-md)] bg-[var(--color-bg)] dark:bg-gray-900">
          <img
              src={logo}
              alt="Taqueria Logo"
              className="h-40 w-auto mx-auto dark:hidden"
          />
          <img
              src={logoDm}
              alt="Taqueria Logo"
              className="h-40 w-auto mx-auto hidden dark:block"
          />
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
          {/* Order Online Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:items-start">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-3xl font-bold">{heroTitle}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {heroSubtitle}
              </p>
              <Link to="/menu">
                <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-full transition-colors">
                  {seeMenu}
                </button>
              </Link>
              <p className="mt-5 text-justify md:text-left">{aboutText}</p>
            </div>
            <div className="w-full">
              <iframe
                  className="w-full h-64 md:h-96 rounded-lg shadow-lg mx-auto md:mx-0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.792006198612!2d-120.82991159999999!3d35.31114929999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ece369202069ff%3A0xfcfec608ec1f27af!2sTaqueria%20Cinco%20de%20Mayo!5e0!3m2!1sen!2sus!4v1719436223894!5m2!1sen!2sus"
                  title="Google Maps"
                  allowFullScreen
              />
            </div>
          </section>

          {/* Catering Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Video/Trailer */}
            <div>
              <iframe
                  className="w-full aspect-video rounded-lg shadow-lg mx-auto lg:mx-0"
                  src="https://www.youtube.com/embed/Afi9g5e4z7s?si=MIgq-jH1dlxtU0yi"
                  title="Taqueria Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
              />
            </div>

            {/* Content: carousel + bullets + description */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center lg:text-left">
                {cateringTitle}
              </h2>

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
                <ImageCarousel
                    images={[{ imageURL: food1 }, { imageURL: food2 }, { imageURL: food3 }]}
                    className="w-full max-w-md mx-auto lg:w-full"
                />

                <div className="space-y-4 text-center lg:text-left">
                  <ul className="list-disc list-inside space-y-2">
                    {(cateringItems as string[]).map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p>{cateringDescription}</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-4 text-center lg:text-left">
                {reservationText}
              </h3>

              <div className="text-center lg:text-left">
                <Link to="/catering">
        <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
          {bookNow}
        </span>
                </Link>
              </div>
            </div>
          </section>


          {/* About & Reviews Section */}
          <section
              id="about-section"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:items-start"
          >
            <div className="space-y-6 text-justify md:text-left">
              <h2 className="text-3xl font-bold">{aboutUsTitle}</h2>
              <img
                  src={foodTruck}
                  alt="Taqueria food truck"
                  className="w-full rounded-lg shadow-lg mx-auto md:mx-0"
              />
              <p>{shortAbout}</p>
            </div>
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl font-bold">{reviewsTitle}</h2>
              <GoogleReview />
            </div>
          </section>
        </main>

        <Footer />
        <ScrollToTopButton onClick = { scrollToTop }/>
      </div>
  );
};

export default Home;
