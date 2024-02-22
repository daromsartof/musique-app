import React from 'react';
import TextComponent from '../Text/Text';
import {colors} from '../../services/constant';
import {Pressable, StyleSheet} from 'react-native';
import HeaderContainer from './HeaderContainer';
import {Arrowleft} from './__parcial__/HeaderUI';

const HeaderFavorite = ({navigation}) => {
  return (
    <HeaderContainer
      containerStyle={styles.container}
      statusBarProps={{
        backgroundColor: colors.PRIMARY,
      }}
      leftContainerStyle={styles.leftContainerStyle}
      rightContainerStyle={styles.leftContainerStyle}>
      <Pressable onPress={navigation?.goBack}>
        <TextComponent>{Arrowleft}</TextComponent>
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
});
export default HeaderFavorite;
