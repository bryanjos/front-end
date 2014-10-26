/** @jsx React.DOM */
var React = require('react'),
    Nav = require('./Nav.jsx'),
    Home = require('./Home.jsx'),
    About = require('./About.jsx'),
    Create = require('./Create.jsx'),
    RouterMixin = require('flux-router-component').RouterMixin;

var Application = React.createClass({
    mixins: [RouterMixin],
    getInitialState: function () {
        this.store = this.props.context.getStore('ApplicationStore');
        if(typeof window === 'undefined'){
            return this.store.getState();            
        }else{
            return {
                currentPageName: App.Context.dispatcher.stores.ApplicationStore.currentPageName,
                currentPage: App.Context.dispatcher.stores.ApplicationStore.currentPage,
                pages: App.Context.dispatcher.stores.ApplicationStore.pages,
                route: App.Context.dispatcher.stores.ApplicationStore.currentRoute
            };
        }
    },
    componentDidMount: function () {
        var self = this;
        self._changeEventListener = function () {
            var state = self.store.getState();
            self.setState(state);
        };  
        self.store.on('change', self._changeEventListener);
    },
    componentWillUnmount: function () {
        var self = this;
        self.store.removeListener('change', self._changeEventListener);
        self._changeEventListener = null;
    },
    getNextPage: function(){
        switch(this.state.currentPageName){
            case 'about':
                return <About context={this.props.context}/>;
            case 'create':
                return <Create context={this.props.context}/>;
            default:
                return <Home context={this.props.context}/>;
        }
    },
    render: function () {
        return (
            <div>
                <Nav selected={this.state.currentPageName} links={this.state.pages} context={this.props.context}/>
                {this.getNextPage()}
            </div>
        );
    }
});

module.exports = Application;