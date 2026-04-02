import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // root оставляем по умолчанию (корень проекта), так как index.html здесь
  // publicDir указывает, где лежат статические файлы (картинки, шрифты), если они не в src
  publicDir: "public",

  build: {
    outDir: "dist", // Сборка будет в папке dist в корне
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // Явно указываем путь к index.html в корне
      },
    },
  },

  server: {
    open: true, // Автооткрытие в браузере
    port: 3000,
    host: true,
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // Алиас для удобных импортов из src
    },
  },
});
