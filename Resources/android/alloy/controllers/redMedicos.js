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
    function downMedicosCercanos() {
        var url = Alloy.CFG.urlAPIVRIM + metodoApi + "/?Rango=" + rango + "&Latitud=" + latitudG + "&Longitud=" + longitudG;
        var xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                try {
                    obj = JSON.parse(this.responseText);
                    $.mapview.removeAllAnnotations();
                    $.mapview.addAnnotation(anotacionUsuario);
                    if (0 == obj.length) {
                        alert("no hay resultados");
                        Ti.App.fireEvent("ocultaCargando");
                    } else {
                        for (var i = 0; obj.length > i; i++) {
                            var uno = obj[i];
                            if (0 == uno.SUCURSALES.length) continue;
                            var mapaLatitudR = uno.SUCURSALES[0].DIRECCION.EJEX;
                            var mapaLongitudR = uno.SUCURSALES[0].DIRECCION.EJEY;
                            var prueba = 111.11 * Math.pow(Math.pow(mapaLongitudR - longitudG, 2) + Math.pow(mapaLatitudR - latitudG, 2), .5);
                            if (distancia > prueba) {
                                distancia = prueba;
                                deltaautomatico = 2 * Math.pow(Math.pow(mapaLongitudR - longitudG, 2) + Math.pow(mapaLatitudR - latitudG, 2), .5);
                            }
                            for (var j = 0; uno.SUCURSALES.length > j; j++) {
                                var suc = uno.SUCURSALES[j];
                                if (3 == idTipoBusqueda) {
                                    suc.DESCUENTO = uno.DESCUENTO;
                                    suc.RESTRICCION = uno.RESTRICCION;
                                }
                                var annotationDoctor = Alloy.Globals.Map.createAnnotation({
                                    latitude: suc.DIRECCION.EJEX,
                                    longitude: suc.DIRECCION.EJEY,
                                    image: "/images/" + img + calidad,
                                    animate: true,
                                    title: "" + (void 0 == uno.NOMBRE ? uno.NOMBRE_COMERCIAL : uno.NOMBRE + " " + uno.MATERNO + " " + uno.PATERNO),
                                    leftButton: "/images/" + img + "left" + calidad,
                                    sucursal: suc,
                                    rightButton: "/images/der" + calidad,
                                    subtitle: getEspecialidades(suc)
                                });
                                $.mapview.addAnnotation(annotationDoctor);
                            }
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
                            Ti.App.fireEvent("ocultaCargando");
                        }, 1e3);
                    }
                } catch (errora) {
                    alert("Error(downMedicosCercanos): " + errora);
                }
            },
            onerror: function(e) {
                var error = JSON.stringify(e);
                Ti.UI.createAlertDialog({
                    message: "Error:" + error,
                    ok: "Aceptar",
                    title: "Error Membresia"
                }).show();
            },
            timeout: 2e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function resultadosRed(e) {
        if (null != route) {
            $.mapview.removeRoute(route);
            $.vwIndicaciones.hide();
        }
        var Proveedores = e.resultado;
        $.mapview.removeAllAnnotations();
        $.mapview.addAnnotation(anotacionUsuario);
        if (null == Proveedores || 0 == Proveedores.length) alert("no hay resultados"); else {
            var newlatitudG = Proveedores[0].SUCURSALES[0].DIRECCION.EJEX;
            var newlongitudG = Proveedores[0].SUCURSALES[0].DIRECCION.EJEY;
            var newRegion = {
                latitude: newlatitudG,
                longitude: newlongitudG,
                latitudeDelta: .05,
                longitudeDelta: .05,
                animate: true
            };
            $.mapview.setLocation(newRegion);
            for (var i = 0; Proveedores.length > i; i++) {
                var uno = Proveedores[i];
                if (0 == uno.SUCURSALES.length) continue;
                var mapaLatitudR = uno.SUCURSALES[0].DIRECCION.EJEX;
                var mapaLongitudR = uno.SUCURSALES[0].DIRECCION.EJEY;
                var prueba = 111.11 * Math.pow(Math.pow(mapaLongitudR - longitudG, 2) + Math.pow(mapaLatitudR - latitudG, 2), .5);
                if (distancia > prueba) {
                    distancia = prueba;
                    deltaautomatico = 2 * Math.pow(Math.pow(mapaLongitudR - longitudG, 2) + Math.pow(mapaLatitudR - latitudG, 2), .5);
                }
                for (var j = 0; uno.SUCURSALES.length > j; j++) {
                    var suc = uno.SUCURSALES[j];
                    if (3 == idTipoBusqueda) {
                        suc.DESCUENTO = uno.DESCUENTO;
                        suc.RESTRICCION = uno.RESTRICCION;
                    }
                    var annotationDoctor = Alloy.Globals.Map.createAnnotation({
                        latitude: suc.DIRECCION.EJEX,
                        longitude: suc.DIRECCION.EJEY,
                        image: "/images/" + img + calidad,
                        animate: true,
                        title: "" + (void 0 == uno.NOMBRE ? uno.NOMBRE_COMERCIAL : uno.NOMBRE + " " + uno.MATERNO + " " + uno.PATERNO),
                        leftButton: "/images/" + img + "left" + calidad,
                        sucursal: suc,
                        rightButton: "/images/der" + calidad,
                        subtitle: getEspecialidades(suc)
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
            }
            Ti.App.fireEvent("ocultaCargando");
        }
    }
    function creaRuta(e) {
        Ti.App.fireEvent("muestraCargando");
        UbicacionActual();
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
        var urlGoogle = "http://maps.google.com/maps/api/directions/json?origin=" + latitudG + "," + longitudG + "&destination=" + e.latitud + "," + e.longitud + "&language=es&sensor=false";
        Ti.API.info(urlGoogle);
        Ti.App.fireEvent("cierraMenuDer");
        var cliGoogle = Ti.Network.createHTTPClient({
            onload: function() {
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
                Ti.App.fireEvent("ocultaCargando");
            },
            onerror: function(e) {
                var error = JSON.stringify(e);
                Ti.UI.createAlertDialog({
                    message: "Error:" + error,
                    ok: "Aceptar",
                    title: "Error Membresia"
                }).show();
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
    function getEspecialidades(suc) {
        var especialidades = "";
        if (null != suc.ESPECIALIDADES) for (var i = 0; suc.ESPECIALIDADES.length > i; i++) {
            var esp = suc.ESPECIALIDADES[i];
            especialidades += " " + esp.ESPECIALIDAD;
        }
        return especialidades;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "redMedicos";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.redMedicos = Ti.UI.createWindow({
        navBarHidden: true,
        id: "redMedicos"
    });
    $.__views.redMedicos && $.addTopLevelView($.__views.redMedicos);
    $.__views.mapview = Alloy.Globals.Map.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        mapType: Alloy.Globals.Map.NORMAL_TYPE,
        top: 0,
        left: 0,
        id: "mapview",
        ns: "Alloy.Globals.Map",
        zindex: "99998"
    });
    $.__views.redMedicos.add($.__views.mapview);
    $.__views.vwIndicaciones = Ti.UI.createScrollView({
        borderColor: "#E6E6E6",
        borderWidth: ".2dp",
        color: "#FFFFFF",
        zIndex: "99999",
        height: "20%",
        width: Ti.UI.FILL,
        bottom: 0,
        horizontalBounce: false,
        id: "vwIndicaciones",
        layout: "vertical"
    });
    $.__views.redMedicos.add($.__views.vwIndicaciones);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var rc = Alloy.Globals.Map.isGooglePlayServicesAvailable();
    switch (rc) {
      case Alloy.Globals.Map.SUCCESS:
        Ti.API.info("Google Play services is installed.");
        break;

      case Alloy.Globals.Map.SERVICE_MISSING:
        alert("Google Play services is missing. Please install Google Play services from the Google Play store.");
        break;

      case Alloy.Globals.Map.SERVICE_VERSION_UPDATE_REQUIRED:
        alert("Google Play services is out of date. Please update Google Play services.");
        break;

      case Alloy.Globals.Map.SERVICE_DISABLED:
        alert("Google Play services is disabled. Please enable Google Play services.");
        break;

      case Alloy.Globals.Map.SERVICE_INVALID:
        alert("Google Play services cannot be authenticated. Reinstall Google Play services.");
        break;

      default:
        alert("Unknown error.");
    }
    var args = arguments[0] || {};
    var idAfiliacion = args.idAfiliacion;
    var idTipoBusqueda = args.idTipoBusqueda;
    var img = "";
    var calidad = Alloy.Dimension() + ".png";
    var latitudG = 22.71539;
    var longitudG = -101.25489;
    var distancia = 1e6;
    var rango = 5;
    var metodoApi;
    $.vwIndicaciones.hide();
    switch (idTipoBusqueda) {
      case "1":
        img = "doc";
        metodoApi = "MedicoTopUbicacion";
        break;

      case "2":
        img = "servicio";
        metodoApi = "HospitalTopUbicacion";
        break;

      case "3":
        img = "descuento";
        metodoApi = "TDCRango";
        break;

      case "4":
        img = "lab";
        metodoApi = "LaboratorioTopUbicacion";
    }
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
    $.mapview.addAnnotation(anotacionUsuario);
    setTimeout(function() {
        UbicacionActual();
        setTimeout(function() {
            downMedicosCercanos();
        }, 1e3);
    }, 4e3);
    setTimeout(function() {
        UbicacionActual();
    }, 2e3);
    Ti.App.fireEvent("muestraSubMenu", {
        vista: "filtrosRedes",
        parametros: {
            idAfiliacion: idAfiliacion,
            idTipoBusqueda: idTipoBusqueda
        }
    });
    var deltaautomatico = .03;
    $.mapview.addEventListener("click", function(e) {
        Ti.API.info(e.clicksource);
        null != e.clicksource && "pin" != e.clicksource && "annotation" != e.clicksource && Ti.App.fireEvent("MuestraDetalleProveedor", {
            idAfiliacion: idAfiliacion,
            idTipoBusqueda: idTipoBusqueda,
            sucursal: e.annotation.sucursal
        });
    });
    Ti.App.addEventListener("resultadosRed", resultadosRed);
    var route = null;
    Ti.App.addEventListener("creaRuta", creaRuta);
    exports.destroy = function() {
        Ti.App.removeEventListener("resultadosRed", resultadosRed);
        Ti.App.removeEventListener("creaRuta", creaRuta);
    };
    Alloy.Globals.current = $;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;