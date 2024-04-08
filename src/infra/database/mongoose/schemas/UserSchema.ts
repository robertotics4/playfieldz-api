import mongooseAutopopulate from 'mongoose-autopopulate';
import { User } from '@/domain';
import { Schema, model } from 'mongoose';

const UserRoleSchema = new Schema({
  groupId: Schema.Types.ObjectId,
  permission: String,
});

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, require: true },
    password: { type: String, require: true },
    roles: { type: [UserRoleSchema], default: [] },
    player: { type: Schema.Types.ObjectId, ref: 'Player', autopopulate: true },
  },
  { timestamps: true },
);

UserSchema.plugin(mongooseAutopopulate);

UserSchema.loadClass(User);
const UserModel = model('User', UserSchema);

export { UserModel, UserSchema };
