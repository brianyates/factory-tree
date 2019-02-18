import React from 'react';
import FormTreeActions from './FormTreeActions';
import Icon from './Icon';

const TreeActions = ({sortSelection, handleSortSelection, filterInput, handleFilterInput, handleFilterClear, closeTreeActions, toggleAllFactories}) =>{
    return(
        <div className='main-col tree-actions'>
            <div className='column-container'>
                <header className='h-1'>
                    <button type='button' className='close-tree-actions-btn' title='Close Tree Actions' onClick={() => closeTreeActions() }>
                        <Icon icon='times' style={{width: 16, height: 25.59}} />
                    </button>
                    <span>TREE ACTIONS</span>
                </header>
                <FormTreeActions 
                    sortSelection={sortSelection}
                    handleSortSelection={handleSortSelection}
                    filterInput={filterInput}
                    handleFilterInput={handleFilterInput}
                    handleFilterClear={handleFilterClear}
                    toggleAllFactories={toggleAllFactories}
                />
            </div>
        </div>
    )
}

export default TreeActions;