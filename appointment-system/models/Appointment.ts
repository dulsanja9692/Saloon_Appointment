import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  name: string;
  date: string;
  time: string;
  service: string;
  reason: string;
}

const AppointmentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    service: { type: String, required: true },
    reason: { type: String, required: true },
  },
  { timestamps: true }
);

const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;