import React from 'react';
import FormTreeActions from './FormTreeActions';

const TreeActions = ({sortToggle, sortSelection, handleSortToggle, handleSortSelection, filterInput, handleFilterInput, handleFilterClear}) =>{
    return(
        <div className='main-col tree-actions'>
            <div className='column-container'>
                <header className='h-1'>TREE ACTIONS</header>
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