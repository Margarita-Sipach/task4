import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { SignInPage } from 'pages/SignInPage';
import { SignUpPage } from 'pages/SignUpPage';
import { RouteProps } from 'react-router-dom';

type AppRoutesProps = RouteProps & {isSignIn?: boolean, isSignOut?: boolean}

export enum AppRoutes {
    MAIN = 'main',
    SIGN_IN = 'sign_in',
SIGN_UP = 'sign_up',
// last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.SIGN_IN]: '/sign_in',
    [AppRoutes.SIGN_UP]: '/sign_up',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
        isSignIn: true,
    },
    [AppRoutes.SIGN_IN]: {
        path: RoutePath.sign_in,
        element: <SignInPage />,
        isSignOut: true,
    },
    [AppRoutes.SIGN_UP]: {
        path: RoutePath.sign_up,
        element: <SignUpPage />,
        isSignOut: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
