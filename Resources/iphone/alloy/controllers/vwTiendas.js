function Controller() {
    function UbicacionActual() {
        Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
        Titanium.Geolocation.distanceFilter = 10;
        Ti.Geolocation.purpose = "Mostrar tu posición actual";
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (!e.success || e.error) return;
            longitudG = e.coords.longitude;
            latitudG = e.coords.latitude;
        });
        var newRegion = {
            latitude: latitudG,
            longitude: longitudG,
            animate: true,
            latitudeDelta: .02,
            longitudeDelta: .02
        };
        $.mapview.setLocation(newRegion);
        anotacionUsuario.latitude = latitudG;
        anotacionUsuario.longitude = longitudG;
    }
    function tiendasCercanos() {
        $.mapview.removeAllAnnotations();
        $.mapview.addAnnotation(anotacionUsuario);
        if (0 == sucursales.length) alert("no hay resultados"); else {
            var mapaLatitudR = sucursales[0].DIRECCION.EJEX;
            var mapaLongitudR = sucursales[0].DIRECCION.EJEY;
            var prueba = 111.11 * Math.pow(Math.pow(mapaLongitudR - longitudG, 2) + Math.pow(mapaLatitudR - latitudG, 2), .5);
            if (distancia > prueba) {
                distancia = prueba;
                deltaautomatico = 2 * Math.pow(Math.pow(mapaLongitudR - longitudG, 2) + Math.pow(mapaLatitudR - latitudG, 2), .5);
            }
            for (var j = 0; sucursales.length > j; j++) {
                var suc = sucursales[j];
                var annotationDoctor = Alloy.Globals.Map.createAnnotation({
                    latitude: suc.DIRECCION.EJEX,
                    longitude: suc.DIRECCION.EJEY,
                    image: "/images/doc" + calidad,
                    animate: true,
                    title: "" + suc.SUCURSAL,
                    leftButton: "/images/docleft" + calidad,
                    rightButton: "/images/der" + calidad,
                    suc: suc
                });
                $.mapview.addAnnotation(annotationDoctor);
            }
            var newRegion = {
                latitude: latitudG,
                longitude: longitudG,
                animate: true,
                latitudeDelta: deltaautomatico,
                longitudeDelta: deltaautomatico
            };
            setTimeout(function() {
                $.mapview.setLocation(newRegion);
                ocultaCargando();
            }, 1e3);
        }
    }
    function creaRutaCupon(e) {
        muestraCargando();
        var mapaLatitudR = e.latitud;
        var mapaLongitudR = e.longitud;
        var prueba = 111.11 * Math.pow(Math.pow(mapaLongitudR - longitudG, 2) + Math.pow(mapaLatitudR - latitudG, 2), .5);
        if (distancia > prueba) {
            distancia = prueba;
            deltaautomatico = 2 * Math.pow(Math.pow(mapaLongitudR - longitudG, 2) + Math.pow(mapaLatitudR - latitudG, 2), .5);
        }
        var newRegion = {
            latitude: latitudG,
            longitude: longitudG,
            animate: true,
            latitudeDelta: deltaautomatico,
            longitudeDelta: deltaautomatico
        };
        setTimeout(function() {
            $.mapview.setLocation(newRegion);
        }, 1e3);
        UbicacionActual();
        var urlGoogle = "http://maps.google.com/maps/api/directions/json?origin=" + latitudG + "," + longitudG + "&destination=" + e.latitud + "," + e.longitud + "&language=es&sensor=false";
        Ti.API.info(urlGoogle);
        Ti.App.fireEvent("cierraMenuDer");
        var cliGoogle = Ti.Network.createHTTPClient({
            onload: function() {
                if (null != vwDet) {
                    $.wnTiendas.remove(vwDet);
                    vwDet = null;
                }
                null != route && $.mapview.removeRoute(route);
                var res = JSON.parse(this.responseText);
                var puntos = [];
                var pasos = res.routes[0].legs[0].steps;
                $.vwIndicaciones.removeAllChildren();
                var vwRowIni = Alloy.createController("indicacionRow", {
                    paso: res.routes[0].legs[0],
                    banInicio: true
                }).getView();
                $.vwIndicaciones.add(vwRowIni);
                for (var i = 0; pasos.length > i; i++) {
                    var paso = pasos[i];
                    var decodedPolyline = decodeLine(paso.polyline.points);
                    for (var j = 0; decodedPolyline.length > j; j++) {
                        var linea = decodedPolyline[j];
                        null != linea && puntos.push({
                            latitude: linea[0],
                            longitude: linea[1]
                        });
                    }
                    var vwRowInd = Alloy.createController("indicacionRow", {
                        paso: paso,
                        banInicio: false
                    }).getView();
                    $.vwIndicaciones.add(vwRowInd);
                }
                route = Alloy.Globals.Map.createRoute({
                    points: puntos,
                    color: "#001f5b"
                });
                $.mapview.addRoute(route);
                $.vwIndicaciones.show();
                ocultaCargando();
            },
            onerror: function(e) {
                ocultaCargando();
                alert(e);
            }
        });
        cliGoogle.open("GET", urlGoogle);
        cliGoogle.send();
    }
    function decodeLine(encoded) {
        var len = encoded.length;
        var index = 0;
        var array = [];
        var lat = 0;
        var lng = 0;
        while (len > index) {
            var b;
            var shift = 0;
            var result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (31 & b) << shift;
                shift += 5;
            } while (b >= 32);
            var dlat = 1 & result ? ~(result >> 1) : result >> 1;
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (31 & b) << shift;
                shift += 5;
            } while (b >= 32);
            var dlng = 1 & result ? ~(result >> 1) : result >> 1;
            lng += dlng;
            array.push([ 1e-5 * lat, 1e-5 * lng ]);
        }
        return array;
    }
    function muestraCargando() {
        $.cargando.show();
        $.vwCarga.show();
    }
    function ocultaCargando() {
        $.vwCarga.hide();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vwTiendas";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.wnTiendas = Ti.UI.createWindow({
        id: "wnTiendas"
    });
    $.__views.wnTiendas && $.addTopLevelView($.__views.wnTiendas);
    $.__views.mapview = Alloy.Globals.Map.createView({
        id: "mapview",
        ns: "Alloy.Globals.Map"
    });
    $.__views.wnTiendas.add($.__views.mapview);
    $.__views.imgClose = Ti.UI.createImageView({
        top: "2%",
        right: "5%",
        width: "15%",
        id: "imgClose",
        image: "/images/close.png"
    });
    $.__views.mapview.add($.__views.imgClose);
    $.__views.vwIndicaciones = Ti.UI.createScrollView({
        borderColor: "#E6E6E6",
        borderWidth: ".2dp",
        color: "#FFFFFF",
        zIndex: "99998",
        height: "20%",
        width: Ti.UI.FILL,
        bottom: 0,
        horizontalBounce: false,
        id: "vwIndicaciones",
        layout: "vertical"
    });
    $.__views.wnTiendas.add($.__views.vwIndicaciones);
    $.__views.vwCarga = Ti.UI.createView({
        width: Ti.API.FILL,
        height: Ti.API.FILL,
        top: 0,
        backgroundColor: "#000000",
        zIndex: 99999,
        opacity: ".65",
        color: "#FFFFFF",
        id: "vwCarga"
    });
    $.__views.wnTiendas.add($.__views.vwCarga);
    $.__views.cargando = Ti.UI.createActivityIndicator({
        opacity: "1",
        color: "#FFFFFF",
        id: "cargando",
        zIndex: "9999",
        message: "Cargando..."
    });
    $.__views.vwCarga.add($.__views.cargando);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var sucursales = arguments[0] || {};
    var calidad = Alloy.Dimension() + ".png";
    var latitudG = 22.71539;
    var longitudG = -101.25489;
    var distancia = 1e6;
    var deltaautomatico = .03;
    $.imgClose.addEventListener("click", function() {
        $.wnTiendas.close();
        Ti.App.removeEventListener("creaRutaCupon", creaRutaCupon);
    });
    $.vwIndicaciones.hide();
    $.mapview.region = {
        latitude: latitudG,
        longitude: longitudG,
        latitudeDelta: 25,
        longitudeDelta: 30
    };
    $.mapview.userLocation = true;
    $.mapview.userLocationButton = true;
    var anotacionUsuario = Alloy.Globals.Map.createAnnotation({
        latitude: latitudG,
        longitude: longitudG,
        image: "/images/user" + calidad,
        animate: true,
        title: "Tu Ubicaciòn Actual"
    });
    muestraCargando();
    $.mapview.addAnnotation(anotacionUsuario);
    setTimeout(function() {
        UbicacionActual();
        setTimeout(function() {
            tiendasCercanos();
        }, 500);
    }, 4e3);
    setTimeout(function() {
        UbicacionActual();
    }, 2500);
    var route = null;
    var vwDet = null;
    Ti.App.addEventListener("creaRutaCupon", creaRutaCupon);
    $.mapview.addEventListener("click", function(e) {
        Ti.API.info(e.clicksource);
        if (null != e.clicksource && "pin" != e.clicksource && "annotation" != e.clicksource) {
            vwDet = Alloy.createController("vwDetalleProvMap", e.annotation.suc).getView();
            var alto = Titanium.Platform.displayCaps.platformHeight;
            vwDet.top = alto;
            vwDet.animate({
                top: "25%",
                duration: 500,
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
            });
            $.wnTiendas.add(vwDet);
        } else if (null != vwDet) {
            vwDet.animate({
                top: alto,
                duration: 500,
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
            }, function() {
                $.wnTiendas.remove(vwDet);
            });
            vwDet = null;
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;