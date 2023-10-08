import {
    ButtonToolbar, Container, Nav, Navbar,
} from 'react-bootstrap';
import { TbLockOpen, TbLock } from 'react-icons/tb';
import { AiFillDelete } from 'react-icons/ai';
import { ToolbarButton } from './ToolbarButton';

export const Toolbar = () => (
    <ButtonToolbar className="mb-5">
        <ToolbarButton Icon={TbLock} text="Block" />
        <ToolbarButton Icon={TbLockOpen} variant="link" />
        <ToolbarButton Icon={AiFillDelete} variant="link" textVariant="danger" />
    </ButtonToolbar>
);
