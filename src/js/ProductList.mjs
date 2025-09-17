import { renderListWithTemplate } from "./utils.mjs";


// Función para generar el HTML de cada tarjeta de producto
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}



//Add a class called ProductList and export this class as default.
export default class ProductList {
  constructor(category, dataSource, listElement) {
        // Información pasada al constructor para hacerlo reutilizable
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
        // Obtener la lista de productos desde el dataSource
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

}