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
  const album = new Vue({
    el: '#js-album',
    data: {
      title: null,
      description: null,
      photoUrls: []
    }
  });

  database.ref(`/contents/albums/${albumId}`).once('value').then(snapshot => {
    const rawAlbum = snapshot.val();
    let photoUrls = [];

    if (rawAlbum == null) {
      return;
    }

    album.title = rawAlbum.title;
    album.description = rawAlbum.description;

    for (let key in rawAlbum.photos) {
      photoUrls.push(rawAlbum.photos[key]);
    }
    album.photoUrls = photoUrls;
  });
});
