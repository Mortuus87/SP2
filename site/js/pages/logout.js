import { printFooter, printHeader } from "../components/commonSectionsAsHtml.js";


localStorage.clear("auth");
localStorage.clear("cart");
console.log('auth:',localStorage.getItem('auth'));

printHeader();
printFooter();