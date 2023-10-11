import { ReduxSchema } from 'shared/types/redux';
import { UserType } from 'shared/types/user';

export interface UserSchema extends ReduxSchema {data?: UserType
}
