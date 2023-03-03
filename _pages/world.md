---
layout: archive
title: "World"
permalink: /world/
author_profile: true
---

```Where I Have Been```

<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://www.amcharts.com/lib/3/ammap.js" type="text/javascript"></script>
  <script src="https://www.amcharts.com/lib/3/maps/js/worldHigh.js" type="text/javascript"></script>
  <script src="https://www.amcharts.com/lib/3/themes/dark.js" type="text/javascript"></script>
  <style>
    /* Set the width of the map div to 100% of the container */
    #mapdiv {
      width: 100%;
      height: 450px;
    }
    
    /* Set the font size of the bottom text to 80% of the container */
    #bottom-text {
      width: 100%;
      font-size: 80%;
      padding: 5px 0;
      text-align: center;
      background-color: #535364;
      margin-top: 1px;
      color: #B4B4B7;
    }
  </style>
</head>
<body>
  <div id="mapdiv"></div>
  <div id="bottom-text"><a href="https://www.amcharts.com/visited_countries/" style="color: #B4B4B7;">Create your own visited countries map</a> or check out the <a href="https://www.amcharts.com/" style="color: #B4B4B7;">JavaScript Charts</a>.</div>

  <script type="text/javascript">
    var map = AmCharts.makeChart("mapdiv",{
      type: "map",
      theme: "dark",
      projection: "miller",
      panEventsEnabled : true,
      backgroundColor : "#535364",
      backgroundAlpha : 1,
      zoomControl: {
        zoomControlEnabled : true
      },
      dataProvider : {
        map : "worldHigh",
        getAreasFromMap : true,
        areas :
        [
          {
            "id": "DK",
            "showAsSelected": true
          },
          {
            "id": "EE",
            "showAsSelected": true
          },
          {
            "id": "FI",
            "showAsSelected": true
          },
          {
            "id": "LV",
            "showAsSelected": true
          },
          {
            "id": "NL",
            "showAsSelected": true
          },
          {
            "id": "SE",
            "showAsSelected": true
          },
          {
            "id": "CN",
            "showAsSelected": true
          },
          {
            "id": "MY",
            "showAsSelected": true
          },
          {
            "id": "QA",
            "showAsSelected": true
          },
          {
            "id": "SG",
            "showAsSelected": true
          },
          {
            "id": "TW",
            "showAsSelected": true
          },
          	{
		        "id": "NO",
		        "showAsSelected": true
	        }
        ]
      },
      areasSettings : {
        autoZoom : true,
        color : "#B4B4B7",
        colorSolid : "#84ADE9",
        selectedColor : "#84ADE9",
        outlineColor : "#666666",
        rollOverColor : "#9EC2F7",
        rollOverOutlineColor : "#000000"
      }
    });
  </script>
</body>
</html>

