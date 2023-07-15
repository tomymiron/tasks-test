import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { saveTask, getTask, updateTask } from "../api";

const TaskFormScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [editing, setEditing] = useState(false);

  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  const handleSubmit = async () => {
    try {
      if (!editing) {
        await saveTask(task);
      } else {
        await updateTask(route.params.id, task);
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (route.params && route.params.id) {
      navigation.setOptions({ headerTitle: "Task Update" });
      setEditing(true);
      (async () => {
        const res = await getTask(route.params.id);
        setTask({ title: res.title, description: res.description });
      })();
    }
  }, []);

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholderTextColor={"#8f8f8f"}
        placeholder="Write a title"
        onChangeText={(text) => handleChange("title", text)}
        value={task.title}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={"#8f8f8f"}
        placeholder="Write a description"
        onChangeText={(text) => handleChange("description", text)}
        value={task.description}
      />
      {!editing ? (
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Task</Text>
        </TouchableOpacity> ) : (
        <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Task</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    backgroundColor: "#fff0",
    color: "#f2f2f2",
    fontSize: 14,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#10ac84",
    marginBottom: 10,
  },
  buttonSave: {
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    backgroundColor: "#10ac84",
    color: "#fff",
    fontSize: 14,
    padding: 10,
  },
  buttonUpdate: {
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    backgroundColor: "#1084ac",
    color: "#fff",
    fontSize: 14,
    padding: 10,
  },buttonText: {
    color: "#1f1f1f",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default TaskFormScreen;
