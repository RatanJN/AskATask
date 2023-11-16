import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Modal,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getUserDetails } from "../APIcalls/userScript";
import { useAuthToken } from "../Context/AuthTokenProvider";
import { useRefresh } from "../Context/RefreshProvider";
import { useLogin } from "../Context/LoginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserDetailsScreen = (props) => {
  const { authToken } = useAuthToken();
  const { refresh } = useRefresh();
  const [userDetails, setUserDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { setIsLoggedIn } = useLogin();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails(authToken.split(";")[0]);
        setUserDetails(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (authToken) {
      fetchUserDetails();
    }
  }, [authToken, refresh]);

  const [activeTab, setActiveTab] = useState("Created");

  const callScreen = (item) => {
    if (activeTab == "Created") {
      props.navigation.navigate("Update Screen", {
        taskDetails: item,
        userInfo: user,
      });
    } else {
      props.navigation.navigate("TaskDetail Screen", {
        task: item,
        showAccept: false,
      });
    }
  };

  const renderTask = ({ item }) =>
    activeTab === "Created" && item.status === "Closed" ? (
      <View style={styles.closedTaskCard}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskCategory}> Closed </Text>
      </View>
    ) : (
      <TouchableOpacity
        style={styles.taskCard}
        onPress={() => callScreen(item)}
      >
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskCategory}>{item.category}</Text>
      </TouchableOpacity>
    );

  const taskData =
    activeTab === "Created"
      ? userDetails.tasks_created
      : userDetails.tasks_accepted;

  const logout = async () => {
    await AsyncStorage.setItem("email", "");
    await AsyncStorage.setItem("pwd", "");
    setIsLoggedIn(false);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <Text style={styles.headerTitle}>User Details</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="user" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("Created")}
          style={[
            styles.filterButton,
            activeTab === "Created" && styles.selectedFilterButton,
          ]}
        >
          <Text style={styles.filterText}>Created</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Accepted")}
          style={[
            styles.filterButton,
            activeTab === "Accepted" && styles.selectedFilterButton,
          ]}
        >
          <Text style={styles.filterText}>Accepted</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={taskData}
        renderItem={renderTask}
        keyExtractor={(item) => item._id}
        style={styles.list}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>User Details</Text>
            <Text>Name: {userDetails.name}</Text>
            <Text>Email: {userDetails.email}</Text>
            <Button title="Logout" onPress={logout} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4a90e2", // Keeping the background color consistent
    paddingTop: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
  },
  selectedFilterButton: {
    backgroundColor: "white",
  },
  filterText: {
    color: "black",
    fontWeight: "bold",
  },
  list: {
    backgroundColor: "#4a90e2", // Keeping the list background color consistent
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closedTaskCard: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Text color for better readability
  },
  taskCategory: {
    fontSize: 14,
    color: "#666",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Adjusted for spacing
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 10, // Added padding
  },
  iconButton: {
    // Style for the icon button
    padding: 10,
  },
  iconText: {
    // Temporary style for the placeholder icon
    fontSize: 24,
    color: "#fff",
  },
});

export default UserDetailsScreen;
