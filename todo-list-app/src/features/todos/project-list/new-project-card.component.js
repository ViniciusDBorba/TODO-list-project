import { useState } from 'react';
import { CustomButton } from '../../ui/custom-button/custom-button.component';
import { CustomInput } from '../../ui/custom-input/custom-input.component';
import { SimpleCard } from '../../ui/simple-card/simple-card.component';

export const NewProjectCard = ({onClickAddProject}) => {
    const [projectName, setProjectName] = useState("")

    const addProjectAction = () => {
        setProjectName("")
        onClickAddProject(projectName)
    }

    return (
        <SimpleCard 
            testid="add-project-card"
            title="Create a new project"
        >
            <div className='new-project-card-content'>
                <CustomInput 
                    name="project name" 
                    value={projectName} 
                    setter={setProjectName} 
                    required
                />

                <CustomButton 
                    testid="add-project-button" 
                    className='create-project-button'
                    text="Create project" 
                    primary={false} 
                    onClick={addProjectAction}
                />
            </div>
        </SimpleCard>
      );
};


