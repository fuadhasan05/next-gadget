import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import ProductsGrid from "./ProductsGrid"; 

export default async function Products() {
  const productsCollection = await dbConnect(collectionNameObj.productsCollection);
  const data = await productsCollection.find({}).limit(8).toArray();
  const products = JSON.parse(JSON.stringify(data)); 

  return <ProductsGrid products={products} />;
}