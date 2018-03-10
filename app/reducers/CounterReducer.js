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
        if(state.displayValue!=='' && state.selectedOperator === null)  {
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
            if(state.displayValue != '' && state.selectedOperator !== null){
                if(this.isValid(state)){
                    let answer=eval(parseFloat(state.previouseInputVal)+state.selectedOperator+parseFloat(state.inputValue))
                    
                    return Object.assign({},state,{               
                                    inputValue:answer,
                                    previouseInputVal:0,
                                    selectedOperator:null,
                                    displayValue:answer+'',
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
        case Actions.CE_KEY:
                return Object.assign({},state,{               
                                inputValue:0,
                                displayValue:state.displayValue.includes('+') || state.displayValue.includes('-') || 
                                    state.displayValue.includes('*') || state.displayValue.includes('/') ? 
                                    state.displayValue.slice(0,state.displayValue.lastIndexOf(state.selectedOperator)+1):'',
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
                return Object.assign({},state,{ 
                            inputValue:state.displayValue !== '' && (state.displayValue.substr(-1)===state.selectedOperator)?state.previouseInputVal:state.inputValue !== 0 ? 
                            (state.inputValue+'').slice(0,-1):0,
                            previouseInputVal:state.previouseInputVal===state.displayValue && state.previouseInputVal!==0?state.previouseInputVal.substr(0,-1):state.previouseInputVal,
                            selectedOperator:state.displayValue!='' && state.displayValue.substr(-1)===state.selectedOperator?null:state.selectedOperator,
                            displayValue:state.displayValue!=''?state.displayValue.slice(0,-1):'',
                            lastOperator:action.val
                });
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
    if(!isNaN(nextVal) && parseInt(Number(nextVal)) == nextVal && !isNaN(parseInt(nextVal, 10))){
        return true;
    }
    else{
        return false;
    }
}
export default CounterReducer; 