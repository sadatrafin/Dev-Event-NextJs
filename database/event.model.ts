import mongoose, { Document, Model, Schema } from 'mongoose';

/**
 * Event document interface for type safety
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generate URL-friendly slug from title
 */
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/**
 * Convert date string to ISO format (YYYY-MM-DD)
 */
const normalizeDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return date.toISOString().split('T')[0];
};

/**
 * Normalize time to HH:MM format
 */
const normalizeTime = (timeString: string): string => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(timeString)) {
    throw new Error('Invalid time format. Use HH:MM');
  }
  return timeString;
};

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
    },
    overview: {
      type: String,
      required: [true, 'Event overview is required'],
    },
    image: {
      type: String,
      required: [true, 'Event image URL is required'],
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
    },
    date: {
      type: String,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
    },
    mode: {
      type: String,
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: 'Mode must be online, offline, or hybrid',
      },
      required: [true, 'Event mode is required'],
    },
    audience: {
      type: String,
      required: [true, 'Target audience is required'],
    },
    agenda: {
      type: [String],
      required: [true, 'Event agenda is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer name is required'],
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'Must have at least one tag',
      },
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.pre<IEvent>('save', function () {
  // Generate slug only if title is new or modified
  if (this.isModified('title')) {
    this.slug = generateSlug(this.title);
  }

  // Normalize date to ISO format
  if (this.isModified('date')) {
    this.date = normalizeDate(this.date);
  }

  // Normalize time to HH:MM format
  if (this.isModified('time')) {
    this.time = normalizeTime(this.time);
  }
});

/**
 * Event model - handles event data storage and retrieval
 */
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;
