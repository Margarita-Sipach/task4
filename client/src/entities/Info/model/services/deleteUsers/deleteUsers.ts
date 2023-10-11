import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';

export const deleteUsers = createAsyncThunk<UserType[], void, ThunkConfig<string>>(
    'info/deleteUsers',
    async (_, { extra, rejectWithValue, getState }) => {
        try {
            const { info } = getState();
            const data = await extra.api.deleteUsers(info.checkedIds);

            return data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
