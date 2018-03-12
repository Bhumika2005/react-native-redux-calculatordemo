import * as Actions from '../action/Action'

const initialState={
    inputValue:0, 
    previouseInputVal:0,
    selectedOperator:null,
    lastOperator:null,
    displayValue:''
}

const CounterReducer= (state=initialState,action)=>{
    switch(action.type){
        case Actions.OPRATOR_KEY:
        if(state.displayValue!=='' && state.selectedOperator === null && state.displayValue !== Actions.DIVIDE_BY_ZERO)  {
            if(state.displayValue.substr(-1) !== '.'){
                
                return Object.assign({},state,{
                    previouseInputVal:state.inputValue,
                    selectedOperator:action.val,
                    displayValue:state.inputValue+action.val,
                    inputValue:0,
                    lastOperator:action.val
                 });
                
            }
            else{
                return state;
            }
        }
        else{
            return state;
        }
        case Actions.EQAUL:
            if(state.displayValue != '' && state.displayValue !== Actions.DIVIDE_BY_ZERO && state.selectedOperator !== null){
                if(this.isValid(state)){
                    if(state.inputValue*1 === 0 && state.selectedOperator === '/'){
                        return Object.assign({},state,{
                            previouseInputVal:state.inputValue,
                            selectedOperator:null,
                            displayValue:Actions.DIVIDE_BY_ZERO,
                            inputValue:0,
                            lastOperator:action.val
                         });    
                    }
                    else{
                        let answer=eval(parseFloat(state.previouseInputVal)+state.selectedOperator+parseFloat(state.inputValue))
                        
                        return Object.assign({},state,{               
                                        inputValue:answer,
                                        previouseInputVal:0,
                                        selectedOperator:null,
                                        displayValue:answer+'',
                                        lastOperator:action.val
                        });
                    }
                }
                else{
                    return state;
                }
            }
            else{
                return state;   
            }
        case Actions.CE_KEY:
                return Object.assign({},state,{               
                                inputValue:0,
                                displayValue:state.displayValue.includes('+') || state.displayValue.includes('-') || 
                                    state.displayValue.includes('*') || state.displayValue.includes('/') ? 
                                    state.displayValue.slice(0,state.displayValue.lastIndexOf(state.selectedOperator)+1):'',
                                selectedOperator:state.displayValue === Actions.DIVIDE_BY_ZERO?null:state.selectedOperator,
                                lastOperator:action.val
                });
        case Actions.C_KEY:
                return Object.assign({},state,{               
                            inputValue:0,
                            previouseInputVal:0,
                            selectedOperator:null,
                            displayValue:'',
                            lastOperator:null
                });
        case Actions.DELETE_KEY:
        if(state.lastOperator !== Actions.EQAUL){
                return Object.assign({},state,{ 
                            inputValue:state.displayValue !== '' && (state.displayValue.substr(-1)===state.selectedOperator)?state.previouseInputVal:state.inputValue !== 0 ? 
                            (state.inputValue+'').slice(0,-1):0,
                            previouseInputVal:state.previouseInputVal===state.displayValue && state.previouseInputVal!==0?state.previouseInputVal.substr(0,-1):state.previouseInputVal,
                            selectedOperator:state.displayValue!='' && state.displayValue.substr(-1)===state.selectedOperator?null:state.selectedOperator,
                            displayValue:state.displayValue!=''?state.displayValue.slice(0,-1):'',
                            lastOperator:action.val
                });
            }
            else{
                return state;
            }
        case Actions.DOT_KEY:
                if(state.displayValue !== '' && state.lastOperator !== '='){
                    if(state.displayValue.substr(-1) !== '.' && this.isValueInteger(state.inputValue) && this.isValid(state))
                    {
                        return Object.assign({},state,{               
                            inputValue:state.inputValue+action.val,
                            displayValue:state.displayValue !== '' ? state.displayValue + action.val : action.val
                        });
                    }
                    else{
                        return state;
                    }
                }
                else{
                    return state;
                }
        case Actions.NUMBER_KEY:
                return Object.assign({},state,{              
                            inputValue:(state.displayValue === '' || state.lastOperator === '=' || state.lastOperator === '%')?action.val:state.inputValue+action.val,
                            displayValue:(state.displayValue !== '' && state.lastOperator !== '=' && state.lastOperator !== '%') ? state.displayValue+action.val:action.val,
                            lastOperator:null,
                });
        case Actions.PERCENTAGE_KEY:
                if(state.inputValue !== 0 && state.displayValue !== ''){
                    let answer = eval(state.inputValue/100);
                        return Object.assign({},state,{
                            displayValue:answer+'',
                            inputValue:answer,
                            selectedOperator:null,
                            previouseInputVal:0,
                            lastOperator:action.val
                        });
                }
                else{
                    return state;
                }
    }
    return state;
}

isValid=(state)=>{
    if(state.displayValue.substr(-1) !== '/' && state.displayValue.substr(-1) !== '*'
    && state.displayValue.substr(-1) !== '+' && state.displayValue.substr(-1) !== '-' && state.displayValue.substr(-1) !== '.'){
        return true ;
    }
    else{
        return false ;
    }

}

isValueInteger=(nextVal)=>{
    var regexp = /^\d+\.\d+$/;
    return !regexp.test(nextVal);
}
export default CounterReducer; 