import fs from "fs";
import path from "path"; // Dodaj ten import
import sharp from "sharp";
import { createFilter } from "vite";

export default function myImagePlugin() {
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Vite plugin that pixelates images and replaces them in the code.
   *
   * @returns An object with two methods: `load` and `transform`.
   *          `load` is called when Vite loads a file, and it returns the
   *          pixelated image as a buffer. `transform` is called when Vite
   *          transforms a file, and it returns the modified code with the
   *          original image replaced with the pixelated one.
   */
  /******  95d29e0b-e033-4c06-b2dc-1e33de876d84  *******/ const imageFilter =
    createFilter(/\.(png|jpe?g|gif)$/);

  return {
    name: "vite-plugin-pixelate-images",

    async load(id: string) {
      if (imageFilter(id)) {
        console.log("🤬 IMAGE! load called with:", id);

        // Przetwórz obrazek, np. używając biblioteki sharp
        const image = await fs.promises.readFile(id);
        const pixelatedImage = await sharp(image)
          .resize(10) // Ustaw rozmiar "pikseli"
          .toBuffer();

        // Zapisz rozpikselowany obrazek do katalogu output
        const outputFileName = `output/${id}.pixelated.jpg`;
        await fs.promises.writeFile(outputFileName, pixelatedImage);

        // Zwróć oryginalny obrazek (zostanie on użyty w bundlu)
        return image;
      }
    },

    async transform(code: string, id: string) {
      // Funkcja pomocnicza do zbierania plików źródłowych
      async function getAllSourceFiles() {
        const directoryPath = path.resolve("./src"); // Ścieżka do katalogu ze źródłami
        const files: string[] = [];

        // Prosta funkcja do przeszukiwania katalogu
        const readDirectory = async (dir: string) => {
          const items = await fs.promises.readdir(dir);
          for (const item of items) {
            const itemPath = path.join(dir, item);
            const stat = await fs.promises.stat(itemPath);
            if (stat.isDirectory()) {
              await readDirectory(itemPath); // Rekursywne przeszukiwanie katalogu
            } else {
              if (
                item.endsWith(".astro") ||
                item.endsWith(".js") ||
                item.endsWith(".ts")
              ) {
                // Filtruj pliki
                files.push(itemPath);
              }
            }
          }
        };

        await readDirectory(directoryPath);
        return files;
      }

      if (imageFilter(id)) {
        console.log("transform called with:", id);

        // Uzyskaj względną ścieżkę do oryginalnego obrazka bez 'src/'
        const originalImagePath = id.replace(/^.*\/src\//, ""); // Usuń wszystko przed 'src/'

        // Przeszukaj wszystkie pliki źródłowe w projekcie
        const files = await getAllSourceFiles(); // Funkcja, którą musisz zaimplementować, aby pobrać pliki

        let originalImageReferences: string[] = [];

        // Przeszukaj pliki w poszukiwaniu oryginalnego obrazka
        for (const file of files) {
          const fileContent = await fs.promises.readFile(file, "utf-8");
          const regex = new RegExp(originalImagePath, "g"); // Tworzymy regex dla ścieżki oryginalnego obrazka

          if (regex.test(fileContent)) {
            originalImageReferences.push(file); // Dodaj plik do listy, jeśli zawiera odwołanie
          }
        }

        console.log(
          "Found original image references in files:",
          originalImageReferences,
        );

        // Kontynuuj z dalszym przetwarzaniem kodu...
        const pixelatedImagePath = `output/${path.basename(id)}.pixelated.jpg`; // Użyj path.basename do uzyskania nazwy pliku

        // Modyfikacja kodu, np. zastąpienie oryginalnego obrazka na pikselowany
        code = code.replace(
          new RegExp(originalImagePath, "g"),
          pixelatedImagePath,
        );

        return code; // Zwróć zmodyfikowany kod
      }

      return null; // Jeśli nie ma modyfikacji, zwróć null
    },
  };
}
