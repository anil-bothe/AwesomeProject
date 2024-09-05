import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Todo} from './services/types';
import TodoServiceAPI from './services/todo';

function App(): React.JSX.Element {
  const [notes, setNotes] = React.useState<Todo[]>([]);

  function onItemClick() {
    console.log('item clicked');
  }

  React.useEffect(() => {
    const api = TodoServiceAPI();
    api
      .TodoList()
      .then(data => setNotes(data))
      .catch(e => console.log(e));
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Notes app</Text>
          <Text>Simple secure</Text>
        </View>

        {notes.map((note, index) => (
          <View
            style={styles.item}
            key={index}>
            <TouchableOpacity onPress={() => onItemClick()}>
              <Text style={styles.title}>{note.title}</Text>
              <Text style={styles.subHeadingText}>{note.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  deleteText: {
    color: 'yellow',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: 'yellow',
    fontWeight: 'bold',
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
    backgroundColor: '#707070',
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
  container: {
    gap: 15,
    alignItems: 'center',
  },
});

export default App;
