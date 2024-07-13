/* eslint-disable prettier/prettier */

import ImageColors from 'react-native-image-colors';


export const getColorFromImg = async( img: string) =>{

    const fallbackColor = 'grey';

    const colors= await ImageColors.getColors(img, {
        fallback: fallbackColor,
    });

    switch( colors.platform) {
        case 'android':
            return colors.dominant ?? fallbackColor;
        case 'ios':
            return  colors.background ?? fallbackColor;
        default:
            return fallbackColor;
    }
};