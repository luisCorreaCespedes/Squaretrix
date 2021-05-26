let btns = document.querySelectorAll('[id*="btn-"]');

btns.forEach(e => {
    let btn_id = e.getAttribute('id');
    let body = document.querySelector('body');
    e.addEventListener('click', () => {
        switch(btn_id) {
            case 'btn-play':
                body.classList.add('play');
                if (body.classList.contains('pause')){
                    body.classList.remove('pause');
                }
                break;
            case 'btn-theme':
                body.classList.toggle('dark');
                break;
            case 'btn-pause':
                let btn_play = document.querySelector('#btn-play');
                btn_play.innerHTML = 'Continuar';
                body.classList.remove('play');
                body.classList.add('pause');
                break;   
            case 'btn-new-game':
                body.classList.add('play');
                body.classList.remove('pause');
                break; 
        }
    })
})