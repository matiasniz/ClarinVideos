import React from 'react';
import {useSelector} from 'react-redux';

import {View, StyleSheet, FlatList} from 'react-native';

import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from 'ClarinVideos/src/res/colors';

import VideoItem from 'ClarinVideos/src/components/videos/VideoItem';

const FavoriteScreen = (props) => {
  const favorites = useSelector((state) => state.favorites);

  const handlePress = (video) => {
    props.navigation.navigate('PlayerScreen', {video});
  };

  return (
    <View style={styles.container}>
      {favorites.length == 0 ? (
        <FavoritesEmptyState />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <VideoItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default FavoriteScreen;
