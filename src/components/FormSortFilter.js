import React,{Fragment} from 'react';
import Icon from './Icon';

const renderSelection = (selection) => {
    switch(selection){
        case 'timeDown':
            return <div><Icon icon='timeDown' style={{width: 14}} /> Create Date (Descending)</div>;
        case 'timeUp':
            return <div><Icon icon='timeDown' style={{width: 14}} /> Create Date (Ascending)</div>;
        case 'alphaDown':
            return <div><Icon icon='alphaDown' style={{width: 14}} /> Factory Name (Descending)</div>;
        case 'alphaUp':
            return <div><Icon icon='alphaUp' style={{width: 14}} /> Factory Name (Ascending)</div>;
        default:
            return <div><Icon icon='timeDown' style={{width: 14}} /> Create Date (Descending)</div>;
    }
}

const FormSortFilter = ({sortToggle, sortSelection, handleSortToggle, handleSortSelection, handleFilterInput, handleFilterClear}) => {
    return(
        <Fragment>
            <h5>FILTER AND SORT FACTORIES</h5>
            <section>
                <div className='form-group'>
                    <label>Filter Factories:</label>
                    <input className='form-input search' placeholder='Type to filter factories by name' onChange={handleFilterInput}></input>
                    <button className='input-btn right'><Icon icon='search' style={{width: 16}} /></button>
                </div>
                <div className='form-group'>
                    <label>Sort Factories By:</label>
                    <div className='sort-container'>
                        <div className='form-input sort-select' onClick={() => handleSortToggle()}>
                            {renderSelection(sortSelection)}
                            <div style={{color: '#666', fill: 'currentColor'}}><Icon icon='carot' style={{width: 11, verticalAlign: 'middle'}} /></div>
                        </div>
                        <ul className='sort-list' style={{display: sortToggle ? 'block' : 'none'}}>
                            <li onClick={() => handleSortSelection('timeDown')}>
                                <Icon icon='timeDown' style={{width: 14}} /> Create Date (Descending)
                            </li>
                            <li onClick={() => handleSortSelection('timeUp')}>
                                <Icon icon='timeUp' style={{width: 14}} /> Create Date (Ascending)
                            </li>
                            <li onClick={() => handleSortSelection('alphaDown')}>
                                <Icon icon='alphaDown' style={{width: 14}} /> Factory Name (Descending)
                            </li>
                            <li onClick={() => handleSortSelection('alphaUp')}>
                                <Icon icon='alphaUp' style={{width: 14}} /> Factory Name (Ascending)
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default FormSortFilter;