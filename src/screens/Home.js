/**
 * GitHub Api App
 * (c) Minna Hannula, 11/2019
 * get username
 * get reponames based on userinput
 * navigate to commits screen
 */

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { Api } from '../components/Api';
import styles from '../Style';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      user: null,
      repo: [],
      loading: false,
    }
  }

  //get repo names from api
  userRepos = async () => {
    Keyboard.dismiss();
    
    if(this.state.user){
      try{
        const userData = await new Api().getRepos(this.state.user);
        for(var i=0; i<userData.length; i++){
          this.setState({
            repo: [...this.state.repo, userData[i].name]
          })
        }
        this.setState({
          loading: false,
        });        
        
      }catch(error){
        console.log(error);
      }
    }
    else{
      this.setState({
        loading: false,
      })
      alert('You must enter username before search!');
    }
  }

  //navigate to commit screen and pass parameters repo and user
  commits = async (repoName) => {
    
    const {navigate} = this.props.navigation;
    navigate('Commit', {repo: repoName, user: this.state.user});
  }

  render(){
    const {repo, user, loading} = this.state;
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Enter username'
          value={user}
          onChangeText={(user) => this.setState({user})}
        />
        {loading && 
          <View style={styles.loading}>
            <ActivityIndicator animating={loading}/>
          </View>
        }
        <ScrollView>
          {
            repo.map((item, index) => (
              <TouchableOpacity
                style={styles.repoList}
                key={index}
                onPress={() => this.commits(item)}
              >
              <Text style={styles.textRepo}>{item}</Text>
              </TouchableOpacity>

            ))
          }
        </ScrollView>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn} 
            onPress={() => {this.setState({repo:[], loading: true});this.userRepos()}}>
                <Text style={styles.textBtn}>Get user repos</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}