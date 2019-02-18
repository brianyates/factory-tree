import React, {Component, Fragment} from 'react';
import axios from 'axios';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormSortFilter from './FormSortFilter';
import Icon from './Icon';
import {checkForErrors} from '../utils';

class FormTreeActions extends Component{
    state = {
        name: '',
        lowerBound: '',
        upperBound: '',
        numChildren: '',
        generateChildren: false,
        submitting: false,
        hasFormError: false,
        formErrors: {
            name: null,
            lowerBound: null,
            upperBound: null,
            numChildren: null
        }
    }
    handleCheckBoxClick = () => {
        this.setState({generateChildren: !this.state.generateChildren})
    }
    handleInputChange = event => {
        const {value, name} = event.target;
        //If there is an error, check to see if the error status has changed whenever the user modifies a form input
        //Otherwise, just set the value
        if(this.state.hasFormError){
            this.setState({[name]: value}, () => {
                this.setState({formErrors: checkForErrors(this.getFormValues())});
            })
        }
        else{
            this.setState({[name]: value});
        }
    }
    getFormValues = () => {
        const {name, generateChildren, lowerBound, upperBound, numChildren} = this.state;
        return {name, generateChildren, lowerBound, upperBound, numChildren};
    }
    resetFormValues = () => {
        this.setState({
            name: '', 
            lowerBound: '', 
            upperBound: '', 
            numChildren: '', 
            generateChildren: false, 
            submitting: false, 
            hasFormError: false
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({submitting: true});
        const values = this.getFormValues();
        const formErrors = checkForErrors(values);
        var hasFormError = false;
        Object.keys(formErrors).forEach(val => {
            if(formErrors[val]){
                hasFormError = true;
            }
        })
        if(hasFormError){
            this.setState({formErrors, submitting: false, hasFormError: true});
        }
        else{
            this.setState({formErrors});
            axios.post('/api/create-factory', values)
            .then( ({status}) => {
                if(status===201){
                    this.resetFormValues();
                }
                else{
                    throw Error('Bad request');
                }
            })
            .catch( err => {
                console.log(err);
                this.resetFormValues();
            })
        }
    }
    render(){
        const {sortSelection, handleSortSelection, filterInput, handleFilterInput, handleFilterClear, toggleAllFactories} = this.props;
        return(
            <Fragment>
                <h5>CREATE A NEW FACTORY</h5>
                <section>               
                    <form onSubmit={this.handleSubmit}>
                        <FormInput
                            type='text'
                            name='name'
                            label='Name:'
                            placeholder='Enter a factory name'
                            value={this.state.name}
                            handleInputChange={this.handleInputChange}
                            error={this.state.formErrors.name}
                        />
                        <div style={{paddingBottom: 10}}>
                            <div className={`checkbox${this.state.generateChildren ? ' active' : ''}`} onClick={() => this.handleCheckBoxClick()}>
                                <Icon icon='check' style={{width: 12, height: 12}}/>
                            </div>
                            <span style={{fontSize: 14}}>Generate Children?</span>
                        </div>
                        <div style={{borderTop: '1px solid #ddd', display: this.state.generateChildren ? 'block' : 'none'}}>
                            <FormInput
                                type='number'
                                name='lowerBound'
                                label='Lower Bound:'
                                placeholder='Enter a positive integer'
                                value={this.state.lowerBound}
                                handleInputChange={this.handleInputChange}
                                error={this.state.formErrors.lowerBound}
                            />
                            <FormInput
                                type='number'
                                name='upperBound'
                                label='Upper Bound:'
                                placeholder='Enter a positive integer'
                                value={this.state.upperBound}
                                handleInputChange={this.handleInputChange}
                                error={this.state.formErrors.upperBound}
                            />
                            <FormSelect
                                name='numChildren'
                                value={this.state.numChildren}
                                handleInputChange={this.handleInputChange}
                                error={this.state.formErrors.numChildren}
                            />
                        </div>
                        <div className='text-right form-group'>
                            <button disabled={this.state.submitting} className={`btn btn-green${this.state.submitting ? ' disabled' : ''}`}>CREATE FACTORY</button>
                        </div>
                    </form>
                </section>
                <FormSortFilter
                    sortSelection={sortSelection}
                    handleSortSelection={handleSortSelection}
                    filterInput={filterInput}
                    handleFilterInput={handleFilterInput}
                    handleFilterClear={handleFilterClear}
                    toggleAllFactories={toggleAllFactories}
                />
            </Fragment>
        )
    }
}

export default FormTreeActions;