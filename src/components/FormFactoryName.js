import React, {Fragment} from 'react';
import FormInput from './FormInput';

const FormFactoryName = ({handleSubmit, editName, handleInputChange, disabled}) => {
    return(
        <Fragment>
            <h5>EDIT FACTORY NAME</h5>
            <section>               
                <form onSubmit={event => handleSubmit('name', event)}>
                    <FormInput 
                        label='Name:' 
                        placeholder='Enter a factory name' 
                        name='editName' 
                        value={editName}
                        handleInputChange={handleInputChange}
                    />
                    <div className='form-group text-right'>
                        <button type='submit' disabled={disabled} className={`btn btn-green${disabled ? ' disabled' : ''}`}>UPDATE NAME</button>
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

export default FormFactoryName;