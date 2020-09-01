import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Food from './Screens/Food';
import Cart from './Screens/Cart';
import Profile from './Screens/Profile';
import Adress from './Screens/Adresse';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
          screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Food') {
              iconName = focused ? 'md-restaurant' : 'md-restaurant';

            } else if (route.name === 'Cart') {
              iconName = focused ? 'md-basket' : 'md-basket';
            }
            else if (route.name === 'Adresse') {
              iconName = focused ? 'md-map' : 'md-map';
            }
            else if (route.name === 'Profile') {
              iconName = focused ? 'md-contact' : 'md-contact';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={30} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#33c37d',
          inactiveTintColor: '#454545',
        }}
        >
        <Tab.Screen name="Food" component={Food} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Adresse" component={Adress} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

