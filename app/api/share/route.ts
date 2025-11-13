import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    console.log('📤 Share API: Forwarding to file.io...');
    
    // Forward to file.io with 1 week expiry
    const response = await fetch('https://file.io/?expires=1w', {
      method: 'POST',
      body: formData,
    });

    console.log('📥 File.io status:', response.status, response.statusText);
    
    const contentType = response.headers.get('content-type');
    console.log('📥 Content-Type:', contentType);
    
    // Check if response is JSON
    if (contentType?.includes('application/json')) {
      const result = await response.json();
      console.log('📥 File.io response:', result);
      return NextResponse.json(result, { status: response.status });
    } else {
      // File.io returned HTML (likely blocking localhost)
      const text = await response.text();
      console.log('⚠️ File.io returned HTML (localhost blocked):', text.substring(0, 200));
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'File.io blocked this request. This will work on your production domain with HTTPS.' 
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Share API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

