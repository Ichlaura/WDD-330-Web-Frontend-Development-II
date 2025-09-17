import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Se crea la instancia dataSource usando la categoría "tents".
const dataSource = new ProductData("tents");
// Seleccionar el contenedor donde se van a renderizar los productos
const element = document.querySelector(".product-list");
// Crear instancia de ProductList
const productList = new ProductList("Tents", dataSource, element);
// Inicializar la lista (trae los datos)
productList.init();