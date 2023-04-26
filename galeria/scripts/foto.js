const mWbefore = document.querySelector('#bf');
const mWAfter = document.querySelector('#af');
const mWactual = document.querySelector('#actual');

class Album {
    constructor(fotos) {
        this.fotos = fotos;
    }

    mostrar(src, bf, af) {
        const image = createImage(src);
        const anterior = createImage(bf);
        const siguiente = createImage(af);
        document.body.classList.add('no-scroll');

        mWactual.appendChild(image);
        mWbefore.appendChild(anterior);
        mWAfter.appendChild(siguiente);
        modalView.classList.remove('hidden');
        document.addEventListener('keydown', this.esconder)
    }
    esconder() {
        document.body.classList.remove('no-scroll');
        modalView.classList.add('hidden');
        mWactual.innerHTML = '';
        /*document.body.classList.remove('no-scroll');
        modalView.classList.add('hidden');
        mWactual.innerHTML = '';*/
    }
    movimiento(event) {
        console.log(currentIndex)
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
            return;
        }
        let nextIndex = currentIndex;
        if (event.key === 'ArrowLeft') {
            nextIndex--;
        } else if (event.key === 'ArrowRight') {
            nextIndex++;
        }
        if (nextIndex < 0 || nextIndex === PHOTO_LIST.length) {
            return;
        }
        const act = PHOTO_LIST[nextIndex];
        const bfimg = PHOTO_LIST[nextIndex-1];
        const afimg = PHOTO_LIST[nextIndex+1];
        console.log(nextIndex-1,"",nextIndex,"",nextIndex+1);
        mWAfter.innerHTML = '';
        mWbefore.innerHTML = '';
        mWactual.innerHTML = '';
        this.mostrar(act,bfimg,afimg);
        currentIndex = nextIndex;
    }
}
const album = new Album();
const albumView = document.querySelector("#album-view");

for (let i = 0; i < PHOTO_LIST.length; i++) {
    const photoSrc = PHOTO_LIST[i];
    const image = createImage(photoSrc);
    image.dataset.index = i;
    image.addEventListener('click', onThumbnailClick);
    albumView.appendChild(image);
}

function onThumbnailClick(event) {
    currentIndex = event.currentTarget.dataset.index;
    const image = new Album(event.currentTarget.src);
    //const bfImg= PHOTO_LIST.indexOf(event.currentTarget.src.toString());
    const bfsrc = (PHOTO_LIST.indexOf(event.currentTarget.getAttribute('src').toString()) - 1);
    const afsrc = (PHOTO_LIST.indexOf(event.currentTarget.getAttribute('src').toString()) + 1);
    const bfimg = PHOTO_LIST[bfsrc];
    const afimg = PHOTO_LIST[afsrc];
    mWbefore.innerHTML = '';
    mWAfter.innerHTML = '';
    image.mostrar(event.currentTarget.src, bfimg, afimg);
    document.addEventListener('keydown', image.movimiento.bind(image));
    //modalView.remove.classList('hidden');
}

function createImage(src) {
    const image = document.createElement("img");
    image.src = src;
    return image;
}

const modalView = document.querySelector('#modal-view');
/*modalView.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) {
      album.esconder();
      console.log(e.keyCode)
    }
  });*/
//modalView.addEventListener('click',album.esconder())