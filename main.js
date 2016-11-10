//global variables
var posts = [];

//functions

//update the post from the array
function updatePosts() {
	//empty the
	$('.posts').empty();
	//print the data from the main array
	for (var i = 0; i < posts.length; i++) {
		var textPost = posts[i].name;
		var idNum = posts[i].id;

		$('.posts').append(
			 '<div class="post-wrap" data-id="' + idNum + '"><p class="post">' + textPost +'<a href="#" class="remove">'+ 'remove' +'</a> </p>'
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
	for (var i = 0; i < posts.length; i++) {
		if(id===posts[i].id) {
			posts[i].comments.push(newComment);
		}
	}
	// var newComment =  new Comment(username, comment);


	// posts[comments].push(newComment);
}

// remove one post
function removePost(id) {

	posts.splice(id, 1);

}


	//event handlers

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

		alert(id);
		var username = $(this).prev().prev().find('input').val();
		var comment = $(this).prev().find('input').val();

		console.log(username);
		console.log(comment);

		addComment(username, comment, id);

	});


