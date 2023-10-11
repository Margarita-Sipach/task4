import {
    AsyncThunk, AsyncThunkAction, PayloadAction, createSlice, isPending, isRejected,
} from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import {
    FulfilledAction, PendingAction, RejectedAction, isFulfilledAction, isPendingAction, isRejectedAction,
} from 'shared/types/redux';
import { SliceNames } from 'shared/redux/sliceNames';
import { UserSchema } from '../types/userSchema';

const initialState: UserSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const userSlice = createSlice({
    name: SliceNames.user,
    initialState,
    reducers: {
        signOut: (state: UserSchema) => {
            state.data = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
        setError: (state: UserSchema, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPendingAction(SliceNames.user), (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addMatcher(isRejectedAction(SliceNames.user), (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addMatcher(isFulfilledAction(SliceNames.user), (state, action) => {
                state.isLoading = false;
                state.data = action.payload as UserType;
            });
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
