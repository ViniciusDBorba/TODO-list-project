import '../../../styles/simple-modal.css'
import { CustomButton } from '../custom-button/custom-button.component';


export const SimpleModal = ({title, message, action, onAction}) => {
    return (
        <div className="Simple-modal" data-testid="simple-modal">
            <div className='modal-background'/>
            <div className='modal'>
                <p className="simple-title">{title}</p>
                <p className="simple-text">{message}</p>
                <CustomButton primary={false} text={action} onClick={onAction}/>
            </div>
        </div>
      );
};


