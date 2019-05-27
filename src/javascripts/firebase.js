import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDTVS_n7jmeduASTwAMNL1h1Kvwsq2JZWM',
  authDomain: 'photo-collection-c80cf.firebaseapp.com',
  databaseURL: 'https://photo-collection-c80cf.firebaseio.com',
  projectId: 'photo-collection-c80cf',
  storageBucket: 'photo-collection-c80cf.appspot.com',
  messagingSenderId: '502593689108',
  appId: '1:502593689108:web:d4eca894007b7efd'
};
firebase.initializeApp(firebaseConfig);

export {firebase};
