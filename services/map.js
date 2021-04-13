const map = L.map("map").setView([40.505, -0.0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution:
          "Map data &copy; " +
          '<a href="http://openstreetmap.org">OpenStreetMap</a>',
        id: "examples.map-i875mjb7",
        noWrap: true
      }).addTo(map);

      var popup = L.popup();
      
      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
      }

      map.on("click", onMapClick);