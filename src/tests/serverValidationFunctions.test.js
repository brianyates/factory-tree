const {formInputsAreValid} = require('../../routes/routeHelpers');

test('Server side validation returns no error with valid inputs', () => {
    const lowerBound = 4;
    const upperBound = 5;
    const numChildren = 10;
    expect(formInputsAreValid(lowerBound, upperBound, numChildren)).toBe(true);
});

test('Server side validation returns error with invalid inputs - too many children', () => {
    const lowerBound = 4;
    const upperBound = 8;
    const numChildren = 16;
    expect(formInputsAreValid(lowerBound, upperBound, numChildren)).toBe(false);
});

test('Server side validation returns error with invalid inputs - lower bound greater than upper', () => {
    const lowerBound = 8;
    const upperBound = 5;
    const numChildren = 14;
    expect(formInputsAreValid(lowerBound, upperBound, numChildren)).toBe(false);
});

test('Server side validation returns error with invalid inputs - all null', () => {
    const lowerBound = null;
    const upperBound = null;
    const numChildren = null;
    expect(formInputsAreValid(lowerBound, upperBound, numChildren)).toBe(false);
});