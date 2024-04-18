import mongooseAutopopulate from 'mongoose-autopopulate';
import { Group } from '@/domain';
import { Schema, model } from 'mongoose';

const PlayerSubscriptionSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player', autopopulate: true },
  paymentRecurrence: String,
});

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: true,
    },
    playerSubscriptions: [PlayerSubscriptionSchema],
    description: String,
    imageUrl: String,
  },
  { timestamps: true },
);

GroupSchema.plugin(mongooseAutopopulate);

GroupSchema.loadClass(Group);
const GroupModel = model('Group', GroupSchema);

export { GroupModel, GroupSchema };
