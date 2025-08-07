function runTests() {
    mocha.checkLeaks(false);
    mocha.run(() => {
        const mochaReport = document.getElementById("mocha-report")!;
        Array.from(mochaReport.children).forEach(element => {
            const exerciseId = element.children[0].textContent!,
                exerciseTestResults = element.children[1],
                exerciseDiv = document.createElement("div");
            exerciseDiv.id = "mocha";
            exerciseDiv.className = "test";
            exerciseDiv.appendChild(exerciseTestResults);
            document.getElementById(exerciseId)!.appendChild(exerciseDiv);
        });
        mochaReport.remove();
    });

    // collapsibles only used in week 5 tute
    const collapsibles = Array.from(
        document.getElementsByClassName("collapsible"),
    );
    // get collapse status
    const collapseStatus = sessionStorage.getItem("collapseStatus")
        ? JSON.parse(sessionStorage.getItem("collapseStatus")!)
        : collapsibles.map(coll => coll.classList.contains("active"));

    collapsibles.forEach((coll, i) => {
        // expand if previously expanded
        if (collapseStatus[i]) {
            coll.classList.add("active");
            const content = coll.nextElementSibling as HTMLElement;
            content.style.display = "block";
        }

        coll.addEventListener("click", () => {
            this.classList.toggle("active");
            collapseStatus[i] = !collapseStatus[i];
            const content = this.nextElementSibling;
            content.style.display = collapseStatus[i] ? "block" : "none";
            // save collapse status on change
            sessionStorage.setItem(
                "collapseStatus",
                JSON.stringify(collapseStatus),
            );
        });
    });

    // toggle checkbox to match localstorage state
    const checkbox = document.getElementById(
        "light_vs_dark_toggle",
    ) as HTMLInputElement;
    const darkCSS = localStorage.getItem("darkCSS")
        ? JSON.parse(localStorage.getItem("darkCSS")!)
        : false;
    if (darkCSS) {
        checkbox.checked = true;
    }

    checkbox.addEventListener("change", (event: Event) => {
        const target = event.target as HTMLInputElement;
        const dark = target.checked;

        document.documentElement.setAttribute(
            "data-theme",
            dark ? "dark" : "light",
        );
        localStorage.setItem("darkCSS", JSON.stringify(dark));
    });
}

runTests();
