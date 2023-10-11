import { FC, InputHTMLAttributes, memo } from 'react';
import { Form } from 'react-bootstrap';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked'>

interface CheckboxProps extends HTMLInputProps{
onChange?: (val: boolean) => void
checked?: boolean
}

export const Checkbox: FC<CheckboxProps> = memo((props: CheckboxProps) => {
    const {
        checked = false,
        onChange,
    } = props;

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked);
    };

    return (
        <Form.Check
            type="checkbox"
            checked={checked}
            onChange={changeHandler}
        />
    );
});
