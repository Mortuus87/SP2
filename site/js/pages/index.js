import {
  renderProducts
} from "./../api/getProducts.js";
import { printFooter, printHeader, banner } from "../components/commonSectionsAsHtml.js";

banner()
printHeader();
printFooter();
renderProducts(true);
