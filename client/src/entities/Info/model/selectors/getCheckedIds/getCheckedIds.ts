import { StateSchema } from 'app/providers/StoreProvider';

export const getCheckedIds = (state: StateSchema) => state.info.checkedIds;
