import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { catchHandler } from 'shared/error/catchHandler';

export const updateUsers = createAsyncThunk<UserType[], boolean, ThunkConfig<string>>(
    'info/updateUsers',
    async (changedIsActive, { extra, rejectWithValue, getState }) => {
        try {
            const { info } = getState();
            if (!info.checkedIds.length) throw new Error("You don't choose any checkbox");
            const data = await extra.api.updateUsers(info.checkedIds, changedIsActive);
            return data;
        } catch (error) {
            return rejectWithValue(catchHandler(error));
        }
    },
);
