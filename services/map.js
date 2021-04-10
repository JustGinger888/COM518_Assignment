var map = L.map("map").setView([51.505, -0.09], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution:
          "Map data &copy; " +
          '<a href="http://openstreetmap.org">OpenStreetMap</a>',
        id: "examples.map-i875mjb7",
      }).addTo(map);

      L.marker([51.5, -0.09])
        .addTo(map)
        .bindPopup("<b>Hello world!</b><br />I am a popup.")
        .openPopup();

      L.circle([51.508, -0.11], 500, {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
      })
        .addTo(map)
        .bindPopup("I am a circle.");

      L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047],
      ])
        .addTo(map)
        .bindPopup("I am a polygon.");

      var popup = L.popup();

      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
      }

      map.on("click", onMapClick);