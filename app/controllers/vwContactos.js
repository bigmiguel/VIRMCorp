var args = arguments[0] || {};

//Eventos
$.tbContactos.addEventListener('click', function  (e) {
 	var person = e.row.person;
 	var numero = Numero(person['phone']);
 	if(numero == 'NA'){
 		alert('El contacto no contiene numeros guardados :(.');
 		return;
 	}
   Ti.App.fireEvent('agregarContacto', {id : person.recordId, nombre : person.fullName, numero: numero });
   $.wnContactos.close();
   $.wnContactos = null;
 });
 
$.imgClose.addEventListener('click', function  (e) {
	$.wnContactos.close();
});
//Obtienen los contactos del Telefono
 var performAddressBookFunction = function(){

	var people = Ti.Contacts.getAllPeople();
	var data=[];
	people = people.sort(function(x, y){  
		if(x.fullName < y.fullName) return -1;
    	if(x.fullName > y.fullName) return 1;
    	return 0; });
	var sec = Ti.UI.createTableViewSection({ headerTitle: 'Contactos' });
	for (var i=0, ilen=people.length; i<ilen; i++){
	  var person = people[i];
	  var row = Ti.UI.createTableViewRow({ title: person.fullName, person: person });
	  row.applyProperties($.createStyle(Alloy.FuenteMedia()));
	  sec.add(row);
	 };
	 data.push(sec);
	 $.tbContactos.data = data;
 };
var addressBookDisallowed = function(){
	alert('No puedo entrar a tus contactos :( ');
};

if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED){
    performAddressBookFunction();
} else if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN){
    Ti.Contacts.requestAuthorization(function(e){
        if (e.success) {
            performAddressBookFunction();
        } else {
            addressBookDisallowed();
        }
    });
} else {
    addressBookDisallowed();
}

 function Numero(Telefonos) {
   for(var tel in Telefonos) {
   		return Telefonos[tel][0];
	}
   return 'NA';
 }