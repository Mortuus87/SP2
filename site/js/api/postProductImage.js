import { baseUrl } from "../api/path.js";
import { getStorage } from "../util/storage.js";
import { getProduct } from "../api/getProduct.js";

export async function printPostProductImagetFormAsHtml() {

  let parameters = window.location.search;
  parameters = parameters.substr(1);

  // quick getting of the value of the first parameter
  let productId = parameters.split('=')[1];

  const product = await getProduct(productId)
  console.log(product);
  console.log(product.id);

  
  // <input type="hidden" name="ref" value="product" />
  // <input type="hidden" id="id" name="refId" value=${product.id} />
  // <input type="hidden" name="field" value="image" />
  
  let html = `
  <div class="col-12">
    <form id="postProductImage" class="form postProductImage">

    <label class="col-12"for="file">File<span class="required">*</span></label>
    <input id="file" type="file" name="files" required/>   

    <p>
      <span class="required">*</span> Required field
    </p>
    <input class="btn btn-primary" type="submit" value="Submit" />
    </form>
  </div>
  `;

  return html;
}

export async function attachPostProductImageFormHandler() {

  const newProductForm = document.querySelector("form");
  console.log(newProductForm);

  if (newProductForm) {
    console.log(newProductForm.id);
    const path = baseUrl + 'upload';

    newProductForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const auth = getStorage('auth', true);
      let token = auth.jwt
      console.log(token);

      const data = (new FormData(newProductForm))
      console.log(data);

      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      }

      try {
        const response = await fetch(path, options);
        const json = await response.json();

        if (json.created_at) {
          console.log('created product', json);
          newProductForm.reset()
        }

        if (json.error) {
          console.log('error:',json.message);
        }
      } catch (error) {
        
      }
    });
  }
}