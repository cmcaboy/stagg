import firebase from '../firebase';

const db = firebase.firestore();

export const startLoadLists = (id) => {
    db.collection(`users/${id}/likes`).get()
        .then((likeList) => likeList(likeList))
        .catch((error) => console.log("Error writing document: ",error));
    db.collection(`users/${id}/dislikes`).get()
        .then((dislikeList) => dislikeList(dislikeList))
        .catch((error) => console.log("Error writing document: ",error));
    db.collection(`users/${id}/matches`).get()
        .then((matchList) => matchList(matchList))
        .catch((error) => console.log("Error writing document: ",error));
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
    db.collection(`users/${id}/likes`).set({likedId})
        .then(() => like(likedId))
        .catch((error) => console.log("Error writing document: ",error));
}
export const like = (id) => ({
        type: 'LIKE',
        like: {
            id
        }
});

export const startDislike = (id, dislikedId) => {
    db.collection(`users/${id}/dislikes`).set({dislikedId})
        .then(() => dislike(dislikedId))
        .catch((error) => console.log("Error writing document: ",error));
}
export const dislike = (id) => ({
        type: 'DISLIKE',
        dislike: {
            id
        }
});

export const startMatch = (id, matchId) => {
    db.collection(`users/${id}/matches`).set({matchId})
        .then(() => match(matchId))
        .catch((error) => console.log("Error writing document: ",error));
}
export const match = (id) => ({
        type: 'MATCH',
        match: {
            id
        }
});

// Will probably move this to the backend and use an HTTP request instead
export const startRequeue = (id) => {
    // For now, I will just grab all users, but I need to figure out how to 
    // exclude those that are already liked or disliked.
    db.collection(`users`).get()
        .then((queueList) => requeue(queueList))
        .catch((error) => console.log("Error writing document: ",error));
};
export const requeue = (newQueue) => ({
        type: 'REQUEUE',
        newQueue
});


