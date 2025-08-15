// load this file at the top of the HTML to do tasks before content has loaded
// N.B. don't try to access elements in here they don't exist yet

function load() {
    // load theme im to prevent screen flicker
    const darkCSSRaw = localStorage.getItem("darkCSS");
    const isDark =
        darkCSSRaw === "true" ||
        (darkCSSRaw !== null && darkCSSRaw.trim() === "true");

    document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light",
    );

    // restore vertical scroll position on return to page
    // should this happen after mocha run  because that populates the test content
    // on the screen - it seems to work here in preload fine though
    const scrollSaved = sessionStorage.getItem("scrollY");
    const scrollY = Number(scrollSaved);
    if (!isNaN(scrollY)) {
        window.scroll(0, scrollY);
    }

    // persist vertical scroll position on leave page
    // onbeforeunload doesn't work on safari IOS
    // - if you are coding on that you have bigger problems
    window.onbeforeunload = () => {
        sessionStorage.setItem("scrollY", window.scrollY.toString());
    };
}

load();
