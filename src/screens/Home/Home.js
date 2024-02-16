/* eslint-disable react-native/no-inline-styles */
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from '../../services/constant';
import HomeHeader from '../../components/HomeHedear/HomeHeader';
import TextComponent from '../../components/Text/Text';
import {Input} from '@rneui/themed';

function Home() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.PRIMARY,
        padding: 25,
      }}>
      <View>
        <HomeHeader image_url={'https://picsum.photos/200/300'} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 50,
          }}>
          <TextComponent style={style.textSearch}>
            Listen The Latest Musics
          </TextComponent>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 0.5,
            }}>
            <Ionicons name="search" color={'#fff'} size={40} />
            <Input />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  textSearch: {
    fontSize: 26,
    fontWeight: '600',
    flex: 0.5,
  },
});
export default Home;
