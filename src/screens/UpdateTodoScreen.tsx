import {useRoute} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import TodoServiceAPI from '../services/todo';

interface UpdateTodoProps {}

const UpdateTodo: FunctionComponent<UpdateTodoProps> = (props: any) => {
  const route = useRoute<any>();
  const note = route.params.note;
  const api = TodoServiceAPI();

  const [title, setTitle] = React.useState<string>(note.title);
  const [description, setDescription] = React.useState<string>(
    note.description,
  );

  const onUpdate = () => {
    const body = {
      id: note.id,
      title: title,
      description: description,
    };

    api
      .UpdateTodo(body)
      .then(res => {
        console.log(res);
        ToastAndroid.show('Updated successfully!', ToastAndroid.SHORT);
        props.navigation.goBack();
      })
      .catch(() =>
        ToastAndroid.show(
          'Something went wrong! Try again.',
          ToastAndroid.SHORT,
        ),
      );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.headingText}>ID: {note.id}</Text> */}
      <TextInput
        onChangeText={text => setTitle(text)}
        defaultValue={title}
        style={styles.whiteText}
      />
      <TextInput
        onChangeText={text => setDescription(text)}
        defaultValue={description}
        multiline
        numberOfLines={25}
        textAlignVertical="top"
        style={styles.input}
      />
      <TouchableOpacity style={styles.btn} onPress={onUpdate}>
        <Text style={styles.whiteText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: 'white',
  },
  btn: {
    backgroundColor: '#1398c0',
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  container: {
    backgroundColor: '#000000',
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    // justifyContent: 'center',
  },
  headingText: {color: 'white', fontSize: 25, fontWeight: 'bold'},
  whiteText: {color: 'white'},
});

export default UpdateTodo;
