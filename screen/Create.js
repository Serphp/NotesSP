import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, List, IconButton } from 'react-native-paper';
import { NotaContext } from '../context/NotaContext';

const prioridades = ['Importante', 'Medio', 'Null'];

export default function NotaScreen() {
    const [note, setNote] = React.useState('');

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('');
    const [prioridad, setPrioridad] = useState('');

    const { guardarNota } = React.useContext(NotaContext);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Crear Nota</Text>
        <TextInput
          style={{ height: 40, marginBottom: 10 }}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={{ height: 40, marginBottom: 10 }}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <TextInput
          style={{ height: 40, marginBottom: 10 }}
          placeholder="Estado"
          value={estado}
          onChangeText={setEstado}
        />
        <Text>Prioridad:</Text>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            {prioridades.map((prioridadValue) => (
              <List.Item
                key={prioridadValue}
                title={prioridadValue}
                onPress={() => setPrioridad(prioridadValue)}
                style={{ flex: 1 }}
                left={(props) => (
                  <List.Icon {...props} icon={prioridadValue === prioridad ? 'radiobox-marked' : 'radiobox-blank'} />
                )}
              />
            ))}
          </View>
    <Button title="Guardar Nota" onPress={guardarNota} />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginBottom: 10,
    },
});