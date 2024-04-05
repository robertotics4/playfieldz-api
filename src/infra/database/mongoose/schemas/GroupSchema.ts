import { Group } from '@/domain';
import { Schema } from 'mongoose';

const PlayerSubscriptionSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player' },
  paymentRecurrence: String,
});

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    playerSubscriptions: [PlayerSubscriptionSchema],
    description: String,
    imageUrl: String,
  },
  { timestamps: true },
);

GroupSchema.loadClass(Group);

export { GroupSchema };
