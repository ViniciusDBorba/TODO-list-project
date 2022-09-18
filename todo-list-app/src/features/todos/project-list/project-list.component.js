import { useEffect, useState } from 'react';
import '../../../styles/project-list.css'
import { CustomInput } from '../../ui/custom-input/custom-input.component';
import { SimpleCard } from '../../ui/simple-card/simple-card.component';
import { NewProjectCard } from './new-project-card.component';

export const ProjectList = () => {
    const [projectList, setProjectList] = useState([])

    useEffect(() => {
        
    }, [])

    return (
        <div className='project-list'>
            <NewProjectCard />
        </div>
      );
};


