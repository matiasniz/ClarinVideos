import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from 'ClarinVideos/src/res/colors';
import PlayerScreen from 'ClarinVideos/src/components/player/PlayerScreen';
import VideosScreen from './VideosScreen';
import Appbar from 'ClarinVideos/src/components/appbar/Appbar';

const Stack = createStackNavigator();

const VideosStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen
        name="Videos"
        component={VideosScreen}
        options={{headerTitle: (props) => <Appbar {...props} />}}
      />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
    </Stack.Navigator>
  );
};

export default VideosStack;
