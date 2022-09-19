import { useState } from 'react';
import { CustomButton } from '../../ui/custom-button/custom-button.component';
import { CustomInput } from '../../ui/custom-input/custom-input.component';
import { SimpleCard } from '../../ui/simple-card/simple-card.component';
import { createProject } from '../project.service';

export const NewProjectCard = ({onAddProject}) => {
    const [projectName, setProjectName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const addProjectAction = () => {
        createProject(projectName).then(res => {
            setProjectName("")
            onAddProject(res.data)
        }).catch(e => {
            setErrorMessage(e.response.data)
        })
    }

    const renderErrorMessage = () => {
        if (errorMessage) {
            return (<p className='card-error-message' data-testid={`login-error-message`}>{errorMessage}</p>)
        }
    }

    return (
        <SimpleCard 
            testid="add-project-card"
            title="Create a new project"
        >
            {renderErrorMessage()}
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


