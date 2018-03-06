// Cloud functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.newQueue = functions.https.onRequest((req, res) => {

  const id = req.id;
/*
  db.collection(`users`).get()
    .then((queueListData) => {
      const queueList = queueListData.data();
      const likeList = db.collection(`users/${id}/likes`)
        .then((likeListData) => {
          return likeListData.docs.map(doc => {
            const docData = doc.data();
            return {id:doc.id}
          })
        })
      const dislikeList = db.collection(`users/${id}/dislikes`)
        .then((dislikeListData) => {
          return dislikeListData.docs.map(doc => {
            const docData = doc.data();
            return {id:doc.id}
          })
        })
        const excludeList = [...likeList,...dislikeList];
        return queueList;
  })
  .catch((error) => console.log('error running query',error))
*/
});

exports.oldNewQueue = functions.https.onRequest((req, res) => {
 
  const id = req.id;

  return db.collection(`users`).get()
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
      return res.send(newList)
  })
  .catch((error) => console.log("Error writing document: ",error));
 
  //response.send("Hello from Firebase!");
});

exports.createNewQueue = functions.https.onRequest((req,res) => {
  
  const id = req.id;

  functions.firestore
    .document(`users/${id}/queueBool`)
    .onDelete(() => {
      // tbd
    })
});

// Execute after a like. check to see if the liked user also like the user.
exports.onLike = functions.firestore
  .document(`users/{userId}/likes/{likeId}`)
  .onCreate((event) => {
    const data = event.data.data();
    const userId = event.params.userId;
    const likedId = data.likedId;
    db.collection(`users/${likedId}/likes`).get()
      .then((likeList) => {
        return likeList.docs.map((doc) => {
          const docData = doc.data();
          if(docData.likedId === userId) {
            createMatch(userId,likedId);
          }
        });

      }) // end .then
      .catch((error) => console.log('error',error))
  });

const createMatch = (a,b) => {
  // create a match between userId's a and b
  
  const ref = db.collection(`matches`).doc();
  
  ref.set({
    id: ref.id,
    userA:a,
    userB:b,
    matchTime: Date.now()
  });

  db.collection(`users`).doc(`${a}`).get()
    .then((snapshot) => {
      const data = snapshot.data();
      return db.collection(`users/${b}/matches`).doc(`${a}`).set({
        matchId:ref.id
      })
    })
    .catch((error) => console.log('error: ',error))
  
  
  db.collection(`users`).doc(`${b}`).get()
    .then((snapshot) => {
      const data = snapshot.data();
      return db.collection(`users/${a}/matches`).doc(`${b}`).set({
        matchId:ref.id
      })
    })
    .catch((error) => console.log('error: ',error))
  
  .catch((error) => console.log('error: ',error))
}

