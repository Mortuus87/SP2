import { getProduct } from "./getProduct.js";
import { baseUrl } from "./path.js";
import { isAuthenticated } from "../api/auth.js";

export default async function printList(list) {

  if (list.length == 0) {
    let html = `
    <p>No products to display</p>
    <p>Check out our <a href="products.html">products</a> to see if you can find something you'd like</p>
    `;
    return html;
  }

  let html = `
  <ul class="cards">`;

  // console.log(list.length);
  for (let i = 0; i < list.length; i++) {
    const id = list[i];
    const product = await getProduct(id)
    // console.log(product);

    let imagePath = '';

    try { 
      imagePath = baseUrl.slice(0, -1) + product.image.formats.thumbnail.url;
    } catch (error) {
      console.log('Image could not be resolved:',error);
    }

    const hasImage = imagePath.length > 0;

    let figureHtml = '';
    if (hasImage) {
      figureHtml = `
      <figure class="d-none d-md-block col-md-3">
        <img src="${imagePath}" alt="">
      </figure>
      `;
    } else {
      figureHtml = `
      <figure class="d-none d-md-block col-md-3">
        <img src="${product.image_url}" alt="">
      </figure>
      `;
    }

    html += `
      <li class="product col-12 mb-4">
        <div class="card">
            <div class="card-body row">
              <div class="${hasImage ? 'col-md-9' : 'col-12'}">
                <h2 class="headline">${product.title}</h2>
                <p>${product.price} kr</p>
              </div>
              ${figureHtml}
              <div>
                <a class="btn btn-primary" href="./product.html?product=${product.id}">Go to product</a>
                <input id="${product.id}" class="btn btn-primary toggle" type="button" value="Remove from cart">
              </div>
            </div>
        </div>
      </li>
      `;
  }

  html += `</ul>`;

  return html;

}