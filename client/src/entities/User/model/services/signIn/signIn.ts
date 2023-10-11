import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInType, UserType } from 'shared/types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const signIn = createAsyncThunk<UserType, SignInType, ThunkConfig<string>>(
    'user/signIn',
    async (formData, { extra, rejectWithValue }) => {
        try {
            const data = await extra.api.signIn(formData);
            if (!data) throw new Error();
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data._id));
            return await data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
