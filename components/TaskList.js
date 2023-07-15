import { FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import TaskItem from "./TaskItem";
import { getTasks, deleteTask } from "../api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [refreshingFlag, setRefreshingFlag] = useState(false);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const isFocuse = useIsFocused();

  useEffect(() => {
    if(isFocuse) loadTasks();
  }, [isFocuse]);

  const itemToRender = ({ item }) => {
    return <TaskItem task={item} handleDelete={handleDelete}/>;
  };

  const refreshHandle = React.useCallback(async () => {
    setRefreshingFlag(true);
    await loadTasks();
    setRefreshingFlag(false);
  });

  const handleDelete = async (idTask) => {
    await deleteTask(idTask);
    await loadTasks();
  }

  return (
    <FlatList
      style={{ width: "100%" }}
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={itemToRender}
      refreshControl={
        <RefreshControl
          refreshing={refreshingFlag}
          progressBackgroundColor={"#000"}
          colors={["#78e08f"]}
          onRefresh={refreshHandle}
        />
      }
    />
  );
};

export default TaskList;
