const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// Prime number utility function
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function nthPrime(n) {
  let count = 0;
  let num = 1;
  while (count < n) {
    num++;
    if (isPrime(num)) count++;
  }
  return num;
}

// homepage
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/nth-prime', (req, res) => {
  const n = parseInt(req.body.n);
  const prime = nthPrime(n);
  const result = `The ${n}-th prime number is: ${prime}`;
  res.render('result', { result });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
