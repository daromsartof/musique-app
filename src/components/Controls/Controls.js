/* eslint-disable react/react-in-jsx-scope */
import {Pressable, StyleSheet, View} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {colors} from '../../services/constant';
import TextComponent from '../Text/Text';
const Controls = ({onShuffle}) => {
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) === State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLeftRight}>
        <Fontisto.Button
          name="random"
          size={28}
          backgroundColor="transparent"
          onPress={() => TrackPlayer.skipToPrevious()}
        />
        <MaterialCommunityIcons.Button
          name="skip-previous-outline"
          size={38}
          backgroundColor="transparent"
          onPress={() => TrackPlayer.skipToPrevious()}
        />
      </View>
      <View style={styles.iconPausePlay}>
        <Pressable onPress={handlePlayPress}>
          <TextComponent>
            <MaterialCommunityIcons
              name={
                playerState.state === State.Playing ? 'pause' : 'play-outline'
              }
              size={68}
              backgroundColor="transparent"
            />
          </TextComponent>
        </Pressable>
      </View>
      <View style={styles.containerLeftRight}>
        <MaterialCommunityIcons.Button
          name="skip-next-outline"
          size={38}
          backgroundColor="transparent"
          onPress={() => TrackPlayer.skipToNext()}
        />
        <MaterialCommunityIcons.Button
          name="repeat"
          size={38}
          backgroundColor="transparent"
          onPress={() => TrackPlayer.skipToNext()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconPausePlay: {
    backgroundColor: colors.ACTIVE,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  containerLeftRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
});

export default Controls;
