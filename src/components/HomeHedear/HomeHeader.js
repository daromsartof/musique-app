import React from 'react';
import {Avatar, Text} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';
import TextComponent from '../Text/Text';

function HomeHeader({image_url}) {
  return (
    <View style={styles.container}>
      <View>
        <Avatar size={40} rounded source={{uri: image_url}} />
      </View>
      <View style={styles.titleContainer}>
        <TextComponent style={styles.title}>Sarwar Jahan</TextComponent>
        <TextComponent style={styles.subTitle}>Gold Member</TextComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    fontSize: 14,
  },
});

export default HomeHeader;
