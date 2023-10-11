import { getUser, userActions } from 'entities/User';
import { useMemo } from 'react';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export const AppNav = () => {
    const user = useSelector(getUser);
    const dispatch = useAppDispatch();

    const children = useMemo(() => {
        if (user) {
            return (
                <>
                    <Nav.Link href="/" disabled>{user?.username || 'User'}</Nav.Link>
                    <Nav.Link onClick={() => dispatch(userActions.signOut())}>Sign Out</Nav.Link>
                </>
            );
        }
        return (
            <>
                <Nav.Link href={RoutePath.sign_in}>Sign In</Nav.Link>
                <Nav.Link href={RoutePath.sign_up}>Sign Up</Nav.Link>
            </>
        );
    }, [user, dispatch]);

    return (
        <Nav>
            {children}
        </Nav>
    );
};
