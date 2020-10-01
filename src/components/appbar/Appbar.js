import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CategoryMenu from './CategoryMenu';

import {useSelector} from 'react-redux';

const AppBar = () => {
  const videosStore = useSelector((state) => state.videos);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {videosStore.category
          ? videosStore.listasPrincipales.find(
              (l) => l._id === videosStore.category,
            ).name
          : 'Videos'}
      </Text>
      <CategoryMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AppBar;
