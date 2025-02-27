import React, { useReducer } from "react";


export default (reducer, actions, initialState)=>{
    const Context = React.createContext();

    const Provider = ({children})=>{
        // const [blogPosts, setBlogPosts] = useState([{title:'React Native'}, {title:'JavaScript'}]);
    
        const [state, dispatch] = useReducer(reducer, initialState)
    
        // return <context.Provider value={{data: blogPosts, addBlogPost:addBlogPost}}>
        //     {children}
        // </context.Provider>;

        const boundActions = {};
        for(let key in actions){
            boundActions[key] = actions[key](dispatch);
        };

    
        return <Context.Provider value={{ state, ...boundActions }}>
            {children}
        </Context.Provider>;
    };
    return {Context, Provider};
    
}