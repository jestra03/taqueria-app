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

// Mock menu data
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

const mockMenuItems: MenuItem[] = [
    { id: 1, title: "Deluxe Burrito", price: 9.5, category: "Burritos", photo: "menu-1" },
    { id: 2, title: "Asada Tacos", price: 3.0, category: "Tacos/Tortas", photo: "menu-2" },
    { id: 3, title: "Shrimp Cocktail", price: 7.0, category: "Individual", photo: "menu-3" },
    { id: 4, title: "Party Platter", price: 45.0, category: "Combinations", desc: "Feeds 4–6 guests" },
    { id: 5, title: "Horchata", price: 2.5, category: "Drinks/Bebidas" },
];

const menuImages = [{ imageURL: img1 }, { imageURL: img2 }, { imageURL: img3 }];

const Menu: React.FC = () => {
    const t = useTranslation;
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        // Simulate server call
        setTimeout(() => setMenuItems(mockMenuItems), 300);
    }, []);

    return (
        <div className="flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-25">
            <div className="standard-page py-[var(--space-lg)] px-[var(--space-md)]">
                <h1 className="text-4xl font-bold text-center mb-[var(--space-md)]">
                    {t("menuPageTitle")}
                </h1>

                {!menuItems.length ? (
                    <div className="flex justify-center py-20">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <>
                        <FoodCategory
                            title={t("menuCategoryCombinations")}
                            subtitle={t("menuCategoryCombinationsSub")}
                            items={menuItems.filter((i) => i.category === "Combinations")}
                            imgIcon="/assets/combinations.png"
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
                            imgIcon="/assets/burrito-icon.png"
                        />
                        <FoodCategory
                            title={t("menuCategoryIndividual")}
                            items={menuItems.filter((i) => i.category === "Individual")}
                        />
                        <FoodCategory
                            title={t("menuCategoryDrinks")}
                            items={menuItems.filter((i) => i.category === "Drinks/Bebidas")}
                        />

                        <div className="mt-[var(--space-lg)]">
                            <h2 className="text-2xl font-semibold mb-[var(--space-md)] text-center">
                                {t("youMightAlsoLike")}
                            </h2>
                            <ImageCarousel images={menuImages} className="w-full md:max-w-3xl mx-auto" />
                        </div>
                    </>
                )}
            </div>

            <ScrollToTopButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
            <Footer />
        </div>
    );
};

export default Menu;
