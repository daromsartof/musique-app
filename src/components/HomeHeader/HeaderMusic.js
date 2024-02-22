import React, {useEffect, useState} from 'react';
import TextComponent from '../Text/Text';
import {colors} from '../../services/constant';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import HeaderContainer from './HeaderContainer';
const arrowleft = <Icon name="arrowleft" size={30} />;
const heart = <Icon name="heart" size={30} />;
const HeaderComponent = ({navigation}) => {
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
      <Pressable onPress={navigation?.goBack}>
        <TextComponent>{heart}</TextComponent>
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
