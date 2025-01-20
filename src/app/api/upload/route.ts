import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import crypto from 'crypto';

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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
    // Check if blob storage is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN is not configured');
      return NextResponse.json(
        { error: 'File upload service is not configured' },
        { status: 503, headers: corsHeaders }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB` },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}` },
        { status: 400, headers: corsHeaders }
      );
    }

    // Read file buffer for virus scan
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Scan for viruses
    const isSafe = await scanForVirus(buffer);
    if (!isSafe) {
      return NextResponse.json(
        { error: 'File failed security scan' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Generate safe filename
    const fileName = generateSafeFileName(file.name);

    try {
      // Upload to Vercel Blob Storage
      const blob = await put(fileName, file, {
        access: 'public',
        addRandomSuffix: true,
      });

      // Return success with file details
      return NextResponse.json({
        message: 'File uploaded successfully',
        fileName: blob.pathname,
        url: blob.url,
        contentType: file.type,
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      }, { headers: corsHeaders });

    } catch (blobError) {
      console.error('Blob storage error:', blobError instanceof Error ? blobError.message : String(blobError));
      return NextResponse.json(
        { error: 'Failed to store file' },
        { status: 500, headers: corsHeaders }
      );
    }

  } catch (error) {
    console.error('Upload error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: 'Failed to process file upload' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
