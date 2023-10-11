import { getUser, getUserById } from 'entities/User';
import React, { Suspense, memo, useMemo } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

export const AppRouter = memo(() => {
    const user = useSelector(getUser);

    const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
        const isSignInUserPage = route.isSignIn && user;
        const isSignOutUserPage = route.isSignOut && !user;
        const isCommonPage = !route.isSignIn && !route.isSignOut;
        return isSignInUserPage || isSignOutUserPage || isCommonPage;
    }), [user]);

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<Spinner className="position-absolute top-50 start-50" />}>
                            {element}
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    );
});
