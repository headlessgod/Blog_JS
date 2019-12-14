'use strict'

const manegerApi = {
    apiKey: 'c5b502e4b4d05153971b1c0490732c57',

    // Get list posts METHOD GET
    getPosts(limit=10, page=1) {
        const params = `limit=${limit}&&page=${page}&&api_key=${this.apiKey}`;
        const url = `http://blog.api.axenov-it.com/v1/posts?${params}`;

        return fetch(url)
        .then ((responce) => {
            return responce.json();
        });
    },

    // Create post METHOD POST
    sendPost(post) {

        const params = `api_key=${this.apiKey}`;
        const url = `http://blog.api.axenov-it.com/v1/posts?${params}`;

        const request = {
            method: 'POST',
            body: JSON.stringify(post)
        }

        return fetch(url, request)
        .then ((responce) => {
            return responce.json();
        });
    },
}


// manegerApi.addPost({
//     title: 'TestTitle',
//     seo_url: 'post-1-title',
//     full_description: 'post-1-full-description',
//     short_description: 'post-1-short-description',
//     status: true,
// })

// manegerApi.getPosts().then((data)=>console.log(data))


const managerView = {
    title: document.querySelector('#title'),
    postsList: document.querySelector('#posts-list'),
    seoUrl: document.querySelector('#seo-url'),
    shortDescription: document.querySelector('#short-description'),
    fullDescription: document.querySelector('#full-description'),
    status: document.querySelector('#status'),
    btnSend: document.querySelector('#send-post'),

    addPost(){
        console.log('POST SENT');
        manegerApi.sendPost({
            title: this.title.value,
            seo_url: this.seoUrl.value,
            status: this.status.checked,
            full_description: this.fullDescription.value,
            short_description: this.shortDescription.value,
        }).then(()=>{
            manegerApi.getPosts(50, 1)
            .then((data)=> this.renderPosts(data.posts));
        });
    },

    renderPosts(posts){

        let html = '';

        for(let post of posts){
            html += `
                <tr>
                    <td>${post.title}</td>
                    <td>${post.status}</td>
                    <td>${post.short_description}</td>
                    <td>${post.full_description}</td>
                </tr>
            `
        }

        this.postsList.innerHTML = html;

    },

    init(){
        this.btnSend.onclick = this.addPost.bind(this);

        manegerApi.getPosts(50, 1)
        .then((data)=> this.renderPosts(data.posts));
    }
}

managerView.init();