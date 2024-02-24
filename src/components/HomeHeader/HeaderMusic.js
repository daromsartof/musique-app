import React, {useEffect, useState} from 'react';
import TextComponent from '../UI/Text/Text';
import {colors} from '../../services/constant';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import HeaderContainer from './HeaderContainer';
import EntityManager from '../../services/EntityManager';
import FAVORITE from '../../models/favorite.model';
import HeartIcon from '../UI/HeartIcon/HeartIcon';
const arrowleft = <Icon name="arrowleft" size={30} />;

const HeaderComponent = ({navigation}) => {
  const [info, setInfo] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state === State.nextTrack) {
      setTrackInfo();
    }
  });

  const setTrackInfo = async () => {
    const track = await TrackPlayer.getCurrentTrack();
    const musicInfo = await TrackPlayer.getTrack(track);
    checkIsFavorite(musicInfo.id);
    setInfo(musicInfo);
  };

  const checkIsFavorite = async id => {
    try {
      const res = await EntityManager.select(FAVORITE.tableName, undefined, {
        music_id: id,
      });
      setIsFavorite(res.length > 0);
    } catch (error) {
      setIsFavorite(false);
    }
  };

  const handlePressFavorite = async () => {
    try {
      if (isFavorite) {
      } else {
        const res = await EntityManager.insertValue(FAVORITE.tableName, {
          artist: info.artist,
          path: info.url,
          music_id: info.id,
          title: info.title,
          duration: info.duration,
          fileName: info.fileName,
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
      setIsFavorite(false);
    }
  };

  return (
    <HeaderContainer
      containerStyle={styles.container}
      statusBarProps={{
        backgroundColor: colors.PRIMARY,
      }}
      leftContainerStyle={styles.leftContainerStyle}
      rightContainerStyle={styles.leftContainerStyle}>
      <Pressable onPress={navigation?.goBack}>
        <TextComponent>{arrowleft}</TextComponent>
      </Pressable>
      <TextComponent style={styles.title}>{info.title}</TextComponent>
      <Pressable onPress={handlePressFavorite}>
        <HeartIcon active={isFavorite} />
      </Pressable>
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
  leftContainerStyle: {
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.PRIMARY,
    flexDirection: 'row',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Segeo UI',
  },
});
export default HeaderComponent;
