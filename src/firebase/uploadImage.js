import {firebase} from './index';
import uuid from 'uuid';

export default async (uri, name = uuid()) => {
  const body = new FormData();
  body.append("picture", {
    uri: uri,
    name,
    type: "image/jpg"
  });
  console.log('body: ',body);
  // Need to change url to my URL
  const res = await fetch("https://us-central1-stagg-test.cloudfunctions.net/api/picture", {
    method: "POST",
    body,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
  });
  //console.log('res: ',res);
  console.log('name: ',name);
  const url = await firebase.storage().ref(name).getDownloadURL();
  return url;
}