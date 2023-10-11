import { StateSchema } from 'app/providers/StoreProvider';

export const getError = (state: StateSchema) => state.user.error || state.info.error;
