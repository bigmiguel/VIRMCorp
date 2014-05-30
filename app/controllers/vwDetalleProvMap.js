var suc = arguments[0] || {};

$.lblProveedor.applyProperties($.createStyle(Alloy.FuenteMedia()));
$.lblDireccion.applyProperties($.createStyle(Alloy.FuenteMedia()));
$.lblComollegar.applyProperties($.createStyle(Alloy.FuenteMedia()));
$.lblHorario.applyProperties($.createStyle(Alloy.FuenteMedia()));

$.lblProveedor.text = suc.SUCURSAL;
$.lblDireccion.text = suc.DIRECCION.CALLE + ', ' + suc.DIRECCION.COLONIA + ', ' + suc.DIRECCION.MUNICIPIO + ', ' + suc.DIRECCION.ESTADO + ', CP: ' +suc.DIRECCION.CP;
$.lblHorario.text = suc.DIRECCION.HORARIO;
//Eventos
$.imgComoLlegar.addEventListener('click', function(e){
	Ti.App.fireEvent('creaRutaCupon', { latitud: suc.DIRECCION.EJEX, longitud: suc.DIRECCION.EJEY });
});
$.lblComollegar.addEventListener('click', function(e){
	Ti.App.fireEvent('creaRutaCupon', { latitud: suc.DIRECCION.EJEX, longitud: suc.DIRECCION.EJEY });
});