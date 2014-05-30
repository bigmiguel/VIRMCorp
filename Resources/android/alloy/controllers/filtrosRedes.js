function Controller() {
    function UbicacionActual() {
        Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
        Titanium.Geolocation.distanceFilter = 10;
        Ti.Geolocation.purpose = "Mostrar tu posición actual";
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (!e.success || e.error) return;
            longitudG = e.coords.longitude;
            latitudG = e.coords.latitude;
            bajarEspecialidadesMedicos();
        });
    }
    function bajarEstadosMedicos() {
        Ti.App.fireEvent("muestraCargando");
        var data = [];
        var url = Alloy.CFG.urlAPI + "Catalogos/EstadosCobertura?idTipo=" + idTipoBusqueda;
        var xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                var obj = JSON.parse(this.responseText);
                for (var i = 0; obj.length > i; i++) {
                    var efr = obj[i];
                    data[i] = Titanium.UI.createPickerRow({
                        title: efr.ESTADO,
                        value: efr.ID_ESTADO
                    });
                }
                $.pckEstado.add(data);
                idEstado = 1;
                bajarMunicipiosMedicos();
                Ti.App.fireEvent("ocultaCargando");
            },
            onerror: function(e) {
                Ti.App.fireEvent("ocultaCargando");
                var error = JSON.stringify(e);
                Ti.UI.createAlertDialog({
                    message: "Error(" + url + "):" + error,
                    ok: "Aceptar",
                    title: "Error Membresia"
                }).show();
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function bajarMunicipiosMedicos() {
        Ti.App.fireEvent("muestraCargando");
        var data2 = [];
        new Array();
        var url2 = Alloy.CFG.urlAPI + "Catalogos/MunicipiosCobertura?idTipo=" + idTipoBusqueda + "&idEstado=" + idEstado;
        Alloy.limpiaPicker($.pckMunicipio);
        var xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                var obj2 = JSON.parse(this.responseText);
                Alloy.limpiaPicker($.pckMunicipio);
                for (var i = 0; obj2.length > i; i++) {
                    var efr = obj2[i];
                    data2[i] = Titanium.UI.createPickerRow({
                        title: efr.MUNICIPIO,
                        value: efr.ID_MUNICIPIO
                    });
                }
                Util.AgregaSeleccionar($.pckMunicipio);
                $.pckMunicipio.add(data2);
                Ti.App.fireEvent("ocultaCargando");
                idMunicipio = data2[0].value;
                $.pckMunicipio.setSelectedRow(0, 0);
                bajarEspecialidadesMunicipio();
            },
            onerror: function(e) {
                Ti.App.fireEvent("ocultaCargando");
                var error = JSON.stringify(e);
                Ti.UI.createAlertDialog({
                    message: "Error(" + url2 + "):" + error,
                    ok: "Aceptar",
                    title: "Error Membresia"
                }).show();
            },
            timeout: 1e4
        });
        xhr.open("GET", url2);
        xhr.send();
    }
    function bajarEspecialidadesMunicipio() {
        Ti.App.fireEvent("muestraCargando");
        var dataEspe = new Array();
        new Array();
        Alloy.limpiaPicker($.pckEspecialidadEstado);
        var url = Alloy.CFG.urlAPI + "Catalogos/EspecialidadesCobertura?idTipo=" + idTipoBusqueda + "&idEstado=" + idEstado + "&idMunicipio=" + idMunicipio;
        var xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                obj = JSON.parse(this.responseText);
                if (3 != idTipoBusqueda) for (var i = 0; obj.length > i; i++) {
                    var efr = obj[i];
                    dataEspe[i] = Titanium.UI.createPickerRow({
                        title: efr.ESPECIALIDAD,
                        value: efr.ID_ESPECIALIDAD
                    });
                } else {
                    var l = 0;
                    for (var i = 0; obj.length > i; i++) {
                        var ser = obj[i];
                        for (var j = 0; ser.SERVICIOS.length > j; j++) {
                            var det = ser.SERVICIOS[j];
                            dataEspe[l] = Titanium.UI.createPickerRow({
                                title: det.SERVICIO,
                                value: det.ID_SERVICIO
                            });
                            l++;
                        }
                    }
                }
                Util.AgregaSeleccionar($.pckEspecialidadEstado);
                $.pckEspecialidadEstado.add(dataEspe);
                $.pckEspecialidadEstado.setSelectedRow(0, 0);
                idEspecialidadEstado = $.pckEspecialidadEstado.getSelectedRow(0).value;
                Ti.App.fireEvent("ocultaCargando");
            },
            onerror: function(e) {
                Ti.App.fireEvent("ocultaCargando");
                var error = JSON.stringify(e);
                Ti.UI.createAlertDialog({
                    message: "Error(" + url + "):" + error,
                    ok: "Aceptar",
                    title: "Error Membresia"
                }).show();
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function bajarEspecialidadesMedicos() {
        Ti.App.fireEvent("muestraCargando");
        var dataEspe = new Array();
        new Array();
        Alloy.limpiaPicker($.pckEspecialidad);
        var url = Alloy.CFG.urlAPIVRIM + metodoApiEsp + "/?Rango=" + rango + "&Latitud=" + latitudG + "&Longitud=" + longitudG;
        var xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                obj = JSON.parse(this.responseText);
                if (3 != idTipoBusqueda) for (var i = 0; obj.length > i; i++) {
                    var efr = obj[i];
                    dataEspe[i] = Titanium.UI.createPickerRow({
                        title: efr.ESPECIALIDAD,
                        value: efr.ID_ESPECIALIDAD
                    });
                } else {
                    var l = 0;
                    for (var i = 0; obj.length > i; i++) {
                        var ser = obj[i];
                        for (var j = 0; ser.SERVICIOS.length > j; j++) {
                            var det = ser.SERVICIOS[j];
                            dataEspe[l] = Titanium.UI.createPickerRow({
                                title: det.SERVICIO,
                                value: det.ID_SERVICIO
                            });
                            l++;
                        }
                    }
                }
                Util.AgregaSeleccionar($.pckEspecialidad);
                $.pckEspecialidad.add(dataEspe);
                $.pckEspecialidad.setSelectedRow(0, 0);
                idEspecialidad = $.pckEspecialidad.getSelectedRow(0).value;
                Ti.App.fireEvent("ocultaCargando");
            },
            onerror: function(e) {
                Ti.App.fireEvent("ocultaCargando");
                var error = JSON.stringify(e);
                Ti.UI.createAlertDialog({
                    message: "Error(" + url + "):" + error,
                    ok: "Aceptar",
                    title: "Error Membresia"
                }).show();
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function bajarDoctoresEspecialidad() {
        Ti.App.fireEvent("muestraCargando");
        Ti.App.fireEvent("cierraMenuDer");
        var url = Alloy.CFG.urlAPI + "Proveedor?idTipo=" + idTipoBusqueda + "&idEstado=" + idEstado + "&idMunicipio=" + idMunicipio + "&idEspecialidad=" + idEspecialidadEstado;
        var xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                var obj = JSON.parse(this.responseText);
                if (0 == obj.length) {
                    alert("no hay resultados");
                    Ti.App.fireEvent("ocultaCargando");
                } else Ti.App.fireEvent("resultadosRed", {
                    resultado: obj
                });
            },
            onerror: function(e) {
                var error = JSON.stringify(e);
                Ti.UI.createAlertDialog({
                    message: "Error(" + url + "):" + error,
                    ok: "Aceptar",
                    title: "Error Membresia"
                }).show();
                Ti.App.fireEvent("ocultaCargando");
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function bajarDoctores() {
        Ti.App.fireEvent("muestraCargando");
        Ti.App.fireEvent("cierraMenuDer");
        var url = Alloy.CFG.urlAPIVRIM + metodoApi + "/?Rango=" + rango + "&Latitud=" + latitudG + "&Longitud=" + longitudG + "&" + parametroBusqueda + "=" + idEspecialidad;
        var xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                var obj = JSON.parse(this.responseText);
                if (0 == obj.length) {
                    alert("no hay resultados");
                    Ti.App.fireEvent("ocultaCargando");
                } else Ti.App.fireEvent("resultadosRed", {
                    resultado: obj
                });
            },
            onerror: function(e) {
                var error = JSON.stringify(e);
                Ti.UI.createAlertDialog({
                    message: "Error(" + url + "):" + error,
                    ok: "Aceptar",
                    title: "Error Membresia"
                }).show();
                Ti.App.fireEvent("ocultaCargando");
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "filtrosRedes";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.filtrosRedes = Ti.UI.createScrollView({
        backgroundColor: "#FFFFFF",
        layout: "vertical",
        id: "filtrosRedes"
    });
    $.__views.filtrosRedes && $.addTopLevelView($.__views.filtrosRedes);
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "#FFFFFF",
        layout: "vertical",
        id: "__alloyId1"
    });
    $.__views.filtrosRedes.add($.__views.__alloyId1);
    $.__views.lblTitulo = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        left: "10dp",
        text: "Busqueda por Rango:",
        id: "lblTitulo"
    });
    $.__views.__alloyId1.add($.__views.lblTitulo);
    $.__views.lblTRango = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        left: "10dp",
        text: "Rango:",
        id: "lblTRango"
    });
    $.__views.__alloyId1.add($.__views.lblTRango);
    $.__views.pckRango = Ti.UI.createPicker({
        width: "90%",
        left: 0,
        id: "pckRango",
        selectionIndicator: "true",
        useSpinner: "true"
    });
    $.__views.__alloyId1.add($.__views.pckRango);
    var __alloyId2 = [];
    $.__views.column1 = Ti.UI.createPickerColumn({
        id: "column1"
    });
    __alloyId2.push($.__views.column1);
    $.__views.__alloyId3 = Ti.UI.createPickerRow({
        value: "5",
        title: "5 KM",
        id: "__alloyId3"
    });
    $.__views.column1.addRow($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createPickerRow({
        value: "10",
        title: "10 KM",
        id: "__alloyId4"
    });
    $.__views.column1.addRow($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createPickerRow({
        value: "20",
        title: "20 KM",
        id: "__alloyId5"
    });
    $.__views.column1.addRow($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createPickerRow({
        value: "30",
        title: "30 KM",
        id: "__alloyId6"
    });
    $.__views.column1.addRow($.__views.__alloyId6);
    $.__views.pckRango.add(__alloyId2);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        width: "80%",
        height: ".2dp",
        color: "#000",
        left: "10dp",
        backgroundColor: "#FFFFFF",
        top: 2,
        id: "__alloyId7"
    });
    $.__views.__alloyId1.add($.__views.__alloyId7);
    $.__views.lblTEspecailidad = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        left: "10dp",
        text: "Especialidad:",
        id: "lblTEspecailidad"
    });
    $.__views.__alloyId1.add($.__views.lblTEspecailidad);
    $.__views.pckEspecialidad = Ti.UI.createPicker({
        width: "90%",
        left: 0,
        id: "pckEspecialidad",
        selectionIndicator: "true",
        useSpinner: "true"
    });
    $.__views.__alloyId1.add($.__views.pckEspecialidad);
    $.__views.btnBuscarMedico = Ti.UI.createButton({
        backgroundColor: "#00359C",
        color: "#FFFFFF",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "0.4dp",
        borderRadius: 5,
        top: "5dp",
        left: "25%",
        width: "50%",
        borderColor: "#dcdcdc",
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
        title: "Buscar",
        id: "btnBuscarMedico"
    });
    $.__views.__alloyId1.add($.__views.btnBuscarMedico);
    $.__views.lblTituloEstado = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        left: "10dp",
        text: "Busqueda por Estado:",
        id: "lblTituloEstado"
    });
    $.__views.__alloyId1.add($.__views.lblTituloEstado);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        width: "80%",
        height: ".2dp",
        color: "#000",
        left: "10dp",
        backgroundColor: "#FFFFFF",
        top: 2,
        id: "__alloyId8"
    });
    $.__views.__alloyId1.add($.__views.__alloyId8);
    $.__views.lblTEstado = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        left: "10dp",
        text: "Estado:",
        id: "lblTEstado"
    });
    $.__views.__alloyId1.add($.__views.lblTEstado);
    $.__views.pckEstado = Ti.UI.createPicker({
        width: "90%",
        left: 0,
        id: "pckEstado"
    });
    $.__views.__alloyId1.add($.__views.pckEstado);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        width: "80%",
        height: ".2dp",
        color: "#000",
        left: "10dp",
        backgroundColor: "#FFFFFF",
        top: 2,
        id: "__alloyId9"
    });
    $.__views.__alloyId1.add($.__views.__alloyId9);
    $.__views.lblTMunicipio = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        left: "10dp",
        text: "Municipio:",
        id: "lblTMunicipio"
    });
    $.__views.__alloyId1.add($.__views.lblTMunicipio);
    $.__views.pckMunicipio = Ti.UI.createPicker({
        width: "90%",
        left: 0,
        id: "pckMunicipio"
    });
    $.__views.__alloyId1.add($.__views.pckMunicipio);
    $.__views.lblTEspecailidadEstado = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        left: "10dp",
        text: "Especialidad:",
        id: "lblTEspecailidadEstado"
    });
    $.__views.__alloyId1.add($.__views.lblTEspecailidadEstado);
    $.__views.pckEspecialidadEstado = Ti.UI.createPicker({
        width: "90%",
        left: 0,
        id: "pckEspecialidadEstado",
        selectionIndicator: "true",
        useSpinner: "true"
    });
    $.__views.__alloyId1.add($.__views.pckEspecialidadEstado);
    $.__views.btnBuscarMedicoEstado = Ti.UI.createButton({
        backgroundColor: "#00359C",
        color: "#FFFFFF",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "0.4dp",
        borderRadius: 5,
        top: "5dp",
        left: "25%",
        width: "50%",
        borderColor: "#dcdcdc",
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
        title: "Buscar",
        id: "btnBuscarMedicoEstado"
    });
    $.__views.__alloyId1.add($.__views.btnBuscarMedicoEstado);
    $.__views.__alloyId10 = Ti.UI.createView({
        height: "10%",
        bottom: "0",
        id: "__alloyId10"
    });
    $.__views.filtrosRedes.add($.__views.__alloyId10);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Util = require("utils");
    $.lblTitulo.applyProperties($.createStyle(Alloy.FuenteTitulo()));
    $.lblTituloEstado.applyProperties($.createStyle(Alloy.FuenteTitulo()));
    $.lblTEstado.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblTMunicipio.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblTEspecailidad.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblTRango.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblTEspecailidadEstado.applyProperties($.createStyle(Alloy.FuenteMedia()));
    var args = arguments[0] || {};
    var idEstado = 1;
    var idMunicipio = 0;
    var idEspecialidad = 0;
    var idEspecialidadEstado = 0;
    args.idAfiliacion;
    var idTipoBusqueda = args.idTipoBusqueda;
    var metodoApiEsp = "";
    var metodoApi = "";
    var parametroBusqueda = "";
    var latitudG = 22.71539;
    var longitudG = -101.25489;
    var rango = 5;
    switch (idTipoBusqueda) {
      case "1":
        $.lblTitulo.text = "Red Mèdica";
        $.addClass($.lblTitulo, "tituloRed", {
            color: "#00359C"
        });
        $.addClass($.lblTituloEstado, "tituloRed", {
            color: "#00359C"
        });
        metodoApiEsp = "MedicoEspecialidadRango";
        metodoApi = "MedicoTopUbicacion";
        parametroBusqueda = "Especialidad";
        break;

      case "2":
        $.lblTitulo.text = "Servicio";
        $.addClass($.lblTitulo, "tituloRed", {
            color: "#00359C"
        });
        $.addClass($.lblTituloEstado, "tituloRed", {
            color: "#00359C"
        });
        metodoApiEsp = "HospitalEspecialidadRango";
        metodoApi = "HospitalTopUbicacion";
        parametroBusqueda = "Especialidad";
        break;

      case "3":
        $.lblTitulo.text = "Descuentos TDC";
        $.addClass($.lblTitulo, "tituloRed", {
            color: "#628f02"
        });
        $.addClass($.lblTituloEstado, "tituloRed", {
            color: "#628f02"
        });
        metodoApiEsp = "CategoriasTDC";
        metodoApi = "CategoriaTDCRango";
        parametroBusqueda = "Categoria";
        break;

      case "4":
        $.lblTitulo.text = "Laboratorios";
        $.addClass($.lblTitulo, "tituloRed", {
            color: "#628f02"
        });
        $.addClass($.lblTituloEstado, "tituloRed", {
            color: "#628f02"
        });
        metodoApiEsp = "LaboratorioEspecialidadRango";
        metodoApi = "LaboratorioTopUbicacion";
        parametroBusqueda = "Especialidad";
    }
    setTimeout(function() {
        UbicacionActual();
    }, 6e3);
    $.pckRango.addEventListener("change", function() {
        rango = $.pckRango.getSelectedRow(0).value;
        UbicacionActual();
    });
    $.pckEstado.addEventListener("change", function() {
        idEstado = $.pckEstado.getSelectedRow(0).value;
        idMunicipio = 0;
        bajarMunicipiosMedicos();
        Alloy.limpiaPicker($.pckEspecialidadEstado);
    });
    $.pckMunicipio.addEventListener("change", function() {
        idEspecialidadEstado = 0;
        if (null != $.pckMunicipio.getSelectedRow(0)) {
            idMunicipio = "" + $.pckMunicipio.getSelectedRow(0).value;
            bajarEspecialidadesMunicipio();
        }
    });
    $.pckEspecialidad.addEventListener("change", function() {
        null != $.pckEspecialidad.getSelectedRow(0) && (idEspecialidad = $.pckEspecialidad.getSelectedRow(0).value);
    });
    $.pckEspecialidadEstado.addEventListener("change", function() {
        null != $.pckEspecialidadEstado.getSelectedRow(0) && (idEspecialidadEstado = $.pckEspecialidadEstado.getSelectedRow(0).value);
    });
    $.btnBuscarMedico.addEventListener("click", function() {
        bajarDoctores();
    });
    $.btnBuscarMedicoEstado.addEventListener("click", function() {
        bajarDoctoresEspecialidad();
    });
    bajarEstadosMedicos();
    var columnMunicipio = Titanium.UI.createPickerColumn({});
    $.pckMunicipio.columns = [ columnMunicipio ];
    var columnEspecialidad = Titanium.UI.createPickerColumn({});
    $.pckEspecialidad.columns = [ columnEspecialidad ];
    var columnEspecialidadEstado = Titanium.UI.createPickerColumn({});
    $.pckEspecialidadEstado.columns = [ columnEspecialidadEstado ];
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;