// src/pages/Menu.tsx
import React, { useState, useEffect } from "react";
import FoodCategory from "../components/FoodCategory";
import ImageCarousel from "../components/ImageCarousel";
import ScrollToTopButton from "../components/ScrollToTopButton";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
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

const menuImages = [
    {
        imageURL: img1,
        altText: `
Burritos: Pastor $9.75, Asada $10.50, Buche $9.75, Carnitas $9.75, Pollo $9.25, Chile Relleno $10.25, Veggie $9.75, Birria $10.75, Rice, beans and cheese $7.00, Beans and cheese $6.00.
California (rice, beans, potatoes, guacamole, jalapeños, sour cream & cheese) $10.50.
Chimichanga (beans, cheese, sour cream, guac, cheese) $10.50.
Fish or Shrimp Burrito (rice, beans, cabbage, pico, Ensenada-style, cheese) $12.75.

Tortas $10.45 each: Asada, Pastor, Jamón, Birria, Pollo, Chorizo, Carnitas.
Includes beans, choice of meat, lettuce, tomato, onion, avocado & jalapeño.
`
    },
    {
        imageURL: img2,
        altText: `
Combinations (with rice & beans):
#1 Two chiles rellenos $14.00,
#2 Two cheese enchiladas $12.99,
#3 Two tamales (pork or chicken) $12.99,
#4 One chile relleno & one cheese enchilada $12.99,
#5 Two soft tacos (asada, carnitas, chicken or pastor) $11.99,
#6 Two soft tacos (fish, shrimp, cabbage, Ensenada-style, pico de gallo) $12.99,
#7 Two enchiladas (asada, carnitas, pastor or chicken) $12.99,
#8 Two crispis tacos (asada, carnitas, pastor or chicken) $11.99.

Tacos $3.00 each: Asada, Pastor, Buche, Carnitas, Birria, Veggie,
Fish (pescado grilled tilapia), Shrimp (camarón, cabbage, Ensenada-style, pico).
`
    },
    {
        imageURL: img3,
        altText: `
Individual Items:
Sopes $12.25, Asada fries $13.25, Chile Relleno $5.25, 3 Tacos Quesa Birria (with consome) $13.25,
Taco salad $10.99, 3 Crispy Tacos (potato) $10.99, 5 Taquitos papa (cheese, lettuce, guacamole, sour cream) $10.99,
Quesadilla Supreme $11.75, Quesadilla $8.25, Tamales $3.50, Nachos $8.25, Nachos Supreme $10.25,
Side of fries $4.75, Side of rice & beans $4.75, Chips and salsa $3.75, Guacamole 4oz $3.00, Tostada (choice of meat) $6.99.

Drinks: Can Soda $2.00, Jarritos $3.50, Bottle Water $1.50, Horchata / Jamaica $3.50.
`
    }
];

const Menu: React.FC = () => {
    const t = useTranslation;
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [userFavorites, setUserFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = localStorage.getItem("user-token");
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch menu items
                const menuResponse = await fetch(`${apiUrl}/menu/items`);
                if (!menuResponse.ok) throw new Error("Network response was not ok");
                const menuData: MenuItem[] = await menuResponse.json();
                setMenuItems(menuData);

                // Fetch user favorites if logged in
                if (token) {
                    try {
                        const favoritesResponse = await fetch(`${apiUrl}/menu/favorites`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        if (favoritesResponse.ok) {
                            const favoritesData = await favoritesResponse.json();
                            setUserFavorites(favoritesData.favorites || []);
                            console.log("✅ Loaded user favorites:", favoritesData.favorites);
                        }
                    } catch (favErr) {
                        console.warn("Failed to fetch favorites:", favErr);
                        // Don't fail the whole page if favorites fail
                    }
                }
            } catch (err) {
                console.error("Error fetching menu items:", err);
                setError("Failed to load menu");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl, token]);

    // Handle favorite changes from FoodEntry components
    const handleFavoriteChange = (itemId: number, isFavorited: boolean) => {
        const itemIdStr = itemId.toString();
        if (isFavorited) {
            setUserFavorites(prev => [...prev, itemIdStr]);
        } else {
            setUserFavorites(prev => prev.filter(id => id !== itemIdStr));
        }
    };

    // Get favorite menu items based on user's favorite IDs
    const favoriteMenuItems = menuItems.filter(item =>
        userFavorites.includes(item.id.toString())
    );

    return (
        <div className="flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-[var(--space-lg)]">
            <div className="standard-page py-[var(--space-lg)] px-[var(--space-md)]">
                <h1 className="text-4xl font-bold text-center mb-[var(--space-md)]">
                    {t("menuPageTitle")}
                </h1>
                {error && (
                    <div className="text-red-600 text-center py-4 font-medium">
                        {error}
                    </div>
                )}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <>
                        {/* Favorites Section - Only show if user is logged in and has favorites */}
                        {token && favoriteMenuItems.length > 0 && (
                            <FoodCategory
                                title="❤️ Your Favorites"
                                subtitle="Your personally selected menu items"
                                items={favoriteMenuItems}
                                userFavorites={userFavorites}
                                onFavoriteChange={handleFavoriteChange}
                            />
                        )}

                        <FoodCategory
                            title={t("menuCategoryCombinations")}
                            subtitle={t("menuCategoryCombinationsSub")}
                            items={menuItems.filter((i) => i.category === "Combinations")}
                            userFavorites={userFavorites}
                            onFavoriteChange={handleFavoriteChange}
                        />
                        <FoodCategory
                            title={t("menuCategoryTacos")}
                            subtitle={t("menuCategoryTacosSub")}
                            items={menuItems.filter((i) => i.category === "Tacos/Tortas")}
                            userFavorites={userFavorites}
                            onFavoriteChange={handleFavoriteChange}
                        />
                        <FoodCategory
                            title={t("menuCategoryBurritos")}
                            subtitle={t("menuCategoryBurritosSub")}
                            items={menuItems.filter((i) => i.category === "Burritos")}
                            userFavorites={userFavorites}
                            onFavoriteChange={handleFavoriteChange}
                        />
                        <FoodCategory
                            title={t("menuCategoryIndividual")}
                            items={menuItems.filter((i) => i.category === "Individual")}
                            userFavorites={userFavorites}
                            onFavoriteChange={handleFavoriteChange}
                        />
                        <FoodCategory
                            title={t("menuCategoryDrinks")}
                            items={menuItems.filter((i) => i.category === "Drinks")}
                            userFavorites={userFavorites}
                            onFavoriteChange={handleFavoriteChange}
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