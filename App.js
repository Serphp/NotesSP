import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, List, Provider as PaperProvider } from 'react-native-paper';
import Home from './screen/Home';
import About from './screen/About';
import Nota from './screen/Nota';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { BlurView } from 'expo-blur';
//import { Router, Route , hashHistory } from 'react-router';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{
            //headerTransparent: true,
            headerTitle: 'SPnotas',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              color: 'white',
            },
            headerStyle: {
              backgroundColor: 'tomato',
              height: 60,
            },
            headerRight: (props) => (
              <List.Icon
                icon={'plus'}
                style={{ marginRight: 20, color: 'white'}}
                {...props}
                onPress={() => {
                  // Do something
                }}
              />
            ),
            headerLeft: (props) => (
            <List.Icon
              icon={'menu'}
              style={{ marginLeft: 20, color: 'white'}}
              {...props}
              onPress={() => {
                // Do something
              }}
            />
    ),
  }}/>
          <Stack.Screen name="About" component={About} />
          {/* <Stack.Screen name="Nota" component={Nota} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
