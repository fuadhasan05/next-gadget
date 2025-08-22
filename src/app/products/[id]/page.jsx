import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function ProductDetailsPage({ params }) {
  const { id } = params;

  let product = null;

  try {
    const productsCollection = await dbConnect(
      collectionNameObj.productsCollection
    );

    // validate ObjectId
    if (!ObjectId.isValid(id)) {
      return notFoundPage();
    }

    product = await productsCollection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error("Error fetching product:", error);
    return errorPage("Something went wrong while fetching this product.");
  }

  if (!product) {
    return notFoundPage();
  }

  // normalize fields
  const serializedProduct = {
    ...product,
    _id: product._id.toString(),
    price: parseFloat(product.price) || 0,
    rating: parseFloat(product.rating) || 0,
    reviewCount: parseInt(product.reviewCount) || 0,
    images: Array.isArray(product.images)
      ? product.images
      : product.images
      ? [product.images]
      : ["/placeholder.png"],
    inStock: !!product.inStock,
    features: Array.isArray(product.features) ? product.features : [],
    category: product.category || "Uncategorized",
    brand: product.brand || "Unknown Brand",
  };

  return (
    <div className="bg-base-100 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link
                href="/products"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Products
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span>{serializedProduct.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
              <img
                src={serializedProduct.images[0]}
                alt={serializedProduct.name}
                className="w-full h-full object-cover"
              />
              {!serializedProduct.inStock && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {serializedProduct.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {serializedProduct.images.slice(0, 4).map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-colors"
                  >
                    <img
                      src={img}
                      alt={`${serializedProduct.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Category and Brand */}
            <div className="flex items-center space-x-4">
              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-medium">
                {serializedProduct.category}
              </span>
              <span className="text-sm">by {serializedProduct.brand}</span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold">
              {serializedProduct.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(serializedProduct.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>
                {serializedProduct.rating} ({serializedProduct.reviewCount}{" "}
                reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                ${serializedProduct.price.toFixed(2)}
              </span>
              {serializedProduct.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${parseFloat(serializedProduct.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="leading-relaxed">{serializedProduct.description}</p>
            </div>

            {/* Features */}
            {serializedProduct.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features -</h3>
                <ul className="space-y-2">
                  {serializedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button className="px-4 py-3  hover:bg-base-300 transition-colors cursor-pointer">
                    -
                  </button>
                  <span className="px-4 py-3 font-bold min-w-[3rem] text-center">
                    1
                  </span>
                  <button className="px-4 py-3  hover:bg-base-300 transition-colors cursor-pointer">
                    +
                  </button>
                </div>

                {/* Action Buttons */}
                <Button
                  variant="primary"
                  size="lg"
                  iconName="FiShoppingCart"
                  disabled={!serializedProduct.inStock}
                  className="flex-1 cursor-pointer"
                >
                  {serializedProduct.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  iconName="FiHeart"
                  className="px-4 cursor-pointer"
                >
                  Wishlist
                </Button>
              </div>
            </div>

            {/* Product Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2 p-3 bg-base-200 rounded-lg shadow-sm">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-base-200 rounded-lg shadow-sm">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-base-200 rounded-lg shadow-sm">
                <svg
                  className="h-5 w-5 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
          <h2 className="text-2xl font-bold  mb-8">Product Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold  mb-4">Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="">SKU</span>
                  <span className=" font-medium">
                    {serializedProduct._id.slice(-8).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="">Category</span>
                  <span className=" font-medium">
                    {serializedProduct.category}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="">Brand</span>
                  <span className=" font-medium">
                    {serializedProduct.brand}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="">Availability</span>
                  <span
                    className={`font-medium ${
                      serializedProduct.inStock
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {serializedProduct.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Reviews Summary */}
            <div>
              <h3 className="text-lg font-semibold  mb-4">Customer Reviews</h3>
              <div className="bg-base-200 rounded-lg p-6 shadow-sm">
                <div className="text-center">
                  <div className="text-5xl font-bold text-amber-500 mb-2">
                    {serializedProduct.rating}
                  </div>
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.floor(serializedProduct.rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className=" mb-4">
                    Based on {serializedProduct.reviewCount} reviews
                  </p>
                  <Button variant="outline" size="sm">
                    Write a Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Helper Components --- */
function errorPage(message) {
  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-base-200 border-red-200 dark:border-red-800 rounded-lg p-8">
          <svg
            className="h-12 w-12 text-red-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error
          </h2>
          <p className="text-red-600 mb-6">{message}</p>
          <Link href="/products">
            <Button variant="primary" iconName="FiArrowLeft">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function notFoundPage() {
  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-base-200 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8">
          <svg
            className="h-12 w-12 text-yellow-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            Product Not Found
          </h2>
          <p className="text-yellow-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/products">
            <Button variant="primary" iconName="FiArrowLeft">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
