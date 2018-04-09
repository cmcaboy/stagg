import firebase from '../firebase';
import {db} from '../firebase';
import {GOOGLE_MAPS_API_KEY} from '../variables';
import {matchLoading} from '../actions/auth';

export const startLoadLists = (uid) => {
    return (dispatch,getState) => {

        console.log('load list: ',uid);

        fetch(`https://us-central1-stagg-test.cloudfunctions.net/getLikes?uid=${uid}`)
            .then((data) => data.json())
            .then((data) => dispatch(likeList(data)))
            .catch((error) => console.log("Error fetching Likes: ",error))

        fetch(`https://us-central1-stagg-test.cloudfunctions.net/getDislikes?uid=${uid}`)
            .then((data) => data.json())
            .then((data) => dispatch(dislikeList(data)))
            .catch((error) => console.log("Error fetching Dislikes: ",error))
        
        fetch(`https://us-central1-stagg-test.cloudfunctions.net/getMatches?uid=${uid}`)
            .then((matchListData) => matchListData.json())
            .then((matchListData) => dispatch(matchList(matchListData)))
            .catch((error) => console.log("Error fetching Matches: ",error))
    }
}

// Not currently used
export const loadLists = (initialListData) => {
    const {
        matches = [],
        likes = [],
        dislikes = [],
        queue = []
    } = initialListData;
    const initialLists = { matches, likes, dislikes, queue};

    return {
        type: 'LOAD_LISTS',
        initialLists: {
            ...initialLists
        }
    }
};

export const startUpdateLastMessage = (matchId,message) => {
// i could just pass in the matchId and the Google Cloud function can do the rest
    return (dispatch) => {
        // I am not putting the dispatch function within the fetch callback because I
        // don't want to delay the state update. This piece of info is not critial
        // to keep synced up so I can optimize performance in this setting.
        fetch(`https://us-central1-stagg-test.cloudfunctions.net/putLastMessage?matchId=${matchId}&message=${message}`)
            .then((response) => response.json())
            .then((response) => console.log('response from updateLastMessage: ',response))
            .catch((error) => console.log("Error from updateLastMessage: ",error))
        dispatch(updateLastMessage(matchId,message))
    }
}

export const startUpdateLastName = (matchId,name) => {
    return (dispatch) => {
        fetch(`https://us-central1-stagg-test.cloudfunctions.net/putLastName?matchId=${matchId}&name=${name}`)
            .then((response) => response.json())
            .then((response) => console.log('response from updateLastName: ',response))
            .catch((error) => console.log("Error from updateLastName: ",error))
        dispatch(updateLastName(matchId,name))
    }
}
export const updateLastMessage = (matchId,lastMessage) => ({
    type: 'UPDATE_LAST_MESSAGE',
    matchId,
    lastMessage
});

export const updateLastName = (matchId,lastName) => ({
    type: 'UPDATE_LAST_NAME',
    matchId,
    lastName
});

export const likeList = (likeList) => ({
    type: 'LIKE_LIST',
    likeList
});
export const dislikeList = (dislikeList) => ({
    type: 'DISLIKE_LIST',
    dislikeList
});
export const matchList = (matchList) => ({
    type: 'MATCH_LIST',
    matchList
});



export const startLike = (likedId) => {
    return (dispatch,getState) => {
        const id = getState().authReducer.uid;
        db.collection(`users/${id}/likes`).add({likedId})
            .then(() => dispatch(like(likedId)))
            .catch((error) => console.log("Error writing document: ",error));
        }
        db.collection(`users/${id}/queue`).doc(`${likedId}`).delete()
            .then(() => console.log('removed queue id: ',likedId))
            .catch((e) => console.log('could not remove likedId: ',likedId))
}
export const like = (id) => ({
        type: 'LIKE',
        like: {
            id
        }
});

export const startDislike = (dislikedId) => {
    return (dispatch,getState) => {
        const id = getState().authReducer.uid;
        db.collection(`users/${id}/dislikes`).add({dislikedId})
            .then(() => dispatch(dislike(dislikedId)))
            .catch((error) => console.log("Error writing document: ",error));
    }
}
export const dislike = (id) => ({
        type: 'DISLIKE',
        dislike: {
            id
        }
});

export const startMatch = (matchId) => {
    return (dispatch,getState) => {
        const id = getState().authReducer.uid;
        db.collection(`users/${id}/matches`).add({matchId})
            .then(() => dispatch(match(matchId)))
            .catch((error) => console.log("Error writing document: ",error));
    }
}
export const match = (id) => ({
        type: 'MATCH',
        match: {
            id
        }
});

// Will probably move this to the backend and use an HTTP request instead
export const startNewQueue = (id) => {
    // query executed via firebase cloud functions
    //console.log('in startnewQueue: ',id)
    return async (dispatch,getState) => {
        /*
        const url = `https://us-central1-stagg-test.cloudfunctions.net/newQueue?id=${id}`
        fetch(url)
            .then((queryList) => queryList.json())
            .then((queryList) => dispatch(newqueue(queryList)))
            .catch((error) => console.log("Error fetching endpoint: ",error))
        }
        */

        dispatch(matchLoading(true))

        // Workaround to avoid nasty race condition
        // ------------------------------------------------------------------------
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
        while(getState().profileReducer.name === "Anonymous"){
             await sleep(10);
        }
        // ------------------------------------------------------------------------
        
        const OppositeGender = (getState().profileReducer.gender==="male")?"female":"male";
        console.log(getState().profileReducer.coords);
        const lat = getState().profileReducer.coords.latitude;
        const lon = getState().profileReducer.coords.longitude;
        const radius =          getState().settingsReducer.distance;

        const url = `https://us-central1-stagg-test.cloudfunctions.net/getQueue?id=${id}&lat=${lat}&lon=${lon}&OppositeGender=${OppositeGender}&radius=${radius}`;

        fetch(url)
            .then((data) => data.json())
            .then((newQueue) => {
                dispatch(newqueue(newQueue))
                dispatch(matchLoading(false))
            })
            .catch((error) => console.log("Error fetching Likes: ",error))

    }
};

export const newqueue = (newQueue) => ({
        type: 'NEW_QUEUE',
        newQueue
});


