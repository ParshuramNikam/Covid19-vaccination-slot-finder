let getDist = document.querySelector(".select-district");
var stateCode = sessionStorage.getItem("stateCode");

getState.addEventListener("change", () => {
  let dists_url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateCode}`;
  sessionStorage.removeItem("stateCode");
  fetch(dists_url)
    .then((response) => response.json())
    .then((data) => {
      data.districts.forEach((district) => {
        let addDist = document.createElement('option');
        addDist.value = district.district_id;
        addDist.innerText = district.district_name;
        getDist.appendChild(addDist);
      });
    });
});

getDist.addEventListener('change', ()=>{
    distCode = getDist.value;
    console.log("Selected dist code : ",distCode);
    sessionStorage.setItem("distCode",distCode);
})




