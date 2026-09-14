import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { paymentId } = await request.json();
   const piApiKey = "tbcbbqynbt5weisuhataouzf5erdewevmfxl7fxjb0rfdetntdqz23b4qnb1eovh";

    if (!piApiKey) {
      return NextResponse.json({ error: "Server API Key is missing" }, { status: 500 });
    }

    const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${piApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const responseText = await piResponse.text();

    if (!piResponse.ok) {
      console.error("Pi API Error Response:", responseText);
      return NextResponse.json({ error: `Pi API Failed: ${responseText}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: JSON.parse(responseText) });
  } catch (err: any) {
    console.error("Approve route error", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}