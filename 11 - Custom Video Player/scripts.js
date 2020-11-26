// PUT IN SEPARATE scripts.js BC INVOLVED..

// GET OUR ELEMENTS
    const player = document.querySelector('.player');
    const video = player.querySelector('.viewer');
    const progress = player.querySelector('.progress');
    const progressBar = player.querySelector('.progress__filled')
    const toggle = player.querySelector('.toggle');
    const skipButtons = player.querySelectorAll('[data-skip]');
    const ranges = player.querySelectorAll('.player__slider');
    const fullScreen = player.querySelector('.full__screen');

// BUILD OUT FUNCTIONS
    function togglePlay() {
        const method = video.paused ? 'play' : 'pause';
        video[method]();
    }

    function updateButton() {
        const icon = this.paused ? '►' : '❚ ❚'
        toggle.textContent = icon;
        // console.log('Update the button')
    }

    function skip() {
        // console.log(this.dataset.skip);
        video.currentTime += parseFloat(this.dataset.skip) // this.dataset.skip IS A STRING SO CONVERT
    }

    function handleRangeUpdate() {
        video[this.name] = this.value;      // THIS IS FOR volume && playbackRate
        // console.log(this.name)
        // console.log(this.value);
    }

    function handleProgress() {
        const percent = (video.currentTime/video.duration)*100;
        progressBar.style.flexBasis = `${percent}%`
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth ) * video.duration;
        video.currentTime = scrubTime;
        // console.log(e)
    }

    let shrunk = true;
    function toggleScreen() {
        if (shrunk) {
           player.webkitRequestFullScreen()
        } else {
            shrunk = true;
        }
    }


// HOOK UP EVENT LISTENERS
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);           // DOES NOT DEPEND ON FUNCTION, JUST LISTENS FOR EVENT
    video.addEventListener('pause', updateButton);

    video.addEventListener('timeupdate', handleProgress);

    toggle.addEventListener('click', togglePlay);

    skipButtons.forEach(button => button.addEventListener('click', skip))

    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

    progress.addEventListener('click', scrub)

    let mousedown = false;
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
    // progress.addEventListener('mousemove', scrub)
    // progress.addEventListener('click', scrub)
    progress.addEventListener('mousemove', () => mousedown && scrub(e))

    fullScreen.addEventListener('click', toggleScreen)