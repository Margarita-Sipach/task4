import {
    ButtonToolbar,
} from 'react-bootstrap';
import { TbLockOpen, TbLock } from 'react-icons/tb';
import { AiFillDelete } from 'react-icons/ai';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteUsers, updateUsers } from 'entities/Info';
import { ToolbarButton } from './ToolbarButton';

enum ButtonsType{
    block = 'block',
    active = 'active',
    delete = 'delete'
}

export const Toolbar = () => {
    const dispatch = useAppDispatch();

    const onClick = (type: ButtonsType) => {
        if (type === ButtonsType.delete) dispatch(deleteUsers());
        else dispatch(updateUsers(type === ButtonsType.active));
    };

    return (
        <ButtonToolbar className="mb-5">
            <ToolbarButton
                Icon={TbLock}
                text="Block"
                onClick={() => onClick(ButtonsType.block)}
            />
            <ToolbarButton
                Icon={TbLockOpen}
                variant="link"
                onClick={() => onClick(ButtonsType.active)}
            />
            <ToolbarButton
                Icon={AiFillDelete}
                variant="link"
                textVariant="danger"
                onClick={() => onClick(ButtonsType.delete)}
            />
        </ButtonToolbar>
    );
};
