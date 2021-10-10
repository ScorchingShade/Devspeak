import { REMOVE_FAVOURITECHANNEL, SET_CHANNEL, SET_FAVOURITECHANNEL, SET_USER } from "./actiontypes";


export const setUser=(user)=>{
    return {
        type: SET_USER,
        payload:{
            currentUser:user
        }
    }
}


export const setChannel=(channel)=>{
    return {
        type: SET_CHANNEL,
        payload:{
            currentChannel:channel
        }
    }
}


export const setfavouriteChannel = (channel) => {
    return {
        type: SET_FAVOURITECHANNEL,
        payload: {
            favouriteChannel: channel
        }
    }
}

export const removefavouriteChannel = (channel) => {
    return {
        type: REMOVE_FAVOURITECHANNEL,
        payload: {
            favouriteChannel: channel
        }
    }
}
