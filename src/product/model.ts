interface Product {
  name: string;
  unit: string;
  price: number;
  stock: number;
}

function fromFirestore(product: any): Product {
  return {
    name: product.name,
    unit: product.unit,
    price: parseFloat(product.price),
    stock: parseInt(product.price, 10),
  }
}

function toFirestore(product: Product) {
  return {
    name: product.name,
    unit: product.unit,
    price: product.price.toString(),
    stock: product.stock.toString(),
  }
}