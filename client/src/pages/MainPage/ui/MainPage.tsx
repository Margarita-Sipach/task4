import { useEffect } from 'react';
import { api } from 'shared/api/api';
import { Title } from 'shared/ui/Title';
import { AppTable } from 'widgets/Table';
import { Toolbar } from 'widgets/Toolbar';

const MainPage = () => {
    const isAuth = true;

    if (!isAuth) {
        return (<Title>You don't have access. Please sign in or sign up.</Title>);
    }

    return (
        <>
            <Title>Main Page</Title>
            <Toolbar />
            <AppTable />
        </>
    );
};

export default MainPage;
