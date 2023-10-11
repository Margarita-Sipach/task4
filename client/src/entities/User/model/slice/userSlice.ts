import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { signUp } from '../services/signUp/signUp';
import { UserSchema } from '../types/userSchema';
import { signIn } from '../services/signIn/signIn';
import { getUserById } from '../services/getUserById/getUserById';

const initialState: UserSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOut: (state: UserSchema) => {
            state.data = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
                state.data = undefined;
            })
            .addCase(signUp.fulfilled, (state, action: PayloadAction<UserType>) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(signIn.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
                state.data = undefined;
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<UserType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
                state.data = undefined;
            })
            .addCase(getUserById.fulfilled, (state, action: PayloadAction<UserType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
