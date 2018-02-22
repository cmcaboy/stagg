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
                const matchList = data.data();
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

export const startLike = (id, likedId) => {
    return (dispatch) => {
        db.collection(`users/${id}/likes`).set({likedId})
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

export const startDislike = (id, dislikedId) => {
    return (dispatch) => {
        db.collection(`users/${id}/dislikes`).set({dislikedId})
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

export const startMatch = (id, matchId) => {
    return (dispatch) => {
        db.collection(`users/${id}/matches`).set({matchId})
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
    // For now, I will just grab all users, but I need to figure out how to 
    // exclude those that are already liked or disliked.
    return (dispatch) => {
        db.collection(`users`).get()
            .then((queueList) => {
                // Firestore document id's can be obtained with the .id property.
                const newList = queueList.docs.map(doc => {
                    const docData = doc.data();
                    return {
                        id:doc.id,
                        name: docData.name,
                        profilePic: docData.profilePic
                    }
                });
                dispatch(newqueue(newList))
            })
            .catch((error) => console.log("Error writing document: ",error));
    }
};
export const newqueue = (newQueue) => ({
        type: 'NEW_QUEUE',
        newQueue
});


