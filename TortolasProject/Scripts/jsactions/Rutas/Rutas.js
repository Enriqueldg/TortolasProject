var map;
$(document).ready(function () {

    var UsuarioLogado = null;
    var rutaArchivo = "";
    // Nos traemos el usuario logueado
    $.ajax({
        url: "Usuarios/usuarioLogueado",
        type: "POST",
        success: function (usuario) {
            UsuarioLogado = usuario.Usuario;
        },
        async: false
    });

    // Ventana de crear nueva ruta
    var ventanaCrear = $("#ventanaCrear").kendoWindow({
        title: "Nueva Ruta",
        modal: true,
        visible: false,
        resizable: false,
        scrollable: false,
        movable: false,
        width: 500
    }).data("kendoWindow");


    // Ocultamos los botones de crear y editar
    $("#botonCrearRuta").hide();
    $("#editarRuta").hide();

    // Kendo Numeric de kilometros


    $(".numericKm").width(80).kendoNumericTextBox({
        format: "# km",
        min: 1
    });

    // Kendo Editor para la Descripcion
    $("#nuevoDescripcion").width(400).kendoEditor({
        encoded:true
    });

    // Uploader del archivo

    $(".uploader").kendoUpload({
        async: {
            saveUrl: "Rutas/subir",
            //removeUrl: '@Url.Action("Remove", "Home")',
            autoUpload: true,            
        },
        showFileList: false,       
        localization: {
            "select":"Seleccionar"
        },
        upload: subido,
        //select: seleccion,
        success:function(e){ },
        error:function(e){   }

    });

    function subido(e){
        
        var archivo = e.files;
        var nombreArchivo = archivo[0].name;
                
        rutaArchivo =  nombreArchivo;       
        
    }
    

    /*function seleccion(e){
            window.setTimeout(function() {
            $(".k-upload-selected").click(function(e) {
                // custom logic
                console.log($(".uploader").data("kendoUpload"));                
                if (false) {
                    e.preventDefault();
                    return false;
                }
            });
        }, 1);
    }
    */
    var tablaRutas = $("#tablaRutas").kendoGrid({
        dataSource: {
            transport: {
                type: "json",
                read: {
                    url: "Rutas/leerRutas",
                    type: "POST",
                    dataType: "json"
                },
                pageSize: 15
            }
        },
        pageable: true,
        sortable: true,
        selectable: true,
        scrollable: false,
        filterable: true,
        toolbar: kendo.template($("#templateToolbarRutas").html()),
        detailTemplate: kendo.template($("#templateDetailRutas").html()),
        detailInit: inicializarTablaRutas,
        columns: [
                   {
                       field: "Nombre",
                       title: "Nombre",
                       filterable: {
                           extra: false, //do not show extra filters
                           operators: { // redefine the string operators
                               string: {
                                   eq: "Es igual a..",
                                   neq: "No es igual a...",
                                   startswith: "Empieza por...",
                                   contains: "Contiene"
                               }
                           }
                       }
                   },
                   {
                       field: "Dificultad",
                       title: "Dificultad",
                       filterable: {
                           extra: false, //do not show extra filters
                           operators: { // redefine the string operators
                               string: {
                                   eq: "Es igual a..",
                                   neq: "No es igual a...",
                                   startswith: "Empieza por...",
                                   contains: "Contiene"
                               }
                           }
                       }
                   },
                   {
                       field: "Kilometros",
                       title: "Kilometros",
                       filterable: {
                           extra: false, //do not show extra filters
                           operators: { // redefine the string operators
                               string: {
                                   eq: "Es igual a..",
                                   neq: "No es igual a...",
                                   startswith: "Empieza por...",
                                   contains: "Contiene"
                               }
                           }
                       }
                   }
        ],
        change: function () {
            var record = this.dataSource.getByUid(this.select().data("uid"));

            if (record.idUsuario == UsuarioLogado) {
                $(".dueno").show();

            } else {
                $(".dueno").hide();
            }

        }
    });

    // Combo de paginacion de Rutas
    var valoresPageSize = [
                { texto: "5", valor: "5" },
                { texto: "10", valor: "10" },
                { texto: "15", valor: "15" },
                { texto: "20", valor: "20" }
            ];

    // Inicializamos los dropdownlist de las tablas para el pagesize
    $(".comboPageSize").kendoDropDownList({
        dataValueField: "valor",
        dataTextField: "texto",
        dataSource: valoresPageSize,
        change: function () {

            $("#tablaRutas").data("kendoGrid").dataSource.pageSize(this.value());
            $("#tablaRutas").data("kendoGrid").refresh();

        }
    });

    function inicializarTablaRutas(e) {
        $(".detallesRutas").kendoTabStrip();

        $(".descripcion_" + e.data.idRuta).html(e.data.Descripcion);
        inicializarMapa(e.data.Ruta);
    }

    // FUNCION PARA CREAR UNA NUEVA RUTA
    $(".botonNuevaRuta").click(function () {
        $("#formularioCrear input").val("");
        $("#nuevoDescripcion").data("kendoEditor").value("");
        $("#botonCrearRuta").show();
        $("#editarRuta").hide();
        ventanaCrear.open();
        ventanaCrear.center();
    });

    // FUNCION PARA ELIMINAR RUTA
    $("#botonEliminarRuta").click(function(){
        if(confirm("¿Estas seguro de que desea eliminar esta Ruta?")){
            var fila = $("#tablaRutas").data("kendoGrid").select();          // Cogemos la fila seleccionada
            var filaJson = $("#tablaRutas").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON
            var idRuta = $("#tablaRutas").data("kendoGrid").dataSource.getByUid(fila.attr("data-uid")).idRuta;         
            $.ajax({
                url: "Rutas/eliminarRuta",
                type:"POST",
                data: { idRuta: idRuta},
                success: function(){
                    $("#tablaRutas").data("kendoGrid").dataSource.read();
                },
                async:false
            });
        }
    });

    // FUNCION PARA EDITAR
    $("#botonEditarRuta").click(function(){
         
        var fila = $("#tablaRutas").data("kendoGrid").select();          // Cogemos la fila seleccionada
        var filaJson = $("#tablaRutas").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON
        var valores = $("#tablaRutas").data("kendoGrid").dataSource.getByUid(fila.attr("data-uid"));          // Obtenemos el idMonitor seleccionado
        
        $("#nuevoNombre").val(valores.Nombre);
        $("#nuevoKilometros").data("kendoNumericTextBox").value(valores.Kilometros);
        $("#nuevoDificultad").data("kendoDropDownList").value(valores.Dificultad);console.log(valores.Dificultad);
        $("#nuevoEnlaceWeb").val(valores.URL);
        $("#nuevoDescripcion").data("kendoEditor").value(valores.Descripcion);

        $("#editarRuta").show();
        $("#botonCrearRuta").hide();
        ventanaCrear.open();
        ventanaCrear.center();
    });

    $(".comboDificultad").kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: "Rutas/obtenerDificultades",
                    type: "POST",
                    async: false
                }
            }
        },
        dataTextField: "Nombre",
        dataValueField: "Valor"
        
    });
    

    $("#botonCrearRuta").click(function () {
    console.log("Me voy a insertar");
        if (comprobarNecesarios("formularioCrear")) {
            var aEnviar = {};

            $("#formularioCrear input").each(function () {
                aEnviar[$(this).attr("atributo")] = $(this).val();
            });
            
            aEnviar["Dificultad"] = $("#nuevoDificultad").data("kendoDropDownList").value();
            if(aEnviar["Dificultad"]=="")
                aEnviar["Dificultad"]="Facil";
            aEnviar["Descripcion"] = $("#nuevoDescripcion").data("kendoEditor").value();            
            aEnviar["RutaArchivo"] = rutaArchivo;
            $.ajax({
                url: "Rutas/insertarRuta",
                type: "POST",
                data: aEnviar,
                success: function () {
                    ventanaCrear.close();
                    $("#tablaRutas").data("kendoGrid").dataSource.read();
                },
                async: false
            });
        }
    });

    $("#editarRuta").click(function(){
        console.log("Me voy a insertar");
        if (comprobarNecesarios("formularioCrear")) {
            var aEnviar = {};

            $("#formularioCrear input").each(function () {
                aEnviar[$(this).attr("atributo")] = $(this).val();
            });
            
            var fila = $("#tablaRutas").data("kendoGrid").select();          // Cogemos la fila seleccionada
            var filaJson = $("#tablaRutas").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON
            var valores = $("#tablaRutas").data("kendoGrid").dataSource.getByUid(fila.attr("data-uid"));         
            
            aEnviar["idRuta"] = valores.idRuta;
            aEnviar["Dificultad"] = $("#nuevoDificultad").data("kendoDropDownList").value();
            if(aEnviar["Dificultad"]=="")
                aEnviar["Dificultad"]="Facil";
            aEnviar["Descripcion"] = $("#nuevoDescripcion").data("kendoEditor").value();            
            aEnviar["RutaArchivo"] = rutaArchivo;
            $.ajax({
                url: "Rutas/editarRuta",
                type: "POST",
                data: aEnviar,
                success: function () {
                    ventanaCrear.close();
                    $("#tablaRutas").data("kendoGrid").dataSource.read();
                },
                async: false
            });
        }
    });

    // FUNCION PARA LOS CAMPOS REQUERIDOS
    $(".necesario").change(function () {

        if ($(this).val() == "") {
            $(this).addClass("k-invalid");
        }
        else {
            $(this).removeClass("k-invalid");
        }
    });

    function comprobarNecesarios(formulario) {
        var noHayErrores = true;

        $("#" + formulario + " .necesario").each(function (index) {
            if ($(this).val() == "") {
                $(this).addClass("k-invalid");
                noHayErrores = false;
            }
        });
        return noHayErrores;
    }

    // ZONA DE QTIPS


    setTimeout(cargarQTipsRutas, 1000);

    function cargarQTipsRutas() {

        $(".gpx").qtip({
            content: {
                text: "<center><img src='../../Content/images/mapasubir.png' height='100'/></center><br><br>Sube y comparte tus rutas generadas por aplicaciones como <a href='http://maps.google.es/'><u>Google Maps</u></a>, <a href='http://www.oruxmaps.com'><u>Orux Maps</u></a>, <a href='http://www.endomondo.com'><u>EndoMondo</u></a> , etc... o por tu aplicacion GPS favorita.<br> El archivo debe estar en formato <b>.gpx</b>"
            },
            position: {
                my: "top left"
            }
        });

        $(".necesario").qtip({
            content: {
                text: "Este campo es <font color='red'><b>obligatorio</b></font>."
            },
            position: {
                my: "top left"
            }
        });
    }

});
function inicializarMapa(idRuta)
{

  var myOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map($(".map_canvas"), myOptions);
    console.log("Mapa creado");
    
    /*
    $.ajax({
        type: "GET",
        url: "devolverRuta",
        data: idRuta,
        dataType: "xml",
        success: function (xml) {
            var points = [];
            var bounds = new google.maps.LatLngBounds();
            $(xml).find("trkpt").each(function () {
                var lat = $(this).attr("lat");
                var lon = $(this).attr("lon");
                var p = new google.maps.LatLng(lat, lon);
                points.push(p);
                bounds.extend(p);
            });

            var poly = new google.maps.Polyline({
                // use your own style here
                path: points,
                strokeColor: "#FF00AA",
                strokeOpacity: .7,
                strokeWeight: 4
            });

            poly.setMap(map);

            // fit bounds to track
            map.fitBounds(bounds);
        }
    });
    */
}