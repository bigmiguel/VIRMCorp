//Aumenta tamañosi es iOS 7
var Util = require('utils');
$.vwTopIOS.setHeight(Util.isiOS7Plus() ? 20 : 0);
$.containerview.top = Util.isiOS7Plus() ? 20 : 0;

//Estilos controles
$.lblTitulo.applyProperties($.createStyle(Alloy.FuenteTitulo()) );

//Obtiene datos del usuario
var alto = Titanium.Platform.displayCaps.platformHeight;
var ancho = Ti.Platform.displayCaps.platformWidth;

var user = Util.user();

muestraCargando();
//Crea el mnenu de la applicacion

var MenuSI = [{
		icon:'/images/user.png',
		titulo : user.NOMBRE_TARJETA == undefined ? 'No tienes tarjete' :  user.NOMBRE_TARJETA,
		vista: null,
		params: null,
		banTitulo : true
	},
	{
		icon:'/images/membresia.png',
		titulo : 'Mi Membresía',
		vista : 'membresia',
		params : null,
		banTitulo : false
	},{
		icon:'/images/medicos.png',
		titulo : '# Emergencia',
		vista : 'vwNumEmergencia',
		banTitulo : false
	},
	{
		icon:'/images/ambulancias.png',
		titulo : 'Ambulancia',
		vista : '',
		params : null,
		banTitulo : false,
		banAmbulancia: true
	},
	{
		icon:'/images/user.png',
		titulo :'Red Médica',
		vista: null,
		params: null,
		banTitulo : true
	},
	{
		icon:'/images/medicos.png',
		titulo : 'Medicos',
		vista : 'redMedicos',
		params: { 
			idAfiliacion : '2',
			idTipoBusqueda: '1'
		},
		banTitulo : false
	},
	{
		icon:'/images/ambulancias.png',
		titulo : 'Serviciòs',
		vista : 'redMedicos',
		params: { 
			idAfiliacion : '2',
			idTipoBusqueda: '2'
		},
		banTitulo : false
	},
	{
		icon:'/images/labicon.png',
		titulo : 'Laboratorios',
		vista : 'redMedicos',
		params: { 
			idAfiliacion : '2',
			idTipoBusqueda: '4'
		},
		banTitulo : false
	},
	{
		icon:'/images/tdc.png',
		titulo : 'Red TDC',
		vista: null,
		params: null,
		banTitulo : true
	},
	{
		icon:'/images/tdc.png',
		titulo : 'Descuentos TDC',
		vista : 'redMedicos',
		params: { 
			idAfiliacion : '2',
			idTipoBusqueda: '3'
		},
		banTitulo : false
	},
	{
		icon:'/images/tdc.png',
		titulo : 'Cupones',
		vista : 'vwCupones',
		params: null,
		banTitulo : false
	},
	{
		icon:'/images/salud_interactiva.png',
		titulo : 'Otros Servicios',
		vista: null,
		params: null,
		banTitulo : true
	},
	{
		icon:'/images/PLM.png',
		titulo : 'Medicamentos',
		vista: 'vwPLMBusqueda',
		params: null,
		banTitulo : false
	},
	{
		icon:'/images/link.png',
		titulo : 'Seguro Inbursa',
		vista: null,
		params: {link: 'https://medicavrim.com/PublicFiles/PrivacidadVRIM.pdf'},
		banTitulo : false,
		banLink : true
	},
	{
		icon:'/images/link.png',
		titulo : 'Aviso de Privacidad',
		vista: null,
		params: { link: 'http://imagenes.medicallhome.com.mx/docs/restriccionesinbursa.pdf'},
		banTitulo : false,
		banLink: true
	}];

//Menu
for (var i=0; i < MenuSI.length; i++) {
  	var _parametros = MenuSI[i];
  	var _menuFila = Alloy.createController('menurow', _parametros).getView();  		 
	
	$.leftTableView.add(_menuFila);
	if(!_parametros.banTitulo)	
		//Evento que se dispara cuando se hace click sobre una opcion del menu
		if(_parametros.banAmbulancia)
		{
			_menuFila.addEventListener('click', function(){
				var dialog = Ti.UI.createAlertDialog({
						    cancel: 1,
						    buttonNames: ['Llamar', 'Cancelar'],
						    message: '4209 3205',
						    title: 'Ambulancia'
						  });
						  dialog.addEventListener('click', function(e){
						    if (e.index === 0)
									Ti.Platform.openURL('tel:42093205');
								 });
						  dialog.show();	
					});
		}
		else if(_parametros.banLink){
			_menuFila.addEventListener('click', function(){
				Ti.Platform.openURL(_parametros.params.link);
			});
		}
		else{
		 	_menuFila.addEventListener('click',function(e)
			{
				cierraMenuIzquierdo();
				muestraCargando();
				Alloy.Globals.current.destroy();
				$.contentview.remove(_currentView);
				
				if(vistaDer != null){
					$.rightMenu.remove(vistaDer);
					vistaDer = null;
				}
				$.btnMenuDer.hide();
				var nuevaVista = Alloy.createController(e.source.vista, e.source.params).getView();	
				$.contentview.add(nuevaVista);
				_currentView = nuevaVista;
				$.contentview.setZIndex(2);
			});
		}
	else
		_menuFila.backgroundColor ='#333333';
};

//Eventos a nivel Aplicacion
Ti.App.addEventListener('muestraCargando', function(){
  	muestraCargando();
});
Ti.App.addEventListener('ocultaCargando', function(){
  $.vwCarga.hide();
});
var vistaDer = null;
Ti.App.addEventListener('muestraSubMenu', function  (e) {
  $.rightMenu.removeAllChildren();
  $.btnMenuDer.show();
  vistaDer = Alloy.createController(e.vista, e.parametros).getView();
  $.rightMenu.add(vistaDer);
});
Ti.App.addEventListener('cierraMenuDer', function(e) {
  	cierraMenuDerecho();
});
var vistaDet = null;
Ti.App.addEventListener('MuestraDetalleProveedor', function(e){
	setTimeout(function(e) {
		if(!$.btnMenuDer.toogle)
	   abreMenuDerecho();	
	}, 100);
	$.rightMenu.removeAllChildren();
	 vistaDet = null;
	 vistaDet = Alloy.createController('detalleProveedor', e).getView();
	 $.rightMenu.add(vistaDet);
});

Ti.App.addEventListener('regresaBusqueda', function(){
	if(vistaDet != null)
		$.rightMenu.remove(vistaDet);
	$.rightMenu.add(vistaDer);
	vistaDet = null;
});

//Eventos
$.wnSlideMenu.addEventListener('android:back', function(e) {
	var activity = Titanium.Android.currentActivity;
	activity.finish();
});
var _currentView = Alloy.createController('membresia').getView();
$.contentview.add(_currentView);
//Evento para abrir el Menu
$.imgMenu.addEventListener('click', _MenuIzquierdo);

function _MenuIzquierdo(e){
	 if($.btnMenu.toggle == true){
	 	cierraMenuIzquierdo();
    }
    // If the menu isn't opened
    else{
       abreMenuIzquierdo();
    }
}
$.btnMenuDer.addEventListener('click', _MenuDerecho);


function _MenuDerecho(e){
	if($.btnMenuDer.toggle == true){
	 	cierraMenuDerecho();
    }
    // If the menu isn't opened
    else{
    	abreMenuDerecho();
    }
}
/*
$.contentview.addEventListener('touchstart', function(e){
    // Get starting horizontal position
    e.source.axis = e.x;
});
$.contentview.addEventListener('touchmove', function(e){
	if($.btnMenuDer.toogle)
		return;
	
	$.leftMenu.show();
    $.rightMenu.hide();
    
 
    var convPoint = $.contentview.convertPointToView({x:e.x, y:e.y}, $.containerview);
    // Subtracting current position to starting horizontal position
    var coordinates = convPoint.x - e.source.axis;
    
    // Detecting movement after a 20px shift
    if(coordinates > 20 || coordinates < - 20){
        e.source.moving = true;
    }
    // Locks the window so it doesn't move further than allowed
    if(e.source.moving == true && coordinates <= (ancho * .6 ) && coordinates >= 0){
    	  // This will smooth the animation and make it less jumpy
        $.movableview.animate({
            left:coordinates,
            duration: 25
        });
        // Defining coordinates as the final left position
       $.movableview.left = coordinates;
    }
});
$.contentview.addEventListener('touchend', function(e){
    // No longer moving the window
    e.source.moving = false;
    if($.movableview.left >= (ancho * 20) && $.movableview.left < (ancho * .6)){
        // Repositioning the window to the right
        $.movableview.animate({
            left:'60%',
            duration:400
        });
        $.btnMenu.toggle = true;   
    }else{
        // Repositioning the window to the left
        $.movableview.animate({
            left:0,
            duration:400
        });
        $.btnMenu.toggle = false;
    }
});
*/
function abreMenuIzquierdo () {
  			$.leftMenu.show();
    		$.rightMenu.hide();
    		  $.movableview.animate({
            left : "60%",
            duration : 400,
            curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.btnMenu.toggle  = true;
}
function cierraMenuIzquierdo(){
	 	$.movableview.setWidth(Titanium.Platform.displayCaps.platformWidth);
        $.movableview.animate({
            left:0,
            duration:400,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.btnMenu.toggle = false;
}
function abreMenuDerecho() {
  $.leftMenu.hide();
	$.rightMenu.show();
    $.movableview.animate({
            left : "-80%",
            duration : 400,
            curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
     });
    $.btnMenuDer.toggle  = true;
}
function cierraMenuDerecho(){
	$.movableview.setWidth(Titanium.Platform.displayCaps.platformWidth);
        $.movableview.animate({
            left:0,
            duration:400,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.btnMenuDer.toggle = false;
}
//Metodos
function muestraCargando () {
	$.cargando.show();
	$.vwCarga.show();
}

//-----------------PUSH Notification
