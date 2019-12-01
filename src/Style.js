import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
    },
    loading:{
        width: '100%',
        height: '100%',
        justifyContent:'center',
    },

    input:{
        fontSize: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#d6d7da',
    },
    btnContainer:{
        width: '100%',
        bottom: 0,
        borderWidth: 1,
        borderColor: '#d6d7da',
    },
    btn:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
    },
    textBtn:{
        fontSize: 15,
        fontWeight: 'bold'
    },
    repoList:{
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    textRepo:{
        fontSize: 15,
    },
    commitList:{
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#d6d7da',
    },
    ImageView:{
        width: 100, 
        height: 100,
        padding: 10
    },
    image:{
        width: '100%',
        height: '100%'
    },
    textView:{
        width: '70%',
        padding: 10,
    },
    textCommit:{
        fontSize: 15
    }
})