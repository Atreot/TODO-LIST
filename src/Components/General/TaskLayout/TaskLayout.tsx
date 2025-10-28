import Container from '@mui/material/Container';
import React from 'react';
import { Outlet } from 'react-router';
import { UiTaskCardBilder } from '../../UiTaskCardBilder/UiTaskCardBilder';
import { useAppSelector } from '../../../store/hook';

const TaskLayout: React.FC = ({ }) => {
    const isEdit = useAppSelector(state => state.tasksSlice.isEdit)

    return (
        <>

            <Container className='AppView'>
                {isEdit && <UiTaskCardBilder />}
                <Outlet />
            </Container>
        </>
    );
};

export default TaskLayout;