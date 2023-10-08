import { Table } from 'react-bootstrap';
import { useState } from 'react';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

export const AppTable = () => {
    const [areCellsChecked, setAreCellsChecked] = useState(false);
    return (
        <Table>
            <TableHeader />
            <TableBody />
        </Table>
    );
};
