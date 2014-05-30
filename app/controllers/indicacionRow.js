var args = arguments[0] || {};
var paso = args.paso;
var banInicio = args.banInicio;

$.lblDistancia.applyProperties($.createStyle(Alloy.FuenteTitulo()));
$.lblIndicacion.applyProperties($.createStyle(Alloy.FuenteMedia()));

if (!banInicio) {
	$.lblDistancia.text = paso.distance.text;
	var pattern = new RegExp( '<[^>]+>', 'g' );
	$.lblIndicacion.text = paso.html_instructions;
	$.lblIndicacion.text = $.lblIndicacion.text.replace(pattern, '');
}
else{
	$.lblDistancia.text = paso.distance.text;
	$.lblIndicacion.text = paso.duration.text;	
};

