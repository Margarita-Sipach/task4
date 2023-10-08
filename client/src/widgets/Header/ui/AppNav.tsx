import { useMemo } from 'react';
import { Nav } from 'react-bootstrap';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export const AppNav = () => {
    const isAuth = false;

    const children = useMemo(() => {
        if (isAuth) {
            return (
                <>
                    <Nav.Link href="#" disabled>Name</Nav.Link>
                    <Nav.Link href="#">Sign Out</Nav.Link>
                </>
            );
        }
        return (
            <>
                <Nav.Link href={RoutePath.sign_in}>Sign In</Nav.Link>
                <Nav.Link href={RoutePath.sign_up}>Sign Up</Nav.Link>
            </>
        );
    }, [isAuth]);

    return (
        <Nav>
            {children}
        </Nav>
    );
};
