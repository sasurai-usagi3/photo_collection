import {firebase} from './firebase';
import Vue from 'vue';

window.addEventListener('load', () => {
  const database = firebase.database();
  const queryAlbumId = location.search
    .slice(1)
    .split('&')
    .map(x => x.split('='))
    .find(x => x[0] == 'album_id');
  const metaUrl = document.getElementById('js-meta-url');
  const metaImage = document.getElementById('js-meta-image');
  const metaTitle = document.getElementById('js-meta-title');
  const title = document.getElementById('js-title');

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

  database.ref(`/index/albums/${albumId}`).once('value').then(snapshot => {
    const album = snapshot.val();

    if (album == null) {
      return;
    }


    metaUrl.content = `https://photo.sasurai-usagi3.jp/show.html?album_id=${albumId}`;
    metaImage.content = album.image;
    metaTitle.content = `${album.title} | ${metaTitle.content}`
    title.textContent = `${album.title} | ${title.textContent}`
  });
});
