import React from 'react';
import FormTreeActions from './FormTreeActions';
import Icon from './Icon';

const TreeActions = ({sortToggle, sortSelection, handleSortToggle, handleSortSelection, filterInput, handleFilterInput, handleFilterClear, closeTreeActions}) =>{
    return(
        <div className='main-col tree-actions'>
            <div className='column-container'>
                <header className='h-1'>
                    <button type='button' className='close-tree-actions-btn' title='Close Tree Actions' onClick={() => closeTreeActions() }>
                        <Icon icon='times' style={{width: 16}} />
                    </button>
                    <span>TREE ACTIONS</span>
                </header>
                <FormTreeActions 
                    sortToggle={sortToggle}
                    sortSelection={sortSelection}
                    handleSortToggle={handleSortToggle}
                    handleSortSelection={handleSortSelection}
                    filterInput={filterInput}
                    handleFilterInput={handleFilterInput}
                    handleFilterClear={handleFilterClear}
                />
            </div>
        </div>
    )
}

export default TreeActions;