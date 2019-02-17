import React, {Component, Fragment} from 'react';
import Icon from './Icon';

class Factory extends Component{
    state = {
        open: false
    }
    handleEditClick = () => {
        this.props.handleFactorySelection(this.props.factory);
    }
    handleHeaderClick = () => {
        this.setState({open: !this.state.open});
    }
    renderChildrenContent = () => {
        const {_id, lowerBound, upperBound, numChildren, children} = this.props.factory;
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
    render(){
        return(
            <div className={`factory-container${this.state.open ? ' open': ''}${this.props.selected ? ' selected': ''}`}>
                <div className='factory-header'>
                    <div className='header-info' onClick={() => this.handleHeaderClick()}>
                        <span className='angle'><Icon icon='angle' /></span>
                        <span className='factory-name'>{this.props.factory.name}</span>
                    </div>
                    <button onClick={() => this.handleEditClick()} className='edit-btn'><Icon icon='pencil' style={{width: 20}} /></button>
                </div>
                <div className='factory-children-container'>{this.renderChildrenContent()}</div>
            </div>
        )
    }
}

export default Factory;