import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { catchHandler } from 'shared/error/catchHandler';

export const fetchUsers = createAsyncThunk<UserType[], void, ThunkConfig<string>>(
    'info/fetchUsers',
    async (_, { extra, rejectWithValue }) => {
        try {
            const data = await extra.api.getAllUsers();
            if (!data) throw new Error('There are no data');
            return data;
        } catch (error) {
            return rejectWithValue(catchHandler(error));
        }
    },
);
