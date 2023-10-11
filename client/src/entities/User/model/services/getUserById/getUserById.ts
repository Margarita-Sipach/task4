import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const getUserById = createAsyncThunk<UserType, void, ThunkConfig<string>>(
    'user/getUserById',
    async (_, { extra, rejectWithValue }) => {
        try {
            const id = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY) || '');
            if (!id) throw new Error('no id');
            const data = await extra.api.getUserById(id);
            if (!data) throw new Error();
            return data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
