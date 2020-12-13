import React from 'react';
import { Card } from 'react-native-paper';
import { FontAwesome ,AntDesign} from '@expo/vector-icons';

const ShowNotification=({content,navigation})=>{
    let comment=content.comment
    if(comment==undefined){
         return(<Card
          style={{borderRadius:10,shadowColor:'java', shadowOffset:10, marginTop:10,marginLeft:5,marginRight:5}} onPress={()=>navigation.push('Post',{post:content.postId})}>
                <Card.Title title={content.sender} subtitle=" liked your post" left={()=><AntDesign name="heart" size={24} color="38a4a4"/>} />
            </Card>);
    }
    else{
         return(<Card
            style={{borderRadius:10,shadowColor:'java', shadowOffset:10, marginTop:10,marginLeft:5,marginRight:5}} onPress={()=>navigation.push('Post',{post:content.postId})}>
                <Card.Title title={content.sender} subtitle=" commented on your post"  left={()=><FontAwesome name="comment" size={24} color="#38a4a4" />} />
            </Card>);
    }
   
};

export default ShowNotification;