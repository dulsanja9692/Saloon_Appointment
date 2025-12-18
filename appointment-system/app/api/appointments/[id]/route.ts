import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

// DELETE Operation
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // <--- Updated Type
) {
  await dbConnect();
  try {
    const resolvedParams = await params; // <--- Must await params in Next.js 15
    const { id } = resolvedParams;

    await Appointment.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

// UPDATE Operation
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // <--- Updated Type
) {
  await dbConnect();
  try {
    const resolvedParams = await params; // <--- Must await params in Next.js 15
    const { id } = resolvedParams;

    const body = await req.json();
    
    // { new: true } returns the updated document
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, body, { new: true });
    
    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}