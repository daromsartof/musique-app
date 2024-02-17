import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useProgress} from 'react-native-track-player';
import TextComponent from '../Text/Text';
import {colors} from '../../services/constant';

const ProgressBar = () => {
  const progress = useProgress();
  function format(seconds) {
    let mins = parseInt(seconds / 60, 10)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerBar}>
        <View
          style={{
            ...styles.progressBar,
            width: `${(progress.position / progress.duration) * 100}%`,
          }}
        />
      </View>
      <View style={styles.progressContainer}>
        <TextComponent>{format(progress.position)}</TextComponent>
        <TextComponent>{format(progress.duration)}</TextComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  progressContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  containerBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#ddd',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.ACTIVE,
  },
});

export default ProgressBar;
