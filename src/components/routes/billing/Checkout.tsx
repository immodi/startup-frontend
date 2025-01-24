import { PayPalButtons } from "@paypal/react-paypal-js";

interface CheckoutProps {
    onSuccess: () => void;
    price: number;
}

const Checkout: React.FC<CheckoutProps> = ({ onSuccess, price }) => {
    return (
        <PayPalButtons
            createOrder={() => {
                return createOrder(price);
            }}
            onApprove={(data, actions) => {
                onSuccess();
                return onApprove(data, actions);
            }}
            onError={(err) => console.log(err)}
            style={{
                color: "silver",
                borderRadius: 10,
                label: "pay",
            }}
            message={{ amount: 1 }}
        />
    );
};

interface OrderErrorDetail {
    issue?: string;
    description?: string;
}

interface OrderData {
    id?: string;
    details?: OrderErrorDetail[];
    debug_id?: string;
    purchase_units?: {
        payments?: {
            captures?: Array<{ status: string; id: string }>;
            authorizations?: Array<{ status: string; id: string }>;
        };
    }[];
}

async function createOrder(price: number) {
    const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: `${price}`, // Calculate total price from cart if needed
            currency: "USD",
        }),
    });

    try {
        const orderData: OrderData = await response.json();

        if (orderData.id) {
            return orderData.id;
        }

        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
            : JSON.stringify(orderData);

        return errorMessage;
    } catch (error) {
        console.error(error);
        return `${error}`;
    }
}

async function onApprove(data: any, actions: any) {
    try {
        const response = await fetch(`/api/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const orderData: OrderData = await response.json();

        const errorDetail = orderData?.details?.[0];

        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            return actions.restart();
        } else if (errorDetail) {
            throw new Error(
                `${errorDetail.description} (${orderData.debug_id})`,
            );
        } else if (!orderData.purchase_units) {
            throw new Error(JSON.stringify(orderData));
        } else {
            console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2),
            );
        }
    } catch (error) {
        console.error(error);
    }
}

export default Checkout;
