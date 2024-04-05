import { AttributeName, Player, PlayerPosition } from '@/domain';
import { Schema } from 'mongoose';

const PlayerAttributeSchema = new Schema({
  name: { type: String, enum: Object.values(AttributeName) },
  value: Number,
});

const PlayerSchema = new Schema(
  {
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    age: { type: Number, required: true },
    position: { type: String, enum: Object.values(PlayerPosition) },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userId: { type: Schema.Types.ObjectId, unique: true },
    groups: [{ type: Schema.Types.ObjectId, ref: 'GroupPlayer' }],
    matches: [{ type: Schema.Types.ObjectId, ref: 'MatchPlayer' }],
    attributes: [PlayerAttributeSchema],
  },
  { timestamps: true },
);

PlayerSchema.loadClass(Player);

export { PlayerSchema };
