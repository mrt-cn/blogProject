import React, { useState, useReducer } from "react";
import CreateDataContext from "./CreateDataContext";
import jsonServer from "../api/jsonServer";


// const BlogContext = React.createContext();
const blogReducer = (state, action)=>{
    switch(action.type)
    {
        case 'get_blogposts': 
            return action.payload;
        // case 'add_blogpost':
        //     return [...state, {
        //         id:Math.floor(Math.random()*999999),
        //         title: action.payload.title,
        //         content: action.payload.content,
        //     }];
        case 'delete_blogpost':
            return state.filter((blogPost)=> blogPost.id !== action.payload );
        case 'edit_blogpost':
            return state.map((blogPost)=> {
                return blogPost.id === action.payload.id ? 
                action.payload : blogPost;
            } );
        default:
            return state;
    }
};

// export const BlogProvider = ({children})=>{
//     // const [blogPosts, setBlogPosts] = useState([{title:'React Native'}, {title:'JavaScript'}]);

//     const [blogPosts, dispatch] = useReducer(blogReducer, [{title:'React Native'},  {title:'JavaScript'}])

    

//     return <BlogContext.Provider value={{data: blogPosts, addBlogPost:addBlogPost}}>
//         {children}
//     </BlogContext.Provider>;
// };


const addBlogPost = (dispatch)=>{
    // setBlogPosts([...blogPosts, {title:'Vue Js'}]);
    return async (title, content, callback)=>{
        await jsonServer.post('/blogposts', {title, content});
        //dispatch({type: 'add_blogpost', payload:{title, content}});
        if(callback){
            callback();
        }
    };
    
};

const deleteBlogPost= (dispatch)=>{
    return async (id)=>{
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({type: 'delete_blogpost', payload:id});
    }
};

const editBlogPost = (dispatch)=>{
    
    return async (id, title, content, callback)=>{
        await jsonServer.put(`/blogposts/${id}`, {title, content});
        dispatch({type: 'edit_blogpost', payload:{id, title, content}});
        if(callback){
            callback();
        }
    };
    
};

const getBlogPosts = (dispatch)=>{
    
    return async ()=>{
        const response = await jsonServer.get('/blogposts');
        dispatch({type: 'get_blogposts', payload:response.data});
    };
};


export const {Context, Provider} =  CreateDataContext(blogReducer, {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts}, []);