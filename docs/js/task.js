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
	return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`).then((response) => 		response.json())
	.then((photos) => {
		$containerGalleryPhotos.empty();		
		renderPhotos(photos);
	})
}

// RENDER 

function renderAlbums(albums) {
	$(albums).map(function() {
		$("<div></div>").text(this.title).addClass(`alert alert-warning`)
		.data("id", this.id)
		.appendTo($containerGalleryAlbums);
	});
}

function renderPhotos(photos) {
	$(photos).map(function()  {
		$(`<img src=${this.url}>`).css({width:550,height:150}).appendTo($containerGalleryPhotos);
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

function	init() {
	sendGetAlbumsRequest();
	createPhotosEventListener();
}
init();