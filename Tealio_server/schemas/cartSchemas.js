const fs = require('fs');
const path = './data/cart.json';

exports.readCart = () => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
  }
  const data = fs.readFileSync(path);
  return JSON.parse(data);
};

exports.writeCart = (data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};