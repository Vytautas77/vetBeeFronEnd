const petsWrapper = document.getElementById("petsWrapper");
const infoMessageBox = document.getElementById("infoMessageBox");
const petsFetch = "http://localhost:3000/pets/";

const petsCard = (pet) => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "petWrapper");
  const btnWrapper = document.createElement("div");
  btnWrapper.setAttribute("class", "btnWrapper");

  const petName = document.createElement("h2");
  petName.setAttribute("class", "PetName");
  petName.innerHTML = pet.name;
  const petPhoto = document.createElement("img");
  petPhoto.setAttribute("class", "petPhoto");
  petPhoto.src = pet.pets_photo;
  const petDob = document.createElement("h4");
  petDob.setAttribute("class", "petDob");
  petDob.innerHTML = pet.dob.substring(0, 10);
  const petEmail = document.createElement("h4");
  petEmail.setAttribute("class", "petEmail");
  petEmail.innerHTML = pet.client_email;

  const viewLogBtn = document.createElement("button");
  viewLogBtn.setAttribute("class", "button");
  viewLogBtn.innerHTML = "VIEW LOG";
  viewLogBtn.addEventListener("click", async () => {
    try {
      //   const carId = pet.id;
      //   localStorage.setItem("carId", carId);
      //   const response = await fetch(petsFetch + carId, {
      //     method: "DELETE",
      //   });
      //   const data = await response.json();
      //   if (data) {
      //     alert("INFORMATION DELETED SUCCESSFULLY.");
      //     setTimeout(() => {
      //       window.location.reload();
      //     }, 1000);
      //   }
    } catch (err) {
      alert("INFORMATION NOT DELETED.");
    }
  });

  const delBtn = document.createElement("button");
  delBtn.setAttribute("class", "delBtn");
  delBtn.innerHTML = "DELETE";

  delBtn.addEventListener("click", async () => {
    try {
      const carId = pet.id;
      localStorage.setItem("carId", carId);
      const response = await fetch(petsFetch + carId, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data) {
        alert("INFORMATION DELETED SUCCESSFULLY.");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      alert("INFORMATION NOT DELETED.");
    }
  });
  btnWrapper.append(viewLogBtn, delBtn);
  wrapper.append(petName, petPhoto, petDob, petEmail, btnWrapper);

  return wrapper;
};

const getPets = async () => {
  const response = await fetch(petsFetch);
  const pets = await response.json();
  console.log(pets);
  if (!pets.pets.length) {
    const infoBox = document.createElement("div");
    infoBox.setAttribute("class", "infoBox");
    infoBox.innerHTML = "There are currently no car ads";
    infoMessageBox.appendChild(infoBox);
  } else {
    pets.pets
      .sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      })
      .forEach((pet) => {
        const card = petsCard(pet);
        petsWrapper.append(card);
      });
  }
};
getPets();
