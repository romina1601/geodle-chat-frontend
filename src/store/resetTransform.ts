import { createTransform } from 'redux-persist';
import { DateTime } from 'luxon';

// Compute today's midnight in CET using Luxon.
const getTodayCETMidnight = (zone: string = "utc"): number => {
  return DateTime.now().setZone(zone).startOf("day").toMillis();
};

const resetTransform = createTransform(
  // inbound: when saving state, add a lastUpdated timestamp.
  (inboundState: any, key) => {
    return {
      ...inboundState,
      lastUpdated: Date.now(),
    };
  },
  // outbound: when rehydrating state, reset if lastUpdated is before today's midnight
  (outboundState: any, key) => {
    const todayCETMidnight = getTodayCETMidnight();
    if (!outboundState.lastUpdated || outboundState.lastUpdated < todayCETMidnight) {
      // Returning undefined lets the persistReducer use the initial state from your reducer.
      return undefined;
    }
    return outboundState;
  }
);

export default resetTransform;
