// ================= MAP SETUP =================
const map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let marker = L.marker([0, 0]).addTo(map);

// ================= API =================
const apiKey = "at_Hxx2xjFgDNG0ee6mfZT1GGLekc1tI";

async function getIPData(query = "") {
  let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;

  if (query !== "") {
    // If it contains letters, treat as domain
    if (/[a-zA-Z]/.test(query)) {
      url += `&domain=${query}`;
    } else {
      url += `&ipAddress=${query}`;
    }
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data); // DEBUG
    updateUI(data);
  } catch (error) {
    console.error("Error fetching IP data:", error);
  }
}

// ================= UI UPDATE =================
function updateUI(data) {
  document.getElementById("ip").textContent = data.ip;
  document.getElementById("location").textContent =
    `${data.location.city}, ${data.location.country}`;
  document.getElementById("timezone").textContent =
    `UTC ${data.location.timezone}`;
  document.getElementById("isp").textContent = data.isp;

  const { lat, lng } = data.location;

  map.setView([lat, lng], 13);
  marker.setLatLng([lat, lng]);
}

// ================= EVENTS =================
const searchBtn = document.getElementById("searchBtn");
const ipInput = document.getElementById("ipInput");

searchBtn.addEventListener("click", () => {
  getIPData(ipInput.value.trim());
});

ipInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getIPData(ipInput.value.trim());
  }
});

// ================= INITIAL LOAD =================
getIPData();
