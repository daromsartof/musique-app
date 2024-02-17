import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../../screens/Home/Home';
import Music from '../../screens/Music/Music';
import Favorite from '../../screens/Favorite/Favorite';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from '../../services/constant';
import {StyleSheet} from 'react-native';
import HeaderComponent from '../HomeHeader/HeaderMusic';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Music"
        component={Music}
        options={{
          tabBarLabel: 'Musci',
          headerShown: true,
          header: props => <HeaderComponent {...props} />,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="music" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Favorite',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="cards-heart-outline"
              color={color}
              size={40}
            />
          ),
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
