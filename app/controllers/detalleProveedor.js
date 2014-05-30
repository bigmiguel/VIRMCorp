$.lblTitulo.applyProperties($.createStyle(Alloy.FuenteTitulo()) );
$.lblNombre.applyProperties($.createStyle(Alloy.Fuente()));
$.lblEspecialidad.applyProperties($.createStyle(Alloy.Fuente()));
$.lblHorario.applyProperties($.createStyle(Alloy.Fuente()));
$.lblDireccion.applyProperties($.createStyle(Alloy.Fuente()));
$.lblCosto.applyProperties($.createStyle(Alloy.Fuente()));
$.lblTelefono.applyProperties($.createStyle(Alloy.Fuente()));
$.lblTRestricciones.applyProperties($.createStyle(Alloy.Fuente()));

$.lblTNombre.applyProperties($.createStyle(Alloy.Fuente()));
$.lblTEspecialidad.applyProperties($.createStyle(Alloy.Fuente()));
$.lblTHorario.applyProperties($.createStyle(Alloy.Fuente()));
$.lblTDireccion.applyProperties($.createStyle(Alloy.Fuente()));
$.lblTCosto.applyProperties($.createStyle(Alloy.Fuente()));
$.lblTTelefono.applyProperties($.createStyle(Alloy.Fuente()));
$.lblRestricciones.applyProperties($.createStyle(Alloy.Fuente()));

//----------------------Variables -------------------
var args = arguments[0] || {};
var suc = args.sucursal;
var idTipoBusqueda = args.idTipoBusqueda;
var idAfiliacion = args.idAfiliacion;
var latitud;
var longitud;
var img = '';
var costo = '';

var calidad = Alloy.Dimension() + '.png';

switch(idTipoBusqueda)
{
	case '1':
	 	img = 'doc';
	 	$.lblTitulo.text = 'Detalle Mèdico';
	 	$.addClass($.lblTitulo, 'tituloRed', { color: '#DA0A0A' });
	 	//Campos innecesarios
	 	$.detProveedor.remove($.lblTRestricciones);
		$.detProveedor.remove($.lblRestricciones);
		$.detProveedor.remove($.lblTCosto);
		$.detProveedor.remove($.lblCosto);
	break;
	case '2':
		img = 'servicio';
		$.lblTitulo.text = 'Detalle Servicio';
		$.addClass($.lblTitulo, 'tituloRed', { color: '#DA0A0A' });
		//Campos innecesarios
	 	$.detProveedor.remove($.lblTRestricciones);
		$.detProveedor.remove($.lblRestricciones);
		$.detProveedor.remove($.lblTCosto);
		$.detProveedor.remove($.lblCosto);
	break;
	case '3':
		img = 'descuento';
		$.lblTitulo.text = 'Detalle del Descuento';
		
		$.detProveedor.remove($.lblTTelefono);
		$.detProveedor.remove($.lblTelefono);
		$.detProveedor.remove($.lblTEspecialidad);
		$.detProveedor.remove($.lblEspecialidad);
		
		$.lblRestricciones.text = suc.RESTRICCION;
		$.lblCosto.text = suc.DESCUENTO;
		$.addClass($.lblTitulo, 'tituloRed', { color: '#628f02' });
	break;
	case '4':
		img = 'lab';
		$.lblTitulo.text = 'Detalle Lab.';
		$.addClass($.lblTitulo, 'tituloRed', { color: '#DA0A0A' });
	
		//Campos innecesarios
		$.detProveedor.remove($.lblTHorario);
		$.detProveedor.remove($.lblHorario);
	 	$.detProveedor.remove($.lblTRestricciones);
		$.detProveedor.remove($.lblRestricciones);
		$.detProveedor.remove($.lblTCosto);
		$.detProveedor.remove($.lblCosto);
	break;
}
			$.lblEspecialidad.text = getEspecialidades(suc);
			$.lblNombre.text = suc.NOMBRE_SUCURSAL;
			$.lblDireccion.text = suc.DIRECCION.CALLE + ', ' + suc.DIRECCION.NUMEROEXT + ', ' + suc.DIRECCION.COLONIA + ', ' + suc.DIRECCION.MUNICIPIO + ', ' + suc.DIRECCION.ESTADO + ', CP:' + suc.DIRECCION.CP;
			latitud =  suc.DIRECCION.EJEX;
			longitud = suc.DIRECCION.EJEY;
			$.lblHorario.text = suc.DIRECCION.HORARIO;
			if(idTipoBusqueda != 3){
			var tel = '';
			for (var i=0; i < suc.MEDIOS_COMUNICACION.length; i++) {
				var telefono = suc.MEDIOS_COMUNICACION[i];
				if(telefono.ID_TIPOC < 4){
					tel += telefono.MEDIO + '\n';		
				}			 
			};
			 $.lblTelefono.text = tel;
			}
			var anotacion = Alloy.Globals.Map.createAnnotation({
							latitude : latitud,
							longitude : longitud,
							image : '/images/' + img + calidad,
							title : '' + obj.nomSucursal
					});
				var newRegion = {
						latitude : latitud,
						longitude : longitud,
						latitudeDelta : 0.003,
						longitudeDelta : 0.003,
						animate : false
					};
					$.mapViewDet.setLocation(newRegion);
					$.mapViewDet.addAnnotation(anotacion);

//Eventos
$.imgRuta.addEventListener('click', function(e){
	Ti.App.fireEvent('creaRuta', { latitud: latitud, longitud: longitud });
});
$.btnBusqueda.addEventListener('click', function(e){
	Ti.App.fireEvent('regresaBusqueda');
});

//-------Eventos nivel aplicaciòn


/*-------------------------Metodos-------------------------------------*/
function getEspecialidades(suc){
	var especialidades ='';
	if(suc.ESPECIALIDADES != null){
		for (var i=0; i < suc.ESPECIALIDADES.length; i++) {
		  var esp = suc.ESPECIALIDADES[i];
		  especialidades += ' ' + esp.ESPECIALIDAD + ' Des:' + esp.DESCUENTO + '\n';
		};
	}
	return especialidades;
}