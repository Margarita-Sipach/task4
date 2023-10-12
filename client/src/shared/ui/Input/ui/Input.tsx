import { FC, InputHTMLAttributes, memo } from 'react';
import { Form } from 'react-bootstrap';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps{
    label?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    onChange?: (val: string) => void
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
    const {
        label = '',
        type = 'text',
        value = '',
        placeholder = `Enter ${label}`,
        onChange,
    } = props;

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <Form.Group className="mb-3" controlId="">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={changeHandler}
            />
        </Form.Group>
    );
});
