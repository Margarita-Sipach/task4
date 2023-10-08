import { Container } from 'react-bootstrap';
import { Header } from 'widgets/Header';
import { AppRouter } from './providers/router';

export const App = () => (
    <div>
        <Header />
        <Container>
            <AppRouter />
        </Container>
    </div>
);
