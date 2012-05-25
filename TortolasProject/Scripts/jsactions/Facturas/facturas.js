// Variables globales
var factura;            // Factura
var tipo;               // Tipo Relación
var idRelacion;         // idRelacion
var idArticulo;         // idArticulo de línea
var w;                  // Ventana
var wl;                 // Ventana de líneas factura
var estadoPagina;       // Estado {nueva,detalles,editar}
var dsUsuarios;         // dataSource Usuarios
var dsEventos;          // dataSource Eventos
var dsCursillos;        // dataSource Cursillos
var dsPedidosGlobales;  // dataSource pedidosGlobales
var dsPedidosUsuario;   // dataSource pedidosUsuario
var dsArticulos;        // dataSource Articulos
var dsEstadoFactura;    // dataSource EstadoFactura
var dataSource;         // dataSource LineasFactura
var tabla;              // tabla LineasFactura
var idFactura;          // idFactura
var iva = 18;           // IVA: Por defecto: 18%
var BaseImponible;      // Base imponible
var Total;              // Total factura
var vieneDeDetalles = false;
var validacion;         // Validación de campos
var status;             // Status de la validación
var validacionLinea;    // Validación de una línea de factura
var statusLinea;        // Status de la validación de una línea.
var idLineaFactura;           // uid de la linea editada
var editarLinea;

$(document).ready(function () {
    $("#facturaForm").hide();
    estadoPagina = $("#estadoPage").val();

    inicializar();

    if (estadoPagina == "nueva") {
        estadoNuevaFactura();
    } else if (estadoPagina == "detalles") {
        estadoDetallesFactura();
    } else if (estadoPagina == "editar") {
        estadoEditarFactura();
    }
});

function estadoNuevaFactura() {
    idRelacion = null;
    idArticulo = null;
    tipo = null;

    $("#volverButton").show();
    // Ocultar botón poli
    $("#poliButton").hide();
    $("#eliminarButton").hide();
    $("#pdfButton").hide();
    

    // DatePicker fecha
    $("#fechaFacturaInput").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

    $("#relacionesExistentesDiv").hide();

    datosTablaNueva();
    $("#facturaForm").show();    
    tablaEditable(); 
}

function estadoDetallesFactura() {

    inicializarFactura();
    idRelacion = factura.idRelacion;
    tipo = factura.tipo;
    fecha = factura.Fecha;
    concepto = factura.Concepto;
    vieneDeDetalles = false;
    editar = false;

    // Ocultar campos
    if(factura.NombreEstado == "Pagado") $("#poliButton").hide();   
    else $("#poliButton").show();

    $("#eliminarButton").hide();
    $("#fechaFacturaContainer").hide();
    $("#relacionesButton").hide();
    $("#quitarRelacionButton").hide();
    $("#nuevaLineaButton").hide();
    $("#facturaBottom").hide();
    $("#conceptoFactura").hide();
    $("#estadoFacturaDropDownList").hide();
    $("#estadoFacturaDropDownListContainer").hide();
    $("#pdfButton").show();


    // Mostrar campos
    $("#volverButton").show();
    $("#fechaFacturaLabel").show();
    $("#conceptoFacturaLabel").show();
    
    $("#relacionDiv").show();
    $("#estadoFacturaLabel").html(factura.NombreEstado);
    $("#estadoFacturaLabel").show();
    actualizarTotal(factura.BaseImponible, factura.Total);
    


    $("#facturaLineasFacturaGrid").empty();

    // DataSource KENDO
    var datosIdFactura = {
        idFactura: idFactura
    };
    dataSource = new kendo.data.DataSource({
        transport: {
            read:
            {
                url: "../leerLineasFactura",
                data: datosIdFactura,
                dataType: "json",
                type: "POST"
            }
        },
        schema:
            {
                model:
                {
                    id: "idLineaFactura",
                    fields: {
                        concepto: {},
                        unidades: { type: "number" },
                        precio: { type: "number" },
                        total: { type: "number" },
                        idArticulo: { }
                    }
                }
            }
    });


        // Tabla de facturas
        
    $("#facturaLineasFacturaGrid").kendoGrid({
        dataSource: dataSource,
        columns: [
                {
                    field: "concepto",
                    title: "Concepto"

                },
                {
                    title: "Unidades",
                    field: "unidades"
                },
                {
                    title: "Precio",
                    field: "precio"
                },
                {
                    title: "Total",
                    field: "total"
                }
            ]
    });
    $("#facturaForm").show();
 }

 function estadoEditarFactura() 
 {
    // Actualizar estado
     estadoPagina = "editar";
     $("#estadoPage").val(estadoPagina);
     actualizarTotal(BaseImponible,Total);
     $("#pdfButton").hide();

    $("#volverButton").show();
    $("#poliButton").hide();
    $("#eliminarButton").show();

    if (factura.tipo == null) {
        $("#quitarRelacionButton").hide();
        $("#relacionesButton").show();
    }
    else {
        $("#relacionesButton").hide();
        $("#relacionesExistentesDiv").show();
        $("#relacionDiv").html(factura.idRelacion).show();
        $("#quitarRelacionButton").show();
    }
    

    // Mostramos datePicker
    $("#fechaFacturaDiv").width(120);
    $("#fechaFacturaLabel").hide();
    $("#fechaFacturaContainer").show();
    $("#fechaFacturaInput").kendoDatePicker({        
        value: factura.Fecha,
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

    // Concepto
    $("#conceptoFacturaLabel").hide();
    $("#conceptoFactura").show();
    $("#conceptoFactura").val(factura.Concepto);
    
    // Estado factura
    var listaEstados = $("#estadoFacturaDropDownList").data("kendoDropDownList");
    $("#estadoFacturaDropDownList").data("kendoDropDownList").select(function(dataItem) {
        return dataItem.idEstadoFactura == dsEstadoFactura.get(factura.FKEstado.toString()).idEstadoFactura;
    });
    $("#estadoFacturaLabel").hide();
    $("#estadoFacturaDropDownListContainer").show();



    // Líneas Factura
    $("#nuevaLineaButton").show();

    // Factura Bottom
    $("#facturaBottom").show();

    // Tabla de facturas
    datosTablaEditar();
    tablaEditable();
    $("#facturaForm").show(); 
}


function datosTablaNueva()
{
     // DataSource KENDO
    dataSource = new kendo.data.DataSource({
        schema:
            {
                model:
                {
                    id: "idLineaFactura",
                    fields: {
                        concepto: {  },
                        unidades: { },
                        precio: {  },
                        total: {  },
                        idArticulo: {}
                    }
                }
            },
        emptyMsg: "No hay líneas de factura.",
        change: emptyGrid,
        });
}

function datosTablaEditar() 
{
    $("#facturaLineasFacturaGrid").empty();
    // DataSource KENDO
    dataSource = new kendo.data.DataSource({
        transport: {
            read:
            {
                url: "../leerLineasFactura",
                data: { idFactura: idFactura },
                dataType: "json",
                type: "POST"
            }
        },
        schema:
            {
                model:
                {
                    id: "idLineaFactura",
                    fields: {
                        concepto: { },
                        unidades: {  },
                        precio: { },
                        total: { },
                        idArticulo: {}
                    }
                }
            },
        emptyMsg: "No hay líneas de factura.",
        change: emptyGrid,
    });


}
/* #######################  TABLA EDITABLE ##################################*/
function tablaEditable() {

    // Tabla de facturas
    $("#facturaLineasFacturaGrid").kendoGrid({
        selectable: true,
        dataSource: dataSource,
        toolbar: [{ text: "Nueva línea", className: "nuevaLineaFacturaButton" }],
        columns: [
                {
                    field: "concepto",
                    title: "Concepto"

                },
                {
                    title: "Unidades",
                    field: "unidades",
                },
                {
                    title: "Precio",
                    field: "precio",
                },
                {
                    title: "Total",
                    field: "total"
                },
                {
                    command: [
                        {text:"Editar", className:"editarLineaFacturaButton"},
                        {text:"Eliminar", className:"eliminarLineaFacturaButton"}],
                    title: " ",
                    width: "200px"
                }
            ]
    });

    tabla = $("#facturaLineasFacturaGrid").data("kendoGrid");

    tabla.refresh();
}

/* #########    INICIALIZAR FACTURA     ################################# */
function inicializarFactura()
{
     if (estadoPagina != "nueva") 
    {
        idFactura = $("#idFactura").val();

        // Obtengo la factura
        var urlFactura = "../../Facturas/leerFactura"; 
        var datosFactura = {
            idFactura: idFactura
        };

        $.ajax({
            async: false,
            type: "POST",
            url: urlFactura,
            data: datosFactura
        }).done(function (data) {
            factura = data;
            BaseImponible = factura.BaseImponible;
            Total = factura.Total;
        });

    }
}

/* ############## INICIALIZAR ################################################################### */
function inicializar() {
    inicializarFactura();

    // Validación de campos
    validacion = $("#facturaForm").kendoValidator().data("kendoValidator");
    status = $(".status");
    // Botón volver
    $("#volverButton").text("Volver");
    $("#volverButton").click(function () {
        volverAtras();
    });
    // PoliButton Editar
    $("#poliButton").text("Editar");
    $("#poliButton").click(function () {
        vieneDeDetalles = true;
        estadoEditarFactura();
    });

    // Botón eliminar
    $("#eliminarButton").text("Eliminar factura");
    $("#eliminarButton").click(function () {
        var url = "../eliminarFactura";
        var datos = {
            idFactura: idFactura
        };
        $.post(url, datos, function () 
        {
            window.location.replace("../../Facturas");
        });
    });



    // Estado factura
    dsEstadoFactura = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../../Facturas/estadosListado",
                dataType: "json",
                type: "POST"
            }
        },
        schema: {
                model:
                {
                    id: "idEstadoFactura"
                }
        }
    });

    $("#estadoFacturaDropDownList").kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "idEstadoFactura",
        dataSource: dsEstadoFactura
    });

    $("#descartarFacturaButton").click(function () {
        if (estadoPagina == "nueva") {
            volverAtras();            
        } else {
            estadoDetallesFactura();
        }
    });

    $("#guardarFacturaButton").click(function () {
        if(!validacion.validate()){
            //status.text("Hay errores en la factura").addClass("invalid");            
        }
        else if( dataSource.total() == 0)
        {
            //status.text("Introduzca al menos una línea factura").addClass("invalid");            
        }
        else
        {
            if( ($("#estadoFacturaDropDownList").data("kendoDropDownList").text() != "Pagado") || confirm("Ha indicado que la factura está pagada. Si lo confirma no podrá modificarla ni eliminarla en el futuro. \n ¿Está seguro que desea establecer la factura como pagada?") )
            {
                    //status.empty();
                    var estadoF = $("#estadoFacturaCombobox").val();
                    var concepto = $('#conceptoFactura').val();
                    var total = $('#totalFactura').val();



                    var url = "";
                    if (estadoPagina == "nueva") {
                        url = "nuevaFactura";

                        // Obtener líneas de factura
                        var lineasFacturaRaw = $("#facturaLineasFacturaGrid").data("kendoGrid").dataSource.view();
                        var lineasFactura = new Array();
                        for (var i = 0; i < lineasFacturaRaw.length; i++) {
                            lineasFactura.push({
                                "concepto": lineasFacturaRaw[i].concepto,
                                "unidades": lineasFacturaRaw[i].unidades,
                                "precio": lineasFacturaRaw[i].precio,
                                "idArticulo": lineasFacturaRaw[i].idArticulo
                            });
                        }
                        var datos = {
                            estado: $("#estadoFacturaDropDownList").data("kendoDropDownList").value(),
                            concepto: concepto,
                            lineasFactura: kendo.stringify(lineasFactura),
                            idRelacion: idRelacion,
                            tipo: tipo,
                            fecha: $("#fechaFacturaInput").val()
                        };
                    } else if (estadoPagina == "editar") {
                        url = "../editarFactura";

                        // Obtener líneas de factura
                        var lineasFacturaRaw = $("#facturaLineasFacturaGrid").data("kendoGrid").dataSource.view();
                        var lineasFactura = new Array();
                        for (var i = 0; i < lineasFacturaRaw.length; i++) {
                            lineasFactura.push({
                                "idLineaFactura": lineasFacturaRaw[i].idLineaFactura,
                                "concepto": lineasFacturaRaw[i].concepto,
                                "unidades": lineasFacturaRaw[i].unidades,
                                "precio": lineasFacturaRaw[i].precio,
                                "idArticulo": lineasFacturaRaw[i].idArticulo
                            });
                        }

                        var datos = {
                            idFactura: idFactura,
                            estado: $("#estadoFacturaDropDownList").data("kendoDropDownList").value(),
                            concepto: concepto,
                            lineasFactura: kendo.stringify(lineasFactura),
                            idRelacion: idRelacion,
                            tipo: tipo,
                            fecha: $("#fechaFacturaInput").val()
                        };
                    }

                    if (lineasFactura.length <= 1 && lineasFactura[0].concepto == "") {
                        //status.text("Introduzca al menos una línea de factura completa");
                    }
                    else {
                        $.post(url, datos, function (data) {
                            if (estadoPagina == "nueva") {
                                window.location.replace("../Facturas");
                            } else if (estadoPagina == "editar") {
                                estadoDetallesFactura();
                            }
                        });
                    }
            }
        }
    });

    // Cambio en unidades
    $("#facturaLineasFacturaGrid .k-grid-content .k-edit-cell .k-numerictextbox input").change(function () {
        obtenerTotalGrid();
    });
   

    // Añadir relación button
    $("#windowSelectButton").click(function () {
        var tab = $("#relacionesTab").data("kendoTabStrip").select().index();
        var grid = $("#relacionesTab .k-state-active .k-grid").data("kendoGrid");
        var uid = $("#relacionesTab .k-state-active .k-state-selected").attr("data-uid");
        var fila = grid.dataSource.getByUid(uid);

        switch (tab) {
            case 0: // Usuarios                
                tipo = "usuario";
                idRelacion = fila.idUsuario;
                $("#relacionDiv").html(fila.nickname);
                $("#conceptoFactura").val("Usuario: " + fila.nickname);
                break;
            case 1: // Eventos
                tipo = "evento";
                idRelacion = fila.idEvento;
                $("#relacionDiv").html(fila.Titulo);
                $("#conceptoFactura").val("Evento: " + fila.Titulo);
                break;
            case 2: // Cursillos
                tipo = "cursillo";
                idRelacion = fila.idCursillo;
                $("#relacionDiv").html(fila.Titulo);
                $("#conceptoFactura").val("Cursillo: " + fila.Titulo);
                break;
            case 3: // Pedidos globales
                tipo = "pedidoGlobal";
                idRelacion = fila.idPedidoGlobal;
                $("#relacionDiv").html(fila.Nombre);
                $("#conceptoFactura").val("Pedido global: " + fila.Nombre);
                break;
            case 4: // Pedidos socio
                tipo = "pedidoUsuario";
                idRelacion = fila.idPedidoUsuario;
                $("#relacionDiv").html("Pedido: " + fila.TituloPedido +" Usuario: " + fila.nickname);
                $("#conceptoFactura").val("Pedido: " + fila.TituloPedido +" Usuario: " + fila.nickname);
                break;           
            case 5:
                tipo = "empresa";
                idRelacion = fila.idEmpresa;
                $("#relacionDiv").html(fila.Nombre);
                $("#conceptoFactura").val("Empresa: " + fila.Nombre);
                break;
            case 6:
                tipo: "proveedor";
                idRelacion = fila.idProveedores;
                $("#relacionDiv").html(fila.Nombre);
                $("#conceptoFactura").val("Proveedor: " + fila.Nombre);
                break;
            case 7:
                tipo = "contrato";
                idRelacion = fila.idContrato;
                $("#relacionDiv").html("Contrato: " + fila.NombreEmpresa);
                $("#conceptoFactura").val("Contrato: " + fila.NombreEmpresa);
        }

        $("#relacionesWindow").data("kendoWindow").close();
        $("#relacionesButton").hide();
        $("#relacionesExistentesDiv").show();
        $("#quitarRelacionButton").show();

    });

    $("#quitarRelacionButton").click(function () {
        tipo = null;
        idRelacion = null;
        $("#relacionesExistentesDiv").hide();
        $("#quitarRelacionButton").hide();
        $("#relacionesButton").show();
    });

    datosVentana();
    ventanaLineaFactura();
}

/* ##############   VENTANA ########################################################################## */
function datosVentana() {
    // Window Relaciones    
    var numeroFilas = 8;
    $("#relacionesButton").click(function () {
        w = $("#relacionesWindow").data("kendoWindow");
        w.center();
        w.open();
    });

    $("#relacionesWindow").kendoWindow({
        width: "890px",
        title: "Relaciones",
        visible: false,
        modal: true
    });

    // Pestañas
    $("#relacionesTab").kendoTabStrip();

  

    // GRID usuarios
    dsUsuarios = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../Facturas/usuariosListado",
                dataType: "json",
                type: "POST"
            }
        },
        pageSize: numeroFilas
    });

    $("#usuariosFacturaGrid").kendoGrid({
        dataSource: dsUsuarios,
        columns: [
                {
                    field: "nickname",
                    title: "Usuario"
                }
            ],
        selectable: true,
        filterable: true,
        pageable: true
    });

    // GRID eventos
    dsEventos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../../Facturas/eventosListado",
                dataType: "json",
                type: "POST"
            }
        },
        pageSize: numeroFilas
    });

    $("#eventosFacturaGrid").kendoGrid({
        dataSource: dsEventos,
        columns: [
                {
                    field: "Titulo",
                    title: "Título"
                },
                {
                    field: "Lugar",
                    title: "Lugar"
                },
                {
                    field: "FechaRealizacion",
                    title: "Fecha de realización"
                }
            ],
        selectable: true,
        filterable: true,
        pageable: true
    });

    // GRID cursillos
    dsCursillos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../../Facturas/cursillosListado",
                dataType: "json",
                type: "POST"
            }
        },
        pageSize: numeroFilas
    });

    $("#cursillosFacturaGrid").kendoGrid({
        dataSource: dsCursillos,
        columns: [
                {
                    field: "Titulo",
                    title: "Título"
                },
                {
                    field: "Lugar",
                    title: "Lugar"
                },
                {
                    field: "FechaRealizacion",
                    title: "Fecha de realización"
                }
            ],
        selectable: true,
        filterable: true,
        pageable: true
    });

    // GRID pedidos globales
    dsPedidosGlobales = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../../Facturas/pedidosGlobalesListado",
                dataType: "json",
                type: "POST"
            }
        },
        pageSize: numeroFilas

    });
    $("#pedidosGlobalesGrid").kendoGrid({
        dataSource: dsPedidosGlobales,
        columns: [
                {
                    field: "idPedidoGlobal",
                    title: "idPedidoGlobal"
                },
                {
                    field: "Total",
                    title: "Total"
                }
            ],
        selectable: true,
        filterable: true,
        pageable: true
    });

    // GRID pedidos usuario
    var dsPedidosUsuario = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../../Facturas/pedidosUsuarioListado",
                dataType: "json",
                type: "POST"
            }
        },
        pageSize: numeroFilas

    });
    $("#pedidosUsuarioGrid").kendoGrid({
        dataSource: dsPedidosUsuario,
        columns: [
                {
                    field: "idPedidoUsuario",
                    title: "idPedidoUsuario"
                },
                {
                    field: "nickname",
                    title: "Usuario"
                }
            ],
        selectable: true,
        filterable: true,
        pageable: true
    });

   

        // GRID empresas
        dsEmpresas = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "../../../Facturas/empresasListado",
                    dataType: "json",
                    type: "POST"
                }
            },
            pageSize: numeroFilas
        });

        $("#empresasGrid").kendoGrid({
            dataSource: dsEmpresas,
            columns: [
            {
                field: "Nombre",
                title: "Nombre"
            },
            { 
                field: "CIF",
                title: "CIF"
            },
            {
                field: "Localidad",
                title: "Localidad"
            },
            {
                field: "Email",
                title: "Email"
            },
            {
                field: "Telefono",
                title: "Telefono"
            }
        ],
        selectable: true,
        filterable: true,
        pageable: true
        });

        // GRID proveedores
        dsProveedores = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "../../../Facturas/proveedoresListado",
                    dataType: "json",
                    type: "POST"
                }
            },
            pageSize: numeroFilas
        });

        $("#proveedoresGrid").kendoGrid({
            dataSource: dsProveedores,
            columns: [
            {
                field: "Nombre",
                title: "Nombre"
            },
            { field: "Mercado",
                title: "Mercado"
            },
            {
                field: "Direccion",
                title: "Dirección"
            }
            ],
            selectable: true,
            filterable: true,
            pageable: true
        });

        // GRID contratos
        dsContratos = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "../../../Facturas/contratosListado",
                    dataType: "json",
                    type: "POST"
                }
            },
            pageSize: numeroFilas
        });

        $("#contratosGrid").kendoGrid({
            dataSource: dsContratos,
            columns: [
            {
                field: "NombreEmpresa",
                title: "Empresa"
            },
            { field: "Descripcion",
                title: "Descripción"
            },
            {
                field: "FechaCreacion",
                title: "Fecha creación"
            },
            {
                field: "FechaCaducidad",
                title: "Fecha caducidad"
            },
            {
                field: "Importe",
                title: "Importe"
            }
        ],
            selectable: true,
            filterable: true,
            pageable: true
        });
    }

/* ##############   VENTANA LINEA FACTURA ####################################################### */
function ventanaLineaFactura()
{// Validación de campos
    
    validacionLinea = $("#lineaFacturaForm").kendoValidator().data("kendoValidator"),
    statusLinea = $("#statusLinea");
    wl = $("#lineaFacturaWindow").kendoWindow({
        width: "800px",
        title: "Línea factura",
        visible: false,
        modal: true
    }).data("kendoWindow");

    $("#unidadesLinea").kendoNumericTextBox({
        min:0,
        change: function(e){ actualizarTotalLinea() }
    });


    $("#precioLinea").kendoNumericTextBox({
        format: "c",
        decimals: 2,
        change:  function(e){ actualizarTotalLinea() }
    });

    // Botón nueva línea de factura
    $(".nuevaLineaFacturaButton").live("click", function() {
        idLineaFactura = null;
        idArticulo = null;
        editarLinea = false;
        $("#conceptoLinea").removeClass("k-state-disabled");
        $("#precioLinea").data("kendoNumericTextBox").enable(true);
        $("#quitarArticulo").hide();
        $("#articulosGrid").show();
        $("#agregarArticuloConcepto").show();
        $("#conceptoLinea").val("");
        $("#conceptoLinea").prop("disabled",false);
        $("#unidadesLinea").data("kendoNumericTextBox").value("");
        $("#precioLinea").data("kendoNumericTextBox").value("");
        wl.center();
        wl.open();
    });
    // Botón editar línea
    $("#facturaLineasFacturaGrid").delegate(".editarLineaFacturaButton", "click", function (e) {
        e.preventDefault();
        
        editarLinea = true;
        $("#conceptoLinea").removeClass("k-state-disabled");
        $("#conceptoLinea").prop("disabled",false);
        $("#precioLinea").data("kendoNumericTextBox").enable(true);

        var linea = tabla.dataItem($(this).closest("tr"));
        idLineaFactura = linea.idLineaFactura;
        if(linea.idArticulo != "")
        {
            $("#conceptoLinea").val(linea.concepto);
            $("#conceptoLinea").prop("disabled",true);
            $("#conceptoLinea").addClass("k-state-disabled");

            $("#quitarArticulo").show();
            $("#articulosGrid").hide();
            $("#agregarArticuloConcepto").hide();
        }
        else
        {
            $("#conceptoLinea").val(linea.concepto);
            $("#conceptoLinea").prop("disabled",false);
            $("#quitarArticulo").hide();
            $("#articulosGrid").show();
            $("#agregarArticuloConcepto").show();
            $("#conceptoLinea").removeClass("k-state-disabled");            
        }
        $("#unidadesLinea").data("kendoNumericTextBox").value(linea.unidades);
        $("#precioLinea").data("kendoNumericTextBox").value(linea.precio);
        var totalLinea = linea.unidades*linea.precio;
        $("#totalLinea").html(totalLinea+"€");
        wl.center();
        wl.open();
    });
    
    // Botón editar línea
    $("#facturaLineasFacturaGrid").delegate(".eliminarLineaFacturaButton", "click", function (e) {
        e.preventDefault();
        
        // Obtenemos la UID de la fila creada por KENDO
        var uid = $(this).closest("tr").attr("data-uid");        
        dataSource.remove(dataSource.getByUid(uid));
        tabla.refresh();
    });

    /*
    // Al pulsar en concepto
    $(".k-grid-content .k-grid-edit-row .k-edit-cell .k-textbox").click(function () {
        alert("Concpeto línea");
        w = $("#conceptoLineaFacturaWindow").data("kendoWindow");
        w.center();
        w.open();
    });
    */

     // GRID artículos
    dsArticulos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../../Facturas/articulosListado",
                dataType: "json",
                type: "POST"
            }
        }
    });

    $("#articulosGrid").kendoGrid({
        dataSource: dsArticulos,
        width: 100,
        columns: [
            {
                field: "Nombre",
                title: "Nombre"
            },
            {   
                field: "Precio",
                title: "Precio"
            }
        ],
            selectable: true
    });

    $("#agregarArticuloConcepto").click(function (){
            var uid = $("#articulosGrid .k-state-selected").attr("data-uid");
            var articulo = $("#articulosGrid").data("kendoGrid").dataSource.getByUid(uid);
            
            $("#conceptoLinea").val(articulo.Nombre);
            $("#conceptoLinea").prop("disabled",true);
            $("#precioLinea").data("kendoNumericTextBox").value(articulo.Precio);
            $("#precioLinea").data("kendoNumericTextBox").enable(false);
            actualizarTotalLinea();
            idArticulo = articulo.idArticulo;
            $("#quitarArticulo").show();
            $("#articulosGrid").hide();
            $("#agregarArticuloConcepto").hide();
            $("#conceptoLinea").addClass("k-state-disabled");
    });

    $("#quitarArticulo").click(function(){
        idArticulo = null;
        $("#conceptoLinea").val("");
        $("#conceptoLinea").removeClass("k-state-disabled");
        $("#conceptoLinea").addClass("k-input");
        $("#conceptoLinea").prop("disabled",false);
        $("#precioLinea").data("kendoNumericTextBox").value(0);
        $("#precioLinea").data("kendoNumericTextBox").enable(true);
        $("#unidadesLinea").data("kendoNumericTextBox").value(0);
        $("#quitarArticulo").hide();
        $("#articulosGrid").show();
        $("#agregarArticuloConcepto").show();

        actualizarTotalLinea();
    });

    $("#descartarLinea").click(function() {
        idArticulo = null;
        wl.close();
    });
    
    $("#agregarLinea").click(function() {
        var conceptoLinea = $("#conceptoLinea").val();
        var unidades = $("#unidadesLinea").val();
        var precio = $("#precioLinea").val();
        
        if(!validacionLinea.validate())
        {
            //statusLinea.text("Rellene todos los campos").addClass("invalid");            
        }
        else
        {
            if(idLineaFactura == null && editarLinea == false )     // Nueva línea
            {
                var linea = {
                    concepto: conceptoLinea,
                    unidades: unidades*1,
                    precio: precio*1,
                    total: precio * unidades
                };
                if(idArticulo == null){ linea.idArticulo = "";}
                else{ linea.idArticulo = idArticulo;}
                dataSource.add(linea);
            }
            else   // Linea editada
            {
                var uid = $("#facturaLineasFacturaGrid .k-state-selected").attr("data-uid");
                var linea = dataSource.getByUid(uid);
                linea.concepto = conceptoLinea;
                linea.unidades = unidades * 1;
                linea.precio = precio* 1;
                linea.total = precio * unidades;
                if(idArticulo == null){ linea.idArticulo = "";}
                else {linea.idArticulo = idArticulo;}
                
                /*
                dataSource.add(linea);
                dataSource.remove(dataSource.getByUid(uid));
                console.log("UID: "+uid);
                alert(uid);
                */
            }

            tabla.refresh();
            obtenerTotalGrid();
            wl.close();
        }
    });

    
}

/* ##############    AUXILIARES ###################################################################### */
function comprobarNecesariosLinea()
{
        var noHayErrores = true;
        $(".requeridosLinea").each(function(index){
            if($(this).val()==""){
                $(this).addClass("k-invalid"); 
                noHayErrores = false;
            }
        });   
        return noHayErrores;    
}
function actualizarTotalLinea()
    {
        var u = $("#unidadesLinea").data("kendoNumericTextBox").value();
        var p = $("#precioLinea").data("kendoNumericTextBox").value();
        var t = u * p;
        $("#totalLinea").html(t+"€");
    }

function obtenerTotalGrid() {
    var totalLinea = 0;
    total = 0;
    var lineasFacturaRaw = $("#facturaLineasFacturaGrid").data("kendoGrid").dataSource.view();
    for (var i = 0; i < lineasFacturaRaw.length; i++)
    {
        totalLinea = lineasFacturaRaw[i].unidades * lineasFacturaRaw[i].precio;
        lineasFacturaRaw[i].total = totalLinea;
        total = total + totalLinea;
        tabla.refresh();
    }
    actualizarTotal(total, (total * 1.18));
}

function actualizarTotal(bi, t) {
    $("#baseImponibleNumero").html(bi+" €");
    $("#totalFacturaNumero").html(t+" €");
}

function volverAtras() {
    if(estadoPagina == "editar" && vieneDeDetalles)
    {
        estadoDetallesFactura();
    }
    else 
    {
        history.back();
    }
}

function emptyGrid()
{
    if (this.total() > 0) return; // continue only for empty grid
    var msg = this.options.emptyMsg;
    if (!msg) msg = 'No existen filas para mostrar'; // Default message
    $(this.options.table).parent().html('<div class="empty-grid">' + msg + '</div>');
       
}