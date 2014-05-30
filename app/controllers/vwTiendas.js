var sucursales = arguments[0] || {};
//Variables
var calidad = Alloy.Dimension() + '.png';
var latitudG = 22.71539;
var longitudG = -101.25489;
var distancia = 1000000;
var deltaautomatico = 0.03;

$.imgClose.addEventListener('click', function(e) {
	$.wnTiendas.close();
	
	Ti.App.removeEventListener('creaRutaCupon', creaRutaCupon);
});

$.vwIndicaciones.hide();
$.mapview.region = {latitude: latitudG, longitude: longitudG,
                    latitudeDelta: 25, longitudeDelta: 30 };
                    
                   
$.mapview.userLocation = true;
$.mapview.userLocationButton = true;
var anotacionUsuario = Alloy.Globals.Map.createAnnotation({
	latitude: latitudG,
	longitude: longitudG,
	image: '/images/user' + calidad,
	animate: true,
	title: 'Tu Ubicaciòn Actual'
});

muestraCargando();
$.mapview.addAnnotation(anotacionUsuario);
setTimeout(function(){
	UbicacionActual();
	setTimeout(function(){
		tiendasCercanos();
	}, 500);
}, 4000);
setTimeout(function(){
	UbicacionActual();
}, 2500);

function UbicacionActual () {
  	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	Ti.Geolocation.purpose = "Mostrar tu posición actual";
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if(!e.success || e.error)
			                return;
		longitudG = e.coords.longitude;
		latitudG = e.coords.latitude;
	});

	var newRegion = {
		latitude : latitudG,
		longitude : longitudG,
		animate : true,
		latitudeDelta : 0.02,
		longitudeDelta : 0.02
	};
	
	$.mapview.setLocation(newRegion);
	anotacionUsuario.latitude = latitudG;
	anotacionUsuario.longitude = longitudG;
}

function tiendasCercanos () {
 				$.mapview.removeAllAnnotations();
				$.mapview.addAnnotation(anotacionUsuario);
			
				if (sucursales.length == 0) {
					alert("no hay resultados");
				} else {
								
						var	mapaLatitudR = sucursales[0].DIRECCION.EJEX;
						var mapaLongitudR = sucursales[0].DIRECCION.EJEY;

						var prueba = Math.pow((Math.pow((mapaLongitudR - longitudG), 2) + Math.pow((mapaLatitudR - latitudG), 2)), .5) * 111.11;

						if (prueba < distancia) {
							distancia = prueba;
							deltaautomatico = 2.0 * Math.pow((Math.pow((mapaLongitudR - longitudG), 2) + Math.pow((mapaLatitudR - latitudG), 2)), 0.5);
						}
						for (var j=0; j < sucursales.length; j++) {
							var suc =  sucursales[j];
						    
						 	var annotationDoctor = Alloy.Globals.Map.createAnnotation({
								latitude : suc.DIRECCION.EJEX,
								longitude : suc.DIRECCION.EJEY,
								image : '/images/doc' + calidad,
								animate : true,
								title : '' + suc.SUCURSAL,
								leftButton : '/images/docleft' + calidad,
								rightButton : '/images/der' + calidad,
								suc: suc
							});
							
							$.mapview.addAnnotation(annotationDoctor);
						};
				
					
					var newRegion = {
						latitude : latitudG,
						longitude : longitudG,
						animate : true,
						latitudeDelta : deltaautomatico,
						longitudeDelta : deltaautomatico
					};
				
					setTimeout(function() {
						$.mapview.setLocation(newRegion);
						ocultaCargando();
					}, 1000);

	}
}

var route = null;
var vwDet = null;
Ti.App.addEventListener('creaRutaCupon',creaRutaCupon); 
function creaRutaCupon (e) {
	muestraCargando();
	var	mapaLatitudR = e.latitud;
	var mapaLongitudR = e.longitud;
	 var prueba = Math.pow((Math.pow((mapaLongitudR - longitudG), 2) + Math.pow((mapaLatitudR - latitudG), 2)), .5) * 111.11;

		if (prueba < distancia) {
			distancia = prueba;
			deltaautomatico = 2.0 * Math.pow((Math.pow((mapaLongitudR - longitudG), 2) + Math.pow((mapaLatitudR - latitudG), 2)), 0.5);
		}
		var newRegion = {
						latitude : latitudG,
						longitude : longitudG,
						animate : true,
						latitudeDelta : deltaautomatico,
						longitudeDelta : deltaautomatico
					};
		setTimeout(function() {
			$.mapview.setLocation(newRegion);
		}, 1000);	
	 UbicacionActual();
	var urlGoogle = 'http://maps.google.com/maps/api/directions/json?origin=' + latitudG + ',' + longitudG  + '&destination=' + e.latitud + ','  + e.longitud + '&language=es&sensor=false';
	Ti.API.info(urlGoogle);
	Ti.App.fireEvent('cierraMenuDer');
	var cliGoogle =  Ti.Network.createHTTPClient({
  		onload : function(e){
  			if(vwDet != null){
  				$.wnTiendas.remove(vwDet);
  				vwDet = null;
  			}
  			if(route != null)
  				$.mapview.removeRoute(route);
  			var res = JSON.parse(this.responseText);
  			var puntos = [];
  			var pasos = res.routes[0].legs[0].steps;
  			
  			$.vwIndicaciones.removeAllChildren();
			var vwRowIni = Alloy.createController('indicacionRow', { paso: res.routes[0].legs[0] , banInicio : true}).getView();
			$.vwIndicaciones.add(vwRowIni);
				
  			for (var i=0; i < pasos.length; i++) {
				var paso = pasos[i];
				
				var decodedPolyline = decodeLine(paso.polyline.points);
				
				for (var j=0; j < decodedPolyline.length; j++) {
					var linea =  decodedPolyline[j];
					if (linea != null) {
	                    puntos.push({
	                        latitude: linea[0],
	                        longitude: linea[1]
	                    });
                	}
				};
			
				var vwRowInd = Alloy.createController('indicacionRow', { paso: paso , banInicio : false}).getView();
				$.vwIndicaciones.add(vwRowInd);
			};	
		
		//crea indicaciones
		
			route = Alloy.Globals.Map.createRoute({
		 		points : puntos,
		 		color: '#001f5b'
		 	});
		 $.mapview.addRoute(route);
		 $.vwIndicaciones.show();
		ocultaCargando();
  		},
  		onerror: function(e){
  			ocultaCargando();
  			alert(e);
  		}
  	});
  	
  	cliGoogle.open('GET', urlGoogle);
  	cliGoogle.send();		
}
//Funcion para generar las lineas
function decodeLine(encoded) {
    var len = encoded.length;
    var index = 0;
    var array = [];
    var lat = 0;
    var lng = 0;
 
    while (index < len) {
        var b;
        var shift = 0;
        var result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
 
        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;
 
        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
 
        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;
 
        array.push([lat * 1e-5, lng * 1e-5]);
    }
 
    return array;
}

$.mapview.addEventListener('click', function  (e) {
	Ti.API.info(e.clicksource);
  if(e.clicksource != null && e.clicksource != 'pin' && e.clicksource != 'annotation'){
  	 vwDet = Alloy.createController('vwDetalleProvMap', e.annotation.suc).getView();
  	  var alto = Titanium.Platform.displayCaps.platformHeight;
  	  vwDet.top = alto;
  	  vwDet.animate({
            top : '25%',
            duration : 500,
            curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
   $.wnTiendas.add(vwDet);
  }
  else
  	if(vwDet != null){
  		 vwDet.animate({
            top : alto,
            duration : 500,
            curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        }, function () {
          $.wnTiendas.remove(vwDet);
                  });
  		
  		vwDet = null;
  	}
});
//Metodos
function muestraCargando () {
	$.cargando.show();
	$.vwCarga.show();  
}
function  ocultaCargando() {
  $.vwCarga.hide();  
}