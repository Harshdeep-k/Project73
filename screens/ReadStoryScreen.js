import React from "react";
import { StyleSheet, Text, View,FlatList } from "react-native";
import {ListItem,SearchBar } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";

export default class ReadStoryScreen extends React.Component {
  constructor()
  {
    super();
    this.state={
      stories:"",
      search:"",
    }
  }

   componentDidMount()
  {
    this.retrieveStories();
  }
 

  updateSearch = (search) => {
    this.setState({ search });
  };

  retrieveStories=()=>
  {
    var stories=[];
    var storyIndex;
    db.ref("storyIndex").on("value",data=>
    {
      storyIndex=data.val();
    })
    for(var i=1;i<=storyIndex;i++)
    {
      db.ref("Stories/story"+i).on("value",data=>
          {
            stories.push(data.val());
          })
    }
   
    this.setState({
      stories: stories,
    })
  
  }

 
  renderItem = ( {item,i} ) =>{
    return (
          <ListItem
          key={item.id} bottomDivider>
          <ListItem.Content>
              <ListItem.Title style={styles.text}>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.author}</ListItem.Subtitle>
              <Text style={styles.text2}>{item.story}</Text>
          </ListItem.Content>
          </ListItem>
      )
    
  }

  render() {
var stories = this.state.stories;
const { search } = this.state;
  return (
      <View>
      <MyHeader/>
      {
        
        this.state.stories.length === 0 ?
        (
          <Text> No stories to read yet</Text>
        ):
        (
         
           <View>
           <Text style={styles.text}>Look at these stories 
            </Text>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={search}
              inputContainerStyle={styles.container}
              containerStyle={styles.outbox}
            />
            {this.state.search === ""?
            (
                    <FlatList
                          data={this.state.stories}
                          renderItem={this.renderItem}
                          keyExtractor={(item,index) => index.toString()}
                        />
            ):
            (
                    <FlatList
                          data={this.state.searchStories}
                          renderItem={this.renderItem}
                          keyExtractor={(item,index) => index.toString()}
                        />
            )}
            
           
            </View>
            )
          }
         
      </View>
  )
  }
  
}

const styles=StyleSheet.create({
     text:
      {
        marginTop:10,
        fontFamily:"Josefin",
        fontSize:20,
        color: "black",
        textShadowColor:"#3fc1c9",
        textShadowOffset: {width:0, height:0},
        textShadowRadius:5,
        textAlign:"center",
      },
      text2:
      {
        fontFamily:"Josefin",
        fontSize:15,
        color: "black",
        marginTop:5,
 
      },
      container:
      {
        width: "99%",
        borderColor:"black",
        borderRadius:10,
        height: 15,
        borderWidth:2,                   
       
        textAlign:"center",
        color: "black",
        fontFamily:"Josefin",
        fontSize:10,
       
        alignSelf:"center",
        backgroundColor:"#f5f5f5",
       
      },
      outbox:
      {
        backgroundColor:"#f5f5f5",              
        justifyContent:"center",
        textAlign:"center",
        color: "black",
        borderColor:"#f5f5f5"
      }
     
})
