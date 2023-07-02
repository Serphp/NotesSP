import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crea el contexto de las notas
export const NotaContext = createContext();
const Prioridades = ['Importante', 'Medio', 'Null'];

// Proveedor del contexto de las notas
export function NotaProvider({ children }) {

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [prioridad, setPrioridad] = useState('');

  const [notas, setNotas] = useState([]);
  const [notes, setNotes] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  const guardarNota = async () => {
    const nuevaNota = {
      titulo,
      descripcion,
      estado,
      prioridad,
    };

    try {
      const nuevasNotas = [...notas, nuevaNota];
      await AsyncStorage.setItem('notas', JSON.stringify(nuevasNotas));
      setNotas(nuevasNotas);
      setTitulo('');
      setDescripcion('');
      setEstado('');
      setPrioridad('');
    } catch (error) {
      console.log(error);
    }
    console.log('hola');
  };
  
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const deleteNote = (index) => {
    const delNote = ([...notes].filter((_, i) => i !== index));
    setNotas(delNote);
  };

  const deleteAllNotes = () => {
    setNotas([]);
  };

  const value = {
    notas,
    setNotas,
    guardarNota,
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    estado,
    setEstado,
    prioridad,
    setPrioridad,
    notes,
    deleteNote,
    deleteAllNotes,
    visible,
    onToggleSnackBar,
  };

  return (
    <NotaContext.Provider value={{ value }}>
      {children}
    </NotaContext.Provider>
  );
}
