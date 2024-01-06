
let posts = JSON.parse(localStorage.getItem('posts'));
console.log(posts);
posts.reverse();


let post1 = document.getElementById('posts-card-1');
let post2 = document.getElementById('posts-card-2');
let post3 = document.getElementById('posts-card-3');



for (let i = 0; i < 3; i++) {
    let postCard = `
      <div class="post-card">
        <h3>${posts[i].title}</h3>
        <p><i>Postat av: ${posts[i].user}</i></p>
        <p class="post-text">${posts[i].text}</p> 
        <p class="read-more"><a href="#">Läs mer...</a></p>
      </div>
    `;

   
    
    switch (i) {
      case 0:
        post1.innerHTML += postCard;
        break;
      case 1:
        post2.innerHTML += postCard;
        break;
      case 2:
        post3.innerHTML += postCard;
        break;
      default:
        
        break;
    }
  }


  let readMore = document.querySelectorAll('.read-more');

  for (let i = 0; i < readMore.length; i++) {
    readMore[i].addEventListener("click", function(e){
      e.preventDefault();
      let postText = e.target.parentElement.previousElementSibling;
      postText.style.display = (postText.style.display === "block") ? "none" : "block";
      
      // Uppdatera endast texten, behåll övrig HTML-struktur
      if (postText.style.display === "block") {
        readMore[i].innerHTML = `<a href="#">Läs mindre...</a>`;
      } else {
        readMore[i].innerHTML = `<a href="#">Läs mer...</a>`;
      }
    });
  }
  