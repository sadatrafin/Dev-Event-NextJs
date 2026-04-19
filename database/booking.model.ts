import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import Event, { IEvent } from './event.model';

/**
 * Booking document interface for type safety
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Validate email format
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) => isValidEmail(v),
        message: 'Invalid email format',
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to verify that the referenced event exists
 */
bookingSchema.pre<IBooking>('save', async function () {
  const event = await Event.findById(this.eventId);

  if (!event) {
    throw new Error(
      `Event with ID ${this.eventId} does not exist. Cannot create booking for non-existent event.`
    );
  }
});

/**
 * Booking model - handles event booking data with event reference validation
 */
const Booking: Model<IBooking> =
  mongoose.models.Booking ||
  mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
