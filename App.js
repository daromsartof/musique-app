import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/components/Navigation/Navigation';
import {colors} from './src/services/constant';
import PlayerServices from './src/services/PlayerServices';
import TrackPlayer from 'react-native-track-player';
import {ActivityIndicator, NativeModules, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import db from './src/services/EntityManager';
const {MusicModul} = NativeModules;
function App() {
  // console.log(db);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const setup = async tracks => {
    let isSetup = await PlayerServices.setupPlayer();

    const queue = await TrackPlayer.getQueue();
    if (isSetup && queue.length <= 0) {
      await PlayerServices.addTracks(tracks);
    }

    setIsPlayerReady(isSetup);
  };

  const getAllMusciFileInDirectory = path => {
    MusicModul.getAll(
      {
        cover: false,
        coverResizeRatio: 1.0,
        icon: true,
        iconSize: 40,
        coverSize: 60,
      },
      res => {
        setup(
          res.map(music => ({
            id: music.id,
            url: `file://${music.path}`,
            title: music.title,
            artist: music.fileName,
            fileName: music.fileName,
            duration: music.duration,
          })),
        );
        //  setMusics(res);
      },
      err => {
        console.error(err);
      },
    );
  };

  const createTable = async () => {
    db.createTable(
      'favorite',
      [
        {
          name: 'music_id',
          type: 'INTEGER',
        },
        {
          name: 'created_at',
          type: 'TEXT',
        },
      ],
      console.log,
      console.log,
    );
  };

  useEffect(() => {
    getAllMusciFileInDirectory();
    createTable();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider style={{backgroundColor: colors.PRIMARY}}>
      <Navigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#112',
  },
});

export default App;
