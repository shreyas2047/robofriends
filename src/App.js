import React, {Component} from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import './App.css';
//import {robots} from './robots';



class App extends Component {

    constructor(){
        super();
        this.state = {
            robots: [],
            searchField: ''
        };
    }

    onSearchChange = (event)=> {
        this.setState({searchField: event.target.value});
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((result)=> {
            return result.json();
        }).then((users)=> {
            this.setState({robots: users});
        });
    }

    render(){
        const filteredRobots = this.state.robots.filter((robot)=> {
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
        });
        if(this.state.robots.length === 0) {
            return (
                <h1 className="tc pv3 mv7" >Loading...</h1>
            );
        }
        else{
            return (
                <div className="tc" >
                    <h1 className="f1" >RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <CardList robots={filteredRobots}/>
                </div>
                );
            }    
    }
}

export default App;