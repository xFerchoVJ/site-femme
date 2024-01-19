const fs = require("fs");
const path = require("path");

// Definir la ruta de la carpeta de imágenes
const imageFolder = "assets/img/sitio_femme/gallery-webp";

// Leer las rutas de las imágenes en la carpeta
fs.readdir(imageFolder, (err, files) => {
  if (err) {
    console.error("Error al leer el directorio de imágenes:", err);
    return;
  }

  // Filtrar archivos de imágenes
  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  // Crear un array para almacenar los divs HTML
  const divs = imageFiles.map((file, index) => {
    const imagePath = path.join(imageFolder, file);
    return `
      <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
        <a href="${imagePath}" data-gallery="portfolio-gallery-app" class="glightbox preview-link">
          <div class="image-container">
            <img src="${imagePath}" class="img-fluid" alt="" />
            <div class="overlay"></div> <!-- Capa semitransparente -->
          </div>
        </a>
      </div>
    `;
  });

  // Unir los divs en una cadena
  const divsHTML = divs.join("\n");

  // Escribir la cadena en un archivo de texto
  fs.writeFile("gallery.html", divsHTML, "utf8", (err) => {
    if (err) {
      console.error("Error al escribir el archivo de salida:", err);
    } else {
      console.log("Archivo de galería HTML generado con éxito.");
    }
  });
});
