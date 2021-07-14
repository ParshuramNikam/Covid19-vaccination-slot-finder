let input = document.querySelector(".form-select");
let discode1;

let distCode = sessionStorage.getItem("distCode");

document.getElementById("getDataBtn").addEventListener("click", () => {
  document.querySelector(".message").innerHTML = "";
  document.querySelector("thead").innerHTML = "";

  document.querySelector(
    ".progressBar"
  ).innerHTML = ` <div class="progress m-2" style="height: 8px;">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
    </div>`;

  if (distCode != -1) {
    let dateObj = new Date();
    let currentDate = `${dateObj.getDate()}-${
      dateObj.getMonth() + 1
    }-${dateObj.getFullYear()}`;
    console.log(currentDate);

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let weekDay = days[dateObj.getDay()];
    console.log(weekDay);

    var url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${distCode}&date=${currentDate}`;
    console.log(url);
    sessionStorage.removeItem('distCode');
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        var add_data = "";
        let srNo = 0;
        document.querySelector("thead").innerHTML = `
        <tr class="table-dark">
          <th scope="col">Sr.No</th>
          <th scope="col">Center ID</th>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">Block Name</th>
          <th scope="col">Pincode</th>
          <th scope="col">Aval. Capacity</th>
          <th scope="col">Min.Age limit</th>
          <th scope="col">Slots</th>
          <th scope="col">Fees</th>
          <th scope="col">Vaccine</th>
        </tr>`;

        data.sessions.forEach((center) => {
          if (center.available_capacity > 0) {
            add_data += `<tr>
          	  <th scope="col">${++srNo}</th>
              <th scope="col">${center.center_id}</th>
              <th scope="col">${center.name}</th>
              <th scope="col">${center.address}</th>
              <th scope="col">${center.block_name}</th>
              <th scope="col">${center.pincode}</th>
              <th scope="col">${center.available_capacity}</th>
              <th scope="col">${center.min_age_limit}</th>
        	  <th scope="col">${center.slots.join(" | ")}
              <th scope="col">${center.fee}</th>
              <th scope="col">${center.vaccine}</th>
        	  </th>
        	  </tr>`;
          }
        });
        document.querySelector(".progressBar").innerHTML = "";
        document.querySelector("tbody").innerHTML = add_data;
        let row_count = document.querySelector("table").rows.length;
        console.log(row_count);

        if (row_count == 1) {
          console.log(row_count);
          document.querySelector('.message').innerHTML = `<h2>No any available slot</h2>	<h3>Try after some time</h3>`;
		  document.querySelector("thead").innerHTML = '';
        }
      })
      .catch((error) => {
        document.querySelector(".progressBar").innerHTML = "";
        console.log(error);
        alert("404 Server Error : Please try Again");
      });
  } else {
    document.querySelector(".progressBar").innerHTML = "";
    alert("Pleae select a district");
  }
});
