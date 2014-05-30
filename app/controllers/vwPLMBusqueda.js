
var args = arguments[0] || {};

Ti.App.fireEvent('ocultaCargando');

$.txtLaboratorio.addEventListener('change', function(){
	$.txtMedicamento.value = '';
	$.txtSustancia.value = '';
});

$.txtMedicamento.addEventListener('change', function(){
	$.txtLaboratorio.value = '';
	$.txtSustancia.value = '';
});

$.txtSustancia.addEventListener('change', function(){
	$.txtMedicamento.value = '';
	$.txtLaboratorio.value = '';
});

$.btnBuscar.addEventListener('click', function  () {
	
	Ti.App.fireEvent('muestraCargando');
	var idTipo=0;
  	var url = Alloy.CFG.urlAPI + 'PLM/';
  	if($.txtMedicamento.value != ''){
  		url += 'Drugs?drug=' + $.txtMedicamento.value;
  		idTpo = 1;
  	}
  	else if($.txtSustancia.value != ''){
  		url += 'Substances?substance=' + $.txtSustancia.value;
  		idTipo = 2;
  	}
  	else if($.txtLaboratorio.text != ''){
  		url += 'labs?LabName=' + $.txtLaboratorio.value;
  		idTipo = 3;
  	}
  
	var cliPLM = Titanium.Network.createHTTPClient({
		onload : function(e) {
			var obj = JSON.parse(this.responseText);
			var datos = [];
			for (var i=0; i < obj.length; i++) {
			  var it = obj[i];
			  var dato = {};
			  switch(idTipo){
			  	case 1:
			  		dato.id = it.productIdField;
			  		dato.valor = it.brandField + ' ' + it.pharmaFormField;
			  	 break;
			  	case 2:
			  		dato.id = it.activeSubstanceIdField;
			  		dato.valor = it.descriptionField;
			  	 break;
			  	case 3:
			  		dato.id = it.divisionIdField;
			  		dato.valor = it.descriptionField;
			  	 break;
			  }
			  dato.producto = it;
			  datos.push(dato);
			};
			var wnResPlm = Alloy.createController('vwPLMResBusqueda', { idTipo: idTipo, datos: datos}).getView();
			wnResPlm.open({ animated: true,
							modal: true,
							modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE });
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
	cliPLM.timeout= 12000;
	cliPLM.open("GET", url);
	cliPLM.send();
});
