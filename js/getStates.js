let getState = document.querySelector(".select-state");
var stateCode = -1;
let states_url = "https://cdn-api.co-vin.in/api/v2/admin/location/states";

fetch(states_url)
  .then((response) => response.json())
  .then((data) => {
    data.states.forEach((state) => {
      let addState = document.createElement("option");
      addState.value = state.state_id;
      addState.innerText = state.state_name;
      getState.appendChild(addState);
    });
  });


getState.addEventListener("change", () => {
  stateCode = getState.value;
  console.log("Selected state code : ",stateCode);
  sessionStorage.setItem("stateCode", stateCode);
});
