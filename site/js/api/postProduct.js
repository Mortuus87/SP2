import {
  baseUrl
} from "../api/path.js";
import {
  getStorage
} from "../util/storage.js";

export function printNewProductFormAsHtml() {
  // New

  // Title, Price, Featured, Description, Image (file) or Image (link)

  let auth = getStorage('auth', true);
  
  // <label class="col-12"for="file">File</label>
  // <input id="file" type="file" name="file" />



  let html = `
  <div class="col-12">
    <form id="postNewProduct" class="form newProduct">
    <h1 class="headline">
      <span>Add Product</span>
    </h1>
    <p>
      <label class="col-12" for="title">Title<span class="required">*</span></label>
      <input id="title" type="text" name="title" value="" required/>
    </p>
    <p>
      <label class="col-12" for="price">Price<span class="required">*</span></label>
      <input id="price" type="text" name="price" value="" required/>
    </p>
    <p>
      <input id="featured" type="checkbox" name="featured" value=""/>
      <label class="col-12"for="featured">Featured</label>
    </p> 
    <p>
      <label class="col-12"for="description">Description</label>
      <textarea id="description" name="description" value="" /></textarea>   
    </p>
    <p>    
      <label class="col-12"for="url">Image url</label>
      <input id="url" type="text" name="url" value="" />
    </p>
    <p>
      <span class="required">*</span> Required field
    </p>
    <input class="btn btn-primary" type="submit" value="Submit" />
    </form>
  </div>
  `;

  return html;
}

export function attachNewProductFetchFormHandler() {
  const newProductForm = document.querySelector("form");
  if (newProductForm) {
    const path = baseUrl + 'products';

    newProductForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const auth = getStorage('auth', true);
      let token = auth.jwt
      console.log(token);

      const data = JSON.stringify({
        // image: newProductForm.file.value,
        // image_url: newProductForm.url.value,
        title: newProductForm.title.value,
        price: newProductForm.price.value,
        featured: newProductForm.featured.checked,
        description: newProductForm.description.value
      })
      console.log(data);

      const options = {
        method: 'POST',
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
      console.log(options);

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