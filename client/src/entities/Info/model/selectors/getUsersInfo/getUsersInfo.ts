import { StateSchema } from 'app/providers/StoreProvider';

export const getUsersInfo = (state: StateSchema) => state.info.users;
