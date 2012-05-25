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

    var tablaRutas = $("#tablaRutas").kendoGrid({
        dataSource: {
            transport: {
                type: "json",
                read: {
                    url: "Rutas/leerRutasUsuario",
                    data: { idUsuario: UsuarioLogado },
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
        ]
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
    });

    function inicializarMapa(idRuta) {

        var myOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map($(".map_canvas"), myOptions);
        console.log("Mapa creado");

           
    }