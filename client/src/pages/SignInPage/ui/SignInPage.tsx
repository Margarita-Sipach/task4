import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Input } from 'shared/ui/Input';
import { PageContainer } from 'shared/ui/PageContainer';
import { Title } from 'shared/ui/Title';

const initData = {
    email: '',
    password: '',
};

const SignInPage = () => {
    const [formData, setFormData] = useState(initData);

    const handleEmail = (email: string) => setFormData({...formData, email})
    const handlePassword = (password: string) => setFormData({...formData, password})

    return (
		<PageContainer title='Sign In'>{
			<Form>
	            <Input label="Email" value={formData.email} onChange={handleEmail} type="email"/>
				<Input label="Password" value={formData.password} onChange={handlePassword} type="password"/>
	            <Button variant="primary" disabled={!Object.values(formData).every(Boolean)}>
	                OK
	            </Button>
	        </Form>
		}
		</PageContainer>
    );
};

export default SignInPage;
