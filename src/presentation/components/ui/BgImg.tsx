/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import { Image, ImageStyle, StyleProp } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

interface Props {
    style?: StyleProp<ImageStyle>;
}

export const BgImg = ({style}: Props) => {

    const {isDark} = useContext(ThemeContext);

    const pokeBallImg = isDark ? require('../../../assets/pokeball-light.png') : require('../../../assets/pokeball-dark.png');

  return (
    <Image
        source={pokeBallImg}
        style = {[
            {
                width: 300,
                height: 300,
                opacity: 0.3,
            },
            style,
        ]}
    />
  );
};
