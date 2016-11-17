//global variables
var STORAGE_ID = 'spacebook';

var getFromLocalStorage = function() {
	return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
};

var saveToLocalStorage = function() {
	localStorage.setItem(STORAGE_ID, JSON.stringify(posts));
};

var posts = getFromLocalStorage();

//functions

//update the post from the array
function updatePosts() {
	//empty the
	$('.posts').empty();


	//print the data from the main array
	for (var i = 0; i < posts.length; i++) {
		var textPost = posts[i].name;
		var idNum = posts[i].id;
		var commPost = posts[i].comments.length;

		$('.posts').append(
			 '<div class="post-wrap" data-id="' + idNum + '"><p class="post">' + textPost +'<a href="#" class="commentPost"><span class="badge">' + commPost + '</span> Comments</a> <a href="#" class="remove">Remove</a> </p>'
			+'<div class="well"><div class="form-group"><input type="text" class="username-input form-control" placeholder="Username"></input>'
        	+'</div><div class="form-group"><input type="text" class="comment-input form-control" placeholder="Comment"></input>'
        	+'</div><button type="button" class="btn btn-primary add-comment">Comment</button></div></div>'
        );

		// removePost();
	}


}

//add new post
function addPost(str) {
	//new obj
	var newPost = {
		name:str,
		id:undefined,
		comments: []
	};

	//if id is undefined, add a number
	if(posts.length === 0) {
		newPost.id = 0;

	}else{
		newPost.id = posts[posts.length-1].id + 1;
	}
	console.log(newPost);


	//populate the posts array
	posts.push(newPost);

	saveToLocalStorage();
	//remove text from input
	namePost = $('#post-name').val('');

}

//add comment and username to the comment array inside posts obj
function addComment(username, comment, id){

	var newComment = {
	 	username: username,
	 	comment: comment,
	 };

console.log(posts);
	//find the id of which
	for (var i = 0; i < posts.length; i++) {
		if(id === posts[i].id) {
			posts[i].comments.push(newComment);
		}
	}

	saveToLocalStorage();

}

// remove one post
function removePost(id) {


	posts.splice(id, 1);
	// removePostStorage(id);
	saveToLocalStorage();

}


	//event handlers
	// posts = getFromLocalStorage();
	// $(document).ready(function() {
	// 	posts = getFromLocalStorage();
	// 	updatePosts();
	// });


	//add a new post
	$('.add-post').on('click', function() {

		//get value of input
		var namePost = $('#post-name').val();

		addPost(namePost);
		updatePosts();

	});

	//remove post
	$('.posts').on('click','.remove', function(){
		//remove from array
		var id = $(this).closest('.post-wrap').data().id;
		removePost(id);
		//remove from DOM
		$(this).closest('.post-wrap').remove();

	});

//ADD COMMENT CLICK
$('.posts').on('click', ".add-comment",function() {
		var id = $(this).closest('.post-wrap').data().id;

		// alert(id);
		var username = $(this).prev().prev().find('input').val();
		var comment = $(this).prev().find('input').val();

		console.log(username);
		console.log(comment);

		addComment(username, comment, id);

		//remove text from inputs
		username = $(this).prev().prev().find('input').val('');
		comment = $(this).prev().find('input').val('');

		updatePosts();

	});

//pop up window

$('.posts').on('click', ".commentPost", function() {

	var id = $(this).closest('.post-wrap').data().id;

	for (var i = 0; i < posts.length; i++) {
			var commlist = posts[i].comments;
			for (var j = 0; j < commlist.length; j++) {
				var username = commlist[j].username;
				var comms = commlist[j].comment;

				// $(this).closest('.post-wrap');
				$('#myModal').show();
				$('#myModal').html('<div class="modal-content"><span class="glyphicon glyphicon-remove"></span><h4>Comments</h4>'
					+'<div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">' + username +'</h3></div>'
					+'<div class="panel-body">' + comms + '</div></div>');

				$('span.glyphicon.glyphicon-remove ').click(function(){
					console.log($(this));
						$('#myModal').hide();
				});

			}

	}

});

updatePosts();

// to fix
//add a function that remove comments
//the id for each post can be found with the index of the array (only if you don't use a server to keep the info)
//add a toggle function to the comments


