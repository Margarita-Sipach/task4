import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import {
    getUsersInfo, fetchUsers, getIsAllChecked, infoActions,
} from 'entities/Info';
import { Checkbox } from 'shared/ui/Checkbox';

export const TableBody = () => {
    const dispatch = useAppDispatch();
    const users = useSelector(getUsersInfo);
    const isAllChecked = useSelector(getIsAllChecked);

    const generateCheckedCells = useCallback(
        () => Object.fromEntries(users.map((item) => [item._id, isAllChecked])),
        [users, isAllChecked],
    );

    const [isChecked, setIsChecked] = useState(generateCheckedCells());

    useEffect(() => {
        setIsChecked(generateCheckedCells());
    }, [isAllChecked, generateCheckedCells]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const onChange = (id: string, val: boolean) => {
        dispatch(infoActions.checkOne(id));
        setIsChecked({ ...isChecked, [id]: val });
    };

    return (
        <tbody>
            {users && users.map(({
                password, isActive, __v, ...row
            }) => (
                <tr key={row._id}>
                    <td>
                        <Checkbox
                            checked={isChecked[row._id]}
                            onChange={(val) => onChange(row._id, val)}
                        />
                    </td>
                    {Object.entries(row).map((item) => (
                        <td
                            key={row._id + item}
                        >
                            {item[1]}
                        </td>
                    ))}
                    <td key={row._id + isActive}>{isActive ? 'active' : 'blocked'}</td>
                </tr>
            ))}
        </tbody>
    );
};
