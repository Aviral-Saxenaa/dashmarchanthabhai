import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontLoader from "../../FontLoader";
import Icon from "react-native-vector-icons/Ionicons";

const OrderDetails = () => {
  // Sample order details
  const deliveryDetails = {
    deliveryDate: "Tue December 25, 2023",
    deliveryTime: "Arrives in: 28 minutes",
    orderstatus: "Complete",
  };

  const addressDetails = {
    name: "Mittal",
    address: "J K Chambers Sector 17 Vashi, Mumbai, Noida, 400703, India",
    phoneNumber: "8076940848",
  };

  const paymentDetails = {
    orderno: "TBN-1234565432-09876",
    paymentoption: "UPI",
    orderitems: "1 item",
    Subtotal: "Rs 120",
    delcharges: "Rs 0",
    RedemedNeucoins: "Rs 3.16",
    total: "Rs 116.84",
  };

  return (
    <FontLoader>
      <View style={styles.container}>

        {/* Address Section*/}
        <Text style={styles.mainHead}>Address</Text>
       
        <View style={{...styles.section,width:'100%'}}>
          <Text style={styles.text}>{addressDetails.name}</Text>
          <Text style={styles.text}>{addressDetails.address}</Text>
          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          
          <View
            style={{
              backgroundColor: "#1abe78",
              height: 30, // Make sure the height and width are the same
              width: 30, // Make sure the height and width are the same
              borderRadius: 20, // Half of the height/width to make it a circle
              justifyContent: "center", // Center the icon vertically
              alignItems: "center", // Center the icon horizontally
            }}
          >
            <Icon name="call-outline" size={20} color="#fff" />
          </View>
          <Text style={{...styles.text,marginLeft:5}}>{addressDetails.phoneNumber}</Text>
          </View>
        </View>


        
        {/* Delivery Details Section*/}
        <Text style={styles.mainHead}>Delivery Details</Text>
        <View style={styles.section}>
          <Text style={styles.text}>{deliveryDetails.deliveryDate}</Text>
          <Text style={styles.text}>{deliveryDetails.deliveryTime}</Text>
          <Text style={styles.text}>{deliveryDetails.orderstatus}</Text>
        </View>

        
        
      

        {/* Payment Section*/}
        <Text style={styles.mainHead}>Payment Details</Text>
        <View style={[styles.section, styles.paymentSection]}>
          <View style={styles.leftColumn}>
            <Text style={styles.text}>Order No:</Text>
            <Text style={styles.text}>Payment Option:</Text>
            <Text style={styles.text}>Order items:</Text>
            <Text style={styles.text}>Sub total:</Text>
            <Text style={styles.text}>Delivery Charges:</Text>
           
            <Text style={[styles.text, styles.blackText]}>Total:</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.text}>{paymentDetails.orderno}</Text>
          
            <Text style={styles.text}>{paymentDetails.orderitems}</Text>
            <Text style={[styles.text, styles.blackText]}>
              {paymentDetails.Subtotal}
            </Text>
            <Text style={[styles.text, styles.blackText]}>
              {paymentDetails.delcharges}
            </Text>
            
            <Text style={[styles.text, styles.goldenText]}>
              {paymentDetails.total}
            </Text>
          </View>
        </View>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  mainHead: {
    color: "grey",
    marginBottom: 8,
    fontFamily: "DMSansR",
  },
  text: {
    marginVertical: 2,
    marginHorizontal: 2,
    color: "grey",
    fontFamily: "DMSansR",
  },
  section: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    marginBottom: 20,
  },
  paymentSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  leftColumn: {
    flex: 1,
    backgroundColor: "white",
  },
  rightColumn: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "white",
  },
  goldenText: {
    color: "#DAA520",
   fontSize:20,
   fontFamily:'DMSansB'
  },
  blackText: {
    color: "black",
    fontWeight: "500",
  },
});

export default OrderDetails;
