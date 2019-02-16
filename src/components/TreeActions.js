import React from 'react';
import FormTreeActions from './FormTreeActions';

const TreeActions = ({sortToggle, sortSelection, handleSortToggle, handleSortSelection}) =>{
    return(
        <div className='main-col tree-actions'>
            <div className='column-container'>
                <header className='h-1'>TREE ACTIONS</header>
                <FormTreeActions 
                    sortToggle={sortToggle}
                    sortSelection={sortSelection}
                    handleSortToggle={handleSortToggle}
                    handleSortSelection={handleSortSelection}
                />
            </div>
        </div>
    )
}

export default TreeActions;