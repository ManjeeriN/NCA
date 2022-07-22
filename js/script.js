
const baseUrl = "https://manjeerin.github.io/nca.github.io"; // production Url
const localUrl = "http://localhost/nca" // local Url
const logoImage = `<img src="images/logo.png" class = "logo" alt="Logo">`

// get all news by collection Id
const getNewsByCollectionId  = (collectionId) => {
    if(collectionId){
        fetch(baseUrl+"/api/collection.json",)
        .then((response) => response.json())
        .then((json) => { 
            if(json) filterNews(collectionId,json) 
        }).catch(e => console.log(e));
    }
}

// filter the news whose collection id is passed only
const filterNews = (collectionId = 0,newsList = []) => {
    let filteredList = []
    if( newsList.length > 0 && collectionId > 0 ) {
        filteredList =  newsList.filter((news)=>{ return  news.collectionid == collectionId } ) 
    } 
    // append these news to html
    let exclusiveArticles = ``;
    let mainArticles = ``;
    let otherArticles = ``;
    const exclusiveArticleHTML = document.getElementById('exclusive-article');
    const mainArticleHTML = document.getElementById('main-article');
    const otherArticleHTML = document.getElementById('other-article');
    filteredList.forEach(news => {
        if(news.type == "exclusive"){
            // append news that are exclusive
            exclusiveArticles += appendExclusiveArticle(news)
        } else if(news.type == "main") {
            // append news that are main
            mainArticles += appendMainArticle(news)
        }else{
            // append other news
            otherArticles += appendOtherArticles(news)
        }  
    });
    if(exclusiveArticleHTML){
        exclusiveArticleHTML.innerHTML = exclusiveArticles
    }
    if(mainArticleHTML){
        mainArticleHTML.innerHTML = mainArticles
    }
    if(otherArticleHTML){
        otherArticleHTML.innerHTML = otherArticles
    }
}

const appendExclusiveArticle = (news) => {
    news = checkNull(news)
    return `<article>
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
}

const appendMainArticle = (news) => {
    news = checkNull(news)
    return `<img src="images/${news.Imageurl}" class = "w-100" alt="${news.Title}">
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
}

const appendOtherArticles = (news) => {
    news = checkNull(news)
    return `<div class="row">
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

const checkNull = (news) => {
    return {
        Title : news.Title?news.Title:'',
        Imageurl : news.Imageurl?news.Imageurl:'',
        Intro : news.Intro?news.Intro:'',
        Published : news.Published?news.Published:'',
        comment : news.comment?news.comment:'',
        type:news.type,
        collectionid:news.collectionid
    }
}
  
getNewsByCollectionId(2);