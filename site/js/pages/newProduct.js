import { printFooter, printHeader } from "../components/commonSectionsAsHtml.js";
import {
  printNewProductFormAsHtml,
  attachNewProductFetchFormHandler
} from "../api/postProduct.js";

printHeader();
printFooter();

const output = document.querySelector('.output');

if (output) {
  output.innerHTML = printNewProductFormAsHtml();
  attachNewProductFetchFormHandler()
}