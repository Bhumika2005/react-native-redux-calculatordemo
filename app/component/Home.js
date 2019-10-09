import React,{Component} from 'react';
import {View, TouchableHighlight, TouchableOpacity} from 'react-native';
import SubComponent from './SubComponent';
import Styles from '../style/Styles';
import {Text} from 'react-native-elements';
import {connect} from 'react-redux';
import * as ActionTypes from '../action/Action'

// Define the button text that will be displayed in the calculator.
const inputButtons = [
    ['CE','C','Del','/'],
    ['7', '8','9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['%','0', '.', '=']
];

class Home extends Component{
    render(){
        return(
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <Text style={Styles.headerTitle}>Calculator</Text>
                </View>
                <View style={Styles.calculateAreaStyle}>
                <Text style={Styles.inputBox}>{this.props.displayValue}</Text>
                </View>
                
                <View style ={Styles.buttonWrapperStyle}>
                    {this.setButtonValue()}
                </View>
            </View>
        )
    }

    setButtonValue() {
        let views = inputButtons.map((row, idx) => {
            let inputRow = row.map((buttonVal, columnIdx) => {
                return <SubComponent
                            val={buttonVal}
                            onPress={this.onInputButtonPressed.bind(this, buttonVal)}
                            key={'row-' + columnIdx} />;
            });
            return <View style={Styles.inputRow} key={'row-' + idx}>{inputRow}</View>;
        });
        return views;
    }

    onInputButtonPressed(input){
        switch(input){
            case '/':
            case '*':
            case '+':
            case '-': this.props.onStoreResult(ActionTypes.OPRATOR_KEY,input);break;
            case '=': this.props.onStoreResult(ActionTypes.EQAUL,input);break;
            case 'CE':this.props.onStoreResult(ActionTypes.CE_KEY,input);break;
            case 'C':this.props.onStoreResult(ActionTypes.C_KEY,input);break;
            case 'Del':this.props.onStoreResult(ActionTypes.DELETE_KEY,input);break;
            case '.':this.props.onStoreResult(ActionTypes.DOT_KEY,input);break;
            case '%':this.props.onStoreResult(ActionTypes.PERCENTAGE_KEY,input);break;
            default:this.props.onStoreResult(ActionTypes.NUMBER_KEY,input);break;
        }
    }
}                           

const mapStateToProps=(state)=>({
    displayValue : state.counterReducer.displayValue
});

const mapDispatchToProps =(dispatch)=>({
        onStoreResult: (keyType,result) => dispatch({type:keyType , val: result})
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);