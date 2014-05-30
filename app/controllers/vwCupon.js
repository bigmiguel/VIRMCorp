var args = arguments[0] || {};

$.imgCupon.image = args.UrlLogo;
$.lblDescripcion.applyProperties($.createStyle(Alloy.FuenteChica()));
$.lblRestrcion.applyProperties($.createStyle(Alloy.FuenteChica()));

$.lblDescripcion.text= args.DescripcionCupon;
$.lblRestrcion.text = args.Restricciones;

$.imgCupon.cupon = $.lblDescripcion.cupon = $.lblRestrcion.cupon = args;