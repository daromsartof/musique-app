import React from 'react';
import {TextProps} from '@rneui/base/dist/Text/Text';
import {Text} from '@rneui/themed';
import {StyleSheet} from 'react-native';
/**
 *
 * @param { React.FunctionComponent<React.PropsWithChildren<TextProps>> |
 * React.ForwardRefExoticComponent<React.RefAttributes<React.PropsWithChildren<TextProps>>>} props
 * @returns
 */
function TextComponent(props) {
  return <Text style={[styles.content, props.style]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  content: {
    color: '#F2F2F2',
    fontFamily: 'Nunito',
  },
});

export default TextComponent;
