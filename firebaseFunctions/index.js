// Cloud functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.newQueue = functions.https.onRequest(async (req, res) => {

  const id = req.id;

  let queryList = await db.collection(`users`).get();
  const list = queryList.docs.map((doc) => {
    const docData = doc.data();
    return {
      id:doc.id,
      name: docData.name,
      profilePic: docData.profilePic
    }
  });
  let likeList = await db.collection(`users/${id}/likes`);
  const likes = likeList.docs.map((doc) => {
    const docData = doc.data();
    return doc.id;
  });
  let dislikeList = await db.collection(`users/${id}/dislikes`)
  const dislikes = dislikeList.docs.map((doc) => {
    const docData = doc.data();
    return doc.id;
  });

  const excludeList = [...like,..dislike];

  return [...list].filter(x => !excludeList.has(x.id))

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

const temp = () => {}


