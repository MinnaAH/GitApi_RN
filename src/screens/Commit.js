/**
 * GitHub Api App
 * (c) Minna Hannula, 11/2019
 * get 10 most resent commits
 * authos, avatar (if not null), commit message and  date
 */

import React, { Component } from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import {Api} from '../components/Api';

export default class Commit extends Component{
    constructor(props){
        super(props);
        this.state={
            repo: null,
            user: null,
            commitData: [],
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
        const userData = await new Api().getCommits(this.state.user, this.state.repo);
        this.setState({
            commitData: userData
        })
    }

    render(){
        const {commitData} = this.state;   
        return(
            <ScrollView>
                {
                    commitData.slice(0, 10).map((item, index) => (
                        <View key={index}>
                            <Text>{item.commit.author.name}</Text>
                            {item.author && item.author.avatar_url &&
                                <Image style={{width: 50, height: 50}} source={{uri: item.author.avatar_url}} />
                            }  
                            <Text>{item.commit.author.date}</Text>
                            <Text>{item.commit.message}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        )
    }
}