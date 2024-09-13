import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';

interface AboutScreenProps {}

const AboutScreen: FunctionComponent<AboutScreenProps> = () => {
  return (
    <View>
      <Text>About screen</Text>
    </View>
  );
};

export default AboutScreen;
