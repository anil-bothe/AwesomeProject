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

interface AddTodoScreenProps {}

const AddTodoScreen: FunctionComponent<AddTodoScreenProps> = (props: any) => {
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const api = TodoServiceAPI();

  const onSave = () => {
    const body = {
      id: 0,
      title: title,
      description: description,
    };

    api
      .AddTodo(body)
      .then(() => {
        ToastAndroid.show('Saved successfully!', ToastAndroid.SHORT);
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
      <TextInput
        onChangeText={text => setTitle(text)}
        defaultValue={title}
        style={styles.whiteText}
        placeholder="Enter Title"
      />
      <TextInput
        placeholder="Enter Description"
        onChangeText={text => setDescription(text)}
        defaultValue={description}
        multiline
        numberOfLines={25}
        textAlignVertical="top"
        style={styles.input}
      />
      <TouchableOpacity style={styles.btn} onPress={onSave}>
        <Text style={styles.whiteText}>Save</Text>
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

export default AddTodoScreen;
