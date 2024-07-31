var popupDiv;

export function ShowInfoPopup() {
    if (popupDiv == null) {
        CreatePopup();
    }
    popupDiv.style.display = "block";
}
function CreatePopup() {
    // Create the outer div with the id "myPopup" and class "popup"
    popupDiv = document.createElement('div');
    popupDiv.id = 'myPopup';
    popupDiv.classList.add('popup');
    popupDiv.addEventListener("click", () => {
        popupDiv.style.display = "none";

    })

    // Create the inner div with the class "popup-content"
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');

    // Create the close button with the class "close"
    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.textContent = '×';
    closeButton.addEventListener("click", () => {
        popupDiv.style.display = "none";

    })

    // Create the image element
    const popupImage = document.createElement('img');
    popupImage.src = 'assets/images/info.png';
    popupImage.alt = 'Popup Image';
    popupImage.classList.add("popupimage");


    // Append the elements to the DOM
    popupContent.appendChild(closeButton);
    popupContent.appendChild(popupImage);

    popupDiv.appendChild(popupContent);

    // Append the popup to the body
    document.body.appendChild(popupDiv);
}