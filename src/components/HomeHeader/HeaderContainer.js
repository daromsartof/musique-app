import {Header} from '@rneui/themed';
import React from 'react';
import {colors} from '../../services/constant';

const HeaderContainer = props => {
  return (
    <Header
      statusBarProps={{
        backgroundColor: colors.PRIMARY,
      }}
      {...props}>
      {props.children}
    </Header>
  );
};
export default HeaderContainer;
