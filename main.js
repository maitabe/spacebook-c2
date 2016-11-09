//global variables
var posts = [];

//functions

//update the post from the array
function updatePosts() {
	//empty the
	$('.posts p').remove();
	//print the data from the main array
	for (var i = 0; i < posts.length; i++) {
		var textPost = posts[i].name;
		var idNum = posts[i].id;

		$('.posts').append('<p class="post" data-id="'+idNum+'">' + textPost +'<a href="#" class="remove">'+ 'remove' +'</a> </p>');
		removePost();
	}


}

//add new post
function addPost(str) {
	//new obj
	var newPost = {
		name:str,
		id:undefined
	};

	//if id is undefined, add a number
	if(posts.length === 0) {
		newPost.id = 1;

	}else{
		newPost.id = posts[posts.length-1].id + 1;
	}
	console.log(newPost);


	//populate the posts array
	posts.push(newPost);

	//remove text from input
	namePost = $('#post-name').val('');

}

// remove one post
function removePost() {

	$('a.remove').closest('p').on('click', function(){

		//loop through the post array to delete post selected
		for (var i = 0; i < posts.length; i++) {
			//grab the data-id from element p
			var pItem = $(this).closest('p').data().id;
			// var indexPost = posts[i].id;
			if(pItem === posts[i].id) {
				posts.splice(i, 1);
				$(this).closest('p').remove();
				return;
			}
		}

	})
}




$(document).ready(function(){

	//event handlers

	//add a new post
	$('.add-post').on('click', function() {

		//get value of input
		var namePost = $('#post-name').val();

		addPost(namePost);
		updatePosts();

	});


});

