import React, {Component} from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import {HOST_URI} from '../config/keys';
import TreeActions from './TreeActions';
import Tree from './Tree';
import EditFactory from './EditFactory';
import {checkForChildrenErrors, handleFactorySort} from '../utils';

class App extends Component {
  state = {
    selectedFactory: null,
    sortSelection: 'timeDown',
    filterInput: '',
    sortToggle: false,
    editName: '',
    editLowerBound: '',
    editUpperBound: '',
    editNumChildren: '',
    factories: null,
    dataLoadingError: false,
    hasFormError: false,
    formErrors: {
      lowerBound: null,
      upperBound: null,
      numChildren: null
    },
    showTreeActions: false
  }
  componentDidMount(){
    axios.get('/api/all-factories')
    .then( ({data, status}) => {
        if(status === 200){
            this.setState({factories: data});
        }
        else{
            this.setState({dataLoadingError: true});
        }
    })
    .catch( () => {
        this.setState({dataLoadingError: true})
    })
    const socket = socketIOClient(HOST_URI);
    socket.on("factoryAdded", data => this.factoryAdded(data));
    socket.on("factoryRemoved", data => this.factoryRemoved(data));
    socket.on("factoryUpdated", data => this.factoryUpdated(data));
  }
  factoryAdded = factory => {
      var factories = [...this.state.factories];
      factories.push(factory);
      this.setState({factories: handleFactorySort(factories, this.state.sortSelection), showTreeActions: false});
  }
  factoryRemoved = id => {
      var factories = [...this.state.factories].filter( factory => factory._id !== id);
      this.setState({factories, selectedFactory: null})
  }
  factoryUpdated = updatedFactory => {
    const {name, lowerBound, upperBound, numChildren, _id} = updatedFactory;
    const factories = [...this.state.factories].map( factory => {
      if(factory._id === _id){
        return updatedFactory;
      }
      return factory;
    });
    this.setState({
      factories: handleFactorySort(factories, this.state.sortSelection), 
      selectedFactory: updatedFactory, 
      name, 
      lowerBound, 
      upperBound, 
      numChildren
    });
  }
  handleFactorySelection = selectedFactory => {
    const {name, lowerBound, upperBound, numChildren} = selectedFactory;
    this.setState({
      selectedFactory, 
      editName: name, 
      //Since 0 is a 'falsey' value, first check if it's 0 and then set to an empty string if it's not a legit value
      editLowerBound: lowerBound === 0 ? 0 : lowerBound || '', 
      editUpperBound: upperBound === 0 ? 0 : upperBound || '',  
      editNumChildren: numChildren === 0 ? 0 : numChildren || '', 
      formErrors: {lowerBound: null, upperBound: null, numChildren: null}
    });
  }
  handleInputChange = event => {
    const {value, name} = event.target;
    //If there is an error, check to see if the error status has changed whenever the user modifies a form input
    //Otherwise, just set the value
    if(this.state.hasFormError){
        this.setState({[name]: value}, () => {
            this.setState({formErrors: checkForChildrenErrors(this.getFormValues())});
        })
    }
    else{
        this.setState({[name]: value});
    }
  }
  getFormValues = type => {
    if(type==='name'){
      return {name: this.state.editName};
    }
    const {editLowerBound, editUpperBound, editNumChildren} = this.state;
    return {lowerBound: editLowerBound, upperBound: editUpperBound, numChildren: editNumChildren};
  }
  handleSubmit = (type, event) => {
    event.preventDefault();
    if(type==='children'){
      const values = this.getFormValues();
      const formErrors = checkForChildrenErrors(values);
      var hasFormError = false;
      Object.keys(formErrors).forEach(val => {
          if(formErrors[val]){
              hasFormError = true;
          }
      })
      if(hasFormError){
          this.setState({formErrors, hasFormError: true});
      }
      else{
        axios.put(`/api/update-factory/${this.state.selectedFactory._id}/${type}`, this.getFormValues(type));
      }
    }
    else{
      axios.put(`/api/update-factory/${this.state.selectedFactory._id}/${type}`, this.getFormValues(type));
    }
  }
  handleCancel = () => {
    this.setState({selectedFactory: null});
  }
  handleSortToggle = () => {
    this.setState({sortToggle: !this.state.sortToggle})
  }
  handleSortSelection = ({target: {value}}) => {
    this.setState({
      sortToggle: false, 
      sortSelection: value, 
      factories: handleFactorySort(this.state.factories, value)
    });
  }
  handleFilterInput = (event) => {
    this.setState({
      filterInput: event.target.value
    });
  }
  handleFilterClear = () => {
    this.setState({filterInput: ''});
  }
  closeTreeActions = () => {
    this.setState({showTreeActions: false})
  }
  openTreeActions = () => {
    this.setState({showTreeActions: true})
  }
  render() {
    return (
        <div className={`main-container${this.state.selectedFactory ? ' editing' : ''}${this.state.showTreeActions ? ' show-tree-actions' : ''}`}>
          <TreeActions 
            sortToggle={this.state.sortToggle}
            sortSelection={this.state.sortSelection}
            handleSortToggle={this.handleSortToggle}
            handleSortSelection={this.handleSortSelection}
            filterInput={this.state.filterInput}
            handleFilterInput={this.handleFilterInput}
            handleFilterClear={this.handleFilterClear}
            closeTreeActions={this.closeTreeActions}
          />
          <Tree 
            handleFactorySelection={this.handleFactorySelection} 
            factories={this.state.factories}
            selectedFactory={this.state.selectedFactory}
            dataLoadingError={this.state.dataLoadingError}
            filterInput={this.state.filterInput}
            openTreeActions={this.openTreeActions}
          />
          <EditFactory 
              selectedFactory={this.state.selectedFactory}
              handleSubmit = {this.handleSubmit}
              handleInputChange={this.handleInputChange}
              handleCancel={this.handleCancel}
              editName={this.state.editName}
              editLowerBound={this.state.editLowerBound}
              editUpperBound={this.state.editUpperBound}
              editNumChildren={this.state.editNumChildren}
              formErrors={this.state.formErrors}
            />
            <div className='edit-overlay' onClick={() => this.handleCancel()}></div>
            <div className='tree-actions-overlay' onClick={() => this.closeTreeActions()}></div>
        </div>
    );
  }
}

export default App;
