import React, {Component} from 'react';
import axios from 'axios';
import FormFactoryName from './FormFactoryName';
import FormFactoryChildren from './FormFactoryChildren';
import Icon from './Icon';

class EditFactory extends Component{
    renderContent = () => {
        const {selectedFactory, handleSubmit, handleInputChange, handleEditCancel, editName, 
            editLowerBound, editUpperBound, editNumChildren, formErrors} = this.props;
        return(
            <div>
                <div className='selection-container'>
                    <div><strong>Selected Factory:</strong> {selectedFactory.name}</div>
                    <button className='btn cancel-selection' onClick={() => handleEditCancel()}>
                        <Icon icon='times' style={{width: 14}} />
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
                    disabled={this.isDisabled()}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    formErrors={formErrors}
                />
                <div className='btn-container'>
                    <button className='btn btn-yellow' onClick={() => this.handleDelete(selectedFactory._id)}>
                        <Icon icon='trash' style={{width: 14, height: 16, verticalAlign: 'text-bottom', marginRight: 5}} /> 
                        <span>DELETE FACTORY</span>
                    </button>
                </div>
            </div>
        )
    }
    handleDelete = id => {
        const response = window.confirm("Deleting a factory cannot be undone. Continue?");
        if(response){
            axios.delete(`/api/delete-factory/${id}`);
        }
    }
    isDisabled = () => {
        const {editLowerBound, editUpperBound, editNumChildren, selectedFactory: {lowerBound, upperBound, numChildren}} = this.props;
        //Ignore type when checking value equality
        // eslint-disable-next-line
        return lowerBound == editLowerBound && upperBound == editUpperBound && numChildren == editNumChildren;
    }
    render(){
        return(
            <div className='main-col edit-factory'>
                <div className='column-container'>
                    <header className='h-3'>EDIT FACTORY</header>
                   {this.props.selectedFactory && this.renderContent()}
                </div>
            </div>
        )
    }
}

export default EditFactory;