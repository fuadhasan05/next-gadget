import ProductCard from "@/components/ProductCard";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export default async function AllProducts({ searchParams }) {
  const page = parseInt(searchParams?.page || "1", 10);
  const limit = 8;
  const skip = (page - 1) * limit;

  const productsCollection = await dbConnect(
    collectionNameObj.productsCollection
  );

  // Fetch paginated products
  const data = await productsCollection
    .find({})
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalProducts = await productsCollection.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);

  const products = JSON.parse(JSON.stringify(data));

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-600 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Discover our complete collection of premium products, carefully
            crafted to meet your needs.
          </p>
        </div>

        {/* Stats and Controls */}
        <div className="bg-base-200 rounded-xl shadow-sm p-6 mb-8 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <b>{products.length}</b> of {totalProducts} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="mb-12">
          <ProductCard products={products} />
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            {page > 1 && (
              <a
                href={`/products?page=${page - 1}`}
                className="px-4 py-2 rounded-md bg-base-200 border text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Previous
              </a>
            )}

            {[...Array(totalPages)].map((_, i) => (
              <a
                key={i}
                href={`/products?page=${i + 1}`}
                className={`px-4 py-2 rounded-md border ${
                  page === i + 1
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-base-200 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {i + 1}
              </a>
            ))}

            {page < totalPages && (
              <a
                href={`/products?page=${page + 1}`}
                className="px-4 py-2 rounded-md bg-base-200 border text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Next
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
