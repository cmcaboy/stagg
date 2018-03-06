import firebase from '../firebase';
import {db} from '../firebase';

export const startLoadLists = (uid) => {
    return (dispatch,getState) => {

        db.collection(`users/${uid}/likes`).get()
            .then((data) => {
                const likeList = data.data();
                dispatch(likeList(likeList))
            })
            .catch((error) => console.log("Error writing document: ",error));
        db.collection(`users/${uid}/dislikes`).get()
            .then((data) => {
                const disLikeList = data.data();
                dispatch(dislikeList(dislikeList))
            })
            .catch((error) => console.log("Error writing document: ",error));
        db.collection(`users/${uid}/matches`).get()
            .then((data) => {
                const matchList = data.docs.map(async (doc) => {
                    const matchIdData = doc.data();
                    const snapshot = await db.collection(`users`).doc(`${doc.id}`).get()
                    docData = snapshot.data();
                    return {
                      id:doc.id,
                      name: docData.name,
                      profilePic: docData.profilePic,
                      matchId: matchIdData.matchId
                    }
                  });
                //const matchList = data.data()
                dispatch(matchList(matchList))
            })
            .catch((error) => console.log("Error writing document: ",error));
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
    dislikeList: {
        dislikeList
    }
});
export const matchList = (matchList) => ({
    type: 'MATCH_LIST',
    matchList: {
        matchList
    }
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
    return async (dispatch) => {
        /*
        const url = `https://us-central1-stagg-test.cloudfunctions.net/newQueue?id=${id}`
        fetch(url)
            .then((queryList) => queryList.json())
            .then((queryList) => dispatch(newqueue(queryList)))
            .catch((error) => console.log("Error fetching endpoint: ",error))
        }
        */
       let queryList = await db.collection(`users`).get();
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
        console.log('like list -- ',likes);
        let dislikeList = await db.collection(`users/${id}/dislikes`).get();
        const dislikes = dislikeList.docs.map((doc) => {
            const docData = doc.data();
            return docData.dislikedId;
        });
        console.log('dislike list -- ',dislikes);
        
        const excludeList = new Set([...likes,...dislikes]);
        list = new Set([...list]);
        
        console.log('exclude list -- ',excludeList);
     
       dispatch(newqueue([...list].filter(x => !excludeList.has(x.id))));
    }
};

export const newqueue = (newQueue) => ({
        type: 'NEW_QUEUE',
        newQueue
});


