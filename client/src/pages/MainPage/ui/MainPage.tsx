import { getUser } from 'entities/User';
import { useSelector } from 'react-redux';
import { Title } from 'shared/ui/Title';
import { AppTable } from 'widgets/Table';
import { Toolbar } from 'widgets/Toolbar';

const MainPage = () => (
    <>
        <Title>Main Page</Title>
        <Toolbar />
        <AppTable />
    </>
);

export default MainPage;
