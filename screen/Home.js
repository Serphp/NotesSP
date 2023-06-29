import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, List } from 'react-native-paper';

export default function App() {
  const [note, setNote] = React.useState('');
  const [notes, setNotes] = React.useState([]);

  const addNote = () => {
    if (note) {
      setNotes([...notes, note]);
      setNote('');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Note"
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      <Button mode="contained" style={styles.btn} onPress={addNote}>
        Add Note
      </Button>
      <List.Section>
        <List.Subheader>Notes</List.Subheader>
        {notes.map((item, index) => (
          <List.Item
            key={index}
            title={item}
            right={() => (
              <List.Icon
                icon="delete"
                onPress={() => deleteNote(index)}
              />
            )}
          />
        ))}
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  btn: {
    marginTop: 10,
  }
});
