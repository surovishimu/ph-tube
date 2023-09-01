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
const setCategory = async (sort) => {
    const data = await loadAllCategory();
    const categoryUl = document.getElementById('all-category');
    let activeButton = null;

    const handleButtonClick = (event, categoryId) => {

        if (activeButton) {
            activeButton.classList.remove('active', 'bg-[#FF1F3D]', 'text-white');
        }

        event.target.classList.add('active', 'bg-[#FF1F3D]', 'text-white');
        activeButton = event.target;

        loadUrl(categoryId);
        sortBtn(categoryId);
    };

    for (let i = 0; i < data.length; i++) {
        const category = data[i];
        const li = document.createElement('li');
        const button = document.createElement('button');

        button.textContent = category.category;
        button.className = 'btn mt-5 normal-case lg:w-32 md:w-24 w-16 category-button hover:text-black';

        button.addEventListener('click', (event) => {
            handleButtonClick(event, category.category_id);
        });

        li.appendChild(button);
        categoryUl.appendChild(li);

        if (i === 0) {
            button.classList.add('active','bg-[#FF1F3D]','text-white');
            activeButton = button;
        }
    }
};

setCategory();



const loadUrl = async (idURL, sort = false) => {

    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');
    const url = ` https://openapi.programming-hero.com/api/videos/category/${idURL}`;
    const response = await fetch(url);
    const loadImg = await response.json();

    displayNews(loadImg.data, sort);


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

const displayNews = (displayCard, sort) => {

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

    if (sort == true) {
        displayCard.sort((a, b) => {
            return parseFloat(b.others.views) - parseFloat(a.others.views);
        });
    }
    displayCard.forEach(newsCard => {
        const newsCardDiv = document.createElement('div');
        newsCardDiv.innerHTML = `
        <div class="card card-compact  ">
                <figure class="relative"><img class="w-72 h-48 rounded-lg mb-3" src="${newsCard.thumbnail ? newsCard.thumbnail : 'not found'}" alt="Shoes" />
                <p class="absolute bottom-4 right-2 bg-gray-800 text-white rounded-sm text-xs ">
                ${convertSecToTime(newsCard.others.posted_date ? newsCard.others.posted_date : "")}
                </p>
                
                </figure>
                <div class=" flex lg:justify-start justify-center px-2 gap-4 ">
                 <div class=""><img class="w-12 h-12 rounded-full" src="${newsCard.authors[0].profile_picture ? newsCard.authors[0].profile_picture : 'not found'}" alt="Shoes" /></div>
                 <div>
                 <div>
                 <h2 class="text-xl font-semibold">${newsCard.title}</h2>
                 <div class='flex gap-4'><p class="text-slate-400">${newsCard.authors[0].profile_name}</p>
                 <i class="relative">${newsCard.authors[0].verified ? '<span class="verified-symbol"><i class="fa-solid fa-certificate text-sky-500 fa-lg"></i><i class="fa-solid fa-check text-white absolute fa-xs top-3 right-2 left-1 "></i></span>' : ''} </i>
                 </div>
                 <p class="text-slate-400 text-xs">${newsCard.others.views} views</p>
                 </div> </div>  
                </div>     
            </div>
        `
        cardDetails.appendChild(newsCardDiv)

    });

}

const sortBtn = id => {
    const btnContainer = document.getElementById('sort-btn');
    btnContainer.textContent = '';
    btnContainer.innerHTML = `
    <button  onclick="loadUrl('${id}',true)"  class="btn btn-sm md:btn-md bg-gray-300 rounded hover:bg-[#FF1F3D] text-black hover:text-white text-base  md:text-lg normal-case">Sort by view</button>
    `

}

loadUrl('1000');