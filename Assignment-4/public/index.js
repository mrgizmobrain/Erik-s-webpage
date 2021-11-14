/*
 * Add the contents of your index.js file from Assignment 3 here to see the
 * interactions you implemented.  This is not required for your grade on this
 * assignment, but it'll allow you to have the full experience of the site
 * as we've implemented it so far.
 */

function toggleModal () {
    document.getElementById('modal-backdrop').classList.toggle('hidden')
    document.getElementById('sell-something-modal').classList.toggle('hidden')
    document.getElementById('post-text-input').value = ''
    document.getElementById('post-photo-input').value = ''
    document.getElementById('post-price-input').value = ''
    document.getElementById('post-city-input').value = ''
    document.getElementById('post-condition-new').checked = true
}

function generateNewPost (condition, photoURL, itemDescription, price, city) {
    var outerDiv = document.createElement('div')
    outerDiv.classList.add('post')
    outerDiv.setAttribute('data-price', price)
    outerDiv.setAttribute('data-city', city)
    outerDiv.setAttribute('data-condition', condition)
    
    var contentsDiv = document.createElement('div')
    contentsDiv.classList.add('post-contents')
    outerDiv.appendChild(contentsDiv)
    
    var imageDiv = document.createElement('div')
    imageDiv.classList.add('post-image-container')
    contentsDiv.appendChild(imageDiv)
    
    var image = document.createElement('img')
    image.src = photoURL
    image.alt = itemDescription
    imageDiv.appendChild(image)
    
    var infoDiv = document.createElement('div')
    infoDiv.classList.add('post-info-container')
    contentsDiv.appendChild(infoDiv)
    
    var link = document.createElement('a')
    link.classList.add('post-title')
    link.href = '#'
    link.textContent = itemDescription
    infoDiv.appendChild(link)
    
    var postPrice = document.createElement('span')
    postPrice.classList.add('post-price')
    postPrice.textContent= '$' + price
    infoDiv.appendChild(postPrice)
    
    var postCity = document.createElement('span')
    postCity.classList.add('post-city')
    postCity.textContent = city
    infoDiv.appendChild(postCity)
    
    var postsContainer = document.getElementById('posts')
    postsContainer.appendChild(outerDiv)
    
    return outerDiv
}

function updateFilters (allPosts) {
    var aside = document.getElementById('posts').parentNode
    document.getElementById('posts').remove()
    var newPosts = allPosts.cloneNode(true)
    aside.appendChild(newPosts)
    
    var posts = document.getElementsByClassName('post')
    
    var textFilter = document.getElementById('filter-text').value
    var postTitle = document.getElementsByClassName('post-title')
    var priceMin = document.getElementById('filter-min-price').value
    if(priceMin === '')
        priceMin = 0
    else 
        priceMin = parseInt(priceMin)
    var priceMax = document.getElementById('filter-max-price').value
    if(priceMax === '')
        priceMax = Infinity
    else
        priceMax = parseInt(priceMax)
    var cityFilter = document.getElementById('filter-city').value
    var filterConditions = ''
    var checkbox = document.getElementsByName('filter-condition')
    for (var i = 0; i < checkbox.length; i++) {
        if(checkbox[i].checked)
            filterConditions = filterConditions + checkbox[i].value;
    }
    if(filterConditions === '')
        filterConditions = 'newexcellentgoodfairpoor'
    
    for(var i = posts.length-1; i >= 0; i--) {
        if(!((postTitle[i].textContent.includes(textFilter))&&(parseInt(posts[i].getAttribute('data-price')) >= priceMin)&&(parseInt(posts[i].getAttribute('data-price')) <= priceMax)&&(posts[i].getAttribute('data-city').includes(cityFilter))&&(filterConditions.includes(posts[i].getAttribute('data-condition')))))
            posts[i].remove()
    }
}


var allPosts = document.getElementById('posts').cloneNode(true)

var newPostButton = document.getElementById('sell-something-button')
newPostButton.addEventListener('click', toggleModal)
var modalCloseButton = document.getElementById('modal-close')
modalCloseButton.addEventListener('click', toggleModal)
var modalCancelButton = document.getElementById('modal-cancel')
modalCancelButton.addEventListener('click', toggleModal)

var modalAcceptButton = document.getElementById('modal-accept')

modalAcceptButton.addEventListener('click', function () {
    if(document.getElementById('post-photo-input').value==='' || document.getElementById('post-text-input').value==='' || document.getElementById('post-price-input').value==='' || document.getElementById('post-city-input').value ==='')
        alert('Please fill out all inputs.')
    else { 
        var posts = generateNewPost(document.querySelector('input[name="post-condition"]:checked').value, document.getElementById('post-photo-input').value, document.getElementById('post-text-input').value, price = document.getElementById('post-price-input').value, document.getElementById('post-city-input').value)
        toggleModal()
        postz = posts.cloneNode(true)
        allPosts.appendChild(postz)
        console.log(document.getElementById('posts'))
        console.log(allPosts)
    }
})

var updateButton = document.getElementById('filter-update-button')
updateButton.addEventListener('click', function () {
    updateFilters(allPosts)
})