import { ReduxSchema } from 'shared/types/redux';
import { UserType } from 'shared/types/user';

export interface InfoSchema extends ReduxSchema{
checkedIds: string[]
users: UserType[]
isAllChecked: boolean
}
