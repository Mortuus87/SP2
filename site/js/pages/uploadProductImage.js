import { printPostProductImagetFormAsHtml, attachPostProductImageFormHandler } from "./../api/postProductImage.js";
import { printFooter, printHeader } from "../components/commonSectionsAsHtml.js";

printHeader();
printFooter();

const output = document.querySelector('.output');

output.innerHTML = await printPostProductImagetFormAsHtml()

attachPostProductImageFormHandler()