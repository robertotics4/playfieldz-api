import { User, UserPermission } from '@/domain';
import { Schema, model } from 'mongoose';

const UserRoleSchema = new Schema({
  groupId: Schema.Types.ObjectId,
  permission: { type: String, enum: Object.values(UserPermission) },
});

const UserSchema = new Schema(
  {
    phone: { type: String, require: true },
    password: { type: String, require: true },
    roles: { type: [UserRoleSchema], default: [] },
    player: { type: Schema.Types.ObjectId, ref: 'Player' },
  },
  { timestamps: true },
);

UserSchema.loadClass(User);
const UserModel = model('User', UserSchema);

export { UserModel, UserSchema };
