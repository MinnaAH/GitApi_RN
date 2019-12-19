/**
 * GitHub Api App
 * (c) Minna Hannula, 11/2019
 * display 10 most resent commits
 */

import React, {Component} from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../Style';

export default class Commit extends Component{
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
                        this.props.data.slice(0,10).map((item, index) => (
                            <View key={index} style={styles.commitList}>
                                <View style={styles.ImageView}>
                                { item.author && item.author.avatar_url &&
                                        <Image style={styles.image} source={{uri: item.author.avatar_url}} />
                                    }
                                </View>
                                <View style={styles.textView}>
                                    <Text style={styles.textCommit}>Author: {item.commit.author.name}</Text>  
                                    <Text style={styles.textCommit}>Date: {new Date(item.commit.author.date).toLocaleDateString()}</Text>
                                    <Text style={styles.textCommit}>Time: {new Date(item.commit.author.date).toLocaleTimeString()}</Text>
                                    <Text style={styles.textCommit}>Commit message: {item.commit.message}</Text>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}