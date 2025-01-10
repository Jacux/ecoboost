import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{

        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            //  display: 'none',
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',

        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
        <Tabs.Screen
            name="login"
            options={{
                title: 'login',
            }}
        />

        <Tabs.Screen
            name="register"
            options={{
                title: 'register',
            }}
        />

    </Tabs>
  );
}
