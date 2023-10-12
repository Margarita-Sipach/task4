import { Checkbox } from 'shared/ui/Checkbox';
import {useCheckboxes} from './hook/useCheckboxes'

export const TableBody = () => {
    const [users, checkboxes, onChangeCheckboxes] = useCheckboxes()

    return (
        <tbody>
            {users && users.map(({
                password, isActive, __v, ...row
            }) => (
                <tr key={row._id}>
                    <td>
                        <Checkbox
                            checked={checkboxes[row._id]}
                            onChange={(val) => onChangeCheckboxes(row._id, val)}
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
