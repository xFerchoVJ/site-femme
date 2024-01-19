const fs = require("fs");
const sharp = require("sharp");

const directorioDeImagenes =
  "D:/Progra/site-femme/assets/img/sitio_femme/gallery";
const directorioFinal =
  "D:/Progra/site-femme/assets/img/sitio_femme/gallery-webp";

const calidadWebP = 80; // Ajusta la calidad según tus preferencias (0-100)

fs.readdir(directorioDeImagenes, (err, files) => {
  if (err) {
    console.error("Error al leer el directorio:", err);
    return;
  }

  files.forEach((file) => {
    const inputPath = `${directorioDeImagenes}/${file}`;
    const outputPath = `${directorioFinal}/${file.replace(/\..+$/, ".webp")}`;

    sharp(inputPath)
      .toFormat("webp", { quality: calidadWebP })
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error(`Error al procesar ${file}:`, err);
        } else {
          const tamañoOriginal = fs.statSync(inputPath).size;
          const tamañoOptimizado = info.size;

          console.log(`Imagen optimizada y convertida: ${file}`);
          console.log(
            `Tamaño original: ${tamañoOriginal} bytes, Tamaño optimizado: ${tamañoOptimizado} bytes`
          );
        }
      });
  });
});
