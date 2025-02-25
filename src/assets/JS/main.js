const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCFmMw7yTuLTCuMhpZD5dVsg&part=snippet&order=date&maxResults=10';

const content = document.getElementById('content');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
        'X-RapidAPI-Key': '86bf6df6e7msh47fce2792ab1a59p1a1ff9jsn880a77b43f22'
    }
};

async function fetchData(urlApi) {
    try {
        const response = await fetch(urlApi, options);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos', error);
    }
}

(async () => {
    const videos = await fetchData(API);
    if (videos && videos.items) {
        content.innerHTML = videos.items.map(video => `
            <div class="group relative">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}">
                <h3>${video.snippet.title}</h3>
            </div>
        `).join('');
    } else {
        console.error('No se encontraron videos');
        content.innerHTML = 'No se lograron cargar los videos';
    }
})();
