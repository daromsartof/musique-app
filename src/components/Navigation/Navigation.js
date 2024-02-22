import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../screens/Home/Home';
import Music from '../../screens/Music/Music';
import Favorite from '../../screens/Favorite/Favorite';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from '../../services/constant';
import {StyleSheet} from 'react-native';
import {
  FavoriteIconBarItem,
  HomeIconItem,
  MusicIconBarItem,
  MusicNavItem,
} from './__parcial__/NavigationParcialUI';
import HeaderFavorite from '../HomeHeader/HeaderFavorite';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Music"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: colors.ACTIVE,
        tabBarStyle: {
          backgroundColor: colors.SECONDARY,
          position: 'absolute',
          bottom: 0,
          left: 25,
          right: 25,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          minHeight: 85,
          borderWidth: 0,
          borderColor: 'transparent',
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIconStyle: {
            backgroundColor: 'red',
          },

          tabBarIcon: HomeIconItem,
        }}
      />
      <Tab.Screen
        name="Music"
        component={Music}
        options={{
          tabBarLabel: 'Musci',
          headerShown: true,
          header: MusicNavItem,
          tabBarIcon: MusicIconBarItem,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Favorite',
          headerShown: true,
          header: HeaderFavorite,
          tabBarIcon: FavoriteIconBarItem,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#fffff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
});

function Navigation() {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}

export default Navigation;
