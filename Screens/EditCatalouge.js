import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FontLoader from '../FontLoader';

const EditCatalouge = ({route}) => {
  const [Item, setItem] = useState('');
  const [mrp, setMRP] = useState('');
  const [sp, setSP] = useState('');
  const [itemweight, setWeight] = useState('');
  const [barcode, setBarcode] = useState('');

  const { id, title,price,discountPrice,image,weight } = route.params;

  const handleSubmit = () => {
    // Implement your submission logic here
  };

  const IMG_URI = image;

  return (
    <FontLoader>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.ovalImageContainer}>
            <Image source={{ uri: IMG_URI }} style={styles.ovalImage} />
          </View>
          
        </View>

        <Text style={styles.label}>Item</Text>
        <TextInput
          value={title}
          onChangeText={(text) => setItem(text)}
          style={styles.input}
          placeholder='Enter your Item...'
        />

        <View style={styles.rowContainer}>
          <View style={styles.numericInputContainer}>
            <Text style={styles.label}>MRP</Text>
            <View style={{height:45,width:"90%",backgroundColor:"white",borderRadius:10,borderWidth:0.5,flexDirection:"row",alignItems:"center",alignContent:"center",marginLeft:10}}>
            <Text style={{color:"black",fontSize:20,justifyContent:"center",fontWeight:"800",marginLeft:10}}>₹</Text>
            <TextInput placeholder='Enter MRP' style={{marginLeft:10,borderBottomWidth:0.2,borderColor:"grey"}}></TextInput>
          </View>
          </View>

          <View style={styles.numericInputContainer}>
            <Text style={styles.label}>SP</Text>
            <View style={{height:45,width:"90%",backgroundColor:"white",borderRadius:10,borderWidth:0.8,flexDirection:"row",alignItems:"center",alignContent:"center"}}>
            <Text style={{color:"black",fontSize:20,justifyContent:"center",fontWeight:"800",marginLeft:10}}>₹</Text>
            <TextInput placeholder='Enter SP' style={{marginLeft:10,borderBottomWidth:0.2,borderColor:"grey"}}></TextInput>
          </View>
          </View>
        </View>

        <Text style={styles.label}>Weight</Text>
        <TextInput
          value={weight}
          onChangeText={(text) => setWeight(text)}
          style={styles.input}
          placeholder='Enter Weight of Item...'
        />

        <Text style={styles.label}>Barcode</Text>
        <TextInput
          value={id}
          onChangeText={(text) => setBarcode(text)}
          style={styles.input}
          placeholder='Enter Barcode of Item...'
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:"#f2f2f2"
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  ovalImageContainer: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: 100,
    marginBottom: 10,
  },
  ovalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 25,
    width: '100%',
    borderRadius: 10,
    marginLeft: 5, color: 'rgb(132 132 132)', width: '100%' ,fontFamily:"DMSansSB",backgroundColor:'white',
    paddingLeft:25
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  numericInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontFamily: 'DMSansSB',
    fontSize: 15,
    marginBottom: 5,
    
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal:30,
    
    borderRadius: 15,
    marginTop: 20,
    alignSelf:"center"
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'DMSansSB',
    fontSize: 15,
    textAlign:"center"
  },
});

export default EditCatalouge;
