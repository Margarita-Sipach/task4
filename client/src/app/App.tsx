import { Container } from 'react-bootstrap';
import { Header } from 'widgets/Header';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';
import { getUserById } from 'entities/User';
import { AppRouter } from './providers/router';

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserById());
    }, [dispatch]);

    return (
        <div>
            <Header />
            <Container>
                <AppRouter />
            </Container>
        </div>
    );
};
