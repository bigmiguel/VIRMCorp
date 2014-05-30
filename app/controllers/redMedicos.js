
/*-------------Valida servicios de google play----------------*/
if(Ti.Platform.osname == 'android'){
var rc = Alloy.Globals.Map.isGooglePlayServicesAvailable();

switch (rc) {
    case Alloy.Globals.Map.SUCCESS:
         Ti.API.info('Google Play services is installed.');
        break;
    case Alloy.Globals.Map.SERVICE_MISSING:
        alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
        break;
    case Alloy.Globals.Map.SERVICE_VERSION_UPDATE_REQUIRED:
        alert('Google Play services is out of date. Please update Google Play services.');
        break;
    case Alloy.Globals.Map.SERVICE_DISABLED:
        alert('Google Play services is disabled. Please enable Google Play services.');
        break;
    case Alloy.Globals.Map.SERVICE_INVALID:
        alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
        break;
    default:
        alert('Unknown error.');
        break;
}
}
/*-----------------------------Variables--------------------*/

var args = arguments[0] || {};
var idAfiliacion = args.idAfiliacion;
var idTipoBusqueda = args.idTipoBusqueda;
var img = '';
var calidad = Alloy.Dimension() + '.png';
var latitudG = 22.71539;
var longitudG = -101.25489;
var distancia = 1000000;
var rango = 5;
var metodoApi ;

$.vwIndicaciones.hide();

switch(idTipoBusqueda)
{
	case '1':
	 	img = 'doc';
	 	metodoApi = 'MedicoTopUbicacion';
	break;
	case '2':
		img = 'servicio';
		metodoApi = 'HospitalTopUbicacion';
	break;
	case '3':
		img ='descuento';
		metodoApi = 'TDCRango';
	break;
	case '4':
		img ='lab';
		metodoApi = 'LaboratorioTopUbicacion';
	break;
}
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

$.mapview.addAnnotation(anotacionUsuario);
setTimeout(function(){
	UbicacionActual();
	setTimeout(function(){
			downMedicosCercanos();
	}, 1000);
}, 4000);
setTimeout(function(){
	UbicacionActual();
}, 2000);

	
//Muestra subMenu
Ti.App.fireEvent('muestraSubMenu',{
	vista:'filtrosRedes',
	parametros:{
		idAfiliacion: idAfiliacion,
		idTipoBusqueda: idTipoBusqueda
		}
});
//----------------------Funciones

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
var deltaautomatico = 0.03;

function downMedicosCercanos() {
	var url = Alloy.CFG.urlAPIVRIM + metodoApi + '/?Rango=' + rango + '&Latitud=' + latitudG + '&Longitud=' + longitudG;
	
	var xhr = Titanium.Network.createHTTPClient({

		onload : function(e) {
			try {
			
				obj = JSON.parse(this.responseText);
				$.mapview.removeAllAnnotations();
				$.mapview.addAnnotation(anotacionUsuario);

				if (obj.length == 0) {
					alert("no hay resultados");
					Ti.App.fireEvent('ocultaCargando');
				} else {
					
					for (var i = 0; i < obj.length; i++) {

						var uno = obj[i];
						if(uno.SUCURSALES.length == 0)
							continue;
						
						var	mapaLatitudR = uno.SUCURSALES[0].DIRECCION.EJEX;
						var mapaLongitudR = uno.SUCURSALES[0].DIRECCION.EJEY;

						var prueba = Math.pow((Math.pow((mapaLongitudR - longitudG), 2) + Math.pow((mapaLatitudR - latitudG), 2)), .5) * 111.11;

						if (prueba < distancia) {
							distancia = prueba;
							deltaautomatico = 2.0 * Math.pow((Math.pow((mapaLongitudR - longitudG), 2) + Math.pow((mapaLatitudR - latitudG), 2)), 0.5);
						}
						for (var j=0; j < uno.SUCURSALES.length; j++) {
							var suc =  uno.SUCURSALES[j];
							if(idTipoBusqueda==3){
								suc.DESCUENTO = uno.DESCUENTO;
								suc.RESTRICCION = uno.RESTRICCION;
							}
							var annotationDoctor = Alloy.Globals.Map.createAnnotation({
								latitude : suc.DIRECCION.EJEX,
								longitude : suc.DIRECCION.EJEY,
								image : '/images/' + img + calidad,
								animate : true,
								title : '' + (uno.NOMBRE == undefined ? uno.NOMBRE_COMERCIAL : uno.NOMBRE + ' ' + uno.MATERNO + ' ' + uno.PATERNO),
								leftButton : '/images/' + img + 'left' + calidad,
								sucursal : suc,
								rightButton : '/images/der' + calidad,
								subtitle : getEspecialidades(suc)
							});
							
							$.mapview.addAnnotation(annotationDoctor);
						};
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
						Ti.App.fireEvent('ocultaCargando');
					}, 1000);
					
				}
			} catch (errora) {
				alert('Error(downMedicosCercanos): ' + errora);
			}
		},
		onerror : function(e) {
			//Ti.API.info("Received text: " + this.responseText);
			var error = JSON.stringify(e);
				Ti.UI.createAlertDialog({
					message : 'Error:' + error,
					ok : 'Aceptar',
					title : 'Error Membresia'
				}).show();
		},
		timeout : 20000
	});

	xhr.open("GET", url);
	xhr.send();

};

//--------Eventos del Mapa
$.mapview.addEventListener('click', function  (e) {
	Ti.API.info(e.clicksource);
  if(e.clicksource != null && e.clicksource != 'pin' && e.clicksource != 'annotation'){
  	Ti.App.fireEvent('MuestraDetalleProveedor', {
  		idAfiliacion : idAfiliacion,
  		idTipoBusqueda : idTipoBusqueda,
  		sucursal : e.annotation.sucursal
  	});
  }
});
//---------------Eventos nivel aplicacion-------------------
Ti.App.addEventListener('resultadosRed',resultadosRed); 
function resultadosRed(e){
	
	if(route != null){
  		$.mapview.removeRoute(route);
  		$.vwIndicaciones.hide();
  	}
	var Proveedores = e.resultado;
	$.mapview.removeAllAnnotations();
	$.mapview.addAnnotation(anotacionUsuario);
	if (Proveedores == null || Proveedores.length == 0) {
				alert("no hay resultados");
	} else {
		var newlatitudG = Proveedores[0].SUCURSALES[0].DIRECCION.EJEX;
		var newlongitudG = Proveedores[0].SUCURSALES[0].DIRECCION.EJEY;
		
		var newRegion = {
				latitude : newlatitudG,
				longitude : newlongitudG,
				latitudeDelta : 0.05,
				longitudeDelta : 0.05,
				animate : true
				};
		$.mapview.setLocation(newRegion);
		
		for(var i=0; i < Proveedores.length; i++) {
						var uno = Proveedores[i];
						
						if(uno.SUCURSALES.length == 0)
							continue;
						
						var	mapaLatitudR = uno.SUCURSALES[0].DIRECCION.EJEX;
						var mapaLongitudR = uno.SUCURSALES[0].DIRECCION.EJEY;

						var prueba = Math.pow((Math.pow((mapaLongitudR - longitudG), 2) + Math.pow((mapaLatitudR - latitudG), 2)), .5) * 111.11;

						if (prueba < distancia) {
							distancia = prueba;
							deltaautomatico = 2.0 * Math.pow((Math.pow((mapaLongitudR - longitudG), 2) + Math.pow((mapaLatitudR - latitudG), 2)), 0.5);
						}
						for (var j=0; j < uno.SUCURSALES.length; j++) {
							var suc =  uno.SUCURSALES[j];
							if(idTipoBusqueda==3){
								suc.DESCUENTO = uno.DESCUENTO;
								suc.RESTRICCION = uno.RESTRICCION;
							}
							var annotationDoctor = Alloy.Globals.Map.createAnnotation({
								latitude : suc.DIRECCION.EJEX,
								longitude : suc.DIRECCION.EJEY,
								image : '/images/' + img + calidad,
								animate : true,
								title : '' + (uno.NOMBRE == undefined ? uno.NOMBRE_COMERCIAL : uno.NOMBRE + ' ' + uno.MATERNO + ' ' + uno.PATERNO),
								leftButton : '/images/' + img + 'left' + calidad,
								sucursal : suc,
								rightButton : '/images/der' + calidad,
								subtitle : getEspecialidades(suc)
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
				}
			Ti.App.fireEvent('ocultaCargando');
		};
}
var route = null;
Ti.App.addEventListener('creaRuta', creaRuta);
function creaRuta (e) {
	Ti.App.fireEvent('muestraCargando');
	 UbicacionActual();
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
	var urlGoogle = 'http://maps.google.com/maps/api/directions/json?origin=' + latitudG + ',' + longitudG  + '&destination=' + e.latitud + ','  + e.longitud + '&language=es&sensor=false';
	Ti.API.info(urlGoogle);
	Ti.App.fireEvent('cierraMenuDer');
	var cliGoogle =  Ti.Network.createHTTPClient({
  		onload : function(e){
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
		 Ti.App.fireEvent('ocultaCargando');
  		},
  		onerror: function(e){
  			var error = JSON.stringify(e);
			Ti.UI.createAlertDialog({
				message : 'Error:' + error,
				ok : 'Aceptar',
				title : 'Error Membresia'
			}).show();
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

/*-------------------------Metodos-------------------------------------*/
function getEspecialidades(suc){
	var especialidades ='';
	if(suc.ESPECIALIDADES != null){
		for (var i=0; i < suc.ESPECIALIDADES.length; i++) {
		  var esp = suc.ESPECIALIDADES[i];
		  especialidades += ' ' + esp.ESPECIALIDAD;
		};
	}
	return especialidades;
}



//Expocion de metodos
  exports.destroy = function() {
    // Quitar eventos a nivel App
     Ti.App.removeEventListener('resultadosRed',resultadosRed);
     Ti.App.removeEventListener('creaRuta',creaRuta);
};
Alloy.Globals.current = $;