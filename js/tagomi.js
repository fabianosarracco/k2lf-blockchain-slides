// More info about config & dependencies:
// - https://github.com/hakimel/reveal.js#configuration
// - https://github.com/hakimel/reveal.js#dependencies
Reveal.initialize({
    // Display presentation control arrows
    controls: true,

    // Help the user learn the controls by providing hints, for example by
    // bouncing the down arrow when they first encounter a vertical slide
    controlsTutorial: true,

    // Determines where controls appear, "edges" or "bottom-right"
    controlsLayout: 'bottom-right',

    // Visibility rule for backwards navigation arrows; "faded", "hidden"
    // or "visible"
    controlsBackArrows: 'faded',

    // Display a presentation progress bar
    progress: true,

    // Display the page number of the current slide
    slideNumber: true,

    // Push each slide change to the browser history
    history: true,

    // Enable keyboard shortcuts for navigation
    keyboard: true,

    // Enable the slide overview mode
    overview: true,

    // Vertical centering of slides
    center: false,

    // Enables touch navigation on devices with touch input
    touch: true,

    // Loop the presentation
    loop: false,

    // Change the presentation direction to be RTL
    rtl: false,

    // Randomizes the order of slides each time the presentation loads
    shuffle: false,

    // Turns fragments on and off globally
    fragments: true,

    // Flags whether to include the current fragment in the URL,
    // so that reloading brings you to the same fragment position
    fragmentInURL: false,

    // Flags if the presentation is running in an embedded mode,
    // i.e. contained within a limited portion of the screen
    embedded: false,

    // Flags if we should show a help overlay when the questionmark
    // key is pressed
    help: true,

    // Flags if speaker notes should be visible to all viewers
    showNotes: false,

    // Global override for autoplaying embedded media (video/audio/iframe)
    // - null: Media will only autoplay if data-autoplay is present
    // - true: All media will autoplay, regardless of individual setting
    // - false: No media will autoplay, regardless of individual setting
    autoPlayMedia: null,

    // Number of milliseconds between automatically proceeding to the
    // next slide, disabled when set to 0, this value can be overwritten
    // by using a data-autoslide attribute on your slides
    autoSlide: 0,

    // Stop auto-sliding after user input
    autoSlideStoppable: true,

    // Use this method for navigation when auto-sliding
    autoSlideMethod: Reveal.navigateNext,

    // Specify the average time in seconds that you think you will spend
    // presenting each slide. This is used to show a pacing timer in the
    // speaker view
    defaultTiming: 120,

    // Enable slide navigation via mouse wheel
    mouseWheel: false,

    // Hides the address bar on mobile devices
    hideAddressBar: true,

    // Opens links in an iframe preview overlay
    // Add `data-preview-link` and `data-preview-link="false"` to customise each link
    // individually
    previewLinks: false,

    // Transition style
    transition: 'fade', // none/fade/slide/convex/concave/zoom

    // Transition speed
    transitionSpeed: 'default', // default/fast/slow

    // Transition style for full page slide backgrounds
    backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom

    // Number of slides away from the current that are visible
    viewDistance: 3,

    // Parallax background image
    parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

    // Parallax background size
    parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

    // Number of pixels to move the parallax background per slide
    // - Calculated automatically unless specified
    // - Set to 0 to disable movement along an axis
    parallaxBackgroundHorizontal: null,
    parallaxBackgroundVertical: null,

    // The display mode that will be used to show slides
    display: 'block',

    dependencies: [
        { src: 'plugin/markdown/marked.js' },
        { src: 'plugin/markdown/markdown.js' },
        { src: 'plugin/notes/notes.js', async: true },
        //{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
        { src: 'node_modules/highlightjs/highlight.pack.js', async: true },
        { src: 'node_modules/reveal-code-focus/reveal-code-focus.js', async: true, callback: function() { RevealCodeFocus(); } },
        { src: 'plugin/highlight/solidity.js', async: true, callback: function() { hljs.registerLanguage('solidity', window.hljsDefineSolidity); } }
    ]
});

// Tag processors
const tagsProcessors = {
    'a': (anchor) => {
        // Add external class and _blank target to external links
        if (anchor.href && anchor.href.indexOf('http') == 0) {
            anchor.target = "_blank";
            if (anchor.getAttribute('data-nosymbol') == null) {
                anchor.className = "external";
            }
        }
    },
    'card': (card) => {
        const content = card.innerHTML;
        const classes = card.classList;
        const style = card.getAttribute('style');
        const fragmentIndex = card.getAttribute('data-fragment-index');
        const htmlFragmentIndex = fragmentIndex ? `data-fragment-index="${fragmentIndex}"` : '';
        const htmlContent = `
            <div style="${style}" class="card ${classes}" ${htmlFragmentIndex}>
            ${content}
            </div>`;
        card.removeAttribute('style');
        card.innerHTML = htmlContent;
        card.classList = "";
    },
    'github': (gh) => {
        // Generate github tags
        const content = gh.innerHTML;
        const classes = gh.classList;
        const style = gh.getAttribute('style');
        const url = gh.getAttribute('url');
        const htmlContent = `
            <div style="${style}" class="github ${classes}">
                <a data-nosymbol target="_blank" class="icon" href="${url}">
                    <i class="ti-github"></i>
                </a>
                <div class="content">${content}</div>
            </div>`;
        gh.removeAttribute('url');
        gh.innerHTML = htmlContent;
        gh.classList = "";

    },
    'hcard': (hcard) => {
        // Generate hcard tags
        const content = hcard.innerHTML;
        const classes = hcard.classList;
        const style = hcard.getAttribute('style');
        const icon = hcard.getAttribute('data-left-icon');
        const htmlContent = `
            <div style="${style}" class="hcard ${classes}">
                <div class="icon">
                    <div data-animate="heartBeat" data-duration="2">
                        <i class="${icon}"></i>
                    </div>
                </div>
                <div class="content" data-animate="zoomIn" data-duration="0.5" data-delay="0.2">
                    ${content}
                </div>
            </div>`;
        hcard.removeAttribute('data-left-icon');
        hcard.innerHTML = htmlContent;
        hcard.classList = "";
    },
    'list-header': (listItem) => {
        const content = listItem.innerHTML;
        const classes = listItem.classList;
        let htmlContent = `
            <div class="card header ${classes}">
                ${content}
            </div>`;
        listItem.classList = "";
        listItem.innerHTML = htmlContent;
    },
    'list-item': (listItem) => {
        const content = listItem.innerHTML;
        const itemValue = listItem.getAttribute('data-value');
        const itemIconValue = listItem.getAttribute('data-item-icon');
        const classes = listItem.classList;
        let htmlContent = '';
        if (itemValue) {
            htmlContent = `
            <div class="list-item ${classes}">
                <div class="value">${itemValue}</div>
                <div class="content">${content}</div>
            </div>`;
        } else if (itemIconValue) {
            htmlContent = `
            <div class="list-item ${classes}">
                <div class="value"><i class="${itemIconValue}"></i></div>
                <div class="content">${content}</div>
            </div>`;
        }
        listItem.classList = "";
        listItem.removeAttribute('data-value');
        listItem.removeAttribute('data-item-icon');
        listItem.innerHTML = htmlContent;
    }
}

// Apply tags processors
for (const [tag, proc] of Object.entries(tagsProcessors)) {
    for (let el of document.getElementsByTagName(tag)) {
        proc(el);
    }
}

// Manage toggle collapse on double clicks on overlays
for (let el of document.getElementsByClassName('overlay-left')) {
    el.addEventListener('dblclick', (event) => {
        if (el.classList.contains('collapsed')) {
            el.classList.remove('collapsed');
        } else {
            el.classList.add('collapsed');
        }
    })
}

// Manage clicks on list item hidden contents
for (let li of document.getElementsByClassName('list-item')) {
    if (li.classList.contains('hidden')) {
        for (let value of li.getElementsByClassName('value')) {
            value.addEventListener('click', function listItemClickListener(event) {
                li.classList.add('expanding');
                li.getElementsByClassName('content')[0]
                    .addEventListener("animationend", function listItemExpandEnd(event) {
                        li.classList.remove('hidden');
                        li.classList.remove('expanding');
                    });
                value.removeEventListener('click', listItemClickListener);
            });
        }
    }
}

// Set animation delay if data-delay is specified
Reveal.addEventListener('ready', event => {
    for (let elem of document.querySelectorAll('[data-delay]')) {
        let delay = elem.getAttribute('data-delay');
        elem.style.animationDelay = delay + 's';
    }
});

// Set animation duration if data-duration is specified
Reveal.addEventListener('ready', event => {
    for (let elem of document.querySelectorAll('[data-duration]')) {
        let duration = elem.getAttribute('data-duration');
        elem.style.animationDuration = duration + 's';
    }
});

// Animate items that are not in a fragment
Reveal.addEventListener('slidechanged', event => {
    // Animate elements that are not a fragment (or in a fragment)
    //let filter = '*[data-animate]:not(.fragment):not(.fragment *)';
    let filter = '[data-animate]:not(.fragment)';

    for (let elem of event.currentSlide.querySelectorAll(filter)) {
        elem.classList.add('animated');
        elem.classList.add(elem.getAttribute('data-animate'));
    }
    if (event.previousSlide) {
        for (let elem of event.previousSlide.querySelectorAll(filter)) {
            elem.classList.remove('animated');
            elem.classList.remove(elem.getAttribute('data-animate'));
        }
    }
});

// Animate fragments
Reveal.addEventListener('fragmentshown', event => {
    for (fragment of event.fragments) {
        for (let elem of fragment.querySelectorAll('[data-animate]:not(.fragment)')) {
            elem.classList.add('animated');
            elem.classList.add(elem.getAttribute('data-animate'));
        }
    }
    for (fragment of event.fragments) {
        if (fragment.classList.contains('blurred-background')) {
            let parent = fragment.parentElement;
            for (let elem of parent.children) {
                if (elem !== fragment) {
                    elem.classList.add('blurred');
                }
            }
        }
    }
});

// Make the animation runnable again if fragment is hidden
Reveal.addEventListener('fragmenthidden', event => {
    for (fragment of event.fragments) {
        for (let elem of fragment.querySelectorAll('[data-animate]:not(.fragment)')) {
            elem.classList.remove('animated');
            elem.classList.remove(elem.getAttribute('data-animate'));
        }
    }
});
