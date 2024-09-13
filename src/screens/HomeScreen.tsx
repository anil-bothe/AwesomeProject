import React, {FunctionComponent} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Todo} from '../services/types';
import TodoServiceAPI from '../services/todo';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen: FunctionComponent = (props: any) => {
  const [notes, setNotes] = React.useState<Todo[]>([]);
  const api = TodoServiceAPI();

  const fetchData = () => {
    api
      .TodoList()
      .then(data => setNotes(data))
      .catch(e => console.log(e));
  };

  const isFocused = useIsFocused();

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onDeleteTodo = (id: number) => {
    Alert.alert('Are you sure?', 'This action cannot be undone.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          api
            .DeleteTodo(id)
            .then(() => {
              fetchData();
            })
            .catch(e => console.log(e));
        },
      },
    ]);
  };

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Notes</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AddTodo')}>
            <Text style={styles.addBtn}>+</Text>
          </TouchableOpacity>
        </View>
        {notes.map((note, index) => (
          <View style={styles.item} key={index}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('UpdateTodo', {note: note})
              }>
              <Text style={styles.title}>{note.title}</Text>
              <Text style={styles.subHeadingText}>{note.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDeleteTodo(note.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 20,
  },
  deleteText: {
    color: '#ff5959',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: '#ff5959',
    fontSize: 12,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeadingText: {
    color: 'white',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#272727',
    width: '90%',
  },
  headingText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  headingView: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  main: {
    flex: 1,
    backgroundColor: '#000000',
  },

  container: {
    gap: 15,
    alignItems: 'center',
    paddingBottom: 50,
  },
});

export default HomeScreen;
