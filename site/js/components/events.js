import {
  renderProducts
} from "../api/getProducts.js";
import { getStorage, setStorage } from "../util/storage.js";
import { sendDeleteRequest, printList as printDeleteList } from "../api/editProduct.js";

export function registerEvents(showFavoritesOnly = false) {

  // Filter by text field
  const search = document.querySelector("#search");
  if (search) {
    search.onkeyup = function (e) {
      console.log("term changed");
      renderProducts(showFavoritesOnly);
    }
  }

  const articleElements = document.querySelectorAll(".product");
  if (articleElements) {
    for (let i = 0; i < articleElements.length; i++) {
      const articleElement = articleElements[i];
      const toggleBtn = articleElement.querySelector("input[type=button].toggle")

      if (toggleBtn) {
        updateButtonValue(toggleBtn);
        toggleBtn.onclick = function (e) {
          e.preventDefault();
          console.log('pressed generic toggle');
          cartToggle(toggleBtn);
          // renderProduct(toggleBtn.id);
        }
      }
    }
  }
}

export function cartToggle(btn) {
  const id = btn.id;
  // establish an empty favorites list if none is present
  if (!getStorage("cart")) {
    setStorage("cart", [])
    console.log("establishing cart:", getStorage("cart", true))
  }

  let cart = getStorage("cart", true);

  // remove if item is present
  if (cart.includes(id)) {
    console.log("removing id:", id);

    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      if (item == id) {
        // remove the item that is the same as the give id
        let removed = cart.splice(i, 1);
      }
    }
  } else {
    console.log("adding id:", id);
    cart.push(id)
  }

  // Update storage
  setStorage("cart", cart);

  // Finally check that the input button has the right value/label
  updateButtonValue(btn)
}

export function updateButtonValue(btn) {
  let cart = getStorage('cart', true);
  let isCarted = cart.some(carted => carted == btn.id);
  btn.value = isCarted ? 'Remove from cart':'Add to cart'
}

export function deleteButtonEvents() {
  const articleElements = document.querySelectorAll(".product");
  if (articleElements) {
    for (let i = 0; i < articleElements.length; i++) {
      const articleElement = articleElements[i];
      const deleteBtn = articleElement.querySelector("input[type=button].delete")

      if (deleteBtn) {
        deleteBtn.onclick = function (e) {
          e.preventDefault();
          const deleteConfirmation = confirm('Are you sure you want to delete this product?')
          if (deleteConfirmation) {            
            console.log('deleting id:', deleteBtn.id);
            sendDeleteRequest(deleteBtn.id);
            articleElement.style.display = 'none';
          } else {
            console.log('aborting delete of id:', deleteBtn.id);
          }

        }
      }
    }
  }
}