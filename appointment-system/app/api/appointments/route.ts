import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { name, date, time, service, reason } = body;

    // Validation
    if (!name || !date || !time || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Conflict Check
    const conflict = await Appointment.findOne({ date, time });
    if (conflict) {
      return NextResponse.json({ error: 'Time slot booked' }, { status: 409 });
    }

    // Create
    const newAppointment = await Appointment.create({ name, date, time, service, reason });
    return NextResponse.json({ message: 'Success', appointment: newAppointment }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET Route (Optional, for admin view)
export async function GET() {
  await dbConnect();
  const appointments = await Appointment.find({}).sort({ createdAt: -1 });
  return NextResponse.json(appointments);
}