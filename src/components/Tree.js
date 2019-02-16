import React, {Component, Fragment} from 'react';
import LoadingTrees from './LoadingTrees';
import Factory from './Factory';
import Icon from './Icon';

class TreeRoot extends Component{
    state = {
        open: true
    }
    handleHeaderClick = () => {
        this.setState({open: !this.state.open});
    }
    renderContent = () =>{
        if(this.props.dataLoadingError){
            return <p className='p-10 text-center'>An error occurred. Please try again later.</p>
        }
        else if (this.props.factories){
            return (
                    <Fragment>
                        <div className='root'>
                            <div className='header-info' onClick={() => this.handleHeaderClick()}>
                                <span className='angle'><Icon icon='angle' /></span>
                                <span>ROOT</span>
                            </div>
                        </div>
                        <div className='all-factories'>{this.renderFactories()}</div>
                    </Fragment>
            )
        }
        return <LoadingTrees />
    }
    renderFactories = () =>{
        const {selectedFactory} = this.props;
        return(
            this.props.factories.map( factory =>{
                return <Factory 
                            key={factory._id}
                            factory={factory}
                            selected={selectedFactory && selectedFactory._id === factory._id} 
                            handleFactorySelection={this.props.handleFactorySelection} 
                        />
            })
        )
    }
    render(){
        return(
            <div className='main-col tree'>
                <div className={`column-container tree-container${this.state.open ? ' open' : ''}`}>
                    <header className='h-2'>TREE</header>
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}

export default TreeRoot;