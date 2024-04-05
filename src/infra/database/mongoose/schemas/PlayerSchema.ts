import { Player } from '@/domain';
import { Schema } from 'mongoose';

const PlayerAttributeSchema = new Schema({
  name: String,
  value: Number,
});

const PlayerSchema = new Schema(
  {
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    age: { type: Number, required: true },
    position: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userId: { type: Schema.Types.ObjectId, unique: true },
    attributes: [PlayerAttributeSchema],
  },
  { timestamps: true },
);

PlayerSchema.loadClass(Player);

export { PlayerSchema };
