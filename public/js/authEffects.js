const err_close_btns = document.querySelectorAll(".alert_close_btn");
const pass_visible = document.querySelector(".pass_visible");
const pass_input = document.querySelector(".pass");
function fade(item, callback) {
    item.parentElement.style.opacity = 0;
    setTimeout(() => {
        item.parentElement.style.display = "none";
    }, 500);
}
err_close_btns.forEach((button) => {
    button.addEventListener("click", () => {
        fade(button);
    });
});

pass_visible.addEventListener("click", () => {
    if (pass_input.type === "password") {
        pass_input.type = "text";
        return (pass_visible.src = "/icons/blind.svg");
    }
    pass_input.type = "password";
    pass_visible.src = "/icons/invisible.svg";
});