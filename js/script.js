
// default home page components to hide
$("#goback").hide()
$(".posts").hide()


let usersURL = `https://jsonplaceholder.typicode.com/users`;
$.ajax({url:usersURL,success: function(users){
	let userTableHtml = "";
	listUsers = users
	users.map( (user,idx) => {
		if(idx>4)return
		userTableHtml += `<tr>
				<td>${user.name}</td>
				<td>${user.username}</td>
				<td>${user.address.street+" ,"+user.address.city+" ,"+user.address.zipcode}</td>
				<td>${user.website}</td>
				<td><button class="btn btn-outline-primary" id='${user.id}'>show posts</button</td>
			</tr>`;
		});

	//  Set tbody html to user Data
	$(`table.users tbody`).html(userTableHtml);
}});

// Binding events to dynamically created button in the table
$(document).on('click','.users tbody tr td button',function(e){
	
	// show/hide tables to achieve Single Page Application
	$(".users").hide();
	$("#goback").show();

	// getting all the posts user has made
	let postsURL = `https://jsonplaceholder.typicode.com/users/${e.target.id}/posts`;

	//mapping over posts to get posts
	$.ajax({url:postsURL}).done(function(posts){
		let postTableHtml = "";
		posts.map( post => {
			postTableHtml += `<div>
					<h3 class="font-italic">Title: ${post.title}</h3>
					<p class="font-weight-light">Body: ${post.body}</p>
					<p>
						<button id="${post.id}" class="btn btn-outline-link">Show Comments</button>
					</p>
					<div id="${"comments"+post.id}">
					</div>
				</div>`;
		});

// showing & adding posts
	$(".posts").show()
// setting posts html to formatted posts data
	$(`div.posts`).html(postTableHtml);
	})
})



// SPA AJAX GO BACK BUTTON 
$("#goback").click(function(){
	$(this).hide();
	$(".users").show();
	$(".posts").hide();
});

$("button#showMore").click(function(){
	let usersURL = `https://jsonplaceholder.typicode.com/users`;
	$.ajax({url:usersURL,success: function(users){
		let userTableHtml = "";
		listUsers = users
		users.map( (user,idx) => {
			userTableHtml += `<tr>
					<td>${user.name}</td>
					<td>${user.username}</td>
					<td>${user.address.street+" ,"+user.address.city+" ,"+user.address.zipcode}</td>
					<td>${user.website}</td>
					<td>
					<button class="btn btn-outline-primary" id='${user.id}'>show posts</button>
					</td>
				</tr>`;
		});
		$(`table.users tbody`).html(userTableHtml);
	}});
	// Hiding Show More
	$("#showMore").hide();
	// Binding events to dynamically created button in the table
	$(document).on('click','.users tbody tr td button',function(e){
})})

// Binding events to dynamically created button in the table
$(document).on('click','div.posts button',function(e){
	let url = `https://jsonplaceholder.typicode.com/posts/${e.target.id}/comments`;
	$(`#comments${e.target.id}`).html("<h2>Comments:<h2>")
	$(this).hide()
	$.ajax({url,
		success:function(comments){
			comments.map((comment,idx)=>{
				$(`#comments${e.target.id}`).append(`<p  class="text-center"><span class="font-weight-bold">${idx}: </span>${comment.body}</p>`)

			})},
		failure:function(comments){
			alert("fails");
	}});
});