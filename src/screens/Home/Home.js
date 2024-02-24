/* eslint-disable react-native/no-inline-styles */
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from '../../services/constant';
import HomeHeader from '../../components/HomeHeader/HeaderHome';
import TextComponent from '../../components/UI/Text/Text';
import {Input, Text} from '@rneui/themed';
import * as RNFS from 'react-native-fs';

function Home() {
  const [folders, setFolders] = useState([]);
  const getListDirectory = () => {
    console.log(RNFS.ExternalStorageDirectoryPath);
    RNFS.readDir(RNFS.ExternalStorageDirectoryPath).then(res => {
      setFolders(res.filter(item => item.isDirectory()));
    });
  };

  useEffect(() => {
    getListDirectory();

    return () => {};
  }, []);

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
      <View>
        {folders.map((folder, i) => (
          <Text key={i}>{folder.name}</Text>
        ))}
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
