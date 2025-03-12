const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
};

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(response => response.json())
        .then(data => displayVideos(data.videos))
}

const loadCategoriesVideo = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayVideos(data.category))
        .then(err => (err))
};


const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("category-container");

    // { category_id: '1001', category: 'Music' }

    categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button onclick="loadCategoriesVideo(${category.category_id})" class="btn btn-small hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
        categoriesContainer.appendChild(categoryDiv)
    });
}


// {
//     "category_id": "1001",
//         "video_id": "aaaa",
//             "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//                 "title": "Shape of You",
//                     "authors": [
//                         {
//                             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//                             "profile_name": "Olivia Mitchell",
//                             "verified": ""
//                         }
//                     ],
//                         "others": {
//         "views": "100K",
//             "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = "";
    if(videos.length === 0){
        videoContainer.innerHTML = `
    <div class="md:col-span-full lg:col-span-full flex flex-col justify-center items-center">
            <img class="w-40" src="./assets/Icon.png" alt="">
            <h1 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h1>
        </div>
    `
    return; 
    }
    videos.forEach(video => {
        const { category_id, video_id, thumbnail, title, authors, others, description } = video;

        const videoDiv = document.createElement("div");
        videoDiv.innerHTML = `
       <div class="card bg-base-100 shadow-sm space-y-3">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-sm bg-black/50 rounded p-1 text-white">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                            <img src="${authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro space-y-2 pb-2">
                    <h2 class="text-lg font-bold">${title}</h2>
                    <div class="flex justify-start">
                        <p class="text-[#17171770]">${authors[0].profile_name}</p>
                        <img class="w-5" src="https://img.icons8.com/?size=96&id=FNbnqlDTjR45&format=gif" alt="">
                    </div>
                    <p class="text-[#17171770]">${others.views} views</p>
                </div>
            </div>
        </div>
        `;

        videoContainer.append(videoDiv)
    });
}

loadCategories();
// loadVideos(); 