// netlify/edge-functions/create-order.ts
import { Context } from "@netlify/edge-functions";
import {
    CheckoutPaymentIntent,
    Client,
    Environment,
    OrdersController,
} from "@paypal/paypal-server-sdk";

const client = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
        oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
    },
    environment: Environment.Production,
});

export default async (request: Request, context: Context) => {
    if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
            status: 405,
        });
    }

    try {
        const { currency = "USD", amount } = await request.json();

        if (!amount) {
            return new Response(
                JSON.stringify({ error: "Amount is required" }),
                { status: 400 },
            );
        }

        const ordersController = new OrdersController(client);
        const orderRequest = {
            body: {
                intent: CheckoutPaymentIntent.Capture,
                purchaseUnits: [
                    {
                        amount: {
                            currencyCode: currency,
                            value: amount,
                        },
                    },
                ],
            },
            prefer: "return=minimal",
        };

        const { body } = await ordersController.ordersCreate(orderRequest);
        return new Response(body.toString(), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Failed to create order:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create order" }),
            { status: 500 },
        );
    }
};

export const config = {
    path: "/api/orders",
};
