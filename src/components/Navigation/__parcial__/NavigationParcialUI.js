import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderComponent from '../../HomeHeader/HeaderMusic';

const HomeIconItem = ({color, size}) => (
  <Ionicons name="home-outline" color={color} size={40} />
);

const MusicNavItem = props => <HeaderComponent {...props} />;
const MusicIconBarItem = ({color, size}) => (
  <MaterialCommunityIcons name="music" color={color} size={40} />
);

const FavoriteIconBarItem = ({color, size}) => (
  <MaterialCommunityIcons name="cards-heart-outline" color={color} size={40} />
);

export {HomeIconItem, MusicNavItem, MusicIconBarItem, FavoriteIconBarItem};
