import { ActionTypes } from "../type";

const initState = {
    loading: false,
    error_message: null,
    data: null,
    max_spending_limit: null,
    active_options: {}
}

const DashboardReducer = (state = initState, action: any) => {
    console.log(action);
    switch (action.type) {

        case ActionTypes.Dashboard.SET_MAX_SPEND_LIMIT:
            return {
                ...state,
                max_spending_limit: action.payload
            }
        case ActionTypes.Dashboard.SET_ACTIVE_OPTION:
            return {
                ...state,
                active_options: {
                    ...state.active_options,
                    ...action.payload
                }
            }

        case ActionTypes.Dashboard.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        case ActionTypes.Dashboard.SET_FAILURE_RESPONSE:
            return {
                ...state,
                loading: false,
                data: false,
                error_message: action.payload
            }
        case ActionTypes.Dashboard.SET_SUSSES_RESPONSE:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error_message: null
            }
    }
    return state;
}

export default DashboardReducer;

