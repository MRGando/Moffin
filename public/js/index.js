//shorter texts
make_short(titles, 35);
make_short(contents, 90);

//adding color to tasks
items.forEach((item) => {
    item.style.backgroundColor = `${item.dataset.color}`;
});

setting_close_btn.addEventListener("click", () => {
    fadeOut(setting_page);
})

setting_icon.addEventListener("click", () => {
    fadeIn(setting_page);
})

delete_account_button.addEventListener("click", () => {
    const confirmation = confirm('want to remove your account permanently?')
    if (confirmation) {
        window.open('/setting/deleteAccount', "_self");
    }
})