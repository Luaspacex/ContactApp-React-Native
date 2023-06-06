import React, {useState} from "react";
import {
    StyleSheet,
    View,
    TextInput,

  } from 'react-native';  
import { Button } from "react-native-elements";


export default function ListHeader({addItem}) {
    const [isOpen, setIsOpen] = useState(false);
    const [first, setFirst] = useState();
    const [last, setLast] = useState();
    const [picture, setPicture] = useState();
    const [phone, setPhone] = useState();


return(
<View style={styles.addContainer}> 
 <TextInput placeholder="First name" style={styles.inputs} onChangeText={setFirst}></TextInput>
 <TextInput placeholder="Last Name" style={styles.inputs} onChangeText={setLast}></TextInput>
 <TextInput placeholder="Photo" style={styles.inputs} onChangeText={setPicture}></TextInput>
 <TextInput placeholder="Contacts" style={styles.inputs} onChangeText={setPhone}></TextInput>
 <Button title="Add" onPress={() => addItem(first, last, picture, phone)}  style={styles.buttonAdd} />
 </View>
)
}


const styles = StyleSheet.create({
    addContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center'
    },
    inputs: {
        backgroundColor: "white",
        borderColor: "black",
        padding:12,
        marginVertical: 4,
        borderRadius: 20,
        width: 350,
    },
    buttonAdd: {
        marginVertical: 3,
        fontWeight: 600,
        borderRadius: 50,
        width: 150,
        alignSelf: "center",
        color: "white",
    }
  });
  
  