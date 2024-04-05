import { Schema, model } from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';
import { Match } from '@/domain';

const MatchLocationSchema = new Schema({
  latitude: String,
  longitude: String,
});

const MatchSchema = new Schema(
  {
    schedulling: { type: Date, required: true },
    maxPlayerLimit: { type: Number, required: true },
    playersPerTeam: { type: Number, required: true },
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    matchPlayers: [
      { type: Schema.Types.ObjectId, ref: 'Player', autopopulate: true },
    ],
    location: MatchLocationSchema,
  },
  { timestamps: true },
);

MatchSchema.plugin(mongooseAutopopulate);

MatchSchema.loadClass(Match);
const MatchModel = model('Match', MatchSchema);

export { MatchModel, MatchSchema };
