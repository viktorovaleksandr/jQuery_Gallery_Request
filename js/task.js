const $containerGalleryAlbums = $('.js-gallery-albums');
const $containerGalleryPhotos = $('.js-gallery-photo');

// REQUEST

function sendGetAlbumsRequest() {
	return fetch('https://jsonplaceholder.typicode.com/albums').then((response) => response.json())
		.then((albums) => {
		renderAlbums(albums);
	   sendGetPhotosRequest(albums[0].id);
	})
}

function sendGetPhotosRequest(albumId) {
	return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`).then((response) => response.json())
	.then((albums) => {
	$containerGalleryPhotos.empty();		
	renderPhotos(albums);
	})
}

// RENDER 

function renderAlbums(albums) {
	albums.map((albumList,id) => {
	const $divItem = $("<div></div>").text(albumList.title)
	.addClass(`alert alert-warning`)
	.data("id", id + 1);
	$containerGalleryAlbums.append($divItem);	
	});
}

function renderPhotos(albums) {
	albums.map((image) => {
	const $img = $(`<img src=${image.url}>`).css({width:550,height:150});
  	$containerGalleryPhotos.append($img);	
   });
}

// EVENT LISTENERS

function createPhotosEventListener() {
	$containerGalleryAlbums.click(function(event) {
	const $albumId = $(event.target).closest('div').data('id');
	sendGetPhotosRequest($albumId);
	});	
}

// INIT 

init();

function	init() {
	sendGetAlbumsRequest();
	createPhotosEventListener();
}
