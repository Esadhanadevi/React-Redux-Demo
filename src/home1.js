import React from 'react';
import axios from 'axios'
import Button from './components/button.js';

var home = React.createClass({
//class home extends React.Component {

 handleInputChange: function(event) {
   const target = event.target;
   const value = target.value;
   const name = target.name;

   this.setState({
     [name]: value
   });
   console.log('===========handleInputChange==============',this.state);
 },

 handleFormSubmit: function() {
   console.log('===========form submit==============',this.state);
   var rname = this.state.name;
   var rcontact = this.state.contact;
   var rplace = this.state.place;
   var rid = this.state.listItems.length + 1
   var newRow = {id: rid.toString(), name: rname, contact: rcontact, place: rplace};

   console.log('===========form submit==============',newRow);

   this.setState( {listItems: this.state.listItems.concat([newRow])} );
   this.state.name = '';
   this.state.contact = '';
   this.state.place = '';
   event.preventDefault();
 },

  getInitialState: function() {
    return {
      listItems: []
    }
  },

  deleteRow: function(index) {alert("delete1")
    var contacts = [...this.state.listItems];
    contacts.splice(index, 1);
    this.setState({contacts});
  },

  componentDidMount: function() {
    var th = this;
    // console.log('=========componentDidMount==========',this.state);
    // this.setState({
    //   deleteRow : this.deleteRow;
    // })
    // console.log('=========componentDidMount===1111=======',this.state);
     this.serverRequest =
      axios.get('./src/data/table-items.json')
        .then(function(result) {
          console.log('===========result========',result.data.listItems);
          th.setState({
            listItems: result.data.listItems
          });
        })
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {

    var listItems = this.state.listItems.map(function(item) {
			return (
				<tr key={item.id}>
					<td>{item.name}</td>
          <td>{item.contact}</td>
          <td>{item.place}</td>
          <td><Button name="removeBtn" value="Remove" classname="btn btn-primary btn-md"/></td>
				</tr>
			);
		});

    return (
         <div className="container">
            <div className="row">
              <h3>React - Add table row </h3>
              <div className="col-md-12">

                <div className="col-md-8">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Place</th>
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
                      <input type="text" className="form-control" name="name" placeholder="Enter name" onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                      <label>Contact</label>
                      <input type="number" className="form-control" name="contact" placeholder="Contact" onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                      <label>Place</label>
                      <input type="text" className="form-control" name="place" placeholder="Place" onChange={this.handleInputChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
                  </form>
                </div>
              </div>
            </div>
         </div>
      );
  }
});

export default home;
