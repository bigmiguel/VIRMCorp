var Util = require('utils');

//Aumenta tamañosi es iOS 7
$.vwTopIOS.setHeight(Util.isiOS7Plus() ? 20 : 0);

//Estilos controles
$.lblTitulo.applyProperties($.createStyle(Alloy.FuenteTitulo()) );

var args = arguments[0] || {};

var res = args;
var calidad = Alloy.Dimension() + '.png';
cargaResultado();
//Eventos
$.imgMenu.addEventListener('click', function (e) {
  $.wnPLMRes.close();
});
//carga Resultados de la busqueda
function cargaResultado () {
	muestraCargando();
	var titulo = '';
	var dataTable = [];
	
	switch (res.idTipo)
	{
		case 1:
			titulo = "Medicamentos";
		 break;
		case 2:
			titulo = "Sustancias Activas";
		 break;
		case 3:
			titulo = "Laboratorios";
		 break; 
	}
	
	$.tbPLM.removeAllChildren();
	var sec = Ti.UI.createTableViewSection({ headerTitle: titulo });
	for (var i=0; i < res.datos.length; i++) {
		  var dato = res.datos[i];
		  var row = Ti.UI.createTableViewRow();
		  row.rightImage = '/images/der' + calidad;
		  row.height = '10%';
		  row.idDato = dato.id;
		  row.title = dato.valor;
		  row.producto = dato.producto;
		  sec.add(row);
	 }
	 dataTable.push(sec);
	 $.tbPLM.data= dataTable;
	ocultaCargando();
}

//Eventos
$.tbPLM.addEventListener('click', function  (e) {
	muestraCargando();
  	var url = Alloy.CFG.urlAPI + 'PLM/';
  	switch(res.idTipo)
  	{
  		case 1:
  			ocultaCargando();
  			var vwDetMEd =  Alloy.createController('wnDetalleMedicamento', e.row.producto).getView();
  			vwDetMEd.open({
				  animated: true,
				  modal: true,
				  modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE });	
  			return;
  		 break;
  		case 2:
  			url += 'DrugsBySubstance?substanceId=' + e.row.idDato;
  		 break;
  		case 3:
  			url += 'DrugsByLab?LabId=' + e.row.idDato;
  		 break;
  	}
  
	var cliPLM = Titanium.Network.createHTTPClient({
		onload : function(e) {
			var obj = JSON.parse(this.responseText);
			Ti.API.info(this.responseText);
			var datos = [];
			for (var i=0; i < obj.length; i++) {
				  var it = obj[i];
				  var dato = {};
				  dato.id = it.productIdField;
				  dato.valor = it.brandField + ' ' + it.pharmaFormField;
				  dato.producto = it;
				  datos.push(dato);
			};
			res = {};
			res.idTipo = 1;
			res.datos = datos;
			
			cargaResultado();
		},
		onerror : function(e) {
			Ti.App.fireEvent('ocultaCargando');
			var error = JSON.stringify(e);
				Ti.UI.createAlertDialog({
					message : 'Error(' + url + '):' + error,
					ok : 'Aceptar',
					title : 'Error Membresia'
				}).show();
				ocultaCargando();
		}
	});
	cliPLM.timeout= 12000;
	cliPLM.open("GET", url);
	cliPLM.send();
});

function muestraCargando () {
	$.cargando.show();
	$.vwCarga.show();  
}
function  ocultaCargando() {
  $.vwCarga.hide();  
}