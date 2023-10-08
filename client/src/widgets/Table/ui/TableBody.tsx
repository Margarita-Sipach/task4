import { TableRow } from './TableRow';

const mock = [
    {
        '': '',
        Name: '2467',
        Email: '2467',
        'Last login': '2467',
        Status: '2467',
    },
    {
        '': '',
        Name: '24567',
        Email: '24667',
        'Last login': '27467',
        Status: '28467',
    },

];

interface TableBodyProps{
	areCellsChecked?: boolean
}

export const TableBody = ({ areCellsChecked = false }: TableBodyProps) => (
    <tbody>
        {mock.map((row) => (<TableRow isCellChecked={areCellsChecked} cellsNames={Object.values(row)} />))}
    </tbody>
);
