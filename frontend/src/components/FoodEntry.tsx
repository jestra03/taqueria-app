// src/components/FoodEntry.tsx
import React from "react";
import { useTranslation } from "../i18n/useTranslation";
import images from "../utils/importImages.tsx";

export interface MenuItem {
    id: number;
    title: string;
    price: number;
    choices?: string[];
    style?: string[];
    photo?: string;
    desc?: string;
}

interface FoodEntryProps {
    item: MenuItem;
}

const FoodEntry: React.FC<FoodEntryProps> = ({ item }) => {
    const t = useTranslation;

    return (
        <div className="w-56 p-4 bg-[var(--color-form-bg)] dark:bg-[var(--color-form-bg-dark)] rounded-lg shadow">
            <h5 className="text-lg font-medium mb-2">{item.title}</h5>

            <div className="w-full h-40 bg-white rounded overflow-hidden flex items-center justify-center mb-2">
                {item.photo ? (
                    <img
                        src={images[item.photo]}
                        alt={item.title}
                        className="object-cover h-full"
                    />
                ) : (
                    <span className="text-gray-500">{t("noPhoto")}</span>
                )}
            </div>

            <p className="mb-2">
                <span className="font-semibold">{t("foodPriceLabel")}</span>{" "}
                ${item.price.toFixed(2)}
            </p>

            {item.choices && (
                <div className="mb-2">
                    <label className="block font-medium mb-1">
                        {t("foodChoicesLabel")}
                    </label>
                    <select
                        id={`choice-${item.id}`}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800"
                    >
                        {item.choices.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {item.style && (
                <div className="mb-2">
                    <label className="block font-medium mb-1">{t("foodStyleLabel")}</label>
                    <div className="flex flex-wrap gap-2">
                        {item.style.map((s) => (
                            <label key={s} className="flex items-center space-x-1">
                                <input type="checkbox" value={s} />
                                <span>{s}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {item.desc && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {item.desc}
                </p>
            )}
        </div>
    );
};

export default FoodEntry;
