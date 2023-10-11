import { StateSchema } from 'app/providers/StoreProvider';

export const getIsAllChecked = (state: StateSchema) => state.info.isAllChecked;
