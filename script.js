// LOGIN DATA
const USERNAME = "admin";
const PASSWORD = "123456";

// AI Model (GANTI dengan link Teachable Machine kamu)
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/XXXXX/";

let model, maxPredictions;
let uploadedImage = null;

function login() {
    const user = username.value;
    const pass = password.value;

    if (user === USERNAME && pass === PASSWORD) {
        loginPage.classList.add("hidden");
        homePage.classList.remove("hidden");
        loginError.innerText = "";
    } else {
        loginError.innerText = "Username atau password salah";
    }
}

function logout() {
    homePage.classList.add("hidden");
    loginPage.classList.remove("hidden");
}

function uploadImage() {
    const input = document.getElementById("imageInput");
    const gallery = document.getElementById("productGallery");

    if (input.files && input.files[0]) {
        uploadedImage = document.createElement("img");
        uploadedImage.src = URL.createObjectURL(input.files[0]);
        gallery.appendChild(uploadedImage);
    }
}

// AI INIT
async function initAI() {
    model = await tmImage.load(
        MODEL_URL + "model.json",
        MODEL_URL + "metadata.json"
    );
    maxPredictions = model.getTotalClasses();

    if (uploadedImage) {
        const prediction = await model.predict(uploadedImage);
        document.getElementById("aiResult").innerText =
            "AI Result: " + prediction[0].className;
    } else {
        document.getElementById("aiResult").innerText =
            "Silakan upload gambar terlebih dahulu";
    }
}
