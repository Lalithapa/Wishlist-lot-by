import { json } from "@remix-run/node";


export async function loader() {
    return json({
        status:"202",
        message:"Okay"
    })
};
export async function action({request}){
    const method = request.method;

    switch(method){
        case "PATCH":
            return json({
                status:"200",
                method:"Patch"
            })
        case "POST":
            return json({
                status:"200",
                method:"Post"
            })
            default:
            return new Response("Method Not Allowed" , {status:405})
    }
}