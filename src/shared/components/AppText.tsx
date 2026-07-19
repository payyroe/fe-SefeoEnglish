import React from 'react';
import { Text, TextProps } from 'react-native';

type AppTextProps = TextProps & {
  weight?: 'regular' | 'bold';
};

export default function AppText({ style, weight = 'regular', ...props }: AppTextProps) {
  const fontFamily = weight === 'bold' ? 'Poppins_700Bold' : 'Poppins_400Regular';
  return <Text style={[{ fontFamily }, style]} {...props} />;
}