import {Avatar, Card, Image, ListItem, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import TextComponent from '../../components/UI/Text/Text';
import {Heart} from '../../components/HomeHeader/__parcial__/HeaderUI';
import EntityManager from '../../services/EntityManager';
import FAVORITE from '../../models/favorite.model';
function Favorite({route}) {
  const [musicFavorites, setMusicFavorites] = useState([]);

  const getAllMusicFavorite = async () => {
    try {
      const res = await EntityManager.select(FAVORITE.tableName);
      setMusicFavorites(res);
    } catch (error) {
      setMusicFavorites([]);
    }
  };

  useEffect(() => {
    console.log('here');
    getAllMusicFavorite();

    return () => {
      setMusicFavorites([]);
    };
  }, [route.key]);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextComponent style={styles.favoriteTitle}>
          Favourite Album
        </TextComponent>
        <ScrollView horizontal={true} style={styles.favoriteAlContainer}>
          <Pressable style={styles.itemFavoriteContainer}>
            <Image
              containerStyle={styles.itemFavorite}
              source={{uri: 'https://picsum.photos/200/400'}}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Pressable>
          <Pressable style={styles.itemFavoriteContainer}>
            <Image
              containerStyle={styles.itemFavorite}
              source={{uri: 'https://picsum.photos/200/400'}}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Pressable>
          <Pressable style={styles.itemFavoriteContainer}>
            <Image
              containerStyle={styles.itemFavorite}
              source={{uri: 'https://picsum.photos/200/400'}}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Pressable>
          <Pressable style={styles.itemFavoriteContainer}>
            <Image
              containerStyle={styles.itemFavorite}
              source={{uri: 'https://picsum.photos/200/400'}}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Pressable>
        </ScrollView>
        <TextComponent style={[styles.favoriteTitle, styles.favoriteMusci]}>
          Favourite Album
        </TextComponent>
        <View>
          <FlatList
            data={musicFavorites}
            style={{height: 500}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <ListItem
                key={index}
                bottomDivider
                style={styles.listItem}
                containerStyle={styles.listItemContainer}>
                <Avatar source={{uri: 'https://picsum.photos/200/600'}} />
                <ListItem.Content>
                  <ListItem.Title>
                    <TextComponent>{item.artist}</TextComponent>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <TextComponent>{item.title}</TextComponent>
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Pressable>
                  <TextComponent style={styles.favoriteIcon}>
                    {Heart}
                  </TextComponent>
                </Pressable>
              </ListItem>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#112',
  },
  image: {width: 150, height: 150, objectFit: 'cover'},
  favoriteAlContainer: {
    //  backgroundColor: 'red',
  },
  itemFavoriteContainer: {
    margin: 10,
    marginLeft: 0,
  },
  itemFavorite: {
    borderRadius: 30,
  },
  favoriteTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  favoriteMusci: {
    marginTop: 50,
  },
  listItemContainer: {
    backgroundColor: 'transparent',
  },
  favoriteIcon: {
    color: 'red',
  },
});

export default Favorite;
