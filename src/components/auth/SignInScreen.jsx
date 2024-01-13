import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Snackbar from 'react-native-snackbar';

export function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName]=useState('');
    const [phoneNumber,setPhoneNumber]=useState('');

    const handleSignIn = () => {
        if(!name || !password || !email || !phoneNumber){
            Snackbar.show({
                title: "Please fill all fields",
                duration: Snackbar.LENGTH_SHORT,
                textColor:"orange"
            })
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>SignUp</Text>
            <TextInput
                placeholder='Name'
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardAppearance='dark'
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                keyboardAppearance='dark'
                style={styles.input}
            />

            <TextInput
                placeholder='Phone-Number'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType='numeric'
                keyboardAppearance='dark'
                style={styles.input}
            />

            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      headerText: {
        color:"black",
        fontSize: 24,
        fontWeight: '900',
        marginBottom: 20,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 3,
        borderRadius:10,
        marginBottom: 15,
        marginTop:4,
        paddingHorizontal: 10,
        width: '100%',
      },
      button: {
        backgroundColor: 'black',
        padding: 10,
        fontSize:19,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontFamily:'Cochin',
        fontSize: 16,
      },
      signupText: {
        marginTop: 20,
        color: 'black',
        opacity:0.8,
    },
});

