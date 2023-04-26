import { ModelOptions, Prop, Severity } from '@typegoose/typegoose';
import mongoose from 'mongoose';

@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Debug {
  // disable _id in schema
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  _id?: never;

  @Prop({ type: String, required: false })
  message?: string;

  @Prop({ type: Date, required: true, default: () => new Date() })
  occurred_at?: Date;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  data?: { [key: string]: string };

  constructor(data?: Partial<Debug>) {
    if (data) Object.assign(this, data);
  }
}
