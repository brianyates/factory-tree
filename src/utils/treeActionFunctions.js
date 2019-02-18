import axios from 'axios';
import {checkForErrors} from './formValidationFunctions';

export const resetFormValues = function(){
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
export const getFormValues = function(){
    const {name, generateChildren, lowerBound, upperBound, numChildren} = this.state;
    return {name, generateChildren, lowerBound, upperBound, numChildren};
}
export const handleCheckBoxClick = function(){
    this.setState({generateChildren: !this.state.generateChildren})
}
export const handleInputChange = function(event){
    const {value, name} = event.target;
    //If there is an error, check to see if the error status has changed whenever the user modifies a form input
    //Otherwise, just set the value
    if(this.state.hasFormError){
        this.setState({[name]: value}, function(){
            this.setState({formErrors: checkForErrors(this.getFormValues())});
        })
    }
    else{
        this.setState({[name]: value});
    }
}
export const handleSubmit = function(event){
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
                this.createFlash('flash-msg success', 'Factory Created!');
                this.resetFormValues();
            }
            else{
                throw Error('Bad request');
            }
        })
        .catch( err => {
            console.log(err);
            this.resetFormValues();
            this.createFlash('flash-msg error', 'An error occurred - try again later');
        })
    }
}