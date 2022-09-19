import { useEffect, useState } from 'react';
import { NewProjectCard } from './new-project-card.component';
import { Project } from '../project-item/project.component';
import { getProjects, deleteProject } from '../project.service';
import '../../../styles/project-list.css'

export const ProjectList = () => {
    const [projectList, setProjectList] = useState([])

    useEffect(() => {
        getProjects().then(res => {
            setProjectList(res.data)
        }).catch(e => {
            console.log(e.response)
        })
    }, [])

    const onAddProject = (project) => {
        const pList = projectList.map(p => p)
        pList.push(project)
        setProjectList(pList)
    }

    const onDeleteProject = (projectName) => {
        setProjectList(projectList.filter(p => p.name !== projectName))
        deleteProject(projectName).then(res => {
            setProjectList(res.data)
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className='project-list'>
            {projectList.map(project => (
                <Project 
                    key={project.name}
                    project={project} 
                    deleteProjectEvent={onDeleteProject}
                />
            ))}
            <NewProjectCard onAddProject={onAddProject}/>
        </div>
      );
};


