import React from 'react';
import axios from 'axios';
import FormFactoryName from './FormFactoryName';
import FormFactoryChildren from './FormFactoryChildren';
import Icon from './Icon';

const EditFactory = (props) => {
    const {
        selectedFactory, 
        handleSubmit, 
        handleInputChange, 
        handleEditCancel, 
        editName, 
        editLowerBound, 
        editUpperBound, 
        editNumChildren, 
        formErrors, 
        flashMsg
    } = props;
    const renderContent = () => {
        return(
            <div>
                <div className='selection-container'>
                    <div><strong>Selected Factory:</strong> {selectedFactory.name}</div>
                    <button className='btn cancel-selection' onClick={() => handleEditCancel()}>
                        <Icon icon='times' style={{width: 14, height: 22.39}} />
                    </button>
                </div>
                <FormFactoryName 
                    editName={editName}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    disabled={!editName || selectedFactory.name === editName}
                />
                <FormFactoryChildren
                    editLowerBound={editLowerBound}
                    editUpperBound={editUpperBound}
                    editNumChildren={editNumChildren}
                    disabled={areChildrenDisabled()}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    formErrors={formErrors}
                />
                <div className='btn-container'>
                    <button className='btn btn-yellow' onClick={() => handleDelete(selectedFactory._id)}>
                        <Icon icon='trash' style={{width: 14, height: 16, verticalAlign: 'text-bottom', marginRight: 5}} /> 
                        <span>DELETE FACTORY</span>
                    </button>
                </div>
            </div>
        )
    }
    const handleDelete = id => {
        const response = window.confirm("Deleting a factory cannot be undone. Continue?");
        if(response){
            axios.delete(`/api/delete-factory/${id}`);
        }
    }
    const areChildrenDisabled = () => {
        const {lowerBound, upperBound, numChildren} = props.selectedFactory;
        //Ignore type when checking value equality
        // eslint-disable-next-line
        return lowerBound == editLowerBound && upperBound == editUpperBound && numChildren == editNumChildren;
    }
    return(
        <div className='main-col edit-factory'>
            <div className='column-container'>
                <header className='h-3'>EDIT FACTORY</header>
                {flashMsg && <div className={flashMsg.className}>{flashMsg.message}</div>}
                {selectedFactory && renderContent()}
            </div>
        </div>
    )
}

export default EditFactory;