import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import VideosStack from 'ClarinVideos/src/components/videos/VideosStack';
import FavoritesStack from 'ClarinVideos/src/components/favorites/FavoritesStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Colors from 'ClarinVideos/src/res/colors';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Store from './src/libs/redux/store';

const store = Store();

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <NavigationContainer>
          <Tabs.Navigator
            tabBarOptions={{
              tintColor: '#fefefe',
              activeTintColor: '#fff',
              style: {
                backgroundColor: Colors.blackPearl,
              },
            }}>
            <Tabs.Screen
              name="Home"
              component={VideosStack}
              options={{
                tabBarIcon: ({size, color}) => (
                  <Image
                    style={{tintColor: color, width: size, height: size}}
                    source={require('ClarinVideos/src/assets/videos.png')}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="Favoritos"
              component={FavoritesStack}
              options={{
                tabBarIcon: ({size, color}) => (
                  <Image
                    style={{tintColor: color, width: size, height: size}}
                    source={require('ClarinVideos/src/assets/star.png')}
                  />
                ),
              }}
            />
          </Tabs.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
