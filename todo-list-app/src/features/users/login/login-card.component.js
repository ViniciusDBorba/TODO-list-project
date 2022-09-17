import { SimpleCard } from '../../ui/simple-card/simple-card.component';
import { CustomInput } from '../../ui/custom-input/custom-input.component';
import { CustomButton } from '../../ui/custom-button/custom-button.component';

export const LoginCard = () => {
    return (
        <SimpleCard title="Login">
            <form>
                <CustomInput name="Email"/>
                <CustomInput name="Password"/>
                <div className="form-actions-wrapper">
                    <CustomButton/>
                    <CustomButton/>
                </div>
            </form>
        </SimpleCard>
      );
};


