let btns = document.querySelectorAll('[id*="btn-"]');

btns.forEach(e => {
    let btn_id = e.getAttribute('id');
    let body = document.querySelector('body');
    e.addEventListener('click', () => {
        switch(btn_id) {
            case 'btn-play':
                body.classList.add('play');
                break;
            case 'btn-theme':
                body.classList.toggle('dark');
                break;
        }
    })
})