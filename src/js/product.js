

import { getLocalStorage, setLocalStorage } from './utils.mjs';

import ProductData from './ProductData.mjs';
import { getParam } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';



// Obtener ID del producto desde la URL
const productId = getParam('product');
// Crear instancia de ProductData para leer JSON
const dataSource = new ProductData('tents');


//solo para prueba
//dataSource.findProductById(productId).then(product => {
//console.log(product);
//});

function addProductToCart(product) {
  const cartItems = getLocalStorage('so-cart') || [];
  cartItems.push(product);
  setLocalStorage('so-cart', product);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Crear instancia de ProductDetails con ID y fuente de datos
const product = new ProductDetails(productId, dataSource);
product.init(); // muestra los detalles del producto