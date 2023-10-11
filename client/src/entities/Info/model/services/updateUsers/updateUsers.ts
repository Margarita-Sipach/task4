import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import axios, { AxiosError } from 'axios';

export const updateUsers = createAsyncThunk<UserType[], boolean, ThunkConfig<string>>(
    'info/updateUsers',
    async (changedIsActive, { extra, rejectWithValue, getState }) => {
        try {
            const { info } = getState();
            const data = await extra.api.updateUsers(info.checkedIds, changedIsActive);
			console.log(data)
            return data;
        } catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.message);
			}
            return rejectWithValue('Unexpected error: ');
        }
    },
);
