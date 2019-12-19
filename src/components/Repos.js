/**
 * GitHub Api App
 * (c) Minna Hannula, 11/2019
 * get username
 * get reponames based on userinput
 * navigate to commits screen
 */

import React, { Component } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Api } from '../components/Api';
import styles from '../Style';
import Home from '../screens/Home';

export default class Repos extends Component{
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

        switch(true){
          case userData == '':
              Alert.alert(`Repositories from ${this.state.user} was not found.` , 'User may not have any public repositories yet');
              break;
          case userData.message == 'Not Found':
              Alert.alert(`User ${this.state.user} not found`, 'Check username');
              break;
          default:
              this.setState({repo: userData});
              break;
        }
        this.setState({
          loading: false,
        })
      }catch(error){
        Alert.alert('Something went wrong!', `Error: ${error}`)
        console.log(error);
      }
    }
    else{
      this.setState({
        loading: false,
      });
      Alert.alert('Username cannot be empty!', 'Enter username before search')
    }    
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
            <Home repoName={repo} userName={user} loading={loading} navigation={this.props.navigation}/>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.btn} 
                    onPress={() => {this.setState({repo:[], loading: true});this.userRepos()}}>
                        <Text style={styles.textBtn}>Get repositories</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}