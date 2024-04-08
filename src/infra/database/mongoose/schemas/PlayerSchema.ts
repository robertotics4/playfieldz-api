import { Player } from '@/domain';
import { Schema, model } from 'mongoose';

const PlayerAttributeSchema = new Schema({
  name: String,
  value: Number,
});

const PlayerSchema = new Schema(
  {
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
const PlayerModel = model('Player', PlayerSchema);

export { PlayerModel, PlayerSchema };
