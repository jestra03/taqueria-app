// src/utils/importImages.ts

const modules = import.meta.glob("/src/assets/images/*.png", { eager: true, as: "url" });

const images: Record<string, string> = {};
for (const path in modules) {
  // path is like '/src/assets/menu-1.jpg'
  const fileName = path.split("/").pop()!;
  images[fileName] = (modules[path] as string);
}

export default images;
