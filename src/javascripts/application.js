import {firebase} from './firebase';

window.addEventListener('load', () => {
  const database = firebase.database();

  database.ref('albums').once('value').then(snapshot => {
    const albums = snapshot.val();

    console.log(albums);
  });
});
