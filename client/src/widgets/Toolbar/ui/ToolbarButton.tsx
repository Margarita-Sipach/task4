import { ReactNode } from 'react';
import { Button } from 'react-bootstrap';

interface ToolbarButtonProps {
	variant?: string;
	Icon: React.ElementType;
	text?: string;
	textVariant?: string;
}

export const ToolbarButton = (props: ToolbarButtonProps) => {
    const {
        variant, Icon, text, textVariant,
    } = props;

    return (
        <Button
            variant={variant}
            className={`d-flex gap-1 align-items-center ${text && Icon && 'gap-1'} text-${textVariant}`}
        >
            <Icon />
            {text || ''}
        </Button>
    );
};
