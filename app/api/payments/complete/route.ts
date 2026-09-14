import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { paymentId, txid } = await request.json();
    const PI_API_KEY = process.env.PI_API_KEY;

    if (PI_API_KEY) {
      await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${PI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ txid }),
      });
    }

    return NextResponse.json({ success: true, paymentId, txid });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}