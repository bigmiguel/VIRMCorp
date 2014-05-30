//Aumenta tamañosi es iOS 7
var Util = require('utils');
$.vwTopIOS.setHeight(Util.isiOS7Plus() ? 20 : 0);

//Estilos controles
$.lblTitulo.applyProperties( $.createStyle(Alloy.FuenteTitulo()) );

var alto = Titanium.Platform.displayCaps.platformHeight / 2.5;

var args = arguments[0] || {};

var user = Util.user();

var idTipoCupon = args.idTipoCupon;
var latitudG = 22.71539;
var longitudG = -101.25489;
muestraCargando();
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	Ti.Geolocation.purpose = "Mostrar tu posición actual";
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if(!e.success || e.error)
			                return;
		longitudG = e.coords.longitude;
		latitudG = e.coords.latitude;
		var url = Alloy.CFG.urlCupones + 'GetCuponesMembresia?membresia=' + user.NO_TARJETA + '&tipo=' + idTipoCupon + '&latitud=' + latitudG + '&longitud=' + longitudG;
		
		Ti.API.info(url);
		var cliCupones = Ti.Network.createHTTPClient({
			onload: function(e){
				
				var cupones = JSON.parse(this.responseText);
				Ti.API.info(this.responseText);
				
				$.vwContCupones.height = (alto + 10) * (((cupones.length > 4 ? cupones.length : 4) / 2) + (cupones.length % 2));
				for (var i=0; i < cupones.length; i++) {
				  var cupon = cupones[i];
				  var vwCupon = Alloy.createController('vwCupon', cupon).getView();	
				  vwCupon.height = alto;
				  vwCupon.cupon = cupon;
				  vwCupon.addEventListener('click',function(e){
				  	var it = e.source;
				  	var nuevaVista = Alloy.createController('vwDetalleCupon', {cupon : it.cupon}).getView();	
				  	nuevaVista.open({ transition : Titanium.UI.iPhone.AnimationStyle.CURL_UP });
				  	
				  });
				  $.vwContCupones.add(vwCupon);
				  ocultaCargando();
				}
				
			},
			onerror:function(e){
				ocultaCargando();
				var error = JSON.stringify(e);
				Ti.UI.createAlertDialog({
					message : 'Error:' + error.Message,
					ok : 'Aceptar',
					title : 'Error Membresia'
				}).show();
			}
		});
		
	cliCupones.open('GET', url);
  	cliCupones.send();	
	});
	
$.btnMenu.addEventListener('click', function  (e) {
  $.wnCupones.close({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT });
});

function muestraCargando () {
	$.cargando.show();
	$.vwCarga.show();  
}
function  ocultaCargando() {
  $.vwCarga.hide();  
}
