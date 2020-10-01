import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from 'ClarinVideos/src/res/colors';

import FavoriteScreen from './FavoriteScreen';
import PlayerScreen from 'ClarinVideos/src/components/player/PlayerScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Favoritos" component={FavoriteScreen} />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
