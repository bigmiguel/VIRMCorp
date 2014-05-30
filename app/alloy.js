// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var Util = require('utils');

Alloy.limpiaPicker = function(picker){
	try{
	if(picker.columns[0]) {
    var _col = picker.columns[0];
        var len = _col.rowCount;
        for(var x = len-1; x >= 0; x-- ){
                var _row = _col.rows[x];
                _col.removeRow(_row);
               }
        }
       }catch(ex)
       {
       	Ti.API.info(ex);
       }
};
try{
Alloy.Globals.Map = require('ti.map');
}
catch(ex){
	alert(ex);
}

Alloy.FuenteTitulo = function () {
 if(Alloy.Dimension() == 'baja')
 {
 	return { font:{ fontSize: "21%", fontWeight :'bold', font: 'Segoe UI'} };
 }
 else if(Alloy.Dimension() =='media')
 {
 	return { font:{ fontSize: "36%", fontWeight :'bold', font: 'Segoe UI'} };
 }
 else if(Alloy.Dimension() == 'alta')
 {
 	return { font:{ fontSize: "72%", fontWeight :'bold', font: 'Segoe UI'} };
 }
};

Alloy.Fuente = function () {
 if(Alloy.Dimension() == 'baja')
 {
 	return { font:{ fontSize: "12%", font: 'Segoe UI'} };
 }
 else if(Alloy.Dimension() =='media')
 {
 	return { font:{ fontSize: "22%", font: 'Segoe UI'} };
 }
 else if(Alloy.Dimension()=='alta')
 {
 	return { font:{ fontSize: "40%", font: 'Segoe UI'} };
 }
};

Alloy.FuenteMedia = function () {
 if(Alloy.Dimension() == 'baja')
 {
 	return { font:{ fontSize: "15%", font: 'Segoe UI'} };
 }
 else if(Alloy.Dimension()=='media')
 {
 	return { font:{ fontSize: "25%", font: 'Segoe UI'} };
 }
 else if(Alloy.Dimension()=='alta')
 {
 	return { font:{ fontSize: "50%", font: 'Segoe UI'} };
 }
};

Alloy.FuenteChica = function () {
 if(Alloy.Dimension() == 'baja')
 {
 	return { font:{ fontSize: "10%", font: 'Segoe UI'} };
 }
 else if(Alloy.Dimension()=='media')
 {
 	return { font:{ fontSize: "16%", font: 'Segoe UI'} };
 }
 else if(Alloy.Dimension()=='alta')
 {
 	return { font:{ fontSize: "32%", font: 'Segoe UI'} };
 }
};

Alloy.espacioMenu = function () {
 if(Alloy.Dimension() == 'baja')
 {
 	return 15;
 }
 else if(Alloy.Dimension()=='media')
 {
 	return 30;
 }
 else if(Alloy.Dimension()=='alta')
 {
 	return 45;
 }
};
Alloy.espacioTarjeta = function () {
 if(Alloy.Dimension() == 'baja')
 {
 	return Util.isIPhone5() ? '100dp' :'60dp';
 }
 else if(Alloy.Dimension()=='media')
 {
 	return Util.isIPhone5() ? '115dp' :'75dp';
 }
 else if(Alloy.Dimension()=='alta')
 {
 	return Util.isIPhone5() ? '140dp' : '110dp';
 }
};

Alloy.Dimension = function  () {
  var ancho = Ti.Platform.displayCaps.platformWidth;
  //Ti.API.info('------------------Ancho: ' + ancho);
  if(ancho < 480)
  {
  	return 'baja';
  }
  else if(ancho >= 480 && ancho < 600){
  	return 'media';
  }
  else if(ancho >= 600){
  	return 'alta';
  };		
};