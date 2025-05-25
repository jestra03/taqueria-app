// src/components/FoodCategory.tsx
import React, { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";
import FoodEntry from "./FoodEntry";
import { HiChevronRight } from "react-icons/hi";

export interface MenuItem {
    id: number;
    title: string;
    price: number;
    category: string;
    choices?: string[];
    style?: string[];
    photo?: string;
    desc?: string;
}

interface FoodCategoryProps {
    title: string;
    subtitle?: string;
    items: MenuItem[];
    icon?: React.ComponentType<{ className?: string }>;
    imgIcon?: string;
}

const FoodCategory: React.FC<FoodCategoryProps> = ({
                                                       title,
                                                       subtitle,
                                                       items,
                                                       icon: Icon,
                                                       imgIcon,
                                                   }) => {
    const t = useTranslation;
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="w-full max-w-4xl mx-auto my-6">
            <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setExpanded((v) => !v)}
            >
                <h2 className="flex items-center text-2xl font-semibold">
                    {title}
                    {Icon && <Icon className="ml-2 text-xl" />}
                    {imgIcon && (
                        <img src={imgIcon} alt={title} className="ml-2 h-6 w-6" />
                    )}
                </h2>
                <HiChevronRight
                    className={`transform transition-transform ${
                        expanded ? "rotate-90" : ""
                    }`}
                />
            </div>

            {subtitle && expanded && (
                <p className="mt-1 text-gray-600 dark:text-gray-400">{subtitle}</p>
            )}

            {expanded && (
                <div className="mt-4 flex flex-wrap justify-center gap-6">
                    {items.map((item) => (
                        <FoodEntry key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoodCategory;
