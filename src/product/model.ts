export interface FormProduct {
  image: string;
  name: string;
  unit: string;
  price: string;
  stock: string;
}

export interface Product {
  image: string;
  name: string;
  unit: string;
  price: number;
  stock: number;
}

function toFirestore(product: FormProduct): Product {
  return {
    // Hardcode image because firestore doesn't support base64 images. Use Cloud storage instead
    image: "https://images.unsplash.com/photo-1567779833503-606dc39a14fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60",
    name: product.name,
    unit: product.unit,
    price: parseFloat(product.price),
    stock: parseInt(product.stock, 10),
  }
}

function fromFirestore(
  snapshot: firebase.firestore.QueryDocumentSnapshot<Product>,
  options: firebase.firestore.SnapshotOptions
): FormProduct {
  const product = snapshot.data(options);
  return {
    image: product.image,
    name: product.name,
    unit: product.unit,
    price: product.price.toString(),
    stock: product.stock.toString(),
  }
}

export const converter = { fromFirestore, toFirestore };