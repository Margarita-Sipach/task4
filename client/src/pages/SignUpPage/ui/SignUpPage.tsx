import { useState } from "react";
import { Button, Form, FormLabel } from "react-bootstrap";
import { Input } from "shared/ui/Input";
import { PageContainer } from "shared/ui/PageContainer";

const initData = {
	username: '', 
	email: '',
	password: '', 
	repeatPassword: ''
}

const SignUpPage = () => {
	const [formData, setFormData] = useState(initData);

	const handleUsername = (username: string) => setFormData({...formData, username})
	const handleEmail = (email: string) => setFormData({...formData, email})
	const handlePassword = (password: string) => setFormData({...formData, password})
	const handleRepeatPassword = (repeatPassword: string) => setFormData({...formData, repeatPassword})
	
	return (
		<PageContainer title="Sign Up">
		{<Form>
			<Input label="Username" value={formData.username} onChange={handleUsername}/>
			<Input label="Email" value={formData.email} onChange={handleEmail} type="email"/>
			<Input label="Password" value={formData.password} onChange={handlePassword} type="password"/>
			<Input label="Repeat password" value={formData.repeatPassword} onChange={handleRepeatPassword} type="password"/>
			<Button variant="primary" disabled={!Object.values(formData).every(Boolean)}>
		    	OK
		    </Button>
		</Form>}
		</PageContainer>
	)
}

export default SignUpPage