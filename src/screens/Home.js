/**
 * GitHub Api App
 * (c) Minna Hannula, 11/2019
 * get username
 * get reponames based on userinput
 * navigate to commits screen
 */

import React, { Component } from 'react';
import {  View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../Style';

export default class Home extends Component{

  //navigate to commit screen and pass parameters repo and user
  commits = async (repoName) => { 
    const {navigate} = this.props.navigation;
    navigate('Commit', {repo: repoName, user: this.props.userName});
  }

  render(){
    return(
      <View style={styles.container}>
        {this.props.loading && 
          <View style={styles.loading}>
            <ActivityIndicator 
              size='large'
              animating={this.props.loading}/>
          </View>
        }
        <ScrollView>
          {
            this.props.repoName.map((item, index) => (
              <TouchableOpacity
                style={styles.repoList}
                key={index}
                onPress={() => this.commits(item.name)}
              >
              <Text style={styles.textRepo}>{item.name}</Text>
              </TouchableOpacity>

            ))
          }
        </ScrollView>
      </View>
    );
  }
}