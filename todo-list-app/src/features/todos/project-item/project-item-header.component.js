import { useState } from "react";
import { CustomInput } from "../../ui/custom-input/custom-input.component"; 
import { RiDeleteBin2Line, RiEdit2Line, RiSave3Fill, RiCloseLine } from "react-icons/ri"

export const ProjectItemHeader = ({projectName, saveAction, deleteProjectEvent}) => {
  const [editing, setEditing] = useState(false)
  const [newName, setNewName] = useState("")


  const onClickEdit = () => {
    setEditing(!editing)
  }

  const onClickSave = () => {
    setEditing(false)
    saveAction(newName)
  }

  const renderEditInput = () => {
    if (editing) {
      return (<CustomInput 
        name="new project name" 
        needLabel={false}
        value={newName} 
        setter={setNewName}
      />)
    } else {
      return (<span>{projectName}</span>)
    }
  }

  const renderEditIcons = () => {
    if (editing) {
      return (
        <div>
          <RiSave3Fill className="small-margin-right action-icon" onClick={onClickSave}/>
          <RiCloseLine className="action-icon" onClick={onClickEdit}/>
        </div>
      )
    } else {
      return (
        <div>
          <RiEdit2Line className="small-margin-right action-icon" onClick={onClickEdit}/>
          <RiDeleteBin2Line className="action-icon" onClick={() => deleteProjectEvent(projectName)}/>
        </div>
      )
    }
  }

  return (
    <div className="project-item-header">
        {renderEditInput()}
        {renderEditIcons()}
      </div>
    );
};


