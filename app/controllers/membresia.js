var Util = require('utils');

try
{
	require('date');
}
catch(e)
{}

	var args = arguments[0] || {};
	//Obtiene datos del usuario
	var user = Util.user();
	
	var trans = Ti.UI.create2DMatrix();
	trans =  trans.rotate(90);
	
 function ajustaImagen(e){
 var numTar = '';
 for (var i=0; i < user.NO_TARJETA.length; i++) {
   	     numTar += user.NO_TARJETA[i] ;
   	     if((i+1)%4 == 0)
   	     	numTar +=' ';
 };
 	
 	
 	$.lblTitular.text = user.NOMBRE_TARJETA;
	$.lblMembresia.text = numTar;
	$.lblVigencia.text = 'Vence ' + user.FECHA_VIGENCIA.substring(0, 10);
	
	$.lblMembresia.left = '10%';
	$.lblMembresia.top = ($.vwMembresia.size.height * .32) + ($.lblMembresia.size.width / 2);

	$.lblTitular.left = '5%';
	$.lblTitular.top = ($.vwMembresia.size.height * .28) + ($.lblMembresia.size.width / 2);
	
	$.lblHora.right = "5%";
	$.lblHora.bottom = "10%";
	
	$.lblVigencia.left = "-2%";
	$.lblVigencia.bottom = "20%";
	
	$.imgTarjeta.height = $.vwMembresia.size.width * .9;
	$.imgTarjeta.width = $.vwMembresia.size.height;
	$.imgTarjeta.top = Alloy.espacioTarjeta();
	$.imgTarjeta.show();
	$.imgTarjeta.transform = trans;
	$.vwMembresia.removeEventListener('postlayout', ajustaImagen);
	
	$.lblTitular.applyProperties($.createStyle(Alloy.FuenteMedia()));
	$.lblMembresia.applyProperties($.createStyle(Alloy.FuenteTitulo()));
	$.lblHora.applyProperties($.createStyle(Alloy.FuenteTitulo()));
	$.lblVigencia.applyProperties($.createStyle(Alloy.FuenteTitulo()));
	$.lblVigencia .transform = $.lblHora.transform = $.lblTitular.transform = $.lblMembresia.transform = trans;
	Ti.App.fireEvent('ocultaCargando');
}

$.vwMembresia.addEventListener('postlayout', ajustaImagen);


setInterval(function(){
	$.lblHora.text = new Date().toString('HH:mm:ss');
}, 1000);

//Expocion de metodos
  exports.destroy = function() {
    // Quitar eventos a nivel App
};
Alloy.Globals.current = $;
