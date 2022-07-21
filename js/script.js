function getCollectionsById(collectionId) {
    fetch("http://localhost/test/api/collection.json")
      .then((response) => response.json())
      .then((json) => 
        filterNews(collectionId,json)
      );
  }

  function filterNews(collectionId,newsList) {
   let filteredList =  newsList.filter((news)=>{ return  news.collectionid == collectionId})  
   // add these news to html
   let logoImage = `<img src="images/logo.png" class = "logo" alt="Logo">`
   let exclusiveArticles = ``;
   let mainArticles = ``;
   let otherArticles = ``;
    let mainArticleHTML = document.getElementById('main-article');
    let exclusiveArticleHTML = document.getElementById('exclusive-article');
    let otherArticleHTML = document.getElementById('other-article');
    filteredList.forEach(news => {
    if(news.type == "exclusive"){
        exclusiveArticles += `<article>
        <img src="images/${news.Imageurl}" class = "w-100" alt="${news.Title}">
        <h4>
            ${logoImage}
            ${news.Title}</h4>
        <p class="mb-5 description">
            <span class="tag">EXCLUSIVE</span>
            ${news.Intro}
            <p class = "article-time">
                <i class="fa fa-clock-o"></i> ${news.Published}
                <i class="fa fa-comment-o" aria-hidden="true"></i>${news.comment}
            </p>
        </p>
        </article>`
    } else if(news.type == "main") {
        mainArticles += ` <img src="images/Greg_Inglis_Australia.jpg" class = "w-100" alt="Image">
            <h3>
            ${logoImage}
            ${news.Title}</h3>
            <p class="mb-5 description">
            ${news.Intro}
                <p class = "article-time">
                    <i class="fa fa-clock-o"></i> ${news.Published}
                    <i class="fa fa-comment-o" aria-hidden="true"></i>${news.comment}
                </p>
            </p> `
    }else{
        otherArticles += `
        <div class="row">
            <div class="col-md-8 col-sm-12">
                <h5>
                    ${logoImage}
                    ${news.Title}</h5> 
                <p class="mb-5 description">                
                    
                </p>
            </div>
            <div class="col-md-4 col-sm-12"> 
                <img src="images/${news.Imageurl}" class = "w-100" alt="${news.Title}">
            </div>
            <div class="col-md-12 col-sm-12">
                <p class = "article-time">
                        <i class="fa fa-clock-o"></i> ${news.Published}
                    </p>
            </div>
        </div> `
    }  
   });
   exclusiveArticleHTML.innerHTML = exclusiveArticles
   mainArticleHTML.innerHTML = mainArticles
   otherArticleHTML.innerHTML = otherArticles
  }
  
  getCollectionsById(2);