/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Card, Image, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  usePlaybackState,
  State,
  useProgress,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../../components/HomeHeader/HeaderMusic';
import TextComponent from '../../components/UI/Text/Text';
import ProgressBar from '../../components/Progress/ProgressBar';
import Controls from '../../components/Controls/Controls';

const PlaylistItem = ({ index, title, isCurrent }) => {

  const handleItemPress = () => {
    TrackPlayer.skip(index);
  };

  return (
    <TouchableOpacity onPress={handleItemPress}>
      <Text
        style={{
          ...styles.playlistItem,
          ...{ backgroundColor: isCurrent ? '#666' : 'transparent' },
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};


const Playlist = () => {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  const loadPlaylist = async () => {
    setQueue(await TrackPlayer.getQueue());
  };



  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.state === State.nextTrack) {
      let index = await TrackPlayer.getCurrentTrack();
      setCurrentTrack(index);
    }
  });


  return (
    <View>
      <View style={styles.playlist}>
        <FlatList
          data={queue}
          renderItem={({ item, index }) => <PlaylistItem
            index={index}
            title={item.title}
            isCurrent={currentTrack === index} />
          }
        />
      </View>
    </View>
  );
};

function Music() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state === State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    setInfo(await TrackPlayer.getTrack(track));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card
          containerStyle={styles.cardContainer}
        >
          <Image
            source={{ uri: 'https://picsum.photos/200/400' }}
            style={{ width: '100%', height: 359, objectFit: 'cover' }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </Card>
      </View>
      <Card
          containerStyle={[styles.titleContainer]}
      >
        <TextComponent style={styles.author}>{info.artist}</TextComponent>
        <TextComponent style={styles.subTitle}>{info.title}</TextComponent>
      </Card>
      <View>
        <ProgressBar />
        <Controls />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#112',
  },
  cardContainer: {
    padding: 0,
    borderRadius: 30,
    borderColor: 'transparent',
    overflow: 'hidden',
    backgroundColor: '#112',
  },
  titleContainer:{
    padding: 0,
    borderColor: 'transparent',
    overflow: 'hidden',
    backgroundColor: '#112',
  },
  author: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
    maxHeight: 70
  },
  subTitle: {
    fontSize: 18,
    color: '#8E8E8E',
    textAlign: 'center',
    marginVertical: 10,
    maxHeight: 80
  },
});

export default Music;
