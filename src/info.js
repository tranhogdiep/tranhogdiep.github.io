var popupDiv;

export function ShowInfoPopup() {
    if(popupDiv == null){
        popupDiv= document.getElementById("infopopup")
        popupDiv.addEventListener("click", (e) => {
            if(e.target == popupDiv){
            popupDiv.style.display = "none";
            }
        })
    }
    popupDiv.style.display = "flex";

}