import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Settings from '../components/Settings';
import Leaderboard from '../components/Leaderboard';
import Stagg from '../components/Stagg';
import Matches from '../components/Matches';
import Messenger from '../components/Messenger';
import EditSettings from '../components/EditSettings';
import EditProfile from '../components/EditProfile';
import UserProfile from '../components/UserProfile';
import { FontAwesome, Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import {Platform} from 'react-native';

const Tabs = TabNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='account' size={30} color={tintColor} />
          }
    },
    // Taking the leaderboard out for now. I would prefer to have 3 tabs rather than 4
    // as it is more aesthetically pleasing.
    /*
    Leaderboard: {
        screen: Leaderboard,
        navigationOptions: {
            tabBarLabel: 'Leaderboard',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
          }
    },
    */
    Stagg: {
        screen: Stagg,
        navigationOptions: {
            tabBarLabel: 'Stagg',
            tabBarIcon: ({ tintColor }) => <Entypo name='heart' size={30} color={tintColor} />
          }
    },
    Matches: {
        screen: Matches,
        navigationOptions: {
            tabBarLabel: 'Matches',
            
            tabBarIcon: ({ tintColor }) => <Entypo name='chat' size={30} color={tintColor} />
          }
    }
}, {
        navigationOptions: {
          header: null
        },
        tabBarOptions: {
          activeTintColor: Platform.OS === 'ios' ? 'purple' : 'white',
          showLabel: false,
          style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? 'white' : 'purple',
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
          }
        }
});

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    Messenger: {
        screen: Messenger
    },
    EditSettings: {
        screen: EditSettings
    },
    EditProfile: {
        screen: EditProfile
    },
    UserProfile: {
        screen: UserProfile
    }
});

export default MainNavigator;
