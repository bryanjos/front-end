/** @jsx React.DOM */
var React = require('react');
var Immutable = require('immutable');
var createUser = require('../actions/createUser');

var Create = React.createClass({
    getInitialState: function () {
        return { user: Immutable.Map({username: '', email: ''}) };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
      return nextState != this.state;
    },
    handleUsernameChange: function(event) {
      this.handleChange('username', event);
    },
    handleEmailChange: function(event) {
      this.handleChange('email', event);
    },
    handleChange: function(attribute, event){
      this.setState( { user: this.state.user.set(attribute, event.target.value) } );      
    },
    handleSubmit: function(event) {
      event.preventDefault();
      this.props.context.executeAction(createUser, this.state.user.toObject());
      return;
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit} className="pure-form pure-form-stacked">
              <input onChange={this.handleUsernameChange} type="text" id="username" name="username" className="form-control" placeholder="Username" required />
              <input onChange={this.handleEmailChange} type="text" id="email" name="email" className="form-control" placeholder="Email" required />
              <input type="submit" value="Submit" className="pure-button pure-button-primary" />
            </form>
        );
    }
});

module.exports = Create;