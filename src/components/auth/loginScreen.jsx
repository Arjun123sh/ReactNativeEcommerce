import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

export function LoginScreen(){
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if(email==='' || password===''){
        Snackbar.show({
            text: 'All Fields Are Required',
            duration:Snackbar.LENGTH_SHORT,
        })
    }
    console.log("Email is ",email);
    console.log("Password is ",password);
  };

  return(
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome To UrbanGrove</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>Don't have an account? Sign up here!</Text>
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
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signupText: {
    marginTop: 18,
    color: 'black',
    opacity:0.8,
    fontSize:20,
    fontWeight:'700',
  },
});

