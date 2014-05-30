function Controller() {
    function agregarContacto(e) {
        var db = Ti.Database.open("VRIM");
        var resValidaNumero = db.execute("SELECT id FROM conFav where id = ?", e.id);
        if (resValidaNumero.rowCount > 0) {
            db.close();
            alert("El numero ya esta en la lista de numero favoritos");
            return;
        }
        e.numero = e.numero.replace(" ", "").replace("(", "").replace(")", "");
        db.execute("CREATE TABLE IF NOT EXISTS conFav(id INTEGER PRIMARY KEY, nombre TEXT, numero TEXT)");
        db.execute("INSERT INTO conFav (id, nombre, numero) VALUES(?,?,?)", e.id, e.nombre, e.numero);
        db.close();
        cargaNumFav();
    }
    function cargaNumFav() {
        var db = Ti.Database.open("VRIM");
        db.execute("CREATE TABLE IF NOT EXISTS conFav(id INTEGER PRIMARY KEY, nombre TEXT, numero TEXT)");
        var resContactos = db.execute("SELECT id, nombre, numero FROM conFav");
        var data = [];
        var sec = Ti.UI.createTableViewSection({
            headerTitle: "Contactos"
        });
        while (resContactos.isValidRow()) {
            var cont = {
                id: resContactos.fieldByName("id"),
                nombre: resContactos.fieldByName("nombre"),
                numero: resContactos.fieldByName("numero")
            };
            var contacto = Alloy.createController("vwContactoRow", cont).getView();
            sec.add(contacto);
            resContactos.next();
        }
        data.push(sec);
        $.tbContactosFav.data = data;
        db.close();
        Ti.App.fireEvent("ocultaCargando");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vwNumEmergencia";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.vwTodo = Ti.UI.createScrollView({
        backgroundColor: "#F9F4F4",
        layout: "vertical",
        id: "vwTodo"
    });
    $.__views.vwTodo && $.addTopLevelView($.__views.vwTodo);
    $.__views.vwContactosEmergencia = Ti.UI.createView({
        backgroundColor: "#FFF",
        height: "50%",
        top: "2%",
        id: "vwContactosEmergencia"
    });
    $.__views.vwTodo.add($.__views.vwContactosEmergencia);
    $.__views.lblAgregar = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        font: {
            fontSize: "15%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Agregar Contacto",
        id: "lblAgregar",
        right: "19%",
        top: "0"
    });
    $.__views.vwContactosEmergencia.add($.__views.lblAgregar);
    $.__views.imgAgregar = Ti.UI.createImageView({
        id: "imgAgregar",
        image: "/images/add.png",
        width: "13%",
        height: "13%",
        right: "5%",
        top: "0"
    });
    $.__views.vwContactosEmergencia.add($.__views.imgAgregar);
    $.__views.tbContactosFav = Ti.UI.createTableView({
        top: "15%",
        height: "80%",
        id: "tbContactosFav"
    });
    $.__views.vwContactosEmergencia.add($.__views.tbContactosFav);
    var __alloyId14 = [];
    $.__views.__alloyId15 = Ti.UI.createTableViewSection({
        headerTitle: "Numeros de Emergencia",
        id: "__alloyId15"
    });
    __alloyId14.push($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "42093200",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "42 09 32 00",
        id: "__alloyId18"
    });
    $.__views.__alloyId16.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Emergencias VRIM",
        id: "__alloyId19"
    });
    $.__views.__alloyId16.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "52508221",
        id: "__alloyId20"
    });
    $.__views.__alloyId15.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "52 50 82 21",
        id: "__alloyId22"
    });
    $.__views.__alloyId20.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Auxilio Turistico",
        id: "__alloyId23"
    });
    $.__views.__alloyId20.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "57683700",
        id: "__alloyId24"
    });
    $.__views.__alloyId15.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "57 68 37 00",
        id: "__alloyId26"
    });
    $.__views.__alloyId24.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Bomberos 1",
        id: "__alloyId27"
    });
    $.__views.__alloyId24.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "068",
        id: "__alloyId28"
    });
    $.__views.__alloyId15.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId29"
    });
    $.__views.__alloyId28.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "068",
        id: "__alloyId30"
    });
    $.__views.__alloyId28.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Bomberos 2",
        id: "__alloyId31"
    });
    $.__views.__alloyId28.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "55575757",
        id: "__alloyId32"
    });
    $.__views.__alloyId15.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "55 57 57 57",
        id: "__alloyId34"
    });
    $.__views.__alloyId32.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Cruz Roja 1",
        id: "__alloyId35"
    });
    $.__views.__alloyId32.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "56581111",
        id: "__alloyId36"
    });
    $.__views.__alloyId15.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "56 58 11 11",
        id: "__alloyId38"
    });
    $.__views.__alloyId36.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Cruz Roja 2",
        id: "__alloyId39"
    });
    $.__views.__alloyId36.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "55540612",
        id: "__alloyId40"
    });
    $.__views.__alloyId15.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId41"
    });
    $.__views.__alloyId40.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "55 54 06 12",
        id: "__alloyId42"
    });
    $.__views.__alloyId40.add($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Control de Incendios",
        id: "__alloyId43"
    });
    $.__views.__alloyId40.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "55547097",
        id: "__alloyId44"
    });
    $.__views.__alloyId15.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId45"
    });
    $.__views.__alloyId44.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "55 54 70 97",
        id: "__alloyId46"
    });
    $.__views.__alloyId44.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Control de Incendios",
        id: "__alloyId47"
    });
    $.__views.__alloyId44.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "56531369",
        id: "__alloyId48"
    });
    $.__views.__alloyId15.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "56 53 13 69",
        id: "__alloyId50"
    });
    $.__views.__alloyId48.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Control de Incendios",
        id: "__alloyId51"
    });
    $.__views.__alloyId48.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "53468000",
        id: "__alloyId52"
    });
    $.__views.__alloyId15.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId53"
    });
    $.__views.__alloyId52.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "53 46 80 00",
        id: "__alloyId54"
    });
    $.__views.__alloyId52.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Deposito de Vehiculos",
        id: "__alloyId55"
    });
    $.__views.__alloyId52.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "55547097",
        id: "__alloyId56"
    });
    $.__views.__alloyId15.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId57"
    });
    $.__views.__alloyId56.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "55 54 70 97",
        id: "__alloyId58"
    });
    $.__views.__alloyId56.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Control de Incendios",
        id: "__alloyId59"
    });
    $.__views.__alloyId56.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "5658111",
        id: "__alloyId60"
    });
    $.__views.__alloyId15.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "56 58 11 11",
        id: "__alloyId62"
    });
    $.__views.__alloyId60.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Locatel",
        id: "__alloyId63"
    });
    $.__views.__alloyId60.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "56842142",
        id: "__alloyId64"
    });
    $.__views.__alloyId15.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId65"
    });
    $.__views.__alloyId64.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "56 84 21 42",
        id: "__alloyId66"
    });
    $.__views.__alloyId64.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Policiá Federal Preventiva",
        id: "__alloyId67"
    });
    $.__views.__alloyId64.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "52560606",
        id: "__alloyId68"
    });
    $.__views.__alloyId15.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId69"
    });
    $.__views.__alloyId68.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "52 56 06 06",
        id: "__alloyId70"
    });
    $.__views.__alloyId68.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Policiá Federal Preventiva",
        id: "__alloyId71"
    });
    $.__views.__alloyId68.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "52560606",
        id: "__alloyId72"
    });
    $.__views.__alloyId15.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId73"
    });
    $.__views.__alloyId72.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "52 56 06 06",
        id: "__alloyId74"
    });
    $.__views.__alloyId72.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Policiá Federal Preventiva",
        id: "__alloyId75"
    });
    $.__views.__alloyId72.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "56256700",
        id: "__alloyId76"
    });
    $.__views.__alloyId15.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId77"
    });
    $.__views.__alloyId76.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "56 25 67 00",
        id: "__alloyId78"
    });
    $.__views.__alloyId76.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Profeco 1",
        id: "__alloyId79"
    });
    $.__views.__alloyId76.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "55256700",
        id: "__alloyId80"
    });
    $.__views.__alloyId15.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId81"
    });
    $.__views.__alloyId80.add($.__views.__alloyId81);
    $.__views.__alloyId82 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "55 25 67 00",
        id: "__alloyId82"
    });
    $.__views.__alloyId80.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Profeco 2",
        id: "__alloyId83"
    });
    $.__views.__alloyId80.add($.__views.__alloyId83);
    $.__views.__alloyId84 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "5658111",
        id: "__alloyId84"
    });
    $.__views.__alloyId15.add($.__views.__alloyId84);
    $.__views.__alloyId85 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId85"
    });
    $.__views.__alloyId84.add($.__views.__alloyId85);
    $.__views.__alloyId86 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "56 58 11 11",
        id: "__alloyId86"
    });
    $.__views.__alloyId84.add($.__views.__alloyId86);
    $.__views.__alloyId87 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Locatel",
        id: "__alloyId87"
    });
    $.__views.__alloyId84.add($.__views.__alloyId87);
    $.__views.__alloyId88 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "060",
        id: "__alloyId88"
    });
    $.__views.__alloyId15.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId89"
    });
    $.__views.__alloyId88.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "060",
        id: "__alloyId90"
    });
    $.__views.__alloyId88.add($.__views.__alloyId90);
    $.__views.__alloyId91 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Radio Patrullas",
        id: "__alloyId91"
    });
    $.__views.__alloyId88.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "080",
        id: "__alloyId92"
    });
    $.__views.__alloyId15.add($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId93"
    });
    $.__views.__alloyId92.add($.__views.__alloyId93);
    $.__views.__alloyId94 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "080",
        id: "__alloyId94"
    });
    $.__views.__alloyId92.add($.__views.__alloyId94);
    $.__views.__alloyId95 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Radio Patrullas",
        id: "__alloyId95"
    });
    $.__views.__alloyId92.add($.__views.__alloyId95);
    $.__views.__alloyId96 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "51308000",
        id: "__alloyId96"
    });
    $.__views.__alloyId15.add($.__views.__alloyId96);
    $.__views.__alloyId97 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId97"
    });
    $.__views.__alloyId96.add($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "51 30 80 00",
        id: "__alloyId98"
    });
    $.__views.__alloyId96.add($.__views.__alloyId98);
    $.__views.__alloyId99 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Robo de Vehiculos 1",
        id: "__alloyId99"
    });
    $.__views.__alloyId96.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "51308646",
        id: "__alloyId100"
    });
    $.__views.__alloyId15.add($.__views.__alloyId100);
    $.__views.__alloyId101 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId101"
    });
    $.__views.__alloyId100.add($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "51 30 86 46",
        id: "__alloyId102"
    });
    $.__views.__alloyId100.add($.__views.__alloyId102);
    $.__views.__alloyId103 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Robo de Vehiculos 2",
        id: "__alloyId103"
    });
    $.__views.__alloyId100.add($.__views.__alloyId103);
    $.__views.__alloyId104 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "52722694",
        id: "__alloyId104"
    });
    $.__views.__alloyId15.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId105"
    });
    $.__views.__alloyId104.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "52 72 26 94",
        id: "__alloyId106"
    });
    $.__views.__alloyId104.add($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Red Monitoreo",
        id: "__alloyId107"
    });
    $.__views.__alloyId104.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "52425100",
        id: "__alloyId108"
    });
    $.__views.__alloyId15.add($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId109"
    });
    $.__views.__alloyId108.add($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "52 42 51 00",
        id: "__alloyId110"
    });
    $.__views.__alloyId108.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Seguridad Pública DF",
        id: "__alloyId111"
    });
    $.__views.__alloyId108.add($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "55885100",
        id: "__alloyId112"
    });
    $.__views.__alloyId15.add($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId113"
    });
    $.__views.__alloyId112.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "55 88 51 00",
        id: "__alloyId114"
    });
    $.__views.__alloyId112.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Seguridad Pública DF",
        id: "__alloyId115"
    });
    $.__views.__alloyId112.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "55420117",
        id: "__alloyId116"
    });
    $.__views.__alloyId15.add($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId117"
    });
    $.__views.__alloyId116.add($.__views.__alloyId117);
    $.__views.__alloyId118 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "55 42 01 17",
        id: "__alloyId118"
    });
    $.__views.__alloyId116.add($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Sria. del Medio Ambiente",
        id: "__alloyId119"
    });
    $.__views.__alloyId116.add($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        numero: "55103663",
        id: "__alloyId120"
    });
    $.__views.__alloyId15.add($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createImageView({
        image: "/images/phone.png",
        left: "2%",
        width: "15%",
        id: "__alloyId121"
    });
    $.__views.__alloyId120.add($.__views.__alloyId121);
    $.__views.__alloyId122 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        text: "55 10 36 63",
        id: "__alloyId122"
    });
    $.__views.__alloyId120.add($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        text: "Sria. del Medio Ambiente",
        id: "__alloyId123"
    });
    $.__views.__alloyId120.add($.__views.__alloyId123);
    $.__views.vwNumerosEmergencia = Ti.UI.createTableView({
        height: "45%",
        top: "2%",
        data: __alloyId14,
        id: "vwNumerosEmergencia"
    });
    $.__views.vwTodo.add($.__views.vwNumerosEmergencia);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.lblAgregar.applyProperties($.createStyle(Alloy.FuenteMedia()));
    cargaNumFav();
    $.imgAgregar.addEventListener("click", function() {
        var contacto = Alloy.createController("vwContactos").getView();
        contacto.open({
            modal: true
        });
    });
    $.tbContactosFav.addEventListener("click", function(e) {
        if (void 0 != e.source.idContacto) {
            var db = Ti.Database.open("VRIM");
            db.execute("DELETE FROM conFav where id = ?", e.source.idContacto);
            db.close();
            cargaNumFav();
        } else Ti.Platform.openURL("tel:" + e.row.numero);
    });
    $.vwNumerosEmergencia.addEventListener("click", function(e) {
        Ti.Platform.openURL("tel:" + e.row.numero);
    });
    Ti.App.addEventListener("agregarContacto", agregarContacto);
    exports.destroy = function() {
        Ti.App.removeEventListener("agregarContacto", agregarContacto);
    };
    Alloy.Globals.current = $;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;