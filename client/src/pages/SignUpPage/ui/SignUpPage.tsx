import { signUp, userActions } from 'entities/User';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppModal } from 'shared/ui/AppModal';
import { Input } from 'shared/ui/Input';
import { PageContainer } from 'shared/ui/PageContainer';

const initData = {
    username: '',
    email: '',
    password: '',
};

const SignUpPage = () => {
    const dispath = useAppDispatch();
    const [formData, setFormData] = useState(initData);
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const handleUsername = (username: string) => setFormData({ ...formData, username });
    const handleEmail = (email: string) => setFormData({ ...formData, email });
    const handlePassword = (password: string) => setFormData({ ...formData, password });
    const handleRepeatPassword = (repeatedPassword: string) => setRepeatedPassword(repeatedPassword);

    const handleClick = async () => {
        if (repeatedPassword !== formData.password) {
            dispath(userActions.setError('Password and Repeated password different'));
        } else {
            await dispath(signUp(formData));
        }
    };

    return (
        <PageContainer title="Sign Up">
            <Form>
                <Input
                    label="Username"
                    value={formData.username}
                    onChange={handleUsername}
                />
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
                <Input
                    label="Repeat password"
                    value={repeatedPassword}
                    onChange={handleRepeatPassword}
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

export default SignUpPage;
