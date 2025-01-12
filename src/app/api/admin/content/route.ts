import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify admin token
const verifyToken = async (request: Request) => {
  const cookieStore = cookies();
  const token = cookieStore.get('admin-token')?.value;
  
  if (!token) {
    return false;
  }

  try {
    verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
};

// GET /api/admin/content
export async function GET(request: Request) {
  const isAuthenticated = await verifyToken(request);
  
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // In a real application, fetch from database
  const contents = [
    {
      id: '1',
      title: 'Understanding Sickle Cell Disease',
      description: 'A comprehensive guide to understanding sickle cell disease, its symptoms, and management.',
      imageUrl: '/images/article1.jpg',
      status: 'published',
      type: 'article',
      createdAt: '2025-01-12T14:00:00Z',
      modifiedAt: '2025-01-12T14:00:00Z',
    },
    // Add more mock data as needed
  ];

  return NextResponse.json(contents);
}

// POST /api/admin/content
export async function POST(request: Request) {
  const isAuthenticated = await verifyToken(request);
  
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real application, save to database
    const newContent = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    return NextResponse.json(newContent);
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/content
export async function PUT(request: Request) {
  const isAuthenticated = await verifyToken(request);
  
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    // In a real application, update in database
    const updatedContent = {
      ...body,
      modifiedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/content
export async function DELETE(request: Request) {
  const isAuthenticated = await verifyToken(request);
  
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    // In a real application, delete from database
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
