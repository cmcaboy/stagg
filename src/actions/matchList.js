import firebase from '../firebase';
import {db} from '../firebase';

export const startLoadLists = (uid) => {
    return (dispatch,getState) => {

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
        dislikes = []
    } = initialListData;
    const initialLists = { matches, likes, dislikes, queue};

    return {
        type: 'LOAD_LISTS',
        initialLists: {
            ...initialLists
        }
    }
};

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
    return async (dispatch) => {
        /*
        const url = `https://us-central1-stagg-test.cloudfunctions.net/newQueue?id=${id}`
        fetch(url)
            .then((queryList) => queryList.json())
            .then((queryList) => dispatch(newqueue(queryList)))
            .catch((error) => console.log("Error fetching endpoint: ",error))
        }
        */

       const queryList = await db.collection(`users`).where("active","==",1).get()

       let list = queryList.docs.map((doc) => {
         const docData = doc.data();
         return {
           id:doc.id,
           name: docData.name,
           profilePic: docData.profilePic
         }
       });
       let likeList = await db.collection(`users/${id}/likes`).get();
       const likes = likeList.docs.map((doc) => {
           const docData = doc.data();
           return docData.likedId;
        });
        let dislikeList = await db.collection(`users/${id}/dislikes`).get();
        const dislikes = dislikeList.docs.map((doc) => {
            const docData = doc.data();
            return docData.dislikedId;
        });
        
        const excludeList = new Set([...likes,...dislikes,id]);
        list = new Set([...list]);

        dispatch(newqueue([...list].filter(x => !excludeList.has(x.id))));
    }
};

export const newqueue = (newQueue) => ({
        type: 'NEW_QUEUE',
        newQueue
});


