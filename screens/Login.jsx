import { StyleSheet, Text, View, TextInput, Button} from "react-native";
import {useState} from 'react'
import { useAuth } from "./context/authContext";

export default function Login() {
    const { onLogin } = useAuth()
    const [email, setEmail] = useState('')
    const [passsword, setPassword] = useState('')

    const login = () => {
        if (passsword !== '' || email !== '') {
        onLogin(email, passsword)
        }
    }
  return (
    <View style={styles.container}>
        {/*Tu bedzie logo*/}
      <Text>EcoBoost</Text>
        <TextInput placeHolder='Email'></TextInput>
        <TextInput placeHolder='Hasło'></TextInput>
        <Button onPress={login} title='Zaloguj się'></Button>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
