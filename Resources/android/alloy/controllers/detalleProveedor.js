function Controller() {
    function getEspecialidades(suc) {
        var especialidades = "";
        if (null != suc.ESPECIALIDADES) for (var i = 0; suc.ESPECIALIDADES.length > i; i++) {
            var esp = suc.ESPECIALIDADES[i];
            especialidades += " " + esp.ESPECIALIDAD + " Des:" + esp.DESCUENTO + "\n";
        }
        return especialidades;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detalleProveedor";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.vwTodo = Ti.UI.createScrollView({
        backgroundColor: "#FFFFFF",
        id: "vwTodo",
        layout: "vertical"
    });
    $.__views.vwTodo && $.addTopLevelView($.__views.vwTodo);
    $.__views.detProveedor = Ti.UI.createView({
        backgroundColor: "white",
        layout: "horizontal",
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#f9f9f9",
                position: 0
            }, {
                color: "#e9e9e9",
                position: 1
            } ],
            backFillStart: true
        },
        id: "detProveedor"
    });
    $.__views.vwTodo.add($.__views.detProveedor);
    $.__views.lblTitulo = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        text: "Red Medica",
        id: "lblTitulo"
    });
    $.__views.detProveedor.add($.__views.lblTitulo);
    $.__views.lblTNombre = Ti.UI.createLabel({
        width: "30%",
        height: Ti.UI.SIZE,
        color: "#21485D",
        top: "2dp",
        left: "2%",
        text: "Nombre:",
        id: "lblTNombre"
    });
    $.__views.detProveedor.add($.__views.lblTNombre);
    $.__views.lblNombre = Ti.UI.createLabel({
        width: "68%",
        height: Ti.UI.SIZE,
        color: "#999",
        top: "2dp",
        id: "lblNombre"
    });
    $.__views.detProveedor.add($.__views.lblNombre);
    $.__views.lblTEspecialidad = Ti.UI.createLabel({
        width: "30%",
        height: Ti.UI.SIZE,
        color: "#21485D",
        top: "2dp",
        left: "2%",
        text: "Especialidad:",
        id: "lblTEspecialidad"
    });
    $.__views.detProveedor.add($.__views.lblTEspecialidad);
    $.__views.lblEspecialidad = Ti.UI.createLabel({
        width: "68%",
        height: Ti.UI.SIZE,
        color: "#999",
        top: "2dp",
        id: "lblEspecialidad"
    });
    $.__views.detProveedor.add($.__views.lblEspecialidad);
    $.__views.lblTHorario = Ti.UI.createLabel({
        width: "30%",
        height: Ti.UI.SIZE,
        color: "#21485D",
        top: "2dp",
        left: "2%",
        text: "Horario:",
        id: "lblTHorario"
    });
    $.__views.detProveedor.add($.__views.lblTHorario);
    $.__views.lblHorario = Ti.UI.createLabel({
        width: "68%",
        height: Ti.UI.SIZE,
        color: "#999",
        top: "2dp",
        id: "lblHorario"
    });
    $.__views.detProveedor.add($.__views.lblHorario);
    $.__views.lblTDireccion = Ti.UI.createLabel({
        width: "30%",
        height: Ti.UI.SIZE,
        color: "#21485D",
        top: "2dp",
        left: "2%",
        text: "Direcciòn:",
        id: "lblTDireccion"
    });
    $.__views.detProveedor.add($.__views.lblTDireccion);
    $.__views.lblDireccion = Ti.UI.createLabel({
        width: "68%",
        height: Ti.UI.SIZE,
        color: "#999",
        top: "2dp",
        id: "lblDireccion"
    });
    $.__views.detProveedor.add($.__views.lblDireccion);
    $.__views.lblTCosto = Ti.UI.createLabel({
        width: "30%",
        height: Ti.UI.SIZE,
        color: "#21485D",
        top: "2dp",
        left: "2%",
        text: "Descuento:",
        id: "lblTCosto"
    });
    $.__views.detProveedor.add($.__views.lblTCosto);
    $.__views.lblCosto = Ti.UI.createLabel({
        width: "68%",
        height: Ti.UI.SIZE,
        color: "#999",
        top: "2dp",
        id: "lblCosto"
    });
    $.__views.detProveedor.add($.__views.lblCosto);
    $.__views.lblTRestricciones = Ti.UI.createLabel({
        width: "30%",
        height: Ti.UI.SIZE,
        color: "#21485D",
        top: "2dp",
        left: "2%",
        text: "Restricciones:",
        id: "lblTRestricciones"
    });
    $.__views.detProveedor.add($.__views.lblTRestricciones);
    $.__views.lblRestricciones = Ti.UI.createLabel({
        width: "68%",
        height: Ti.UI.SIZE,
        color: "#999",
        top: "2dp",
        id: "lblRestricciones"
    });
    $.__views.detProveedor.add($.__views.lblRestricciones);
    $.__views.lblTTelefono = Ti.UI.createLabel({
        width: "30%",
        height: Ti.UI.SIZE,
        color: "#21485D",
        top: "2dp",
        left: "2%",
        text: "Telèfono(s):",
        id: "lblTTelefono"
    });
    $.__views.detProveedor.add($.__views.lblTTelefono);
    $.__views.lblTelefono = Ti.UI.createLabel({
        width: "68%",
        height: Ti.UI.SIZE,
        color: "#999",
        top: "2dp",
        id: "lblTelefono"
    });
    $.__views.detProveedor.add($.__views.lblTelefono);
    $.__views.mapViewDet = Alloy.Globals.Map.createView({
        width: "95%",
        left: "2.5%",
        height: "35%",
        top: "20dp",
        enableZoomControls: false,
        id: "mapViewDet",
        ns: "Alloy.Globals.Map"
    });
    $.__views.detProveedor.add($.__views.mapViewDet);
    $.__views.imgRuta = Ti.UI.createImageView({
        id: "imgRuta",
        image: "/images/vermapa.png",
        top: "0",
        right: "-2%",
        width: "25%"
    });
    $.__views.mapViewDet.add($.__views.imgRuta);
    $.__views.btnBusqueda = Ti.UI.createButton({
        backgroundColor: "#00359C",
        color: "#FFF",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "0.4dp",
        borderRadius: 5,
        title: "Busqueda",
        id: "btnBusqueda",
        top: "5dp",
        left: "25%",
        width: "50%"
    });
    $.__views.detProveedor.add($.__views.btnBusqueda);
    $.__views.__alloyId0 = Ti.UI.createView({
        height: "5%",
        id: "__alloyId0"
    });
    $.__views.vwTodo.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.lblTitulo.applyProperties($.createStyle(Alloy.FuenteTitulo()));
    $.lblNombre.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblEspecialidad.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblHorario.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblDireccion.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblCosto.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblTelefono.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblTRestricciones.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblTNombre.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblTEspecialidad.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblTHorario.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblTDireccion.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblTCosto.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblTTelefono.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblRestricciones.applyProperties($.createStyle(Alloy.Fuente()));
    var args = arguments[0] || {};
    var suc = args.sucursal;
    var idTipoBusqueda = args.idTipoBusqueda;
    args.idAfiliacion;
    var latitud;
    var longitud;
    var img = "";
    var calidad = Alloy.Dimension() + ".png";
    switch (idTipoBusqueda) {
      case "1":
        img = "doc";
        $.lblTitulo.text = "Detalle Mèdico";
        $.addClass($.lblTitulo, "tituloRed", {
            color: "#DA0A0A"
        });
        $.detProveedor.remove($.lblTRestricciones);
        $.detProveedor.remove($.lblRestricciones);
        $.detProveedor.remove($.lblTCosto);
        $.detProveedor.remove($.lblCosto);
        break;

      case "2":
        img = "servicio";
        $.lblTitulo.text = "Detalle Servicio";
        $.addClass($.lblTitulo, "tituloRed", {
            color: "#DA0A0A"
        });
        $.detProveedor.remove($.lblTRestricciones);
        $.detProveedor.remove($.lblRestricciones);
        $.detProveedor.remove($.lblTCosto);
        $.detProveedor.remove($.lblCosto);
        break;

      case "3":
        img = "descuento";
        $.lblTitulo.text = "Detalle del Descuento";
        $.detProveedor.remove($.lblTTelefono);
        $.detProveedor.remove($.lblTelefono);
        $.detProveedor.remove($.lblTEspecialidad);
        $.detProveedor.remove($.lblEspecialidad);
        $.lblRestricciones.text = suc.RESTRICCION;
        $.lblCosto.text = suc.DESCUENTO;
        $.addClass($.lblTitulo, "tituloRed", {
            color: "#628f02"
        });
        break;

      case "4":
        img = "lab";
        $.lblTitulo.text = "Detalle Lab.";
        $.addClass($.lblTitulo, "tituloRed", {
            color: "#DA0A0A"
        });
        $.detProveedor.remove($.lblTHorario);
        $.detProveedor.remove($.lblHorario);
        $.detProveedor.remove($.lblTRestricciones);
        $.detProveedor.remove($.lblRestricciones);
        $.detProveedor.remove($.lblTCosto);
        $.detProveedor.remove($.lblCosto);
    }
    $.lblEspecialidad.text = getEspecialidades(suc);
    $.lblNombre.text = suc.NOMBRE_SUCURSAL;
    $.lblDireccion.text = suc.DIRECCION.CALLE + ", " + suc.DIRECCION.NUMEROEXT + ", " + suc.DIRECCION.COLONIA + ", " + suc.DIRECCION.MUNICIPIO + ", " + suc.DIRECCION.ESTADO + ", CP:" + suc.DIRECCION.CP;
    latitud = suc.DIRECCION.EJEX;
    longitud = suc.DIRECCION.EJEY;
    $.lblHorario.text = suc.DIRECCION.HORARIO;
    if (3 != idTipoBusqueda) {
        var tel = "";
        for (var i = 0; suc.MEDIOS_COMUNICACION.length > i; i++) {
            var telefono = suc.MEDIOS_COMUNICACION[i];
            4 > telefono.ID_TIPOC && (tel += telefono.MEDIO + "\n");
        }
        $.lblTelefono.text = tel;
    }
    var anotacion = Alloy.Globals.Map.createAnnotation({
        latitude: latitud,
        longitude: longitud,
        image: "/images/" + img + calidad,
        title: "" + obj.nomSucursal
    });
    var newRegion = {
        latitude: latitud,
        longitude: longitud,
        latitudeDelta: .003,
        longitudeDelta: .003,
        animate: false
    };
    $.mapViewDet.setLocation(newRegion);
    $.mapViewDet.addAnnotation(anotacion);
    $.imgRuta.addEventListener("click", function() {
        Ti.App.fireEvent("creaRuta", {
            latitud: latitud,
            longitud: longitud
        });
    });
    $.btnBusqueda.addEventListener("click", function() {
        Ti.App.fireEvent("regresaBusqueda");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;