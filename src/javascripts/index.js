import {firebase} from './firebase';
import Vue from 'vue';

window.addEventListener('load', () => {
  const database = firebase.database();
  const listAlbum = new Vue({
    el: '#js-list-album',
    data: {
      albums: []
    }
  });

  database.ref('/index/albums').once('value').then(snapshot => {
    const rawAlbums = snapshot.val();
    let albums = [];

    for(let key in rawAlbums) {
      albums.push(rawAlbums[key]);
    }

    listAlbum.albums = albums;
  });
});
