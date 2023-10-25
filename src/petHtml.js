const petId = localStorage.getItem("PetId"); // paimamas ID iš local Storage
const petFetch = "http://localhost:3000/prescriptions/";
const medicationsBox = document.getElementById("medicationsBox");

const addPetScreen = (pet) => {
  const petName = document.getElementById("petName");
  petName.innerHTML = `${pet.name}: Health Records`;
  const petPhoto = document.getElementById("petPhoto");
  petPhoto.src = pet.pets_photo;
  const name = document.getElementById("name");
  name.innerHTML = pet.name;
  const dob = document.getElementById("dob");
  dob.innerHTML = pet.dob.substring(0, 10);
  const email = document.getElementById("email");
  email.innerHTML = pet.client_email;
};

const addMedicationToScreen = (pet) => {
  const medWrapper = document.createElement("div");
  medWrapper.setAttribute("class", "medWrapper");

  const medName = document.createElement("p");
  medName.innerHTML = `Medication name: ${pet.med_name}`;
  const medDescription = document.createElement("p");
  medDescription.innerHTML = `Medication description: ${pet.description}`;
  const comment = document.createElement("p");
  comment.innerHTML = `Comment: ${pet.comment}`;
  const created = document.createElement("p");
  created.innerHTML = `Document create at: ${pet.created_at.substring(0, 10)}`;

  medWrapper.append(medName, medDescription, comment, created);
  return medWrapper;
};

const getInfo = async () => {
  const response = await fetch(petFetch + petId);
  const petArray = await response.json(); //informacijos pasiėmimas is API pagal ID
  const prescriptions = petArray.prescriptions;
  prescriptions.forEach((pet) => {
    addPetScreen(pet);
    const card = addMedicationToScreen(pet);
    medicationsBox.append(card);
  });
};
getInfo();
