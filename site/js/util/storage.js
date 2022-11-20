/**
 * Setter for local storage item
 * @param {string} key 
 * @param {string} val 
 */
 export function setStorage(key, val) {
   console.log(val);
  localStorage.setItem(key, JSON.stringify(val));
}

/**
 * Getter for local storage item
 * @param {string} key 
 */
export function getStorage(key, asJson = false) {
  if (asJson) {
    let value = JSON.parse(localStorage.getItem(key));

    return value ? value : [];
  }
  return localStorage.getItem(key);
}

