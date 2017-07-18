import React,{Component} from 'react';
import {View,Text } from 'react-native';
import {Header,Buttons,Spinner,CardSection} from './component/common';
import firebase from 'firebase';
import LoginForm from './component/LoginForm';


class App extends Component{
    state={loggedIn:null};

    componentWillMount(){
        firebase.initializeApp(
            {
                apiKey: "AIzaSyDUxWgbjJTHMLWYLlXAeo7e4rIHoZMY9ug",
                authDomain: "authentication-ea9d5.firebaseapp.com",
                databaseURL: "https://authentication-ea9d5.firebaseio.com",
                projectId: "authentication-ea9d5",
                storageBucket: "authentication-ea9d5.appspot.com",
                messagingSenderId: "273882251023"
            });
        firebase.auth().onAuthStateChanged((user) =>{
            if(user){
                this.setState({loggedIn:true})
            }
            else{
                this.setState({loggedIn:false})
            }
        })
    }

    renderContent(){
        switch(this.state.loggedIn){
            case true:
               return (
                   <CardSection>
                        <Buttons onPress{() => firebase.auth().signOut()}>
                            Login
                        </Buttons>
                   </CardSection>);
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large"/>;
        }

    }

    render(){
        return(
          <View>
              <Header headertext='Authentication' />
              {this.renderContent()}
          </View>
        );
    }
}

export default App