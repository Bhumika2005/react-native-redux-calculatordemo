import {StyleSheet, Dimensions} from 'react-native';

var Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
    },
    header:{
      backgroundColor:'#AAAAAA',
      height:50,
      justifyContent:'center',
      alignItems:'center',
    },
    headerTitle:{
      textAlign:'center',
      color:'#000000',
      fontSize:25,
      fontWeight:'bold',
    },
    calculateAreaStyle:{
      flex:1,
      backgroundColor:'#ffffff',
      justifyContent:'flex-end',
      padding:5,
    },
    inputBox:{
      textAlign:'right',
      color:'#000000',
      fontSize:30,
    },
    buttonDesign: {
      flex:1,
      width:Dimensions.get('window').width/4,
      borderWidth:4,
      borderRadius:0,
      backgroundColor:'#AAAAAA',
    },
    textFormat:{
      fontSize: 18,
      fontWeight: 'normal',
      color: '#000000',
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    inputRow:{
      flex:1,
      flexDirection:'row',
      alignContent:'center',
      overflow:'hidden',
    },
    buttonWrapperStyle:{
      flex:1,
      backgroundColor:'#000000',
      paddingTop:4,
    }
  });

  export default Styles;