import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Colors from 'ClarinVideos/src/res/colors';
import VideoItem from './VideoItem';

import {useSelector, useDispatch} from 'react-redux';
import {fetchVideos} from 'ClarinVideos/src/libs/redux/actions/videos';

const isPortrait = () => {
  const dim = Dimensions.get('window');
  return dim.height >= dim.width;
};

const VideosScreen = (props) => {
  const videosStore = useSelector((state) => state.videos);

  const dispatch = useDispatch();

  const [orientation, setOrientation] = useState(
    isPortrait() ? 'portrait' : 'landscape',
  );

  Dimensions.addEventListener('change', () => {
    setOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  useEffect(() => {
    dispatch(fetchVideos({offset: 0, reset: false, category: null}));
  }, []);

  const handlePress = (video) => {
    props.navigation.navigate('PlayerScreen', {video});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videosStore.videos}
        refreshing={false}
        onRefresh={() => {
          dispatch(
            fetchVideos({
              offset: 0,
              reset: true,
              category: videosStore.category,
            }),
          );
        }}
        onEndReached={() => {
          if (videosStore.moreItems) {
            dispatch(
              fetchVideos({
                offset: videosStore.offset,
                reset: false,
                category: videosStore.category,
              }),
            );
          }
        }}
        onEndReachedThreshold={0.5}
        horizontal={orientation === 'landscape'}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <VideoItem item={item} onPress={() => handlePress(item)} />
        )}
      />

      {videosStore.loading && (
        <ActivityIndicator style={styles.loader} color="#fff" size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
    justifyContent: 'center',
  },
  loader: {
    position: 'absolute',
    marginTop: 140,
    alignSelf: 'center',
  },
});

export default VideosScreen;
