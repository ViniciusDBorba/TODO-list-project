import { useEffect, useState } from 'react';
import { CustomButton } from '../../ui/custom-button/custom-button.component';
import { CustomInput } from '../../ui/custom-input/custom-input.component';
import { SimpleCard } from '../../ui/simple-card/simple-card.component';

export const NewProjectCard = () => {
    const [projectName, setProjectName] = useState("")

    const onClickAdProject = () => {

    }

    return (
        <SimpleCard testid="add-project-card" title="Create a new project">
            <div className='new-project-card-content'>
                <CustomInput 
                    name="prject name" 
                    value={projectName} 
                    setter={setProjectName} 
                    required
                />

                <CustomButton 
                    testid="add-project-button" 
                    className='create-project-button'
                    text="Create project" 
                    primary={false} 
                    onClick={onClickAdProject}
                />
            </div>
        </SimpleCard>
      );
};


