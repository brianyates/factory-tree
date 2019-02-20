//Server-side validation functions (don't trust the client!)
const MAX_NUM_CHILDREN = 15;

const isPositiveInteger = input => {
    if(/^\d+$/.test(input) && parseInt(input) >= 0){
        return true;
    }
    return false;
};

const upperGreaterThanLower = (lowerBound, upperBound) =>{
    if(parseInt(lowerBound) > parseInt(upperBound)){
        return false;
    }
    return true;
};

exports.formInputsAreValid = (lowerBound, upperBound, numChildren) => {
    if(!isPositiveInteger(lowerBound) || !isPositiveInteger(upperBound) || !isPositiveInteger(numChildren)){
        return false;
    }
    if(!upperGreaterThanLower(lowerBound, upperBound)){
        return false;
    }
    if(parseInt(numChildren) > MAX_NUM_CHILDREN){
        return false;
    }
    return true;
};

//Create an array of random children
exports.generateChildArray = (lowerBound, upperBound, numChildren) => {
    var arr = [];
    lowerBound = parseInt(lowerBound);
    upperBound =  parseInt(upperBound);
    numChildren = parseInt(numChildren);
    for(let i = 0; i < numChildren; i++){
        const randomValue = Math.floor(Math.random() * (upperBound - lowerBound + 1) ) + lowerBound;
        arr.push(randomValue);
    }
    return arr;
};