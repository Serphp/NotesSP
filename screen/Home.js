import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, List, FAB, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotaContext } from '../context/NotaContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const prioridades = ['Importante', 'Medio', 'Null'];

export default function App({ navigation}) {
  const { guardarNota, deleteAllNotes } = React.useContext(NotaContext);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [prioridad, setPrioridad] = useState('');

  const [notas, setNotas] = useState([]);

  const navigateToNota = () => {
    navigation.navigate('Nota');
  };

  const cargarNotas = async () => {
    try {
      const notasGuardadas = await AsyncStorage.getItem('notas');
      if (notasGuardadas !== null) {
        setNotas(JSON.parse(notasGuardadas));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarNotas();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>{item.titulo}</Text>
      <Text>{item.descripcion}</Text>
      <Text>Estado: {item.estado}</Text>
      <Text>Prioridad: {item.prioridad}</Text>
    </View>
  );

  return (
    <PaperProvider theme={theme}>
            <View style={styles.subheaderContainer}>
        <List.Subheader>Notes</List.Subheader>
          <Button mode="contained" onPress={deleteAllNotes}>
            Delete All
          </Button>
  
      </View>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Notas Guardadas</Text>
        <FlatList data={notas} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />

      </View>

      <FAB 
      style={styles.fab}
      icon="plus"
      onPress={navigateToNota}
    />

    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  subheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});