import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import {
    getUsersInfo, fetchUsers, getIsAllChecked, infoActions,
} from 'entities/Info';
import { UserType } from 'shared/types/user';

type ReturnType = [UserType[], {[key: string]: boolean}, (id: string, val: boolean) => void]

export const useCheckboxes = (): ReturnType => {
    const dispatch = useAppDispatch();
    const users = useSelector(getUsersInfo);
    const isAllChecked = useSelector(getIsAllChecked);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const checkedAllCells = useCallback(() => {
		const usersArr = users.map((item) => [item._id, isAllChecked]);
		return Object.fromEntries(usersArr);
	}, [users, isAllChecked]);

    const [checkboxes, setCheckboxes] = useState(checkedAllCells());

    useEffect(() => {
        setCheckboxes(checkedAllCells());
    }, [isAllChecked, checkedAllCells]);

    const onChange = (id: string, val: boolean) => {
        dispatch(infoActions.checkOne(id));
        setCheckboxes({ ...checkboxes, [id]: val });
    };

    return [users, checkboxes, onChange];
};
