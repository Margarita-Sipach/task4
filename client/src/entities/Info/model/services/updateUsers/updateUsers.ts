import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateUsers = createAsyncThunk<boolean, boolean, ThunkConfig<string>>(
    'info/updateUsers',
    async (isActive, { extra, rejectWithValue, getState }) => {
        try {
            const { info } = getState();
            await extra.api.updateUsers(info.checkedIds, isActive);
            return isActive;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
