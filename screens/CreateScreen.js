import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import BlogPostForm from '../components/BlogPostForm'
import { Context } from '../context/BlogContext'
import { useNavigation } from '@react-navigation/native'


export default function CreateScreen() {
  const { addBlogPost } = useContext(Context);
  const navigation = useNavigation();
  return <BlogPostForm 
              isEditable = {false}
              onSubmit={(title, content)=>{
                  addBlogPost(title, content, ()=>{(
                    navigation.navigate('Home')
                  )});
              }}
          />;
}

const styles = StyleSheet.create({})