import React, {Fragment} from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const FormFactoryChildren = ({handleSubmit, handleInputChange, editLowerBound, editUpperBound, editNumChildren, disabled, formErrors}) => {
    return(
        <Fragment>
            <h5>EDIT FACTORY CHILDREN</h5>
            <section>               
                <form onSubmit={event => handleSubmit('children', event)}>
                    <FormInput 
                        type='number'
                        label='Lower Bound:' 
                        placeholder='Enter a positive integer' 
                        name='editLowerBound' 
                        value={editLowerBound}
                        handleInputChange={handleInputChange}
                        error={formErrors.lowerBound}
                    />
                    <FormInput 
                        type='number'
                        label='Upper Bound:' 
                        placeholder='Enter a positive integer' 
                        name='editUpperBound' 
                        value={editUpperBound}
                        handleInputChange={handleInputChange}
                        error={formErrors.upperBound}
                    />
                    <FormSelect
                        name='editNumChildren'
                        value={editNumChildren}
                        handleInputChange={handleInputChange}
                        error={formErrors.numChildren}
                    />
                    <div className='form-group text-right'>
                        <button type='submit' disabled={disabled} className={`btn btn-green${disabled ? ' disabled' : ''}`}>UPDATE CHILDREN</button>
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

export default FormFactoryChildren;