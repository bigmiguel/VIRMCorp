

var args = arguments[0] || {};
var calidad = Alloy.Dimension() + '.png';
//Estilos controles
$.lblAplicacion.applyProperties($.createStyle(Alloy.FuenteMedia()) );
$.lblCaracteristicas.applyProperties($.createStyle(Alloy.FuenteMedia()) );
$.lblSustancias.applyProperties($.createStyle(Alloy.FuenteMedia()) );
$.lblNombre.applyProperties($.createStyle(Alloy.FuenteMedia()) );
$.lblLab.applyProperties($.createStyle(Alloy.FuenteMedia()) );
$.lblTerapeuticos.applyProperties($.createStyle(Alloy.FuenteMedia()) );
$.lblCaracteristicas.applyProperties($.createStyle(Alloy.FuenteMedia()) );

$.lblDetAplicacion.applyProperties($.createStyle(Alloy.FuenteChica()) );
$.lblDetSustancias.applyProperties($.createStyle(Alloy.FuenteChica()) );
$.lblDetNombre.applyProperties($.createStyle(Alloy.FuenteChica()) );
$.lblDetLab.applyProperties($.createStyle(Alloy.FuenteChica()) );
$.lblDetTerapeuticos.applyProperties($.createStyle(Alloy.FuenteChica()) );
$.lblDetAttr.applyProperties($.createStyle(Alloy.FuenteMedia()) );



muestraCargando();
//CargaMedicamento
	var url = Alloy.CFG.urlAPI + 'PLM/AllAttributesByProduct?divisionId=' + args.divisionIdField  + '&categoryId=' + args.categotyIdField  + '&productId=' + args.productIdField  + '&pharmaFormId=' + args.pharmaFormIdField;
var cliPLM = Titanium.Network.createHTTPClient({
		onload : function(e) {
			var prod = JSON.parse(this.responseText);
			Ti.API.info(this.responseText);
			$.lblDetNombre.text = prod.brandField;
			$.lblDetLab.text = prod.divisionNameField;
			for (var i=0; i < prod.substancesField.length; i++) {
				var sus =  prod.substancesField[i];
				$.lblDetSustancias.text += '' + sus.descriptionField + (i == 0 ? '' : ',');
			};
		 	$.lblDetSustancias.text += '.';
		    $.lblDetAplicacion.text = prod.pharmaFormField;
			for (var i=0; i < prod.therapeuticsField.length; i++) {
					var ter = '' + prod.therapeuticsField[i];		
				$.lblDetTerapeuticos.text += '' + ter.spanishDescriptionField + (i == 0 ? ' ' : ',');
			};
			$.lblTerapeuticos.text += '.';
			var data = [];
			for (var i=0; i < prod.attributesField.length; i++) {
				  var attr = prod.attributesField[i];
				  var row = Ti.UI.createTableViewRow();
				  row.rightImage = '/images/der' + calidad;
				  row.height = '18%';
				  row.title = attr.attributeNameField;
				  row.detalle = attr.attributeContentField;
				  data.push(row);
			}				
			$.tbCaracteristicas.data = data;
			ocultaCargando();
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

//Eventos
$.tbCaracteristicas.addEventListener('click', function(e){
	$.lblDetAttr.text = e.row.detalle;
	$.vwDetalle.animate({
            top : '20%',
            duration : 500,
            curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
});
$.imgCloseDetalle.addEventListener('click', function  (e) {
  $.vwDetalle.animate({
            top : '100%',
            duration : 500,
            curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
});
$.imgClose.addEventListener('click', function  (e) {
	$.wnDetalleMed.close();
});
//metodos
function muestraCargando () {
	$.cargando.show();
	$.vwCarga.show();  
}
function  ocultaCargando() {
  $.vwCarga.hide();  
}
