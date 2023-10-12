import { signUp, userActions } from 'entities/User';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ERROR_MESSAGES } from 'shared/const/errorMessages';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
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

    const handleRepeatPassword = (repeatedPassword: string) => setRepeatedPassword(repeatedPassword);
    const handleFormField = (key: string, val: string) => setFormData({ ...formData, [key]: val });

    const handleClick = async () => {
        if (repeatedPassword !== formData.password) {
            dispath(userActions.setError(ERROR_MESSAGES.differentPasswords));
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
                    onChange={(val) => handleFormField('username', val)}
                />
                <Input
                    label="Email"
                    value={formData.email}
                    onChange={(val) => handleFormField('email', val)}
                    type="email"
                />
                <Input
                    label="Password"
                    value={formData.password}
                    onChange={(val) => handleFormField('password', val)}
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
                    disabled={!Object.values({ ...formData, repeatedPassword }).every(Boolean)}
                    onClick={handleClick}
                >
                    OK
                </Button>
            </Form>
        </PageContainer>
    );
};

export default SignUpPage;
