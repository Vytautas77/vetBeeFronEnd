const AddBtn = document.getElementById("AddBtn");
const infoMessage = document.getElementById("infoMessage");
const linkRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const dobRegex = /\d{4}-\d{2}-\d{2}/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const inputFetch = "http://localhost:3000/pets";

const inputData = () => {
  const petName = document.getElementById("petName").value;
  const petPhotoUrl = document.getElementById("petPhotoUrl").value;
  const petDob = document.getElementById("petDob").value;
  const clientEmail = document.getElementById("clientEmail").value;
  if (!petName) {
    infoMessage.innerHTML = "The Pet name field is not entered!";
    throw new Error("The Pet name field is not entered!");
  }

  if (!petDob) {
    infoMessage.innerHTML = "The Pet date of birth field is not entered!";
    throw new Error("The Pet date of birth field is not entered!");
  }
  if (!dobRegex.test(petDob)) {
    infoMessage.innerHTML = "Invalid date of birth!";
    throw new Error("Invalid date of birth!");
  }
  if (!petPhotoUrl) {
    infoMessage.innerHTML = "The Pet photo URL field is not entered!";
    throw new Error("The Pet photo URL field is not entered!");
  }
  if (!linkRegex.test(petPhotoUrl)) {
    infoMessage.innerHTML = "The Pet photo URL invalid track link!";
    throw new Error("The Pet photo URL invalid track link!");
  }
  if (!clientEmail) {
    infoMessage.innerHTML = "The Client email field is not entered!";
    throw new Error("The Client email field is not entered!");
  }
  if (!emailRegex.test(clientEmail)) {
    infoMessage.innerHTML = "The Client email invalid track link!";
    throw new Error("The Client email invalid track link!");
  }

  const inputs = {
    name: petName,
    pets_photo: petPhotoUrl,
    dob: petDob,
    client_email: clientEmail,
  };
  return inputs;
};

AddBtn.addEventListener("click", async () => {
  const inputPet = inputData();
  try {
    const response = await fetch(inputFetch, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputPet),
    });
    const data = await response.json();
    if (data) {
      infoMessage.innerHTML = "Data uploaded successfully.";
      setTimeout(() => {
        window.location.replace("./index.html");
      }, 3000);
    }
  } catch (err) {
    infoMessage.innerHTML = "Data upload FAILED.";
  }
});
