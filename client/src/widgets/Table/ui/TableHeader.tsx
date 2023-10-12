import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { infoActions } from 'entities/Info';
import { Checkbox } from 'shared/ui/Checkbox';
import { useState } from 'react';

const columnsNames = [
    'ID',
    'Username',
    'Email',
    'Last SignIn Date',
    'SignUp Date',
    'Status',
];

export const TableHeader = () => {
    const dispatch = useAppDispatch();
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = (val: boolean) => {
        dispatch(infoActions.checkAll(val));
        setIsChecked(val);
    };

    return (
        <thead>
            <tr>
                <th><Checkbox checked={isChecked} onChange={handleClick} /></th>
                {columnsNames.map((item) => (
                    <th key={item}>{item}</th>
                ))}
            </tr>
        </thead>
    );
};
