const TUNNEL_LENGTH = 'global/TUNNEL_LENGTH';
const TUNNEL_LIMIT_WEIGHT = 'global/TUNNEL_LIMIT_WEIGHT';
const SHIP_WEIGHTS = 'global/SHIP_WEIGHTS';
const VALIDATED = 'global/VALIDATED';

export const setTunnelLength = length => ({ type: TUNNEL_LENGTH, length });
export const setTunnelLimitWeight = weight => ({
  type: TUNNEL_LIMIT_WEIGHT,
  weight,
});
export const setShipWeights = weights => ({ type: SHIP_WEIGHTS, weights });
export const validated = () => ({ type: VALIDATED });

const initalState = {
  tunnel_length: 0,
  tunnel_limit_weight: 0,
  ship_weights: "",
  isValidated: false,
};

export default function globalField(state = initalState, action) {
  switch (action.type) {
    case TUNNEL_LENGTH:
      return {
        ...state,
        tunnel_length: +action.length,
      };

    case TUNNEL_LIMIT_WEIGHT:
      return {
        ...state,
        tunnel_limit_weight: +action.weight,
      };

    case SHIP_WEIGHTS:
      return {
        ...state,
        ship_weights: action.weights,
      };

    case VALIDATED:
      return {
        ...state,
        isValidated: true,
      };

    default:
      return state;
  }
}
