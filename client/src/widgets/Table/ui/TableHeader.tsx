import { Form, ToggleButton } from 'react-bootstrap';
import { TableRow } from './TableRow';

const columnsNames = [
    '',
    'ID',
    'Name',
    'Email',
    'Registration Date',
    'Last login Date',
    'Status',
];

export const TableHeader = () => (
    <thead>
        <TableRow cellsNames={columnsNames} />
    </thead>
		  );
