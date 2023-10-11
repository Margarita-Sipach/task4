import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { UserSchema } from '../types/userSchema';
import { FulfilledAction, PendingAction, RejectedAction, isFulfilledAction, isPendingAction, isRejectedAction } from 'shared/types/redux';
import { SliceNames } from 'shared/redux/sliceNames';

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
    },
    extraReducers: (builder) => {
        builder
			.addMatcher(isPendingAction(SliceNames.user), (state, action) => {
				state.isLoading = true
				state.error = undefined
			})
			.addMatcher(isRejectedAction(SliceNames.user), (state, action) => {
				state.isLoading = false;
				console.log('rejected')
                state.error = action.payload as string;
			})
            .addMatcher(isFulfilledAction(SliceNames.user), (state, action) => {
				state.isLoading = false;
                state.data = action.payload as UserType;
			})
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
