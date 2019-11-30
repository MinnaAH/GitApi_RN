/**
 * GitHub Api App
 * (c) Minna Hannula, 11/2019
 * get username
 * get reponames based on userinput
 * navigate to commits screen
 */

import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Api } from '../components/Api';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      user: null,
      repo: [],
    }
  }

  //get repo names from api
  userRepos = async () => {
    try{
      const userData = await new Api().getRepos(this.state.user);
      for(var i=0; i<userData.length; i++){
        this.setState({
          repo: [...this.state.repo, userData[i].name]
        })
      }
    }catch(error){
      console.log(error);
    }
  }

  //navigate to commit screen and pass parameters repo and user
  commits = async (repoName) => {
    const {navigate} = this.props.navigation;
    navigate('Commit', {repo: repoName, user: this.state.user});
  }

  render(){
    const {repo, user} = this.state;
    return(
      <View>
        <TextInput
          placeholder='Enter username'
          value={user}
          onChangeText={(user) => this.setState({user})}
        />
        <Button onPress={() => {this.userRepos();this.setState({repo:[]})}} title={'Get Repos'}/>
        <ScrollView>
          {
            repo.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.commits(item)}
              >
              <Text>{item}</Text>
              </TouchableOpacity>

            ))
          }
        </ScrollView>
      </View>
    );
  }
}