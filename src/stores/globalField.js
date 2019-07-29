const TUNNEL_LENGTH = 'global/TUNNEL_LENGTH';
const TUNNEL_LIMIT_WEIGHT = 'global/TUNNEL_LIMIT_WEIGHT';
const SHIP_WEIGHTS = 'global/SHIP_WEIGHTS';

export const setTunnelLength = (length) => ({type : TUNNEL_LENGTH, length});
export const setTunnelLimitWeight = (weight) => ({type : TUNNEL_LIMIT_WEIGHT, weight});
export const setShipWeights = (weights) => ({type : SHIP_WEIGHTS, weights});

const initalState = {

    tunnel_length : 0,
    tunnel_limit_weight : 0,
    ship_weights : []

};

export default function globalField(state = initalState, action){
    switch(action.type){
        case TUNNEL_LENGTH : return {
            ...state,
            tunnel_length : action.lenght
        };

        case TUNNEL_LIMIT_WEIGHT : return {
            ...state,
            tunnel_limit_weight : action.weight
        };

        case SHIP_WEIGHTS : return {
            ...state,
            ship_weights : action.weights
        };

        default : return state;
    }
}