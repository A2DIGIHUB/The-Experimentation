import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

// Utility to generate safe filename
const generateSafeFileName = (originalName: string): string => {
  const ext = originalName.split('.').pop();
  const randomName = crypto.randomBytes(16).toString('hex');
  return `${randomName}.${ext}`;
};

// Mock virus scan function - replace with actual implementation
async function scanForVirus(buffer: Buffer): Promise<boolean> {
  // Simulate virus scan
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true; // Return true if file is safe
}

export async function POST(request: Request) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { headers });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400, headers }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds limit' },
        { status: 400, headers }
      );
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400, headers }
      );
    }

    // Read file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Scan for viruses
    const isSafe = await scanForVirus(buffer);
    if (!isSafe) {
      return NextResponse.json(
        { error: 'File failed security scan' },
        { status: 400, headers }
      );
    }

    // Generate safe filename
    const fileName = generateSafeFileName(file.name);
    const filePath = join(UPLOAD_DIR, fileName);

    // Create uploads directory if it doesn't exist
    await mkdir(UPLOAD_DIR, { recursive: true });

    // Save file
    await writeFile(filePath, new Uint8Array(bytes));

    // Return success with file details
    return NextResponse.json({
      message: 'File uploaded successfully',
      fileName,
      url: `/uploads/${fileName}`,
    }, { headers });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
