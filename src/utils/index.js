const requiredField = input => {
    if(!input){
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
    if(parseInt(lowerBound) >= parseInt(upperBound)){
        return 'Upper bound must be greater than lower bound';
    }
    return null;
}
const timeDown = (a,b) => {
    if (a.createdAt > b.createdAt){
        return -1;
    }
    else if (a.createdAt < b.createdAt){
        return 1;
    }
    return 0;
}
const timeUp = (a,b) => {
    if (a.createdAt < b.createdAt){
        return -1;
    }
    else if (a.createdAt > b.createdAt){
        return 1;
    }
    return 0;
}
const alphaDown = (a,b) => {
    if (a.name < b.name){
        return -1;
    }
    else if (a.name > b.name){
        return 1;
    }
    return 0;
}
const alphaUp = (a,b) => {
    if (a.name > b.name){
        return -1;
    }
    else if (a.name < b.name){
        return 1;
    }
    return 0;
}

export const handleFactorySort = function(arr, sortSelection){
    var factories = [...arr];
    switch(sortSelection){
        case 'timeDown':
            return factories.sort(timeDown);
        case 'timeUp':
            return factories.sort(timeUp);
        case 'alphaDown':
            return factories.sort(alphaDown);
        case 'alphaUp':
            return factories.sort(alphaUp);
        default:
            return factories;
    }
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

