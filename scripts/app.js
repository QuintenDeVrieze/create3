document.addEventListener('DOMContentLoaded', () => {
    toggleLoader();
    loadData('https://rickandmortyapi.com/api/character');
    loadMore();
})

let isLoading = false;
let nextCall;

function toggleLoader() {
    const loader = document.querySelector('.c-loader');
    const grid = document.querySelector('.c-grid');

    isLoading
        ? isLoading = false
        : isLoading = true;

    isLoading
        ? (loader.classList.add('loading') & grid.classList.add('loading') & document.querySelector('body').classList.add('loading'))
        : (loader.classList.remove('loading') & grid.classList.remove('loading') & document.querySelector('body').classList.remove('loading'));
}

function loadData(url) {
    fetch(`${url}`)
        .then(response => {
            if (!response.ok) {
                throw Error('Probleem bij fetch', response.status);
            } else {
                response.json().then(data => {
                    console.log(data.info)
                    nextCall = data.info.next;
                    verwerkData(data.results);
                }).then(() => {
                    setTimeout(() => {
                        toggleLoader();
                    }, 1000);
                })
            }
        });
}

function verwerkData(data) {
    const grid = document.querySelector('.c-grid');

    data.forEach(character => {
        let episodes = character.episode.length;
        let importance = ((episodes / 41) * 100);
        let deadOrAlive = character.status === 'unknown'
            ? "Who knows???"
            : character.status === 'Alive'
                ? "I'm Alive! 🤩"
                : "I'm Dead... ☠️";
        const html = `
            <div class="c-character" id="${character.id}">
                <div class="c-character--image">
                    <div class="c-character--image-bg" style="background-image: url('${character.image}')"></div>
                </div>

                <div class="c-character--info">
                    <div class="c-character--info__name">${character.name}</div>
                    <div class="c-character--info__location">Lives on ${character.location.name}</div>
                    <div class="c-character--info__gender">${character.gender}</div>
                    <div class="c-character--info__alive">${deadOrAlive}</div>
                    <div class="c-character--info__importance">I am in ${importance.toFixed(2)}% of all the episodes</div>
                    <div class="c-character--info__importance-meter">
                        <div class="c-character--info__importance-meter-balk" style="transition: width 240ms ease-in-out; transition-delay: .2s; width: ${Math.floor(importance)}%"></div>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += html;
    });
}

function loadMore() {
    const button = document.querySelector('.c-grid--load-more__button');

    button.addEventListener('click', () => { 
        toggleLoader();
        loadData(nextCall); 
    });
}