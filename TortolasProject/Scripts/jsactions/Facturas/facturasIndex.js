var ventanaFiltros;
var dataSource;
var tabla;
$(document).ready(function () {

    // DataSource KENDO
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "Facturas/leerTodos",
                dataType: "json",
                type: "POST"
            }
        },
        schema:
            {
                model:
                {
                    id: "idFactura",
                    fields:
                    {
                        numFactura: {},
                        concepto: {},
                        estado: {},
                        estadoNombre: {},
                        total: { type: "currency" },
                        juntaDirectiva: {},
                        fecha: {},
                        FKUsuario: {},
                        FKCodigoEmpresa: {},
                        FKContrato: {},
                        FKCursillo: {},
                        FKEventoOficial: {},
                        FKProveedores: {},
                        FKPedidoGlobal: {},
                        FKPedidoUsuario: {}
                    }
                }
            }
    });
    // Tabla de facturas
    tabla = $("#FacturasGrid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        pageable: true,
        toolbar: kendo.template($("#toolbarTemplate").html()),
        columns: [
            {
                field: "numFactura",
                title: "Núm. factura"
            },
            {
                field: "fecha",
                title: "Fecha"
            },
            {
                field: "concepto",
                title: "Concepto"
            },
            {
                field: "total",
                title: "Total"
            },
            {
                field: "estadoNombre",
                title: "Estado factura"
            }
        ]
    }).data("kendoGrid");

    $(".pageSizeDropDown").kendoDropDownList({
        width: "50px",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
                        { text: "10", value: "10" },
                        { text: "30", value: "30" },
                        { text: "50", value: "50" }
                    ],
        index: 0,
        change: function () {
            var value = this.value();
            dataSource.pageSize(value);
            tabla.refresh();
        }
    });

    $(".nuevaFacturaButton").click(function () {
        location.replace("../Facturas/nuevaFactura");
    });

    $(".ingresosButton").click(function () {
        dataSource.filter({ field: "total", operator: "gte", value: 0 });
    });

    $(".gastosButton").click(function () {
        dataSource.filter({ field: "total", operator: "lt", value: 0 });
    });

    $(".pendientesButton").click(function () {
        dataSource.filter({ field: "estadoNombre", operator: "eq", value: "Pendiente" });
    });

    $(".limpiarButton").click(function () {
        dataSource.filter({});
    });

    $("#FacturasGrid .k-grid-content tr").live("click", function () {
        // Obtenemos la UID de la fila creada por KENDO
        var uid = $(this).attr("data-uid");

        // Obtenemos la fila
        var fila = dataSource.getByUid(uid);

        // Llamamos a la función para ver los detalles de la factura
        leerFactura(fila.idFactura);
    });

    datosVentana();
});

function leerFactura(idFactura) {

    var url = "../Facturas/leerFactura/" + idFactura;
    location.replace(url);
}

function datosVentana() {
    var numeroFilas = 8;
    // Window Relaciones
    $(".ventanaFiltrosButton").click(function () {
        ventanaFiltros.center();
        ventanaFiltros.open();
    });

    ventanaFiltros = $("#filtrosVentana").kendoWindow({
        width: "890px",
        title: "Filtros",
        visible: false,
        modal: true
    }).data("kendoWindow");

    // Pestañas
    $("#relacionesTab").kendoTabStrip();

    $("#filtrarButton").click(function () {
        var tab = $("#relacionesTab").data("kendoTabStrip").select().index();
        if (tab != 0) {
            var grid = $("#relacionesTab .k-state-active .k-grid").data("kendoGrid");
            var uid = $("#relacionesTab .k-state-active .k-state-selected").attr("data-uid");
            var fila = grid.dataSource.getByUid(uid);
        }
        dataSource.filter({});

        switch (tab) {
            case 0: // Opciones generales                
                filtrosGenerales();
                break;
            case 1: // Usuarios                
                dataSource.filter([
                     { field: "FKUsuario", operator: "eq", value: fila.idUsuario }
                ]);
                break;
            case 2: // Eventos
                dataSource.filter([
                     { field: "FKEventoOficial", operator: "eq", value: fila.idEvento }
                ]);
                break;
            case 3: // Cursillos
                dataSource.filter([
                     { field: "FKCursillo", operator: "eq", value: fila.idCursillo }
                ]);
                break;
            case 4: // Pedidos globales
                idRelacion = fila.idPedidoGlobal;
                break;
            case 5: // Pedidos socio
                idRelacion = fila.idPedidoUsuario;
                break;
            case 6:
                dataSource.filter([
                     { field: "FKCodigoEmpresa", operator: "eq", value: fila.idEmpresa }
                ]);
                break;
            case 7:
                dataSource.filter([
                     { field: "FKProveedores", operator: "eq", value: fila.idProveedores }
                ]);
                break;
            case 8:
                dataSource.filter([
                     { field: "FKContrato", operator: "eq", value: fila.idContrato }
                ]);
        }
        tabla.refresh();
        ventanaFiltros.close();
    });   

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
        pageable:true
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
        pageable: true,
        pageSize: numeroFilas
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
        pageSize:numeroFilas
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
        pageable: true,
        pageSize: numeroFilas
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
            { field: "CIF",
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
        pageSize:numeroFilas
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

    $("#fechaInicial").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

    $("#fechaFinal").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });
}

function filtrosGenerales() {
    var fechaInicial = $("#fechaInicial").val();
    var fechaFinal = $("#fechaFinal").val();

    if (fechaInicial != "" && fechaFinal != "") {
        if (Date.parse(fechaInicial) < Date.parse(fechaFinal)) 
        {
            dataSource.filter([
                    { field: "fecha", operator: "gte", value: Date.parse(fechaInicial) },
                    { field: "fecha", operator: "lte", value: Date.parse(fechaFinal) }
                ]);
        }
    }
    if ( $(".filtroUsuarios").attr("checked") == "checked") {
        dataSource.filter([
                     { field: "FKUsuario", operator: "neq", value: "" }
                    ]);
    }
    if ($(".filtroEventos").attr("checked") == "checked") {
        dataSource.filter([
                     { field: "FKEventoOficial", operator: "neq", value: "" }
                    ]);
    }
    if ($(".filtroCursillos").attr("checked") == "checked") {
        dataSource.filter([
                     { field: "FKCursillos", operator: "neq", value: "" }
                    ]);
    }
    if ($(".filtroPedidoGlobal").attr("checked") == "checked") {
        dataSource.filter([
                     { field: "FKPedidoGlobal", operator: "neq", value: "" }
                    ]);
    }
    if ($(".filtroPedidoUsuario").attr("checked") == "checked") {
        dataSource.filter([
                     { field: "FKPedidoUsuario", operator: "neq", value: "" }
                    ]);
    }
    if ($(".filtroEmpresa").attr("checked") == "checked") {
        dataSource.filter([
                     { field: "FKEmpresa", operator: "neq", value: "" }
                    ]);
    }
    if ($(".filtroProveedor").attr("checked") == "checked") {
        dataSource.filter([
                     { field: "FKProveedor", operator: "neq", value: "" }
                    ]);
    }
    if ($(".filtroContrato").attr("checked") == "checked") {
        dataSource.filter([
                     { field: "FKContrato", operator: "neq", value: "" }
        ]);
    }

}