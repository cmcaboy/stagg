import {db} from '../firebase';
import 'firebase/firestore';
import {dispatch} from 'react-redux';
import {startLoadProfile,startNewUser} from '../actions/profile';
import {startInitialSettings} from '../actions/settings';
import {startLoadSettings} from '../actions/settings';
import {startLoadLists} from '../actions/matchList';

export const postLogin = (uid,token,dispatch) => {
  // Search firestore to see if uid is registered.
  // If it is not, extract FB details using FB graph API
  // and load it into Firestore.
  // If uid is registered, load the user's information into 
  // the application state using action generators.
  // We will need the facebook token as well

  const query = db.collection("users").doc(uid).get()
    .then(async (doc) => {
      if(!doc.exists) {
        // If record does not exist... look data up via FB API
        const response = await fetch(`https://graph.facebook.com/me/?fields=first_name,last_name,picture.height(200),education,about,gender&access_token=${token}`)
        const responseData = await response.json();

        //console.log('facebook data',responseData);

        // Consider adding work and acillary pics later
        const newUser = {
          profilePic: responseData.picture.data.url,
          name: responseData.first_name,
          school: responseData.education?responseData.education[responseData.education.length -1].school.name:'',
          description: responseData.about,
          gender: responseData.gender,
          uid
        }
        const initialSettings = {
          sendNotifications: true,
          distance: 20,
          agePreference: [18,35]
        }
        // startNewUser will add the new user to Firestore
        dispatch(startNewUser(newUser));
        dispatch(startInitialSettings(initialSettings))
      }
      // Load the client's profile
      dispatch(startLoadProfile(uid));
      dispatch(startLoadSettings(uid));
      dispatch(startLoadLists(uid));
    })
    .catch((error) => console.log("FB load - Error getting document: ",error))

}

export default postLogin;