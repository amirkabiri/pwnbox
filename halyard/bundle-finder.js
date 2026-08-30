console.clear();
const fs = require('fs');

const wordlist = fs.readFileSync('js-filename-wordlist.txt', 'utf8').toString().trim().split("\n");

function checkBundleExists(name) {
  const path = `https://halyard-cb44e5d3bbc0.pwnbox-lab.com/Content/js/${name}-bundle.min.js`;
  fetch(path).then(() => console.log('got it')).catch(err => console.log(err));
}

fetch('https://halyard-cb44e5d3bbc0.pwnbox-lab.com/Content/js/login-bundle.min.js');

// checkBundleExists('login');

// wordlist.flatMap(item => {
//   return [
//     fetch(`https://halyard-cb44e5d3bbc0.pwnbox-lab.com/Content/js/login-bundle.min.js`),
//
//   ]
// })
