import { printFooter, printHeader } from "../components/commonSectionsAsHtml.js";
import {
  printPutProductFormAsHtml,
  attachPutProductRequest
} from "../api/putProduct.js";

printHeader();
printFooter();

const output = document.querySelector('.output');

if (output) {
  output.innerHTML = await printPutProductFormAsHtml();
  attachPutProductRequest();
}