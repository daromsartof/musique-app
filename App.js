import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/components/Navigation/Navigation';
import {QUERY, colors} from './src/services/constant';
import {addTracks, setupPlayer} from './src/services/trackPlayerServices';
import TrackPlayer from 'react-native-track-player';
import {ActivityIndicator, NativeModules, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
const {MusicModul} = NativeModules;
import {openDatabase} from 'react-native-sqlite-storage';

function App() {
  var db = openDatabase(
    {
      name: 'dataBase',
      location: 'default',
    },
    () => {
      console.log('here');
    },
    err => {
      console.log(err);
    },
  );

  // console.log(db);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const setup = async tracks => {
    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();
    if (isSetup && queue.length <= 0) {
      await addTracks(tracks);
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
    db.transaction(
      function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
        tx.executeSql('INSERT INTO DemoTable VALUES (?1,?2)', ['Alice', 101]);
        tx.executeSql('INSERT INTO DemoTable VALUES (?1,?2)', ['Betty', 202]);
        tx.executeSql(
          'SELECT count(*) AS mycount FROM DemoTable',
          [],
          function (tx, rs) {
            console.log(
              'Record count (expected to be 2): ' + rs.rows.item(0).mycount,
            );
          },
          function (tx, error) {
            console.log('SELECT error: ' + error.message);
          },
        );
      },
      function (error) {
        console.log('Transaction ERROR: ' + error.message);
      },
      function () {
        console.log('Populated database OK');
      },
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
