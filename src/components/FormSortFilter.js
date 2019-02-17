import React,{Component, Fragment} from 'react';
import Icon from './Icon';

class FormSortFilter extends Component{
    state = {
        focused: false
    }
    render(){
        const {sortSelection, handleSortSelection, filterInput, handleFilterInput, handleFilterClear} = this.props;
        return(
            <Fragment>
                <h5>FILTER AND SORT FACTORIES</h5>
                <section>
                    <div className='form-group'>
                        <label>Filter Factories:</label>
                        <input 
                            className='form-input search' 
                            placeholder='Type to filter by name' 
                            onChange={handleFilterInput}
                            value={filterInput}
                            onFocus={() => this.setState({focused: true})}
                            onBlur={() => this.setState({focused: false})}
                        />
                        <button className={`input-btn right${this.state.focused ? ' search-focus': ''}`} onClick={() => handleFilterClear()}>
                            {filterInput ? <Icon icon='times' style={{width: 14, margin: '0 1px'}}/> : <Icon icon='search' style={{width: 16}} />}
                        </button>
                    </div>
                    <div className='form-group'>
                        <label>Sort Factories By:</label>
                        <select value={sortSelection} className='form-input' onChange={handleSortSelection}>
                            <option value='timeDown'>Create Date (Descending)</option>
                            <option value='timeUp'>Create Date (Descending)</option>
                            <option value='alphaDown'>Factory Name (Descending)</option>
                            <option value='alphaUp'>Factory Name (Ascending)</option>
                        </select>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default FormSortFilter;