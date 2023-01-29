const loading = document.querySelector(".loading");
window.addEventListener("load", () => {
    setTimeout(() => {
        loading.style.opacity = "0";
        setTimeout(() => {
            loading.style.display = "none";
        }, 200);
    }, 500);
});