import axios from 'axios';
import {handleFactorySort} from './factorySortingFunctions';
import {checkForChildrenErrors} from './formValidationFunctions';

export const handleFactoryToggle = function(index){
    var factories = [...this.state.factories];
    factories[index].open = !factories[index].open;
    this.setState({factories});
}
export const toggleAllFactories = function(option){
    var factories = [...this.state.factories].map(factory => {
        factory.open = option;
        return factory;
    });
    this.setState({factories});
}
export const factoryAdded = function(factory){
    var factories = [...this.state.factories];
    factories.push(factory);
    this.setState({factories: handleFactorySort(factories, this.state.sortSelection), showTreeActions: false});
}
export const factoryRemoved = function(id){
    var factories = [...this.state.factories].filter( factory => factory._id !== id);
    this.setState({factories, selectedFactory: null})
}
export const factoryUpdated = function(updatedFactory){
    const {name, lowerBound, upperBound, numChildren, _id} = updatedFactory;
    const factories = [...this.state.factories].map( factory => {
        if(factory._id === _id){
            updatedFactory.open = factory.open;
            return updatedFactory;
        }
        return factory;
    });
    //Only update selected factory if a user is currently editing that factory
    var selectedFactory = this.state.selectedFactory;
    if(selectedFactory && selectedFactory._id === _id){
        selectedFactory = updatedFactory;
    }
    this.setState({
        factories: handleFactorySort(factories, this.state.sortSelection), 
        selectedFactory, 
        name, 
        lowerBound, 
        upperBound, 
        numChildren
    });
}
export const handleFactorySelection = function(selectedFactory){
    const {name, lowerBound, upperBound, numChildren} = selectedFactory;
    this.setState({
        selectedFactory, 
        editName: name, 
        //Since 0 is a 'falsey' value, first check if it's 0 and then set to an empty string if it's not a legit value
        editLowerBound: lowerBound === 0 ? 0 : lowerBound || '', 
        editUpperBound: upperBound === 0 ? 0 : upperBound || '',  
        editNumChildren: numChildren === 0 ? 0 : numChildren || '', 
        formErrors: {lowerBound: null, upperBound: null, numChildren: null}
    });
}
export const handleEditCancel = function(){
    this.setState({selectedFactory: null});
}
export const handleInputChange = function(event){
    const {value, name} = event.target;
    //If there is an error with only the children props, check to see if the error status has changed whenever the user modifies a form input
    //Otherwise, just set the value
    if(name!=='name' && this.state.hasFormError){
        this.setState({[name]: value}, function(){
            this.setState({formErrors: checkForChildrenErrors(this.getFormValues())});
        })
    }
    else{
        this.setState({[name]: value});
    }
}
export const getFormValues = function(type){
    if(type==='name'){
        return {name: this.state.editName};
    }
    const {editLowerBound, editUpperBound, editNumChildren} = this.state;
    return {lowerBound: editLowerBound, upperBound: editUpperBound, numChildren: editNumChildren};
}
export const createFlash = function(className, message){
    this.setState({flashMsg: {className, message}}, function(){
        setTimeout(() =>{
            this.setState({flashMsg: null});
        }, 3000);
    });
}
export const handleSubmit = function(type, event){
    event.preventDefault();
    const submitUpdate = type => {
        axios.put(`/api/update-factory/${this.state.selectedFactory._id}/${type}`, this.getFormValues(type))
        .then(({status}) => {
            if(status === 200){
                this.createFlash('flash-msg success', 'Update Successful!')
            }
            else{
                throw Error('Bad request');
            }
        })
        .catch( err => {
            console.log(err);
            this.createFlash('flash-msg error', 'An error occurred - try again later.');
        });
    }
    if(type==='children'){
        const values = this.getFormValues();
        const formErrors = checkForChildrenErrors(values);
        var hasFormError = false;
        Object.keys(formErrors).forEach(val => {
            if(formErrors[val]){
                hasFormError = true;
            }
        })
        if(hasFormError){
            this.setState({formErrors, hasFormError: true});
        }
        else{
            this.setState({formErrors: {lowerBound: null, upperBound: null, numChildren: null}, hasFormError: false});
            submitUpdate(type);
        }
    }
    else{
        submitUpdate(type);
    }
}
export const handleSortSelection = function({target: {value}}){
    this.setState({
        sortSelection: value, 
        factories: handleFactorySort(this.state.factories, value)
    });
}
export const handleFilterInput = function(event){
    this.setState({
        filterInput: event.target.value
    });
}
export const handleFilterClear = function(){
    this.setState({filterInput: ''});
}
export const closeTreeActions = function(){
    this.setState({showTreeActions: false})
}
export const openTreeActions = function(){
    this.setState({showTreeActions: true})
}