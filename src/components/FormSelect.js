import React from 'react';

const CHILD_LIMIT = 15;
const renderOptions = () => {
    var arr = [<option value='' disabled key='opt-init'>Select an option</option>];
    for(let i = 0; i <= CHILD_LIMIT; i++){
        arr.push(<option key={`opt-${i}`} value={i}>{i}</option>);
    }
    return arr;
}

const FormSelect = ({placeholder, value, handleInputChange, name, error}) => {
    return(
        <div className='form-group'>
            <label>Number of Children:</label>
            <select value={value} onChange={handleInputChange} name={name} className={`form-input${error ? ' input-error' : ''}`} >
                {renderOptions()}
            </select>
            {error && <div className='error-msg'>{error}</div>}
        </div>
    )
}

export default FormSelect;