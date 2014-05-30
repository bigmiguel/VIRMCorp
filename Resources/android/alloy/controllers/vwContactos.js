function Controller() {
    function Numero(Telefonos) {
        for (var tel in Telefonos) return Telefonos[tel][0];
        return "NA";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vwContactos";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.wnContactos = Ti.UI.createWindow({
        navBarHidden: true,
        backgroundColor: "white",
        layout: "vertical",
        id: "wnContactos"
    });
    $.__views.wnContactos && $.addTopLevelView($.__views.wnContactos);
    $.__views.imgClose = Ti.UI.createImageView({
        top: "2%",
        right: "5%",
        width: "15%",
        id: "imgClose",
        image: "/images/close.png"
    });
    $.__views.wnContactos.add($.__views.imgClose);
    $.__views.tbContactos = Ti.UI.createTableView({
        id: "tbContactos",
        top: "0"
    });
    $.__views.wnContactos.add($.__views.tbContactos);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.tbContactos.addEventListener("click", function(e) {
        var person = e.row.person;
        var numero = Numero(person["phone"]);
        if ("NA" == numero) {
            alert("El contacto no contiene numeros guardados :(.");
            return;
        }
        Ti.App.fireEvent("agregarContacto", {
            id: person.recordId,
            nombre: person.fullName,
            numero: numero
        });
        $.wnContactos.close();
        $.wnContactos = null;
    });
    $.imgClose.addEventListener("click", function() {
        $.wnContactos.close();
    });
    var performAddressBookFunction = function() {
        var people = Ti.Contacts.getAllPeople();
        var data = [];
        people = people.sort(function(x, y) {
            if (x.fullName < y.fullName) return -1;
            if (x.fullName > y.fullName) return 1;
            return 0;
        });
        var sec = Ti.UI.createTableViewSection({
            headerTitle: "Contactos"
        });
        for (var i = 0, ilen = people.length; ilen > i; i++) {
            var person = people[i];
            var row = Ti.UI.createTableViewRow({
                title: person.fullName,
                person: person
            });
            row.applyProperties($.createStyle(Alloy.FuenteMedia()));
            sec.add(row);
        }
        data.push(sec);
        $.tbContactos.data = data;
    };
    var addressBookDisallowed = function() {
        alert("No puedo entrar a tus contactos :( ");
    };
    Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED ? performAddressBookFunction() : Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN ? Ti.Contacts.requestAuthorization(function(e) {
        e.success ? performAddressBookFunction() : addressBookDisallowed();
    }) : addressBookDisallowed();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;