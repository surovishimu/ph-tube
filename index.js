const loadAllCategory = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
        const data = await response.json();
        const load = data.data;
        return load;
    }
    catch (error) {
        console.error(error);
    }
}

const setCategory = async () => {
    const data = await loadAllCategory();
    const categoryUl = document.getElementById('all-category');
    for (const category of data) {
        // console.log(category);
        const li = document.createElement('li');
        li.innerHTML = `
        <li onclick="loadUrl('${category.category_id}')" class="btn mt-5 normal-case ">${category.category}</li>
        `
        categoryUl.appendChild(li);


    }
}
setCategory()

const loadUrl = async (idURL) => {

    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');
    const url = ` https://openapi.programming-hero.com/api/videos/category/${idURL}`;
    const response = await fetch(url);
    const loadImg = await response.json();

    displayNews(loadImg.data);
    

}


const convertSecToTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (!seconds) {
        return `${""}`;
    }
    else {
        return `${hours} hr ${minutes} min ago`;
    }

};

const displayNews = (displayCard) => {
   
    spinner.classList.add('hidden');
    const cardDetails = document.getElementById('card-container');
    const notFound = document.getElementById('not-found')
    cardDetails.textContent = "";
    notFound.textContent = "";

    if (displayCard.length === 0) {
        notFound.innerHTML = `
        <img class="mx-auto mt-10" src="./image/Icon.png" alt="">
        <h2 class="mt-5 p-5 text-2xl font-semibold text-black text-center">Oops!! Sorry, There is no <br> content here.</h2>`
        return;
    }
    // displayCard.sort((a, b) => {
    //     const c = a.others.views.slice(0, 3)
    //     const d = b.others.views.slice(0, 3)
    //     return d - c;
    // });
    displayCard.forEach(newsCard => {
        const newsCardDiv = document.createElement('div');
        newsCardDiv.innerHTML = `
        <div class="card card-compact  ">
                <figure class="relative"><img class="w-72 h-48 rounded-lg mb-3" src="${newsCard.thumbnail ? newsCard.thumbnail : 'not found'}" alt="Shoes" />
                <p class="absolute bottom-4 right-2 bg-gray-600 text-white rounded-sm text-xs">
                ${convertSecToTime(newsCard.others.posted_date ? newsCard.others.posted_date : "")}
                </p>
                
                </figure>
                <div class=" flex lg:justify-start justify-center px-2 gap-4 ">
                 <div class=""><img class="w-12 h-12 rounded-full" src="${newsCard.authors[0].profile_picture ? newsCard.authors[0].profile_picture : 'not found'}" alt="Shoes" /></div>
                 <div>
                 <div>
                 <h2 class="text-xl font-semibold">${newsCard.title}</h2>
                 <div class='flex gap-4'><p class="text-slate-400">${newsCard.authors[0].profile_name}</p>
                 <i>${newsCard.authors[0].verified ? '<span class="verified-symbol"><i class="fa-solid fa-certificate text-sky-400"></i></span>' : ''} </i>
                 </div>
                 <p class="text-slate-400 text-xs">${newsCard.others.views} views</p>
                 </div> </div>  
                </div>     
            </div>
        `
        cardDetails.appendChild(newsCardDiv)

    });

}

// const sortButton=document.getElementById('sort-btn').addEventListener('click',function(){

    
// })

loadUrl('1000');