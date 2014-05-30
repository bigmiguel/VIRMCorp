var Util = require('utils');

var args = arguments[0] || {};
var cupon = args.cupon;
var sucursal = cupon.sucursales[0];
var calidad = Alloy.Dimension() + '.png';
var user = Util.user();

//Estilos controles
$.btnTiendas.applyProperties( $.createStyle(Alloy.Fuente()) );
$.btnRedimir.applyProperties( $.createStyle(Alloy.Fuente()) );
$.lblDescripcion.applyProperties( $.createStyle(Alloy.FuenteTitulo()) );
$.lblRestricciones.applyProperties( $.createStyle(Alloy.FuenteMedia()) );
$.lblProveedor.applyProperties( $.createStyle(Alloy.FuenteChica()) );
$.lblSucusal.applyProperties( $.createStyle(Alloy.FuenteChica()) );
$.lblTitulo.applyProperties( $.createStyle(Alloy.FuenteTitulo()) );

$.imgCupon.image = cupon.UrlLogo;
$.lblDescripcion.text = cupon.DescripcionCupon;
$.lblRestricciones.text = cupon.Restricciones;
$.lblProveedor.text = cupon.RazonSocialProveedor;
$.lblSucusal.text = sucursal.SUCURSAL;

$.imgClose.addEventListener('click', function(e) {
	$.wnDetalle.close({ transition : Titanium.UI.iPhone.AnimationStyle.CURL_DOWN });
});
$.btnTiendas.addEventListener('click', function(){
	 var vwCupon = Alloy.createController('vwTiendas', cupon.sucursales).getView();
	 vwCupon.open({ modal: true});	
});
$.btnRedimir.addEventListener('click', function  (e) {
 
 var dialog = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['Confirmar', 'Cancelar'],
    message: '¿Estas seguro de redimir este cupon?',
    title: 'Redimir'
  });
  dialog.addEventListener('click', function(e){
    if (e.index === 0){

		 var url = Alloy.CFG.urlCupones + 'GetCupon?membresia=' + user.NO_TARJETA + '&CuponId=' + cupon.CuponId;
		
		var cliCupones = Ti.Network.createHTTPClient({
					onload: function(e){
						var cupon = JSON.parse(this.responseText);
						
						$.wnDetalle.close({ transition : Titanium.UI.iPhone.AnimationStyle.CURL_DOWN });
					},
					onerror:function(e){
						Ti.App.fireEvent('ocultaCargando');
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
		  	   }
		  });
		  dialog.show();	
});

	var anotacion = Alloy.Globals.Map.createAnnotation({
							latitude : sucursal.DIRECCION.EJEX,
							longitude : sucursal.DIRECCION.EJEY,
							image : '/images/doc' + calidad,
							title : '' + sucursal.SUCURSAL
					});
	var newRegion = {
						latitude : sucursal.DIRECCION.EJEX,
						longitude : sucursal.DIRECCION.EJEY,
						latitudeDelta : 0.003,
						longitudeDelta : 0.003,
						animate : false
					};
	$.vwMapa.setLocation(newRegion);
	$.vwMapa.addAnnotation(anotacion);
