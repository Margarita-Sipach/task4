import { signIn } from 'entities/User';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Input } from 'shared/ui/Input';
import { PageContainer } from 'shared/ui/PageContainer';

const initData = {
    email: '',
    password: '',
};

const SignInPage = () => {
    const dispath = useAppDispatch();

    const [formData, setFormData] = useState(initData);

    const handleEmail = (email: string) => setFormData({ ...formData, email });
    const handlePassword = (password: string) => setFormData({ ...formData, password });

    const handleClick = () => {
        dispath(signIn(formData));
    };

    return (
        <PageContainer title="Sign In">
            <Form>
                <Input
                    label="Email"
                    value={formData.email}
                    onChange={handleEmail}
                    type="email"
                />
                <Input
                    label="Password"
                    value={formData.password}
                    onChange={handlePassword}
                    type="password"
                />
                <Button
                    variant="primary"
                    disabled={!Object.values(formData).every(Boolean)}
                    onClick={handleClick}
                >
                    OK
                </Button>
            </Form>
        </PageContainer>
    );
};

export default SignInPage;
