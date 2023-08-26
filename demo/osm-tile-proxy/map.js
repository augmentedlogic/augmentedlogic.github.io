function drawMap(map_id, stylename)
{

        console.log("Style: " + stylename);
        var initial_zoom = 13;
        var win_width = $(window).width();
        if(win_width >= 1800) {
            initial_zoom = 13;
        }
        var extent = new OpenLayers.Bounds(133400,5905800,2493900,7407700);
        var options = {};
        map = new OpenLayers.Map(map_id, options);
        OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
        OpenLayers.Util.onImageLoadError = function(){
          this.style.display = none;
        };

        var mapnik         = new OpenLayers.Layer.OSM("DemoLayer", ["https://maps.augmentedlogic.com/demo-" + stylename + "/${z}/${x}/${y}.png"],
                                                                    { tileOptions: { crossOriginKeyword: null } ,
                                                                    numZoomLevels: 18, // minZoomLevel: 6, maxZoomLevel: 19 ,
                                                                    transitionEffect: "resize" });

        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position       = new OpenLayers.LonLat(-0.151250, 51.502777).transform( fromProjection, toProjection);
        var size = new OpenLayers.Size(28,28);
        var place_offset = new OpenLayers.Pixel(-12, -12);
        var offset = new OpenLayers.Pixel(-(size.w/2), -12);
        map.addLayer(mapnik);
        map.setCenter(position, initial_zoom );

}


jQuery(document).ready(function() {
     drawMap("basicMap","greyish");

     $('.style-selector').on('click', function() {
        $("#basicMap").html("");
        $(".style-selector").removeClass("boldness");
        $(this).addClass("boldness");
        drawMap("basicMap", $(this).data("map"));
     });

    var smallbox = new SmallBox();
        smallbox.add("#info", ".open-info");

});

