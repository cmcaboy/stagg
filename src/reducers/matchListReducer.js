const matchListReducerDefaultState = {
    matches: [],    // id list of matches
    likes: [],      // id list of likes
    dislikes: [],   // id list of dislikes
    queue: []    // object list of potential matches, which includes pic, name, description, and anything else required for a render
};

const matchListReducer = (state = matchListReducerDefaultState,action = {}) => {
    console.log(action);
    switch(action.type) {
        case 'LOAD_LISTS':
            return {
                ...action.initialLists
            };
        case 'LIKE_LIST':
            return {
                ...state,
                likes: likeList
            };
        case 'DISLIKE_LIST':
            return {
                ...state,
                dislikes: dislikeList
            };
        case 'MATCH_LIST':
            return {
                ...state,
                matches: matchList
            };
        case 'LIKE':
            // remove entry from queue list
            // add entry to like list
            return {
                ...state,
                queue: state.queue.filter(element => element.id !== action.like.id),
                likes: [...state.likes, action.like.id]
            };
        case 'DISLIKE':
            // remove entry from queue list
            // add entry to dislike list
            return {
                ...state,
                queue: state.queue.filter(element => element.id !== action.dislike.id),
                dislikes: [...state.dislikes, action.dislike.id]
            };
        case 'MATCH':
            // remove entry from queue list
            // add entry to match
            return {
                ...state,
                queue: state.queue.filter(element => element.id !== action.match.id),
                matches: [...state.matches, action.match.id]
            };
        case 'REQUEUE':
            // Append new potential matches
            return {
                ...state,
                queue: [...state.queue,...action.newQueue]
            };
        case 'NEW_QUEUE':
            // Fill queue with new list
            return {
                ...state,
                queue: [...action.newQueue]
            }
        default:
            return state;
    } // ends switch
} // Ends matchListReducer

export default matchListReducer;