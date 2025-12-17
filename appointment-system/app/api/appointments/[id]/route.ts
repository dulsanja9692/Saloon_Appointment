import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    await Appointment.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await req.json();
    const updated = await Appointment.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}