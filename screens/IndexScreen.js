import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Context } from '../context/BlogContext';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function IndexScreen() {
    const {state, addBlogPost, deleteBlogPost, getBlogPosts} = useContext(Context);
    const navigation = useNavigation();

    useEffect(()=>{
        getBlogPosts();
        const listener = navigation.addListener('focus', ()=>{
            getBlogPosts();
        });
        return () => {
            listener.remove();
        };
    }, [])


  return (
    <View>
        {/* <Text>IndexScreen</Text> */}

        
        <FlatList
            data={state}
            keyExtractor={blogPosts=>blogPosts.id}
            renderItem={({item})=> {
                return (
                <TouchableOpacity onPress={() => navigation.navigate('Show', {id:item.id})}>
                    <View style={styles.row}>
                        <Text style={styles.title}>{item.title}</Text>
                        <TouchableOpacity onPress={()=>deleteBlogPost(item.id)}>
                            <Feather name="trash" size={24} color="black" />
                        </TouchableOpacity>
                    
                    </View>
                </TouchableOpacity>
                
                );
            }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 20, 
        borderColor: 'gray',

    },

    title: {
        fontSize: 18, 
    },
})