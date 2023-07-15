import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const TaskItem = ({ task, handleDelete }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("TaskFormScreen", { id: task.id })}>
        <Text style={styles.itemTitle}>{task.title}</Text>
        <Text style={styles.itemTitle}>{task.description}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemDelete}
        onPress={() => handleDelete(task.id)}
      >
        <Text style={styles.itemDeleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#444",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    color: "#fafafa",
  },
  itemDelete: {
    backgroundColor: "#ee5050",
    padding: 10,
    borderRadius: 10,
  },
  itemDeleteText: {
    color: "#444",
    fontWeight: "bold",
  },
});
export default TaskItem;
