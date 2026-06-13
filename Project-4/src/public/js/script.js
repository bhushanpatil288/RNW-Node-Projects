document.addEventListener("DOMContentLoaded", ()=>{
    updateFooterYear();
})

const updateFooterYear = () => {
    const footerDate = document.querySelector(".footer-date");
    footerDate.innerHTML = Date.now().getFullYear;
}