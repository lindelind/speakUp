
let postIdCounter = parseInt(localStorage.getItem('postIdCounter'));

if (isNaN(postIdCounter)) {
    postIdCounter = 0; 
}

existingPosts = JSON.parse(localStorage.getItem("posts"));
if (!Array.isArray(existingPosts)) {
    existingPosts = [];
}

function submitPost() {
  let errorMsg = document.getElementById("error-msg");
  let postTitle = document.getElementById("post-title").value;
  let postUser = document.getElementById("post-user").value;
  let postText = document.getElementById("post-text").value;
  let postDate = new Date().toLocaleString();

  errorMsg.innerHTML = "Ditt inlägg är postat!";

  let existingPosts = JSON.parse(localStorage.getItem("posts")) || [];

  let postId = postIdCounter++; 
  existingPosts.push({
    id: postId,
    title: postTitle,
    user: postUser,
    text: postText,
    date: postDate,
  });

  if (postTitle === "" || postUser === "" || postText === "") {
    errorMsg.innerHTML = "Fält får ej lämnas tomt";
    return;
  }

  postTitle = document.getElementById("post-title").value = "";
  postUser = document.getElementById("post-user").value = "";
  postText = document.getElementById("post-text").value = "";


  localStorage.setItem("postIdCounter", postIdCounter);
 
  localStorage.setItem("posts", JSON.stringify(existingPosts));

  updatePostList();
}

function validatePost() {
  let postTitle = document.getElementById("post-title").value;

  if (postTitle === "") {
    document.getElementById("error-msg").innerHTML =
      "Rubrik får ej lämnas tomt";
    return;
  }
}

function updatePostList() {
    var postList = document.getElementById("post-list");
    var storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

    postList.innerHTML =  `
    <thead>
        <tr>
            <th class="headline-table">Inläggsrubrik</th>
            <th class="headline-user">Postat av</th>
            <th class="headline-date">Trådstart Datum</th>
        </tr>
    </thead>
 
`;
    if (storedPosts.length > 0) {
        storedPosts.forEach(function(post) {
        let newRow = postList.insertRow(-1);
        let titleCell = newRow.insertCell(0);
        let userCell = newRow.insertCell(1);
        let dateCell = newRow.insertCell(2);
        let deleteButton = document.createElement('button');
        
        newRow.appendChild(deleteButton);
        deleteButton.id = "delete-button" + post.id;
        deleteButton.classList.add('delete-button');

    
        titleCell.innerHTML = `<a href="#">${post.title}</a>`;
        userCell.innerHTML = `<a href="#">${post.user}</a>`;
        dateCell.innerHTML = post.date;
        deleteButton.innerHTML= "Radera";

        deleteButton.addEventListener("click", function() {
            deletePost(post.id);
        });
        
       

        let textRow = postList.insertRow(-1);
        let textCell = textRow.insertCell(0);
        textCell.id = "text-cell";
        textCell.colSpan = 4;
        textCell.innerHTML = `<p> <b>Meddelande:</b> <br> ${post.text}</p>`;

        titleCell.addEventListener("click", function(e){
            e.preventDefault();
            textCell.style.display = (textCell.style.display === "table-cell") ? "none" : "table-cell";
        });
    })}
}


function deletePost(postId) {
    var storedPosts = JSON.parse(localStorage.getItem("posts"));
    postId = parseInt(postId);

    var indexToDelete = storedPosts.findIndex(post => post.id === postId);

    if (indexToDelete !== -1) {
        storedPosts.splice(indexToDelete, 1);

        localStorage.setItem("posts", JSON.stringify(storedPosts));
        updatePostList();
    }
}

window.onload = function() {
    updatePostList();
};


