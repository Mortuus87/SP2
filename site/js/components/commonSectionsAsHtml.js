import { isAuthenticated } from "../api/auth.js";
import { baseUrl } from "../api/path.js";

export function printHeader() {
  console.log('printing header');
  let html = `
    <div class="container">
      <a href="" class="logo">
        <img class="" src="assets/svg/logo.svg" alt="Company logo">
      </a>
      <nav class="top-nav">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="products.html">Products</a></li>
          <li><a href="cart.html">Cart</a></li>
          `;
        
        if (isAuthenticated()) {
          html += `
          <li><a href="admin.html">Admin</a></li>
          <li><a href="logout.html">Log out</a></li>
          `;
        } else {
          html += `
          <li><a href="login.html">Login</a></li>
          `;
        }

        html += `</ul>
      </nav>
    </div>
  `;

  document.querySelector('.header').innerHTML = html;
}

export function printFooter() {
  console.log('printing footer');
  document.querySelector(".footer").innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-2 pt-5">
          <figure>
            <img class="" src="assets/svg/logo.svg" alt="Company logo">
          </figure>
        </div>
        <div class="col-12 col-md-5 pt-5">
          <div>
            <p>Lorem street 1,</p>
            <p>1234 PLACE</p>
            <p>12346789</p>
          </div>
        </div>
        <div class="col-12 col-md-5 pt-5">
          <ul>
            <li><img src="assets/svg/contact.svg" alt=""><a href="">Contact</a></li>
            <li><img src="assets/svg/pin.svg" alt=""><a href="">Stores</a></li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

export async function banner() {
  const frontpageBillboard = document.querySelector(".billboard.frontpage");

  if (frontpageBillboard) {
    frontpageBillboard.innerHTML = `
    <div class="container-fluid">
      <div class="row">
        <div class="content" style="background-image: url(${await getImage()});">

          <h1 class="headline">Home</h1>
        </div>
      </div>
    </div>
    `;
  }
  
}

async function getImage() {
  const productUrl = baseUrl + "home";

  try {
    const productResponse = await fetch(productUrl);
    const productJson = await productResponse.json();
    
    let imagePath = '';
    try { 
      imagePath = baseUrl.slice(0, -1) + productJson.hero_banner.formats.large.url;
    } catch (error) {
      console.log(error);
    }

    console.log(imagePath);

    return imagePath;
  } catch (error) {
    console.log(error);
  }
}