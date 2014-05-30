var Util = require('utils');

//Aumenta tamañosi es iOS 7
$.vwTopIOS.setHeight(Util.isiOS7Plus() ? 20 : 0);

//Estilos controles
$.lblTitulo.applyProperties( $.createStyle(Alloy.FuenteTitulo()) );
$.btnLogin.applyProperties( $.createStyle(Alloy.Fuente()) );
$.txtNEmpleado.applyProperties( $.createStyle(Alloy.Fuente()) );
$.btnLogin.setWidth('40%');

var idEmpresa = 0;
$.btnMasTarde.addEventListener('click', function(e){
	//Se abre el view Principal
	var _principal = Alloy.createController('slideMenu');
	$.index.close();
	_principal.getView().open();			
    $.index = null;		
});
//Evento que que se dispara cuando se quiere firmar un usuario
$.btnLogin.addEventListener('click', function(e){
	if($.txtNEmpleado.value == '')
	{
		alert("El numero de empledo no puede estar vacio.");			
		return;
	}
	
	
	//Obtiene la url de la api de la configuracion	
	var api = Alloy.CFG.urlAPI + 'membresia/LigarMembresia';	
	
	//Se crea un httpClient para consultar el servicio REST
	var cliSSL = Ti.Network.createHTTPClient({
		//si tiene exito 
		onload:function(e){
			//Se guarda el resultado, objeto LoginUser 
			Ti.API.info("Received text: " + this.responseText);
			//Se guarda el resultado, objeto LoginUser 
			Ti.App.Properties.setString("usuario", this.responseText);
			
			//Se abre el view Principal
			var _principal = Alloy.createController('slideMenu');
			$.index.close();
			_principal.getView().open();			
			$.index = null;
		},
		//En caso de error
		onerror:function(e)
		{			
			var error = JSON.parse(e);
			Ti.UI.createAlertDialog({
				message : error,
				ok : 'Ok',
				title : 'Datos invalidos'
			}).show();		
		}		
	});
	
	//Objeto que se le manda al servicio
	var user ={
		NO_TARJETA: '0738121200000467'
	};
	
	//Se abre el cliente
	cliSSL.open('POST', api, true);
	Ti.API.info(JSON.stringify(user));
	//Cabezeras 
	cliSSL.setRequestHeader('Accept','application/json');
	cliSSL.setRequestHeader('Content-Type','application/json');
	//Consulta el servicio
	cliSSL.send(JSON.stringify(user));
	
});


//Valida si algun empleado ya a sido guardad;o en el dispositivo
var user = Util.user();
if(user != null)
{
	var _principal = Alloy.createController('slideMenu');
	$.index.close();
	_principal.getView().open();				
	$.index = null;			
}
else
{
	$.index.open();
};
