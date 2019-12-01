/**
 * GitHub Api App
 * (c) Minna Hannula, 11/2019
 * Fetch repo names based on username
 * fetch repo commits based on username and repo
 */

import React, { Component } from 'react';

export class Api extends Component{

    //Fetch repo names from api
    getRepos = async (user) => {
        try{
            const api = await fetch(`https://api.github.com/users/${user}/repos`);
            const data = await api.json();

            if(data.message === 'Not Found'){
                alert('User not found! Check the username.')
            }
            return data;

        }catch(error){
            alert('Something went wrong! Error: ' + error);
        }    
    }

    //fetch commit from api
    getCommits = async (user, repo) => {
        try{
            const api = await fetch(`https://api.github.com/repos/${user}/${repo}/commits`);
            const data = await api.json();
            return data;
            
        }catch(error){
            alert('Something went wrong! Error: ' + error);
        }    
    }
}
