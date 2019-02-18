import React, {Component, Fragment} from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormSortFilter from './FormSortFilter';
import Icon from './Icon';
import {handleCheckBoxClick, handleInputChange, handleSubmit, getFormValues, resetFormValues} from '../utils/treeActionFunctions';
import {createFlash} from '../utils/appFunctions';

class FormTreeActions extends Component{
    constructor(props){
        super(props);

        this.state = {
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
            },
            flashMsg: null
        };

        this.handleCheckBoxClick = handleCheckBoxClick.bind(this);
        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = handleSubmit.bind(this);
        this.getFormValues = getFormValues.bind(this);
        this.resetFormValues = resetFormValues.bind(this);
        this.createFlash = createFlash.bind(this);
    }
    render(){
        const {sortSelection, handleSortSelection, filterInput, handleFilterInput, handleFilterClear, toggleAllFactories} = this.props;
        return(
            <Fragment>
                {this.state.flashMsg && <div className={this.state.flashMsg.className}>{this.state.flashMsg.message}</div>}
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