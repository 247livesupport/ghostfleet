import axios from 'axios';

export async function handler(event, context) {
    if (event.httpMethod !== 'POST') return { statusCode: 405 };

    const body = JSON.parse(event.body);
    
    // Forward the NOWPayments IPN/Webhook data to your Replit Backend
    try {
        await axios.post(`${process.env.GHOST_FLEET_URL}/api/webhook/purchase`, body, {
            headers: { 'x-api-key': process.env.GHOST_FLEET_ADMIN_KEY }
        });
        return { statusCode: 200, body: "Forwarded" };
    } catch (err) {
        return { statusCode: 500, body: "Replit Backend unreachable" };
    }
}