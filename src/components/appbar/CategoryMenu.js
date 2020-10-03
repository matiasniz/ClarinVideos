import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  FlatList,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {fetchVideos} from 'ClarinVideos/src/libs/redux/actions/videos';

import CategoryItem from './CategoryItem';

const ModalCategory = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const videosStore = useSelector((state) => state.videos);
  const dispatch = useDispatch();

  return (
    <View style={styles.buttonView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={videosStore.listasPrincipales}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({item}) => (
                <CategoryItem
                  onPress={() => {
                    dispatch(
                      fetchVideos({offset: 0, reset: true, category: item._id}),
                    );
                    setModalVisible(false);
                  }}
                  item={item}
                />
              )}
            />

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2d6d4d'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Categorias</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 320,
  },
  openButton: {
    backgroundColor: '#1d6d4d',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  textNameCategory: {
    color: 'black',
  },
});

export default ModalCategory;
