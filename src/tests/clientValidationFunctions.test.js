const {checkForErrors, checkForChildrenErrors} = require('../utils/formValidationFunctions');

test('Client-side form validations return expected values with valid inputs - Generate children is true - POST', () => {
    const validInputs = {
        generateChildren: true,
        name: 'Test Factory Name',
        lowerBound: 0,
        upperBound: 10,
        numChildren: 3
    };
    const errorObj = checkForErrors(validInputs);
    expect(errorObj.name).toBe(null);
    expect(errorObj.lowerBound).toBe(null);
    expect(errorObj.upperBound).toBe(null);
    expect(errorObj.numChildren).toBe(null);
});

test('Client-side form validations return expected values with valid inputs - Generate Childdren is false - POST', () => {
    const validInputs = {
        generateChildren: false,
        name: 'Test Factory Name',
        lowerBound: null,
        upperBound: null,
        numChildren: null
    };
    const errorObj = checkForErrors(validInputs);
    expect(errorObj.name).toBe(null);
    expect(errorObj.lowerBound).toBe(null);
    expect(errorObj.upperBound).toBe(null);
    expect(errorObj.numChildren).toBe(null);
});

test('Client-side form validations return expected values with invalid inputs - Generate Children is true - POST', () => {
    const invalidInputs = {
        generateChildren: true,
        name: 'Test Factory Name',
        lowerBound: 5,
        upperBound: 4,
        numChildren: null
    };
    const errorObj = checkForErrors(invalidInputs);
    expect(errorObj.name).toBe(null);
    expect(errorObj.lowerBound).toBe(null);
    expect(errorObj.upperBound).toBe('Upper bound must be greater than or equal to lower bound');
    expect(errorObj.numChildren).toBe('This is a required field');
});

test('Client-side form validations return expected values with invalid inputs - Generate Children is false - POST', () => {
    const invalidInputs = {
        generateChildren: false,
        name: '',
    };
    const errorObj = checkForErrors(invalidInputs);
    expect(errorObj.name).toBe('This is a required field');
    expect(errorObj.lowerBound).toBe(null);
    expect(errorObj.upperBound).toBe(null);
    expect(errorObj.numChildren).toBe(null);
});

test('Client-side form validations return expected values with valid inputs - PUT', () => {
    const validInputs = {
        lowerBound: 5,
        upperBound: 999,
        numChildren: 4
    };
    const errorObj = checkForChildrenErrors(validInputs);
    expect(errorObj.lowerBound).toBe(null);
    expect(errorObj.upperBound).toBe(null);
    expect(errorObj.numChildren).toBe(null);
});

test('Client-side form validations return expected values with invalid inputs - No children, bad bounds - PUT', () => {
    const invalidInputs = {
        lowerBound: 333,
        upperBound: 100,
        numChildren: null
    };
    const errorObj = checkForChildrenErrors(invalidInputs);
    expect(errorObj.lowerBound).toBe(null);
    expect(errorObj.upperBound).toBe('Upper bound must be greater than or equal to lower bound');
    expect(errorObj.numChildren).toBe('This is a required field');
});

test('Client-side form validations return expected values with invalid inputs - No bounds - PUT', () => {
    const invalidInputs = {
        lowerBound: null,
        upperBound: null,
        numChildren: 4
    };
    const errorObj = checkForChildrenErrors(invalidInputs);
    expect(errorObj.lowerBound).toBe('This is a required field');
    expect(errorObj.upperBound).toBe('This is a required field');
    expect(errorObj.numChildren).toBe(null);
});