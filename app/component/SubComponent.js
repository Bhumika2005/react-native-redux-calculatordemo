import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import Styles from '../style/Styles';

export default class SubComponent extends Component{
    render(){
        return(       
                  <Button style={{flex:1}} text={this.props.val} rounded={false} buttonStyle={Styles.buttonDesign}
                  textStyle={Styles.textFormat} onPress={this.props.onPress}/>
                  
        )
    }
}