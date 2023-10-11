import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { catchHandler } from 'shared/error/catchHandler';

export const deleteUsers = createAsyncThunk<UserType[], void, ThunkConfig<string>>(
    'info/deleteUsers',
    async (_, { extra, rejectWithValue, getState }) => {
        try {
            const { info } = getState();
            if (!info.checkedIds.length) throw new Error("You don't choose any checkbox");
            const data: UserType[] = await extra.api.deleteUsers(info.checkedIds);
            return data;
        } catch (error) {
            return rejectWithValue(catchHandler(error));
        }
    },
);
