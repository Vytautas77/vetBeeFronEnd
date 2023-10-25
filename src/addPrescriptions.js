const AddBtn = document.getElementById("AddBtn");
const infoMessage = document.getElementById("infoMessage");
const prescriptionsFetch = "http://localhost:3000/prescriptions";
const petId = localStorage.getItem("PetId");

const inputData = () => {
  const medicationId = document.getElementById("medicationId").value;
  const comment = document.getElementById("comment").value;

  if (!medicationId) {
    infoMessage.innerHTML = "The Pet name field is not entered!";
    throw new Error("The Pet name field is not entered!");
  }
  if (!comment) {
    infoMessage.innerHTML = "The Pet date of birth field is not entered!";
    throw new Error("The Pet date of birth field is not entered!");
  }

  const inputs = {
    pet_id: petId,
    medication_id: medicationId,
    comment: comment,
  };
  return inputs;
};

AddBtn.addEventListener("click", async () => {
  const inputPrescriptions = inputData();
  try {
    const response = await fetch(prescriptionsFetch, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputPrescriptions),
    });
    const data = await response.json();
    if (data) {
      infoMessage.innerHTML = "Data uploaded successfully.";
      setTimeout(() => {
        window.location.replace("./petHtml.html");
      }, 3000);
    }
  } catch (err) {
    infoMessage.innerHTML = "Data upload FAILED.";
  }
});
