// reducer.js

import { SET_PHONE_NUMBER } from "../actions/actions";
import { SET_SHOP_DETAILS } from "../actions/actions";


const initialState = {
  storePhoneNo: '99',
  shopDetails: {
    shopName: '',
    shopCategory: '',
    shopPinCode: '',
    whatsappNo: '785',
    openTime: '',
    closeTime: '',
    ticketSize: '',
    shopCity: '1',
    housingIDs: [],
  },
};

const loginreducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHONE_NUMBER:
      return {
        ...state,
        storePhoneNo: action.payload,
      };

    case SET_SHOP_DETAILS:
      return {
        ...state,
        shopDetails: {
          ...state.shopDetails,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default loginreducer;
