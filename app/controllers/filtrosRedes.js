var Util = require('utils');

//Aplica Estilos a los controles
$.lblTitulo.applyProperties($.createStyle(Alloy.FuenteTitulo()) );
$.lblTituloEstado.applyProperties($.createStyle(Alloy.FuenteTitulo()) );
$.lblTEstado.applyProperties($.createStyle(Alloy.FuenteMedia()));
$.lblTMunicipio.applyProperties($.createStyle(Alloy.FuenteMedia()));
$.lblTEspecailidad.applyProperties($.createStyle(Alloy.FuenteMedia()));
$.lblTRango.applyProperties($.createStyle(Alloy.FuenteMedia()));
$.lblTEspecailidadEstado.applyProperties($.createStyle(Alloy.FuenteMedia()));

//Variable
var args = arguments[0] || {};
var idEstado = 1;
var idMunicipio = 0;
var idEspecialidad = 0;
var idEspecialidadEstado = 0;
var idAfiliacion = args.idAfiliacion;
var idTipoBusqueda = args.idTipoBusqueda;
var metodoApiEsp = '';
var metodoApi = '';
var parametroBusqueda ='';
var latitudG = 22.71539;
var longitudG = -101.25489;
var rango= 5;

switch(idTipoBusqueda)
{
	case '1':
		$.lblTitulo.text = "Red Mèdica";
		$.addClass($.lblTitulo, 'tituloRed', { color: '#00359C' });
		$.addClass($.lblTituloEstado, 'tituloRed', { color: '#00359C' });
		metodoApiEsp = 'MedicoEspecialidadRango';
		metodoApi = 'MedicoTopUbicacion';
		parametroBusqueda ='Especialidad';
	break;
	case '2':
		$.lblTitulo.text = "Servicio";
		$.addClass($.lblTitulo, 'tituloRed', { color: '#00359C' });
		$.addClass($.lblTituloEstado, 'tituloRed', { color: '#00359C' });
		metodoApiEsp ='HospitalEspecialidadRango';
		metodoApi = 'HospitalTopUbicacion';
		parametroBusqueda ='Especialidad';
	break;
	case '3':
		$.lblTitulo.text = "Descuentos TDC";
		$.addClass($.lblTitulo, 'tituloRed', { color: '#628f02' });
		$.addClass($.lblTituloEstado, 'tituloRed', { color: '#628f02' });
		metodoApiEsp = 'CategoriasTDC';
		metodoApi = 'CategoriaTDCRango';
		parametroBusqueda = 'Categoria';
	break;
	case '4':
		$.lblTitulo.text = "Laboratorios";
		$.addClass($.lblTitulo, 'tituloRed', { color: '#628f02' });
		$.addClass($.lblTituloEstado, 'tituloRed', { color: '#628f02' });
		metodoApiEsp ='LaboratorioEspecialidadRango';
		metodoApi = 'LaboratorioTopUbicacion';
		parametroBusqueda = 'Especialidad';
	break;
}

function UbicacionActual () {
  	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	Ti.Geolocation.purpose = "Mostrar tu posición actual";
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if(!e.success || e.error)
		   return;
		longitudG = e.coords.longitude;
		latitudG = e.coords.latitude;
		bajarEspecialidadesMedicos();
	});
}


setTimeout(function(){
	UbicacionActual();
}, 6000);
//-------------------------------Eventos
$.pckRango.addEventListener('change', function(e){
	rango = $.pckRango.getSelectedRow(0).value;
	UbicacionActual();
});
$.pckEstado.addEventListener('change', function(e){
	idEstado = $.pckEstado.getSelectedRow(0).value;
	idMunicipio = 0;
	bajarMunicipiosMedicos();
	Alloy.limpiaPicker($.pckEspecialidadEstado);
});
$.pckMunicipio.addEventListener('change', function(f) {
	idEspecialidadEstado = 0;
	if($.pckMunicipio.getSelectedRow(0) != null){
		idMunicipio = '' + $.pckMunicipio.getSelectedRow(0).value;
		bajarEspecialidadesMunicipio();
	}
});
$.pckEspecialidad.addEventListener('change', function(f) {
	if($.pckEspecialidad.getSelectedRow(0) != null)
		idEspecialidad = $.pckEspecialidad.getSelectedRow(0).value;
});
$.pckEspecialidadEstado.addEventListener('change', function(f) {
	if($.pckEspecialidadEstado.getSelectedRow(0) != null)
		idEspecialidadEstado = $.pckEspecialidadEstado.getSelectedRow(0).value;
});

$.btnBuscarMedico.addEventListener('click', function(e){
	bajarDoctores();
});
$.btnBuscarMedicoEstado.addEventListener('click', function(e){
		bajarDoctoresEspecialidad();
});

bajarEstadosMedicos();
//Necesario para regrescar pickers de IPHONE

 var columnMunicipio =  Titanium.UI.createPickerColumn({});
$.pckMunicipio.columns= [columnMunicipio];

var columnEspecialidad =  Titanium.UI.createPickerColumn({});
$.pckEspecialidad.columns= [columnEspecialidad];

var columnEspecialidadEstado =  Titanium.UI.createPickerColumn({});
$.pckEspecialidadEstado.columns= [columnEspecialidadEstado];

//-------------------------------Metodos
function bajarEstadosMedicos() {
	Ti.App.fireEvent('muestraCargando');
	var data = [];
	
	var url = Alloy.CFG.urlAPI + 'Catalogos/EstadosCobertura?idTipo=' + idTipoBusqueda;
	var xhr = Titanium.Network.createHTTPClient({
		onload : function(e) {
			var obj = JSON.parse(this.responseText);
			for (var i = 0; i < obj.length; i++) {
				var efr = obj[i];

				data[i] = Titanium.UI.createPickerRow({
					title : efr.ESTADO,
					value : efr.ID_ESTADO
				});
			}
			$.pckEstado.add(data);
			
			idEstado =  1;
			bajarMunicipiosMedicos();
			Ti.App.fireEvent('ocultaCargando');
		},

		onerror : function(e) {
			Ti.App.fireEvent('ocultaCargando');
			var error = JSON.stringify(e);
				Ti.UI.createAlertDialog({
					message : 'Error(' + url + '):' + error,
					ok : 'Aceptar',
					title : 'Error Membresia'
				}).show();
		},
		timeout : 10000
	});

	xhr.open("GET", url);
	xhr.send();

}

function bajarMunicipiosMedicos() {
	Ti.App.fireEvent('muestraCargando');
	var data2 = [];
	var dataEspe = new Array();
	var url2 = Alloy.CFG.urlAPI + 'Catalogos/MunicipiosCobertura?idTipo=' + idTipoBusqueda + '&idEstado=' + idEstado;
	
	Alloy.limpiaPicker($.pckMunicipio);
	var xhr = Titanium.Network.createHTTPClient({
		onload : function(e) {
			var obj2 = JSON.parse(this.responseText);
			Alloy.limpiaPicker($.pckMunicipio);
			
			for (var i = 0; i < obj2.length; i++) {
				var efr = obj2[i];
				data2[i] = Titanium.UI.createPickerRow({
					title : efr.MUNICIPIO,
					value : efr.ID_MUNICIPIO
				});
			}
			if (Titanium.Platform.name == 'iPhone OS'){
				columnMunicipio.rows = data2;
				$.pckMunicipio.reloadColumn(columnMunicipio);
				}else{
					Util.AgregaSeleccionar($.pckMunicipio);
					$.pckMunicipio.add(data2);
				}
			Ti.App.fireEvent('ocultaCargando');
			idMunicipio = data2[0].value;
			$.pckMunicipio.setSelectedRow(0, 0);
			bajarEspecialidadesMunicipio();
		},
		onerror : function(e) {
			Ti.App.fireEvent('ocultaCargando');
			var error = JSON.stringify(e);
				Ti.UI.createAlertDialog({
					message : 'Error(' + url2 + '):' + error,
					ok : 'Aceptar',
					title : 'Error Membresia'
				}).show();
		},
		timeout : 10000
	});

	xhr.open("GET", url2);
	xhr.send();
}

function bajarEspecialidadesMunicipio() {
	Ti.App.fireEvent('muestraCargando');
	var dataEspe = new Array();
	var dataServ = new Array();
	Alloy.limpiaPicker($.pckEspecialidadEstado);
	
	var url = Alloy.CFG.urlAPI + 'Catalogos/EspecialidadesCobertura?idTipo=' + idTipoBusqueda + '&idEstado=' + idEstado + '&idMunicipio=' + idMunicipio;

	var xhr = Titanium.Network.createHTTPClient({
		onload : function(e) {			
			obj = JSON.parse(this.responseText);
			if(idTipoBusqueda !=3){
			for (var i = 0; i < obj.length; i++) {
					var efr = obj[i];
					dataEspe[i] = Titanium.UI.createPickerRow({
						title : efr.ESPECIALIDAD,
						value : efr.ID_ESPECIALIDAD
					});
				}
			}
			else{
				var l = 0;
				for (var i = 0; i < obj.length; i++) {
					var ser = obj[i];
					for (var j = 0; j < ser.SERVICIOS.length; j++){
						var det = ser.SERVICIOS[j];
					 	dataEspe[l] = Titanium.UI.createPickerRow({
						title : det.SERVICIO,
						value : det.ID_SERVICIO
					});
					l++;
					};
				};
				
			}
			if (Titanium.Platform.name == 'iPhone OS'){
				columnEspecialidadEstado.rows = dataEspe;
				$.pckEspecialidadEstado.reloadColumn(columnEspecialidadEstado);
				}else{
					Util.AgregaSeleccionar($.pckEspecialidadEstado);
					$.pckEspecialidadEstado.add(dataEspe);
			}
			$.pckEspecialidadEstado.setSelectedRow(0, 0);
			idEspecialidadEstado =  $.pckEspecialidadEstado.getSelectedRow(0).value;
			Ti.App.fireEvent('ocultaCargando');
		},
		onerror : function(e) {
			Ti.App.fireEvent('ocultaCargando');
			
			var error = JSON.stringify(e);
				Ti.UI.createAlertDialog({
					message : 'Error(' + url + '):' + error,
					ok : 'Aceptar',
					title : 'Error Membresia'
				}).show();
		},
		timeout : 10000
	});
		xhr.open("GET", url);
		xhr.send();
	
}

function bajarEspecialidadesMedicos() {
	Ti.App.fireEvent('muestraCargando');
	var dataEspe = new Array();
	var dataServ = new Array();
	Alloy.limpiaPicker($.pckEspecialidad);
	
	var url = Alloy.CFG.urlAPIVRIM + metodoApiEsp + '/?Rango=' + rango + '&Latitud=' + latitudG + '&Longitud=' + longitudG;

	var xhr = Titanium.Network.createHTTPClient({
		onload : function(e) {			
			obj = JSON.parse(this.responseText);
			if(idTipoBusqueda !=3){
			for (var i = 0; i < obj.length; i++) {
					var efr = obj[i];
					dataEspe[i] = Titanium.UI.createPickerRow({
						title : efr.ESPECIALIDAD,
						value : efr.ID_ESPECIALIDAD
					});
				}
			}
			else{
				var l = 0;
				for (var i = 0; i < obj.length; i++) {
					var ser = obj[i];
					for (var j = 0; j < ser.SERVICIOS.length; j++){
						var det = ser.SERVICIOS[j];
					 	dataEspe[l] = Titanium.UI.createPickerRow({
						title : det.SERVICIO,
						value : det.ID_SERVICIO
						});
					l++;
					};
				};
				
			}
			if (Titanium.Platform.name == 'iPhone OS'){
				columnEspecialidad.rows = dataEspe;
				$.pckEspecialidad.reloadColumn(columnEspecialidad);
				}else{
					Util.AgregaSeleccionar($.pckEspecialidad);
					$.pckEspecialidad.add(dataEspe);
				}
				$.pckEspecialidad.setSelectedRow(0, 0);
				idEspecialidad =  $.pckEspecialidad.getSelectedRow(0).value;
			
			Ti.App.fireEvent('ocultaCargando');
		},
		onerror : function(e) {
			Ti.App.fireEvent('ocultaCargando');
			var error = JSON.stringify(e);
				Ti.UI.createAlertDialog({
					message : 'Error(' + url + '):' + error,
					ok : 'Aceptar',
					title : 'Error Membresia'
				}).show();
		},
		timeout : 10000
	});
		xhr.open("GET", url);
		xhr.send();
}

function bajarDoctoresEspecialidad() {
	Ti.App.fireEvent('muestraCargando');
	var tableData = [];
	Ti.App.fireEvent('cierraMenuDer');
	var url = Alloy.CFG.urlAPI + 'Proveedor?idTipo=' + idTipoBusqueda + '&idEstado=' + idEstado + '&idMunicipio=' + idMunicipio +'&idEspecialidad=' + idEspecialidadEstado;
	
	var xhr = Titanium.Network.createHTTPClient({
		onload : function(e) {
			
			var	obj = JSON.parse(this.responseText);
			
			if (obj.length == 0) {
					alert("no hay resultados");
					Ti.App.fireEvent('ocultaCargando');
			}
			else
				Ti.App.fireEvent('resultadosRed', { resultado :  obj });
	
		},
		onerror : function(e) {
			var error = JSON.stringify(e);
				Ti.UI.createAlertDialog({
					message : 'Error(' + url + '):' + error,
					ok : 'Aceptar',
					title : 'Error Membresia'
				}).show();		
				
				Ti.App.fireEvent('ocultaCargando');
				},
		timeout : 10000
	});
	xhr.open("GET", url);
	xhr.send();

}

function bajarDoctores() {
	Ti.App.fireEvent('muestraCargando');
	var tableData = [];
	Ti.App.fireEvent('cierraMenuDer');
	var url = Alloy.CFG.urlAPIVRIM + metodoApi + '/?Rango=' + rango + '&Latitud=' + latitudG + '&Longitud=' + longitudG +'&' + parametroBusqueda + '='  + idEspecialidad;
	
	var xhr = Titanium.Network.createHTTPClient({
		onload : function(e) {
			
			var	obj = JSON.parse(this.responseText);
			
			if (obj.length == 0) {
					alert("no hay resultados");
					Ti.App.fireEvent('ocultaCargando');
			}
			else
				Ti.App.fireEvent('resultadosRed', { resultado :  obj });
	
		},
		onerror : function(e) {
			var error = JSON.stringify(e);
				Ti.UI.createAlertDialog({
					message : 'Error(' + url + '):' + error,
					ok : 'Aceptar',
					title : 'Error Membresia'
				}).show();
				Ti.App.fireEvent('ocultaCargando');

		},
		timeout : 10000
	});
	xhr.open("GET", url);
	xhr.send();

}
//--------------------------------Eventos a nivel aplicacion

