/** @jsx React.DOM */
var React = require('react');
var Immutable = require('immutable');
var UserStore = require('../stores/UserStore');

var Home = React.createClass({
    getInitialState: function () {
        var context = this.props.context;
        this.store = context.getStore(UserStore);
        return Immutable.Map({ users: this.store.getAll() });
    },
    shouldComponentUpdate: function(nextProps, nextState) {
      return nextState != this.state;
    },
    componentDidMount: function() {
        this.store.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        this.store.removeChangeListener(this._onChange);
    },
    _onChange: function(){
      this.setState(this.state.set('users', this.store.getAll()));    
    },
    render: function() {

        var userTRs = this.state.get('users').map(function(user) {
            return (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
            );
        }, this);

        return (
            <table className="pure-table">
              <thead>
                <tr>
                  <th>username</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
              {userTRs}
              </tbody>
            </table>
        );
    }
});

module.exports = Home;