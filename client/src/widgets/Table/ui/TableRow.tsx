import { Form } from 'react-bootstrap';

interface TableRowProps{
	cellsNames: string[];
	isCellChecked?: boolean
}

export const TableRow = ({ cellsNames, isCellChecked }: TableRowProps) => (
    <tr>
        {cellsNames.map((item) => (
            <th key={item}>{item || <Form.Check type="checkbox" id={item} value="" />}</th>
        ))}
    </tr>
);
