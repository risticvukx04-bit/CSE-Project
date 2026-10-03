
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // YES / NO QUESTION
    // =========================

    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");
    const answerArea = document.getElementById("answer-area");

    let noClicks = 0;

    const sadImages = [
        "Slike/madmad.jpg",
        "Slike/pigpig.jpg",
        "Slike/wc.jpg"
    ];

    if (yesButton && answerArea) {

        yesButton.addEventListener("click", function () {

            answerArea.innerHTML = `
                <img
                    src="Slike/happycat.gif.gif"
                    alt="Happy cat"
                    style="width: 120px !important; height: 120px !important; max-width: 120px !important; max-height: 120px !important; object-fit: contain;"
                >

                <p class="answer-text">
                    I knew it! ❤️
                </p>
            `;

        });

    }


    if (noButton && answerArea) {

        noButton.addEventListener("click", function () {

            if (noClicks < sadImages.length) {

                answerArea.innerHTML = `
                    <img
                        src="${sadImages[noClicks]}"
                        alt="Reaction"
                        style="width: 120px !important; height: 120px !important; max-width: 120px !important; max-height: 120px !important; object-fit: contain;"
                    >

                    <p class="answer-text">
                        Are you sure? 🥺
                    </p>
                `;

                noClicks++;

            } else {

                answerArea.innerHTML = `
                    <p class="answer-text">
                        You really said NO three times? 😭
                    </p>
                `;

            }

        });

    }


    // =========================
    // SECTION ANIMATIONS
    // =========================

    const sections =
        document.querySelectorAll(".section");

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    sections.forEach(function (section) {
        observer.observe(section);
    });


    // =========================
    // COUNTDOWN
    // =========================

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    const targetDate =
        new Date(
            "2026-10-11T00:00:00+03:00"
        ).getTime();


    function updateCountdown() {

        if (
            !daysElement ||
            !hoursElement ||
            !minutesElement ||
            !secondsElement
        ) {
            return;
        }


        const now =
            new Date().getTime();

        const difference =
            targetDate - now;


        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            return;
        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (difference /
                (1000 * 60 * 60)) % 24
            );


        const minutes =
            Math.floor(
                (difference /
                (1000 * 60)) % 60
            );


        const seconds =
            Math.floor(
                (difference / 1000) % 60
            );


        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    // =========================
    // MUSIC PLAYER
    // =========================

    const playlistSongs =
        document.querySelectorAll(
            ".playlist-song"
        );


    const mainCover =
        document.getElementById(
            "main-cover"
        );

    const mainTitle =
        document.getElementById(
            "main-title"
        );

    const mainArtist =
        document.getElementById(
            "main-artist"
        );

    const mainPlay =
        document.getElementById(
            "main-play"
        );

    const progress =
        document.getElementById(
            "progress"
        );

    const currentTime =
        document.getElementById(
            "current-time"
        );

    const totalTime =
        document.getElementById(
            "total-time"
        );


    // =========================
    // SONGS
    // =========================

    const songs =
        Array.from(
            playlistSongs
        ).map(function (element) {

            return {

                title:
                    element.dataset.title,

                artist:
                    element.dataset.artist,

                cover:
                    element.dataset.cover,

                videoId:
                    element.dataset.video

            };

        });


    let currentSong = 0;

    let player = null;

    let playerReady = false;


    // =========================
    // UPDATE SONG DISPLAY
    // =========================

    function updateSongDisplay() {

        if (
            !songs.length ||
            !mainCover ||
            !mainTitle ||
            !mainArtist ||
            !mainPlay
        ) {
            return;
        }


        const song =
            songs[currentSong];


        mainCover.src =
            song.cover;


        mainTitle.textContent =
            song.title;


        mainArtist.textContent =
            song.artist;


        playlistSongs.forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

            }
        );


        if (playlistSongs[currentSong]) {

            playlistSongs[currentSong]
                .classList.add("active");

        }


        if (progress) {
            progress.style.width = "0%";
        }

        if (currentTime) {
            currentTime.textContent = "0:00";
        }

        if (totalTime) {
            totalTime.textContent = "0:00";
        }

        mainPlay.textContent = "▶";

    }


    // =========================
    // CREATE YOUTUBE PLAYER
    // =========================

    function createYouTubePlayer() {

        if (
            typeof YT === "undefined" ||
            !YT.Player ||
            !songs.length
        ) {
            return;
        }


        player =
            new YT.Player(
                "youtube-player",
                {

                    height: "1",
                    width: "1",

                    videoId:
                        songs[0].videoId,

                    playerVars: {

                        autoplay: 0,
                        controls: 0,
                        playsinline: 1

                    },

                    events: {

                        onReady:
                            function () {

                                playerReady =
                                    true;

                                updateSongDisplay();

                            },


                        onStateChange:
                            function (event) {

                                if (!mainPlay) {
                                    return;
                                }


                                if (
                                    event.data ===
                                    YT.PlayerState.PLAYING
                                ) {

                                    mainPlay.textContent =
                                        "❚❚";

                                }


                                if (
                                    event.data ===
                                    YT.PlayerState.PAUSED
                                ) {

                                    mainPlay.textContent =
                                        "▶";

                                }


                                if (
                                    event.data ===
                                    YT.PlayerState.ENDED
                                ) {

                                    mainPlay.textContent =
                                        "▶";

                                }

                            }

                    }

                }
            );

    }


    // =========================
    // YOUTUBE API
    // =========================

    if (
        window.YT &&
        window.YT.Player
    ) {

        createYouTubePlayer();

    } else {

        window.onYouTubeIframeAPIReady =
            createYouTubePlayer;

    }


    // =========================
    // SELECT SONG
    // =========================

    playlistSongs.forEach(
        function (songElement, index) {

            songElement.addEventListener(
                "click",
                function () {

                    currentSong =
                        index;


                    updateSongDisplay();


                    // Selecting a song
                    // does NOT play it.

                    if (
                        playerReady &&
                        player
                    ) {

                        player.pauseVideo();

                    }

                }
            );

        }
    );


    // =========================
    // PLAY / PAUSE
    // =========================

    if (mainPlay) {

        mainPlay.addEventListener(
            "click",
            function () {

                if (
                    !playerReady ||
                    !player
                ) {
                    return;
                }


                const selectedVideoId =
                    songs[currentSong].videoId;


                const currentVideoId =
                    player
                        .getVideoData()
                        .video_id;


                const state =
                    player.getPlayerState();


                // PAUSE

                if (
                    state ===
                    YT.PlayerState.PLAYING
                ) {

                    player.pauseVideo();

                    return;

                }


                // PLAY SELECTED SONG

                if (
                    currentVideoId ===
                    selectedVideoId
                ) {

                    player.playVideo();

                } else {

                    player.loadVideoById(
                        selectedVideoId
                    );

                    player.playVideo();

                }

            }
        );

    }


    // =========================
    // PROGRESS BAR
    // =========================

    setInterval(
        function () {

            if (
                !playerReady ||
                !player ||
                !progress ||
                !currentTime ||
                !totalTime
            ) {
                return;
            }


            const duration =
                player.getDuration();

            const current =
                player.getCurrentTime();


            if (duration > 0) {

                const percentage =
                    (current / duration) * 100;


                progress.style.width =
                    percentage + "%";


                currentTime.textContent =
                    formatTime(current);


                totalTime.textContent =
                    formatTime(duration);

            }

        },
        500
    );


    // =========================
    // FORMAT TIME
    // =========================

    function formatTime(seconds) {

        seconds =
            Math.floor(seconds);


        const minutes =
            Math.floor(
                seconds / 60
            );


        const remainingSeconds =
            seconds % 60;


        return (
            minutes +
            ":" +
            String(
                remainingSeconds
            ).padStart(2, "0")
        );

    }


    // =========================
    // CLICK TO OPEN LETTER
    // =========================

    const letterNote =
        document.getElementById(
            "letter-note"
        );


    if (letterNote) {

        letterNote.addEventListener(
            "click",
            function () {

                letterNote.classList.toggle(
                    "open"
                );

            }
        );

    }

});

