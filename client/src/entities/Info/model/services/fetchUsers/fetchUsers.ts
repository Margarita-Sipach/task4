import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';

export const fetchUsers = createAsyncThunk<UserType[], void, ThunkConfig<string>>(
    'info/fetchUsers',
    async (_, { extra, rejectWithValue }) => {
        try {
            const data = await extra.api.getAllUsers();
            return data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
