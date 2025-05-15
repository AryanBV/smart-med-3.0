import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// Validation schema
const familyMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  relationship: z.string().optional(),
  parentId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const json = await req.json();
    const body = familyMemberSchema.parse(json);
    
    // Create family member - this is placeholder code
    // You would need to expand this to include relationships
    const familyMember = {
      id: Math.random().toString(36).substring(2, 15),
      userId: session.user.id,
      name: body.name,
      dateOfBirth: body.dateOfBirth,
      gender: body.gender,
      relationship: body.relationship,
      parentId: body.parentId,
      createdAt: new Date(),
    };
    
    return NextResponse.json(
      { 
        message: 'Family member added successfully',
        familyMember
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error adding family member:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Mock family members - in a real app, you would fetch from database
    const familyMembers = [
      { 
        id: '1', 
        name: 'David Anderson', 
        gender: 'Male', 
        dateOfBirth: '1986-07-03',
        relationship: 'Self',
      },
      { 
        id: '2', 
        name: 'Sarah Anderson', 
        gender: 'Female', 
        dateOfBirth: '1982-02-15',
        relationship: 'Spouse', 
      },
      { 
        id: '3', 
        name: 'Michael Anderson', 
        gender: 'Male', 
        dateOfBirth: '2008-05-22',
        relationship: 'Son',
        parents: ['1', '2']
      },
      { 
        id: '4', 
        name: 'Emma Anderson', 
        gender: 'Female', 
        dateOfBirth: '2012-01-10',
        relationship: 'Daughter',
        parents: ['1', '2']
      }
    ];
    
    return NextResponse.json({ familyMembers });
  } catch (error) {
    console.error('Error fetching family members:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
