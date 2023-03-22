import { FETCH_LIST_ERROR, FETCH_LIST_SECCESS } from "./reducersConsts"

const initState = {
    loading: true,
    data: [],
    error: ''
}

const listsReducer = (state = initState, action) =>{
    switch(action.type){
        case FETCH_LIST_SECCESS:
            return{
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_LIST_ERROR:
            return{
                ...state,
                loading: true,
                data: [],
                error: action.error
            }
        default:
            return state
    }
}

export default listsReducer;