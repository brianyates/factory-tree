
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