import { Container, Nav, Navbar } from 'react-bootstrap';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppNav } from './AppNav';

export const Header = () => (
    <Navbar bg="light" data-bs-theme="light" className="justify-content mb-5">
        <Container>
            <Navbar.Brand href={RoutePath.main}>Task3</Navbar.Brand>
            <AppNav />
        </Container>
    </Navbar>
);
