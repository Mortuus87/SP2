import {
  renderProducts
} from "./../api/getProducts.js";
import { printFooter, printHeader } from "../components/commonSectionsAsHtml.js";

printHeader();
printFooter();
renderProducts();
