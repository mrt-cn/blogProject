import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
import { useNavigation } from '@react-navigation/native';


export default function EditScreen({ route }) {
    const {state, editBlogPost} = useContext(Context);
    const navigation = useNavigation();
        //console.log(route.params.id);
    const blogPost = state.find((blogPost)=>blogPost.id === route.params.id);
    const id = route.params.id;
  return (
        <BlogPostForm 
            isEditable = {true}
            initialValues={{title:blogPost.title, content: blogPost.content}}
            onSubmit={(title, content)=>{
                editBlogPost(id, title, content, ()=>{(
                  navigation.navigate('Home')
                )});
            }}
        />
  );
}

const styles = StyleSheet.create({})