const petId = localStorage.getItem("PetId"); // paimamas ID iš local Storage
const petFetch = "http://localhost:3000/prescriptions/";

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
  const medName = document.getElementById("medName");
  medName.innerHTML = pet.med_name;
  const medDescription = document.getElementById("medDescription");
  medDescription.innerHTML = pet.description;
  const comment = document.getElementById("comment");
  comment.innerHTML = pet.comment;
  const created = document.getElementById("created");
  created.innerHTML = pet.created_at;
};

const getInfo = async () => {
  const response = await fetch(petFetch + petId);
  const petArray = await response.json(); //informacijos pasiėmimas is API pagal ID
  const pet = petArray.prescriptions[0];
  console.log(pet);
  addPetScreen(pet);
};
getInfo();
