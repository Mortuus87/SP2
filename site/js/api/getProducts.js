import {
  baseUrl
} from "../api/path.js";
import { registerEvents } from "../components/events.js";

export async function getProducts() {
  const productsUrl = baseUrl + "products";

  try {
    const productsResponse = await fetch(productsUrl);
    const json = await productsResponse.json();
    console.log(json);
    return json;
  } catch (e) {
    console.log(e);
  }
}

export async function productsAsHtml(onlyFeatured = false, term = "") {

  let listToPresent = await getProducts("products");

  if (term) {
    listToPresent = listToPresent.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase())
    )
  }

  if (onlyFeatured) {
    listToPresent = listToPresent.filter(product => product.featured);
  }

  if (listToPresent.length == 0) {
    return "No products to display";
  }

  if (listToPresent) {
    let html = ``;

    listToPresent.forEach(product => {
      // remove trailing / on baseUrl
      let imagePath = '';

      try { 
        imagePath = baseUrl.slice(0, -1) + product.image.formats.small.url;
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
 
      html += `
      <div class="col-12 col-md-6 col-lg-4 pb-4">
        <a href="./product.html?product=${product.id}" class="card product ${product.featured ? "featured": ""}">
          <div class="card-header">
            ${figureHtml}
          </div>
          <div class="card-body">
          <h3 class="headline">${product.title}</h3>
            <p>${product.price} kr</p>
            <p>${product.description}</p>
          </div>
        </a>
      </div>
      `;
    });

    html += ``

    return html;
  }
}

export async function renderProducts(showOnlyFeatured = false) {
  const output = document.querySelector(".output");
  const search = document.querySelector("#search");

  let term = "";

  if (search) {
    term = search.value;
  }

  output.innerHTML = await productsAsHtml(showOnlyFeatured, term);

  registerEvents(showOnlyFeatured);
}