import dbConnect from "@/lib/dbConnect";
import ProductsGrid from "./ProductsGrid"; // client component

export default async function Products() {
  const productCollection = await dbConnect("products");
  const data = await productCollection.find({}).limit(8).toArray();
  const products = JSON.parse(JSON.stringify(data)); // serialize MongoDB docs

  return <ProductsGrid products={products} />;
}