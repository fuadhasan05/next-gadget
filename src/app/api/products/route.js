import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, price, description } = body;

    if (!name || !price) {
      return new Response(
        JSON.stringify({ message: "Name and price are required" }),
        { status: 400 }
      );
    }

    const productsCollection = await dbConnect(
      collectionNameObj.productsCollection
    );

    const result = await productsCollection.insertOne({
      name,
      price: parseFloat(price),
      description,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, result }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error adding product" }), {
      status: 500,
    });
  }
}
