import React from 'react';

const FormInput = ({label, type, name, placeholder, value, handleInputChange, error}) => {
    return(
        <div className='form-group'>
            <label>{label}</label>
            <input 
                type={type} 
                name={name}
                className={`form-input${error ? ' input-error' : ''}`} 
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
            />
            {error && <div className='error-msg'>{error}</div>}
        </div>
    )
}

export default FormInput;