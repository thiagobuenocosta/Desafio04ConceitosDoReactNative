import React, {useState, useEffect} from "react";
import { likeRepositorie, listRepositories } from './services/api'
import { SafeAreaView, View, FlatList, Text, StatusBar, StyleSheet, TouchableOpacity } from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleLikeRepository(id) {
    const response = await likeRepositorie(id);
    const repositorie = repositories.find(repositories => repositories.id === id);
    repositorie.likes = response.data.likes;
    setRepositories([...repositories.filter(repositorie => repositorie.id !== id), repositorie]) 
  }

  useEffect(() => {
    listRepositories().then(response => {
      setRepositories(response.data)
    })
  },[])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#850018" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repositorie => repositorie.id}
          renderItem={({ item: repositorie }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repositorie.title}</Text>
    
              <FlatList 
                style={styles.techsContainer}
                data={repositorie.techs}
                keyExtractor={techs => techs}
                renderItem={ ({item: techs}) => (
                  <Text style={styles.tech}>{techs}</Text>
                )}
              />
    
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repositorie.id}`}
                >
                  {repositorie.likes} curtidas
                </Text>
              </View>
    
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repositorie.id)}
                testID={`like-button-${repositorie.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
       
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#850018",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#850018",
    padding: 15,
  },
});
