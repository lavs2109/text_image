let generateImageForm = document.getElementById("generate-image-form");
let formInput = document.getElementById("input-value");
let imageContainerText = document.getElementById("imageContainerText");
let imageGenerated = document.getElementById("generated-image");
let imageContainer = document.getElementById("images-visible");

// ✅ Replace with your actual Unsplash API Key
const UNSPLASH_API_KEY = "qGaKp1ZrfP2fGo-kVLqSC_wm2cLTq82EtzBVj5NMf2E";

async function fetchImages(category) {
    try {
        console.log("Fetching image for category:", category);

        let response = await fetch(
            `https://api.unsplash.com/photos/random?query=${encodeURIComponent(category)}&client_id=${UNSPLASH_API_KEY}`
        );

        console.log("Response received:", response);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        let data = await response.json();
        console.log("API Response:", data);

        // ✅ Unsplash returns an image in `data.urls.regular`
        if (data.urls && data.urls.regular) {
            imageContainerText.innerText = "Below is your generated Image:";
            imageContainer.style.display = "block";
            imageGenerated.src = data.urls.regular;
            imageGenerated.alt = category; // Set alt text for accessibility
            console.log("Image URL:", data.urls.regular);
        } else {
            throw new Error("No image found");
        }
    } catch (error) {
        console.error("Error fetching image:", error);
        imageContainerText.innerText = "Error fetching the image. Please try again.";
    }
}

generateImageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let enteredText = formInput.value.trim();

    if (enteredText) {
        fetchImages(enteredText);
    } else {
        imageContainerText.innerText = "Input field cannot be empty!";
    }
});

console.log("JavaScript file is loaded!");
