/**
 * GitHub Api App
 * (c) Minna Hannula, 11/2019
 * get 10 most resent commits
 * authos, avatar (if not null), commit message and  date
 */

import React, { Component } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import {Api} from '../components/Api';
import styles from '../Style';

export default class Commit extends Component{
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
        const userData = await new Api().getCommits(this.state.user, this.state.repo);
        this.setState({
            commitData: userData,
            loading: false
        })
    }

    render(){
        const {commitData, loading} = this.state;   
        return(
            <View style={styles.container}>
                {loading && 
                    <View style={styles.loading}>
                    <ActivityIndicator animating={loading}/>
                    </View>
                }
                <ScrollView>
                    {
                        commitData.slice(0, 10).map((item, index) => (
                            <View key={index} style={styles.commitList}>
                                <View style={styles.ImageView}>
                                    {item.author && item.author.avatar_url &&
                                        <Image style={styles.image} source={{uri: item.author.avatar_url}} />
                                    }
                                </View>
                                <View style={styles.textView}>
                                    <Text style={styles.textCommit}>{item.commit.author.name}</Text>  
                                    <Text style={styles.textCommit}>{item.commit.author.date}</Text>
                                    <Text style={styles.textCommit}>{item.commit.message}</Text>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}