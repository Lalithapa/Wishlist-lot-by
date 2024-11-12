import { json } from "@remix-run/node";
import db from "../db.server";
import { cors } from "remix-utils/cors";


export async function loader() {
    return json({
        ok:true,
        message:"Hello from the Api"
    })
};
export async function action({request}){
    const method = request.method;

    let data = await request.formData();
    data = Object.fromEntries(data);
    const customerId = data.customerId;
    const productId = data.productId;
    const shop = data.shop;

    if (!customerId || !productId || !shop ){
        return json({
            message:"Missing required Data- customerId , productId or shop ",
            method:method
        })
    }

    let response;
    switch(method){
        case "POST":
            const wishlist = await db.wishlist.create({
                data:{
                    customerId,
                    productId,
                    shop,
                },
            });
         response = json({
                message:"Product Added to wishlist",
                method:method,
                wishlist:wishlist 
            });
            return cors(request,response);
            case "PATCH":
            // Handle PATCH request logic here
            // For example, updating an existing item in the wishlist
            return json({ message: "Success", method: method });
            case "DELETE":
                await db.wishlist.deleteMany({
                    where: {
                      customerId: customerId,
                      shop: shop,
                      productId: productId,
                    },
                  });
            
                  response = json({ message: "Product removed from your wishlist", method: method, wishlisted: false });
                  return cors(request, response);
            default:
                // Optional: handle other methods or return a method not allowed response
                return new Response("Method Not Allowed", { status: 405 });
    }
}