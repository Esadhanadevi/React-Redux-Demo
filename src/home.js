import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Button from './components/button.js';
// import TableRows from './components/table-rows.js';

class home extends React.Component {

constructor(props) {
  super(props);
  this.state = {
      id: '',
      name : '',
      contact : '',
      place : '',
      editInput : false,
      listItems: []
    };
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleFormSubmit = this.handleFormSubmit.bind(this);
  this.deleteRow = this.deleteRow.bind(this);
}

 handleInputChange(event) {
   const target = event.target;
   const value = target.value;
   const name = target.name;

   this.setState({
     [name]: value
   });
 }

 handleFormSubmit(state) {
   console.log('===========form submit==isEdit============',this.state);
   if(state.editInput){
    let item = _.filter(this.state.listItems, { 'id': state.id});
    item[0].name = state.name;
    item[0].contact = state.contact;
    item[0].place = state.place;
    this.setState({
      listItems : this.state.listItems});
   } else {
     let rname = this.state.name;
     let rcontact = this.state.contact;
     let rplace = this.state.place;
     let rid = this.state.listItems.length + 1
     let newRow = {id: rid.toString(), name: rname, contact: rcontact, place: rplace};
     console.log('===========form submit==============',newRow);
     this.setState( {listItems: this.state.listItems.concat([newRow])} );
   }

   this.state.name = '';
   this.state.contact = '';
   this.state.place = '';
   event.preventDefault();
 }

  deleteRow(index) {
    let contacts = [...this.state.listItems];
    contacts.splice(index, 1);
    this.setState({
      listItems : contacts});
  }

  editRow(id) {
    this.state.editInput = true;
    let contacts = [...this.state.listItems];
    let item = _.filter(contacts, { 'id': id});
    console.log('==========edit item=========',item);
    this.setState({
      id: item[0].id,
      name : item[0].name,
      contact: item[0].contact,
      place: item[0].place});
    console.log('==========edit item=111========', this.state);
  }

  componentDidMount() {
    let th = this;
     this.serverRequest =
      axios.get('./src/data/table-items.json')
        .then(function(result) {
          console.log('===========result========',result.data.listItems);
          th.setState({
            listItems: result.data.listItems
          });
        })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    let listItems = this.state.listItems.map( (item, index) => {
				return (
          <tr key={item.id}>
            <td>{index}</td>
  					<td>{item.name}</td>
            <td>{item.contact}</td>
            <td>{item.place}</td>
            <td><Button name="removeBtn" value="Remove" classname="btn btn-primary btn-md" onClick={(index) => this.deleteRow(index)}/></td>
            <td><Button name="editBtn" value="Edit" classname="btn btn-primary btn-md" onClick={(index) => this.editRow(item.id)}/></td>
				  </tr>
        )
			})

    return (
         <div className="container">
            <div className="row">
              <h3>React - Add table row </h3>
              <div className="col-md-12">

                <div className="col-md-8">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Place</th>
                        <th>Action</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listItems}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4">
                  <form>
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" name="name" placeholder="Enter name" value={this.state.name} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                      <label>Contact</label>
                      <input type="number" className="form-control" name="contact" placeholder="Contact" value={this.state.contact} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                      <label>Place</label>
                      <input type="text" className="form-control" name="place" placeholder="Place" value={this.state.place} onChange={this.handleInputChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={ () => this.handleFormSubmit(this.state)}>{this.state.editInput ? 'Update' : 'Submit'}</button>
                  </form>
                </div>
              </div>
            </div>
         </div>
      );
  }
}

export default home;
