// netlify/edge-functions/capture-order.ts
import { Context } from "@netlify/edge-functions";
import {
    Client,
    Environment,
    OrdersController,
} from "@paypal/paypal-server-sdk";

const client = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
        oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
    },
    environment: Environment.Sandbox,
});

export default async (request: Request, context: Context) => {
    if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
            status: 405,
        });
    }

    try {
        const { orderID } = context.params;

        if (!orderID) {
            return new Response(
                JSON.stringify({ error: "Order ID is required" }),
                { status: 400 },
            );
        }

        const ordersController = new OrdersController(client);
        const captureRequest = {
            id: orderID,
            prefer: "return=minimal",
        };

        const { body } = await ordersController.ordersCapture(captureRequest);
        return new Response(body.toString(), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Failed to capture order:", error);
        return new Response(
            JSON.stringify({ error: "Failed to capture order" }),
            { status: 500 },
        );
    }
};

export const config = {
    path: "/api/orders/:orderID/capture",
};
