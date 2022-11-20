import listCart from "../api/getCart.js";
import {
  getStorage
} from "../util/storage.js";
import { cartToggle } from "../components/events.js";
import { printFooter, printHeader } from "../components/commonSectionsAsHtml.js";
import { getProduct } from "../api/getProduct.js";

printHeader();
printFooter();

const output = document.querySelector('.output.cart');

if (output) {
  const list = getStorage('cart', true);

  console.log(list);
  output.innerHTML = await listCart(list);
  
  const articleElements = document.querySelectorAll(".cart .product");

  
  if (articleElements) {
    for (let i = 0; i < articleElements.length; i++) {
      const articleElement = articleElements[i];

      const btn = articleElement.querySelector("input[type=button].toggle");
      
      updateCost();

      // attach listeners to html that was just printed
      if (btn) {
        console.log(btn.id);
        btn.onclick = (e) => {
          e.preventDefault();
          console.log('clicked product cart toggle');
          cartToggle(btn);
          articleElement.style.display = 'none';
          updateCost();
        }
      }
    }
  }
}

async function updateCost() {
  const totalprice = document.querySelector('.totalprice');
  const articleElements = document.querySelectorAll(".cart .product");

  if (articleElements && totalprice) {
    const list = getStorage('cart', true);
    let runningTotal = '<ul>'
    let finalTotal = 0;


    for (let i = 0; i < list.length; i++) {
      const id = list[i];
      const product = await getProduct(id);
      console.log(product);

      
      runningTotal += `<li>${product.title} (${product.price} kr)</li>`;
      finalTotal = finalTotal+product.price;
    }

    runningTotal += '</ul>';
    
    totalprice.innerHTML =  runningTotal;
    totalprice.innerHTML += `<p>Total: ${finalTotal} kr</p>`;
    totalprice.innerHTML += `<a class="btn btn-primary">Checkout</a>`
  }
}