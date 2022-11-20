import { printList } from "../api/editProduct.js";
import { printFooter, printHeader } from "../components/commonSectionsAsHtml.js";
import { deleteButtonEvents } from "../components/events.js";

printHeader();
printFooter();

const output = document.querySelector('.output');

if (output) {
  output.innerHTML = await printList();
  deleteButtonEvents()
}