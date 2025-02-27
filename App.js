import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from './screens/IndexScreen';
import CreateScreen from './screens/CreateScreen';
import { Provider } from './context/BlogContext';
import ShowScreen from './screens/ShowScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import EditScreen from './screens/EditScreen';
import EvilIcons from '@expo/vector-icons/EvilIcons';


const RootStack = createNativeStackNavigator({
  
  screens: {
    Home: {
      screen: IndexScreen,
      options: ({ navigation })=> ({
          headerRight: ()=> (
            
            <TouchableOpacity onPress={()=>{(navigation.navigate('CreateScreen'))}}>
                <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          ),
      }),
      
    },
    CreateScreen: {
      screen: CreateScreen,
      options: {
        title: 'Create Screen',
      }
    },
    Show: {
      screen: ShowScreen,
      options: ({ navigation, route })=> ({
        headerRight: ()=> (
          
          <TouchableOpacity onPress={()=>{(navigation.navigate('Edit', {id:route.params.id}))}}>
             <EvilIcons name="pencil" size={35} color="black" />
          </TouchableOpacity>
        ),
    }),
    },
    Edit: {
      screen: EditScreen,
    }
  },

  screenOptions: {
    headerTitle: 'Blog Uygulaması',
  },
});

const Navigation = createStaticNavigation(RootStack);


export default function App() {
  return (
    <Provider>
        <Navigation/>
    </Provider>
    
  );
}

const styles = StyleSheet.create({});
