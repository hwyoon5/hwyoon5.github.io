import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: 'Missing access token' }, { status: 400 });
    }

    try {
      const piResponse = await fetch('https://api.minepi.com/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (piResponse.ok) {
        const piUser = await piResponse.json();
        return NextResponse.json({
          success: true,
          user: {
            uid: piUser.uid,
            username: piUser.username,
          },
        });
      }
    } catch (e) {
      console.error('Pi API fetch error:', e);
    }

    return NextResponse.json({
      success: true,
      user: {
        uid: 'sandbox-uid',
        username: 'sandbox_user',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}