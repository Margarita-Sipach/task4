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

    const generateCheckedCells = useCallback(
        (isAllChecked: boolean) => Object.fromEntries(users.map((item) => [item._id, isAllChecked])),
        [users],
    );

    const isAllChecked = useSelector(getIsAllChecked);
    const [isChecked, setIsChecked] = useState(generateCheckedCells(isAllChecked));

    useEffect(() => {
        setIsChecked(generateCheckedCells(isAllChecked));
    }, [isAllChecked, generateCheckedCells]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const onChange = (id: string, val: boolean) => {
        console.log(id, val);
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
