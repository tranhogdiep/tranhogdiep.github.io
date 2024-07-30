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
    popupImage.src = 'https://via.placeholder.com/300x200';
    popupImage.alt = 'Popup Image';

    // Create the title and paragraph elements
    const popupTitle = document.createElement('h3');
    popupTitle.textContent = 'Popup Title';
    const popupText = document.createElement('p');
    popupText.textContent = 'This is some information about the popup.';

    // Append the elements to the DOM
    popupContent.appendChild(closeButton);
    popupContent.appendChild(popupImage);
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(popupText);
    popupDiv.appendChild(popupContent);

    // Append the popup to the body
    document.body.appendChild(popupDiv);
}