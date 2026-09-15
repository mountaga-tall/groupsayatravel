/* =====================================================
   GROUP SAYA TRAVEL
   WOW EFFECT JAVASCRIPT
===================================================== */


/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 1800);

});



/* =====================================================
   HEADER AU SCROLL
===================================================== */

const header =
    document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/* =====================================================
   MENU MOBILE
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navigation =
    document.getElementById("navigation");

menuToggle.addEventListener("click", () => {

    navigation.classList.toggle("mobile-open");

    const icon =
        menuToggle.querySelector("i");

    if (
        navigation.classList.contains(
            "mobile-open"
        )
    ) {

        icon.classList.remove(
            "fa-bars"
        );

        icon.classList.add(
            "fa-xmark"
        );

    } else {

        icon.classList.remove(
            "fa-xmark"
        );

        icon.classList.add(
            "fa-bars"
        );

    }

});



/* =====================================================
   FERMER MENU APRÈS CLICK
===================================================== */

document.querySelectorAll(
    "#navigation a"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navigation.classList.remove(
                "mobile-open"
            );

            const icon =
                menuToggle.querySelector("i");

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }
    );

});



/* =====================================================
   CURSEUR LUMINEUX
===================================================== */

const cursor =
    document.querySelector(
        ".cursor-glow"
    );

document.addEventListener(
    "mousemove",
    (event) => {

        cursor.style.left =
            event.clientX + "px";

        cursor.style.top =
            event.clientY + "px";

    }
);



/* =====================================================
   PARTICULES
===================================================== */

const particlesContainer =
    document.getElementById(
        "particles"
    );

for (
    let i = 0;
    i < 70;
    i++
) {

    const particle =
        document.createElement("span");

    particle.classList.add(
        "particle"
    );

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (5 + Math.random() * 10) + "s";

    particle.style.animationDelay =
        Math.random() * 8 + "s";

    particle.style.opacity =
        Math.random();

    const size =
        1 + Math.random() * 3;

    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";

    particlesContainer.appendChild(
        particle
    );

}



/* =====================================================
   ANIMATION AU SCROLL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "active"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);



/* =====================================================
   COMPTEURS ANIMÉS
===================================================== */

const counters =
    document.querySelectorAll(
        ".counter"
    );

let countersStarted = false;

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !countersStarted
                ) {

                    countersStarted = true;

                    counters.forEach(
                        counter => {

                            const target =
                                Number(
                                    counter.dataset.target
                                );

                            let current = 0;

                            const duration = 1800;

                            const start =
                                performance.now();

                            function update(
                                time
                            ) {

                                const progress =
                                    Math.min(
                                        (time - start) /
                                        duration,
                                        1
                                    );

                                const eased =
                                    1 -
                                    Math.pow(
                                        1 - progress,
                                        3
                                    );

                                current =
                                    Math.floor(
                                        eased * target
                                    );

                                counter.textContent =
                                    current;

                                if (
                                    progress < 1
                                ) {

                                    requestAnimationFrame(
                                        update
                                    );

                                } else {

                                    counter.textContent =
                                        target;

                                }

                            }

                            requestAnimationFrame(
                                update
                            );

                        }
                    );

                    counterObserver.disconnect();

                }

            });

        }
    );

counterObserver.observe(
    document.querySelector(".stats")
);



/* =====================================================
   EFFET 3D SUR LES CARTES
===================================================== */

const cards =
    document.querySelectorAll(
        ".tilt"
    );

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) /
                    centerY) * -6;

            const rotateY =
                ((x - centerX) /
                    centerX) * 6;

            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                `
                perspective(1000px)
                rotateX(0)
                rotateY(0)
                translateY(0)
                `;

        }
    );

});



/* =====================================================
   FORMULAIRE
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const submitButton =
    document.getElementById(
        "submitButton"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );

const toast =
    document.getElementById(
        "toast"
    );


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        submitButton.classList.add(
            "loading"
        );


        submitButton.querySelector(
            "span"
        ).textContent =
            "Envoi en cours...";


        setTimeout(() => {

            submitButton.classList.remove(
                "loading"
            );


            submitButton.querySelector(
                "span"
            ).textContent =
                "Envoyer le message";


            contactForm.reset();


            formMessage.textContent =
                "";


            toast.classList.add(
                "show"
            );


            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 4500);


        }, 1200);

    }
);



/* =====================================================
   EFFET MAGNÉTIQUE DES BOUTONS
===================================================== */

const magneticButtons =
    document.querySelectorAll(
        ".btn-primary, .nav-button, .whatsapp-button"
    );

magneticButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `
                translate(
                    ${x * .12}px,
                    ${y * .12}px
                )
                `;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "";

        }
    );

});



/* =====================================================
   EFFET PARALLAX HERO
===================================================== */

const heroContent =
    document.querySelector(
        ".hero-content"
    );

window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;

        if (
            scroll < window.innerHeight
        ) {

            heroContent.style.transform =
                `
                translateY(
                    ${scroll * .15}px
                )
                `;

            heroContent.style.opacity =
                1 -
                scroll /
                window.innerHeight *
                .8;

        }

    }
);



/* =====================================================
   ANNÉE AUTOMATIQUE
===================================================== */

const yearElements =
    document.querySelectorAll(
        ".current-year"
    );

yearElements.forEach(
    element => {

        element.textContent =
            new Date().getFullYear();

    }
);



/* =====================================================
   EFFET RIPPLE SUR LES BOUTONS
===================================================== */

document.querySelectorAll(
    ".submit-button, .btn-primary"
).forEach(button => {

    button.addEventListener(
        "click",
        function(event) {

            const ripple =
                document.createElement(
                    "span"
                );

            ripple.style.position =
                "absolute";

            ripple.style.width =
                "20px";

            ripple.style.height =
                "20px";

            ripple.style.borderRadius =
                "50%";

            ripple.style.background =
                "rgba(255,255,255,.5)";

            ripple.style.pointerEvents =
                "none";

            const rect =
                button.getBoundingClientRect();

            ripple.style.left =
                event.clientX -
                rect.left -
                10 +
                "px";

            ripple.style.top =
                event.clientY -
                rect.top -
                10 +
                "px";

            ripple.animate(
                [
                    {
                        transform:
                            "scale(0)",
                        opacity: 1
                    },
                    {
                        transform:
                            "scale(12)",
                        opacity: 0
                    }
                ],
                {
                    duration: 600
                }
            );

            button.style.position =
                "relative";

            button.style.overflow =
                "hidden";

            button.appendChild(
                ripple
            );

            setTimeout(
                () => ripple.remove(),
                600
            );

        }
    );

});
