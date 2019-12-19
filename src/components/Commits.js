/**
 * GitHub Api App
 * (c) Minna Hannula, 11/2019
 * get commits, authors, avatar (if not null), commit message and date
 */

import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Api } from '../components/Api';
import Commit from '../screens/Commit'

export default class Commits extends Component{
    constructor(props){
        super(props);
        this.state={
            repo: null,
            user: null,
            commitData: [],
            loading: true,
        }
    }

    //Get username and repo from user input in home screen
    componentDidMount = async () =>{
        const {navigation} = this.props;
        const userRepo = await navigation.getParam('repo');
        const username = await navigation.getParam('user');
        this.setState({
            repo: userRepo,
            user: username,
        });

        this.userCommit();
    }

    //Get data from api
    userCommit = async () => {
        try{
            const userData = await new Api().getCommits(this.state.user, this.state.repo);
            this.setState({
                commitData: userData,
                loading: false
            })
        }catch(error){
            Alert.alert('Something went wrong!', `Error: ${error}`);
            console.log(error);
        }
        
    }

    render(){
        const {commitData, loading} = this.state;   
        return(
            <Commit data={commitData} loading={loading} />
        )
    }
}