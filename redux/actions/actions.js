// actions.js

export const SET_PHONE_NUMBER = 'SET_PHONE_NUMBER';
export const SET_SHOP_DETAILS = 'SET_SHOP_DETAILS';


export const setPhoneNumber = (phoneNumber) => ({
  type: SET_PHONE_NUMBER,
  payload: phoneNumber,
});

export const setShopDetails = (shopDetails) => ({
  type: SET_SHOP_DETAILS,
  payload: shopDetails,
});