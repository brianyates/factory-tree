const requiredField = input => {
    if(!input && (input !== 0)){
        return 'This is a required field';
    }
    return null;
}
const positiveInteger = input => {
    if(/^\d+$/.test(input) && parseInt(input) >= 0){
        return null;
    }
    return 'Please enter a positive integer';
}
const greaterThanLowerBound = (lowerBound, upperBound) => {
    if(parseInt(lowerBound) > parseInt(upperBound)){
        return 'Upper bound must be greater than or equal to lower bound';
    }
    return null;
}

export const checkForErrors = (values) => {
    const {name, generateChildren, lowerBound, upperBound, numChildren} = values;
    var errorObj = {};
    errorObj.name = requiredField(name);
    if(generateChildren){
        errorObj.lowerBound = requiredField(lowerBound) || positiveInteger(lowerBound);
        errorObj.upperBound = requiredField(upperBound) || positiveInteger(upperBound) || greaterThanLowerBound(lowerBound, upperBound);
        errorObj.numChildren = requiredField(numChildren);
    }
    else{
        errorObj.lowerBound = null;
        errorObj.upperBound = null;
        errorObj.numChildren = null;    
    }
    return errorObj;
}
export const checkForChildrenErrors = (values) => {
    const {lowerBound, upperBound, numChildren} = values;
    var errorObj = {};
    errorObj.lowerBound = requiredField(lowerBound) || positiveInteger(lowerBound);
    errorObj.upperBound = requiredField(upperBound) || positiveInteger(upperBound) || greaterThanLowerBound(lowerBound, upperBound);
    errorObj.numChildren = requiredField(numChildren);
    return errorObj;
}