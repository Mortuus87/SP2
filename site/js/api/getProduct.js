import {
  baseUrl
} from "../api/path.js";
import { registerEvents } from "../components/events.js";

export async function getProduct(id) {
  const productUrl = baseUrl + "products/" + id;

  try {
    const productResponse = await fetch(productUrl);
    const productJson = await productResponse.json();
    console.log(productJson);
    return productJson;
  } catch (error) {
    console.log(error);
  }
}

export async function productAsHtml(id) {
  let product = await getProduct(id);
  console.log(product);
  let imagePath = '';
  
  try { 
    imagePath = baseUrl.slice(0, -1)+product.image.formats.medium.url;
  } catch (error) {
    // console.log(error);
  }

  const hasImage = imagePath.length > 0;

  let figureHtml = '';
  if (hasImage) {
    figureHtml = `
    <figure>
      <img src="${imagePath}" alt="">
    </figure>
    `;
  } else {
    figureHtml = `
    <figure>
      <img src="${product.image_url}" alt="">
    </figure>
    `;
  }

  let html = ``;
  html += `
      <article class="product ${product.featured ? "featured": ""}">
          <div class="row">
            <div class="${figureHtml ? 'col-12 col-md-4' : 'd-none'}">
              ${figureHtml}
              </div>
            <div class="${figureHtml ? 'col-12 col-md-8' : ''}">
              <h3 class="headline">${product.title}</h3>
              <p>${product.description}</p>
              <p>Price: ${product.price} kr</p>
              <div class="buttons">
                <input id="${product.id}" class="btn btn-primary toggle" type="button" value="Add to cart"/>
                <a href="cart.html" class="btn btn-primary">Go to cart</a>
              </div>
            </div>
          </div>
      </article>

  `;
  html += ``

  return html;
}

export async function renderProduct() {
  const output = document.querySelector(".output");

  let parameters = window.location.search;
  parameters = parameters.substr(1);

  // quick getting of the value of the first parameter
  let productId = parameters.split('=')[1];

  // console.log('Showing product', productId);

  output.innerHTML = await productAsHtml(productId);

  registerEvents();
}