import { baseUrl } from "./path.js";
import { getStorage } from "../util/storage.js";
import { getProducts } from "./getProducts.js";

export async function printList() {

  const products = await getProducts();
  console.log(products.length);

  let html = '';
  if (!products.length > 0) {
    html = `
      No products to remove.
    `;
  } else {
    html = `<ul class="cards row">`;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(product);
      html += `
        <li class="product col-12 col-md-6 mb-4">
          <div class="card">
              <div class="card-body row">
                <div class="col-12">
                  <h2 class="headline">${product.title}</h2>
                  <p>${product.price} kr</p>
                  <a class="btn btn-primary" href="./product.html?product=${product.id}">View product</a>
                  <!-- <a class="btn btn-primary" href="./uploadproductimage.html?product=${product.id}">Upload image</a> -->
                  <a class="btn btn-primary" href="./editproduct.html?product=${product.id}">Edit product</a>
                  <input id="${product.id}" class="btn btn-danger delete" type="button" value="Delete">
                </div>
              </div>
          </div>
        </li>
        `;
    }
  
    html += `</ul>`;
  }

  return html;
}

export async function sendDeleteRequest(id) {
  const path = baseUrl + 'products/' + id;
  const auth = getStorage('auth', true);
  let token = auth.jwt

  const options = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  try {
    const response = await fetch(path, options);
    const json = await response.json();

    console.log('deleted product', json);
    
  } catch (error) {
    console.log(error);
  }
}