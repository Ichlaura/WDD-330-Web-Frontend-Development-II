import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Obtener los detalles del producto
    this.product = await this.dataSource.findProductById(this.productId);
    // Renderizar los detalles del producto
    this.renderProductDetails();
    // Agregar listener al botón Add to Cart
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];

    // ⚡ Mejor manejo de cantidad: si el producto ya existe, sumar cantidad
    const existing = cartItems.find(item => item.Id === this.product.Id);
    if (existing) {
      existing.Quantity = (existing.Quantity || 1) + 1;
    } else {
      cartItems.push({ 
        Id: this.product.Id, 
        Title: this.product.NameWithoutBrand, 
        Price: this.product.FinalPrice, 
        Quantity: 1 
      });
    }

    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

// ⚡ Cambios mínimos en los IDs y nombres para que coincidan con  HTML
function productDetailsTemplate(product) {
  document.getElementById('productTitle').textContent = product.NameWithoutBrand; // antes querySelector('h2')
  document.getElementById('productBrand').textContent = product.Brand.Name;       // antes querySelector('h3')

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = `¥${product.FinalPrice}`; // opcional agregar símbolo
  document.getElementById('productColor').textContent = product.Colors?.[0]?.ColorName ?? ''; // evitar error si no hay color
  document.getElementById('productDescription').innerHTML = product.DescriptionHtmlSimple; // antes productDesc

  document.getElementById('addToCart').dataset.id = product.Id;
}

      