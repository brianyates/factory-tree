import React, {Component} from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import {HOST_URI} from '../config/keys';
import TreeActions from './TreeActions';
import Tree from './Tree';
import EditFactory from './EditFactory';
import {
  handleSortSelection,
  handleFilterInput,
  handleFilterClear,
  closeTreeActions,
  toggleAllFactories,
  handleFactorySelection,
  openTreeActions,
  handleFactoryToggle,
  handleSubmit,
  handleInputChange,
  handleEditCancel,
  getFormValues,
  factoryAdded,
  factoryUpdated,
  factoryRemoved,
  createFlash
} from '../utils/appFunctions';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      factories: null,
      selectedFactory: null,
      sortSelection: 'timeDown',
      filterInput: '',
      editName: '',
      editLowerBound: '',
      editUpperBound: '',
      editNumChildren: '',
      dataLoadingError: false,
      hasFormError: false,
      formErrors: {
        lowerBound: null,
        upperBound: null,
        numChildren: null
      },
      showTreeActions: false,
      flashMsg: null
    }

    this.handleSortSelection = handleSortSelection.bind(this);
    this.handleFilterInput = handleFilterInput.bind(this);
    this.handleFilterClear = handleFilterClear.bind(this);
    this.closeTreeActions = closeTreeActions.bind(this);
    this.toggleAllFactories = toggleAllFactories.bind(this);
    this.handleFactorySelection = handleFactorySelection.bind(this);
    this.openTreeActions = openTreeActions.bind(this);
    this.handleFactoryToggle= handleFactoryToggle.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.handleInputChange = handleInputChange.bind(this);
    this.handleEditCancel = handleEditCancel.bind(this);
    this.getFormValues = getFormValues.bind(this);
    this.factoryAdded = factoryAdded.bind(this);
    this.factoryUpdated = factoryUpdated.bind(this);
    this.factoryRemoved = factoryRemoved.bind(this);
    this.createFlash = createFlash.bind(this);
  }
  componentDidMount(){
    axios.get('/api/all-factories')
    .then( ({data, status}) => {
        if(status === 200){
            this.setState({
              factories: data.map(factory => {
                //Set all factories to be expanded in the tree view with the 'open' property
                factory.open = true;
                return factory;
              })
            });
        }
        else{
            this.setState({dataLoadingError: true});
        }
    })
    .catch( () => {
        this.setState({dataLoadingError: true})
    });
    const socket = socketIOClient(HOST_URI);
    socket.on("factoryAdded", data => this.factoryAdded(data));
    socket.on("factoryRemoved", data => this.factoryRemoved(data));
    socket.on("factoryUpdated", data => this.factoryUpdated(data));
  }
  render() {
    return (
        <div className={`main-container${this.state.selectedFactory ? ' editing' : ''}${this.state.showTreeActions ? ' show-tree-actions' : ''}`}>
          <TreeActions 
            sortSelection={this.state.sortSelection}
            handleSortSelection={this.handleSortSelection}
            filterInput={this.state.filterInput}
            handleFilterInput={this.handleFilterInput}
            handleFilterClear={this.handleFilterClear}
            closeTreeActions={this.closeTreeActions}
            toggleAllFactories={this.toggleAllFactories}
          />
          <Tree 
            handleFactorySelection={this.handleFactorySelection} 
            factories={this.state.factories}
            selectedFactory={this.state.selectedFactory}
            dataLoadingError={this.state.dataLoadingError}
            filterInput={this.state.filterInput}
            openTreeActions={this.openTreeActions}
            handleFactoryToggle={this.handleFactoryToggle}
          />
          <EditFactory 
              selectedFactory={this.state.selectedFactory}
              handleSubmit={this.handleSubmit}
              handleInputChange={this.handleInputChange}
              handleEditCancel={this.handleEditCancel}
              editName={this.state.editName}
              editLowerBound={this.state.editLowerBound}
              editUpperBound={this.state.editUpperBound}
              editNumChildren={this.state.editNumChildren}
              formErrors={this.state.formErrors}
              flashMsg={this.state.flashMsg}
            />
            <div className='edit-overlay' onClick={() => this.handleEditCancel()}></div>
            <div className='tree-actions-overlay' onClick={() => this.closeTreeActions()}></div>
        </div>
    );
  }
}

export default App;