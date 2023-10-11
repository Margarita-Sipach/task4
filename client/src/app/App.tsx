import { Container } from 'react-bootstrap';
import { Header } from 'widgets/Header';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';
import { getUserById } from 'entities/User';
import { useSelector } from 'react-redux';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { Loader } from 'shared/ui/Loader';
import { getError, getLoading } from './providers/StoreProvider';
import { AppRouter } from './providers/router';

export const App = () => {
    const dispatch = useAppDispatch();
    const error = useSelector(getError);
    const isLoading = useSelector(getLoading);

    useEffect(() => {
        localStorage.getItem(USER_LOCALSTORAGE_KEY) && dispatch(getUserById());
    }, [dispatch]);

    useEffect(() => {
        error && alert(error);
    }, [error]);

    return (
        <div>
            {isLoading && <Loader />}
            <Header />
            <Container>
                <AppRouter />
            </Container>
        </div>
    );
};
