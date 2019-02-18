import React, {Fragment} from 'react';
import Icon from './Icon';

const Factory = ({factory, selected, index, handleFactorySelection, handleFactoryToggle}) =>{
    const {_id, name, lowerBound, upperBound, numChildren, children, open} = factory;
    const renderChildrenContent = () => {
        if(children && children.length > 0){
            return (
                <Fragment>
                    <div className='children-info'>
                        <span>Children: <strong>{numChildren}</strong></span>
                        <span>Lower Bound: <strong>{lowerBound}</strong></span>
                        <span>Upper Bound: <strong>{upperBound}</strong></span>
                    </div>
                    <ul>
                        {children.map((child, i)=> {
                            return <li key={`${_id}-child-${i}`}><Icon icon='angle' style={{width: 5}} /> {child}</li>
                        })}
                    </ul>
                </Fragment>
            )
        }
        return(
            <div className='no-content'>No children to show</div>
        )
    }
    return(
        <div className={`factory-container${open ? ' open': ''}${selected ? ' selected': ''}`}>
            <div className='factory-header'>
                <div className='header-info' onClick={() => handleFactoryToggle(index)}>
                    <span className='angle'><Icon icon='angle' /></span>
                    <span className='factory-name'>{name}</span>
                </div>
                <button onClick={() => handleFactorySelection(factory)} className='edit-btn'>
                    <Icon icon='pencil' style={{width: 20}} />
                </button>
            </div>
            <div className='factory-children-container'>{renderChildrenContent()}</div>
        </div>
    )
}

export default Factory;