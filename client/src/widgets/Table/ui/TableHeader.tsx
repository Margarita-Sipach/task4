import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { infoActions, getIsAllChecked, getCheckedIds } from 'entities/Info';
import { useSelector } from 'react-redux';
import { Checkbox } from 'shared/ui/Checkbox';
import { useEffect } from 'react';

const columnsNames = [
    'ID',
    'Name',
    'Email',
    'Registration Date',
    'Last login Date',
    'Status',
];

export const TableHeader = () => {
    const dispatch = useAppDispatch();
    const isAllChecked = useSelector(getIsAllChecked);

    const handleClick = (val: boolean) => {
        dispatch(infoActions.checkAll(val));
    };

    return (
        <thead>
            <tr>
                <th><Checkbox id="mainCheckbox" checked={isAllChecked} onChange={handleClick} /></th>
                {columnsNames.map((item) => (
                    <th key={item}>{item}</th>
                ))}
            </tr>
        </thead>
    );
};
