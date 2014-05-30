var args = arguments[0] || {};

//Tamaño Fuente
$.lblAgregar.applyProperties($.createStyle(Alloy.FuenteMedia()));
cargaNumFav();
 
$.imgAgregar.addEventListener('click', function  (e) {
	var contacto = Alloy.createController('vwContactos').getView();
	contacto.open({ modal : true });
});
$.tbContactosFav.addEventListener('click', function  (e) {
	if(e.source.idContacto != undefined)
	{
		var db = Ti.Database.open('VRIM');
		var resValidaNumero = db.execute('DELETE FROM conFav where id = ?', e.source.idContacto);	
		db.close();
		cargaNumFav();
	}
	else
		Ti.Platform.openURL('tel:'+ e.row.numero);
});
$.vwNumerosEmergencia.addEventListener('click', function  (e) {
	Ti.Platform.openURL('tel:'+ e.row.numero);
});
//Eventos de Aplicacion
Ti.App.addEventListener('agregarContacto',agregarContacto);
 function agregarContacto(e){
		//Se crea la base de datos
		var db = Ti.Database.open('VRIM');
		var resValidaNumero = db.execute('SELECT id FROM conFav where id = ?', e.id);	
		if(resValidaNumero.rowCount > 0)
		{
			db.close();
			alert('El numero ya esta en la lista de numero favoritos');
			return;
		}	
		e.numero = e.numero.replace(' ','').replace('(','').replace(')','');
		//Se crea la tabla 
		db.execute('CREATE TABLE IF NOT EXISTS conFav(id INTEGER PRIMARY KEY, nombre TEXT, numero TEXT)');
		//Se inserta la tabal con los resultados
		db.execute('INSERT INTO conFav (id, nombre, numero) VALUES(?,?,?)', e.id, e.nombre, e.numero);			 				 				 
			
		db.close();
		cargaNumFav();
}
 //Metodos
 function cargaNumFav () {
 	var db = Ti.Database.open('VRIM');
	//Se crea la tabla 
	db.execute('CREATE TABLE IF NOT EXISTS conFav(id INTEGER PRIMARY KEY, nombre TEXT, numero TEXT)');
	var resContactos = db.execute('SELECT id, nombre, numero FROM conFav');	
	var data=[];
	var sec = Ti.UI.createTableViewSection({ headerTitle: 'Contactos' });
	while(resContactos.isValidRow()){
		var cont = {
			id : resContactos.fieldByName('id'),
			nombre : resContactos.fieldByName('nombre'),
			numero : resContactos.fieldByName('numero')
		};
		var contacto = Alloy.createController('vwContactoRow', cont).getView();
		sec.add(contacto);
		resContactos.next();
	};	
	data.push(sec);
	$.tbContactosFav.data = data;
   db.close();
   Ti.App.fireEvent('ocultaCargando');
 }
//Expocion de metodos
exports.destroy = function() {
    // Remove the listener first
    Ti.App.removeEventListener('agregarContacto', agregarContacto);
   
};
Alloy.Globals.current = $;