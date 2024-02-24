import React from 'react';
import TextComponent from '../Text/Text';
import Icon from 'react-native-vector-icons/AntDesign';
export default function HeartIcon({active}) {
  return (
    <TextComponent>
      <Icon name="heart" size={30} color={active ? 'red' : undefined} />
    </TextComponent>
  );
}
