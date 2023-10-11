import { Button } from 'react-bootstrap';

interface ToolbarButtonProps {
    variant?: string;
    Icon: React.ElementType;
    text?: string;
    textVariant?: string;
    onClick?: () => void
}

export const ToolbarButton = (props: ToolbarButtonProps) => {
    const {
        variant, Icon, text, textVariant, onClick,
    } = props;

    return (
        <Button
            variant={variant}
            className={`d-flex gap-1 align-items-center ${text && Icon && 'gap-1'} text-${textVariant}`}
            onClick={() => onClick?.()}
        >
            <Icon />
            {text || ''}
        </Button>
    );
};
