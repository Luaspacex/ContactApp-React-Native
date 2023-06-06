
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Pressable
} from 'react-native'; 
// import {uuid} from "uuidv4"; 
import ListHeader from "./components/ListHeader";
// const {uuid} = require ("uuidv4"); 
export default function App() {
    
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    function deleteItem (uuid) {
        let newArr = [...data];
        newArr = newArr.filter((item) => item.login.uuid !== uuid)
        // newArr.splice(index, 1);
        setData(newArr)

    }
     function addItem (first, last, picture, phone) {
        let newUser = {login: {uuid: ""}, name: {first , last}, picture: {large: picture, medium: picture, thumbnail: picture}, phone};
        let newArr = [...data] 
        newArr.unshift(newUser)
        //  newArr = [...data]
        // newArr.push(newUser)
        setData(newArr)

     }
    const endpoint = "https://randomuser.me/api/?seed=2&page=1&results=20";
    useEffect(() => {
        setIsLoading(true);
    
        fetch(endpoint)
          .then(response => response.json())
          .then(results => {
            setData(results.results);
            setIsLoading(false);
            console.log(results.results);
          })
          .catch(err => {
            setIsLoading(false);
            setError(err);
          });
      }, []);
      if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#5500dc" />
          </View>
        );
      }
    
      if (error) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
              Error fetching data... Check your network connection!
            </Text>
          </View>
        );
      } 
      return (
        <View style={styles.container}>

          <Text style={styles.text}>My lovely Contacts</Text>
          <FlatList
            data={data}
            
            ListHeaderComponent={() =><ListHeader addItem = {addItem}/>}
            keyExtractor={(item, index) => item.login.uuid}
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>
                <Image
                  source={{ uri: item.picture.medium }}
                  style={styles.coverImage}
                />
                <View style={styles.metaInfo}>
                  <Text style={styles.title}>{`${item.name.first} ${
                    item.name.last
                  }`}</Text>
                      <Text style={styles.title}>{`${item.phone}`}</Text>
                 <Pressable onPress={() => deleteItem(item.login.uuid)} >
                 <Text keyExtractor={index} style={styles.title}>Delete</Text>

                 </Pressable>
            
            
                </View>
              </View>
            )
        }
          />
        </View>
      );
      
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    // backgroundColor: '#F7F7F7',
    backgroundColor: "#192338",

  },
  text: {
    color: "white",
    fontSize: 20,
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 15, 
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderRadius: 50,
  },
  metaInfo: {
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10
  }
});

