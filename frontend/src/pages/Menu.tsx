// src/pages/Menu.tsx
import React, { useState, useEffect } from "react";
import FoodCategory from "../components/FoodCategory";
import ImageCarousel from "../components/ImageCarousel";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Footer from "../components/Footer";
import { useTranslation } from "../i18n/useTranslation";
import img1 from "../assets/menu-1.jpg";
import img2 from "../assets/menu-2.jpg";
import img3 from "../assets/menu-3.jpg";

interface MenuItem {
    id: number;
    title: string;
    price: number;
    category: string;
    choices?: string[];
    style?: string[];
    photo?: string;
    desc?: string;
}

const menuImages = [{ imageURL: img1 }, { imageURL: img2 }, { imageURL: img3 }];

const Menu: React.FC = () => {
    const t = useTranslation;
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/menu/items`)
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data: MenuItem[]) => {
                setMenuItems(data);
            })
            .catch((err) => {
                console.error("Error fetching menu items:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-[var(--space-lg)]">
            <div className="standard-page py-[var(--space-lg)] px-[var(--space-md)]">
                <h1 className="text-4xl font-bold text-center mb-[var(--space-md)]">
                    {t("menuPageTitle")}
                </h1>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <>
                        <FoodCategory
                            title={t("menuCategoryCombinations")}
                            subtitle={t("menuCategoryCombinationsSub")}
                            items={menuItems.filter((i) => i.category === "Combinations")}
                        />
                        <FoodCategory
                            title={t("menuCategoryTacos")}
                            subtitle={t("menuCategoryTacosSub")}
                            items={menuItems.filter((i) => i.category === "Tacos/Tortas")}
                        />
                        <FoodCategory
                            title={t("menuCategoryBurritos")}
                            subtitle={t("menuCategoryBurritosSub")}
                            items={menuItems.filter((i) => i.category === "Burritos")}
                        />
                        <FoodCategory
                            title={t("menuCategoryIndividual")}
                            items={menuItems.filter((i) => i.category === "Individual")}
                        />
                        <FoodCategory
                            title={t("menuCategoryDrinks")}
                            items={menuItems.filter((i) => i.category === "Drinks")}
                        />

                        <div className="mt-[var(--space-lg)]">
                            <h2 className="text-2xl font-semibold mb-[var(--space-md)] text-center">
                                {t("youMightAlsoLike")}
                            </h2>
                            <ImageCarousel
                                images={menuImages}
                                className="w-full md:max-w-3xl mx-auto"
                            />
                        </div>
                    </>
                )}
            </div>

            <ScrollToTopButton
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <Footer />
        </div>
    );
};

export default Menu;
