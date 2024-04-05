import { Group, PlayerPaymentRecurrence } from '@/domain';
import { Schema } from 'mongoose';

const GroupPlayerSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player' },
  paymentRecurrence: {
    type: String,
    enum: Object.values(PlayerPaymentRecurrence),
  },
});

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    groupPlayers: [GroupPlayerSchema],
    description: String,
    imageUrl: String,
  },
  { timestamps: true },
);

GroupSchema.loadClass(Group);

export { GroupSchema };
