import { baseUrl } from "../api/path.js";
import { getProduct } from "../api/getProduct.js";
import { getStorage } from "../util/storage.js";
// import { getProducts } from "./getProducts.js";

export async function printPutProductFormAsHtml() {
  let parameters = window.location.search;
  parameters = parameters.substr(1);

  // quick getting of the value of the first parameter
  let id = parameters.split('=')[1];
  
  if (!id) {
    return `
    <p>Invalid product id</p>
    `;
  }

  const product = await getProduct(id);
  console.log(product);

  let html = `
  <div class="col-12">
    <form id="putProduct" class="form putProduct">
      <h1 class="headline">
        <span>Edit product</span>
      </h1>
      <input type="hidden" id="id" name="id" value="${product.id}">
      <p>
        <label class="col-12" for="title">Title</label>
        <input id="title" type="text" name="title" value="${product.title}" required/>
      </p>
      <p>
      <label class="col-12" for="price">Price</label>
      <input id="price" type="text" name="price" value="${product.price}" required/>
      </p>    
      <p>
        <input id="featured" type="checkbox" name="featured" ${product.featured ? 'checked' : ''}/>
        <label class="col-12"for="featured">Featured</label>
      </p>
      <p>
      <label class="col-12"for="url">Image URL</label>
      <input id="url" type="text" name="url" value="${product.image_url ? product.image_url : ''}" required/>    
      </p>
      <p>
      <label class="col-12"for="description">Description</label>
      <textarea id="description" name="description"/>${product.description}</textarea>        
      </p>
      <input class="btn btn-primary update" type="submit" value="Update product" />
    </form>
  </div>
  `;

  return html;
}

export function attachPutProductRequest() {
  const form = document.querySelector("form#putProduct");
  console.log(form);

  if (form) {
    const path = baseUrl + 'products/' + form.id.value;
    console.log(path);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const auth = getStorage('auth', true);
      let token = auth.jwt
      console.log(token);

      const data = JSON.stringify({
        // image: form.file.value,
        // image_url: form.url.value,
        title: form.title.value,
        price: form.price.value,
        featured: form.featured.checked,
        image_url: form.url.value,
        description: form.description.value
      })
      console.log(data);

      const options = {
        method: 'PUT',
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
      console.log(options);

      try {
        const response = await fetch(path, options);
        // const json = await response.json();
        // console.log(json);
        location.href = "./admin.html";

      } catch (error) {
        
      }
    });
  }
}