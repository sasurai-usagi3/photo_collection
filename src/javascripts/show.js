import {firebase} from './firebase';
import Vue from 'vue';

window.addEventListener('load', () => {
  const database = firebase.database();
  const queryAlbumId = location.search
    .slice(1)
    .split('&')
    .map(x => x.split('='))
    .find(x => x[0] == 'album_id');

  if (queryAlbumId == null) {
    return;
  }

  const albumId = queryAlbumId[1] || '';

  database.ref(`/contents/albums/${albumId}`).once('value').then(snapshot => {
    const photographs = snapshot.val();

    if (photographs == null) {
      return;
    }

    console.log(photographs);
  });
});
