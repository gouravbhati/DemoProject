import { Dispatch } from "react"
import { Message } from "../../constants/AppConst"
import { Apis } from "../../services"
import { getRequest } from "../../services/requests"
import { ActionTypes } from "../type"

// Update max limit in slider
export const setMaxSpendingLimit = (payload: number) => {
    return {
        type: ActionTypes.Dashboard.SET_MAX_SPEND_LIMIT,
        payload
    }
}

// Manage toggle button on home page
export const setToggles = (payload: any) => {
    return {
        type: ActionTypes.Dashboard.SET_ACTIVE_OPTION,
        payload
    }
}

// Fetch Dashboard Api
export const fetchDashboardApi = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(setActivity(true));
        const response = await getRequest({ url: Apis.Dashboard });

        if (response && response?.status) {
            // Api get data
            dispatch(setSussesResponse(response.data));
        }
        else {
            // Unable to get data from Api
            const message = response?.message || Message.ServerError;
            dispatch(setFailureResponse(message));
        }
    }

}

const setActivity = (payload: boolean) => {
    return {
        type: ActionTypes.Dashboard.SET_LOADING,
        payload
    }
}

const setSussesResponse = (payload: any) => {
    return {
        type: ActionTypes.Dashboard.SET_SUSSES_RESPONSE,
        payload
    }
}

const setFailureResponse = (payload: string) => {
    return {
        type: ActionTypes.Dashboard.SET_FAILURE_RESPONSE,
        payload
    }
}