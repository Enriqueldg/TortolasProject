var dataSource;
var tabla;
var w;
var filtrosVentana;
var estado; // { Nuevo, editar, detalles}
$(document).ready(function () {

    // DataSource KENDO
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/leerMovimientos",
                dataType: "json",
                type: "POST"
            }
        },
        schema:
            {
                model:
                {
                    id: "idMovimiento",
                    fields:
                    {
                        Concepto: { editable: true, filterable: true },
                        Fecha: { editable: true, filterable: true },
                        Total: { editable: true, type: "number", filterable: true },
                        ResponsableName: { editable: false, filterable: true },
                        Descripcion: { editable: true, filterable: false },
                        NumMovimiento: { filterable: false },
                        Saldo: { filterable: false }
                    }
                }
            }
    });

    // Tabla de facturas
    tabla = $("#MovimientosGrid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        toolbar: [
                    { text: "Nuevo movimiento", className: "nuevoMovimiento" },
                    { text: "Ingresos", className: "ingresosButton" },
                    { text: "Gastos", className: "gastosButton" },
                    { text: "Más filtros", className: "filtrosVentanaButton" },
                    { text: "Quitar filtros", className: "limpiarButton" }
                ],
        columns: [
            {
                field: "NumMovimiento",
                title: "Núm. Movimiento"
            },
            {
                field: "Fecha",
                title: "Fecha"
            },
            {
                field: "ResponsableName",
                title: "Responsable"
            },
            {
                field: "Concepto",
                title: "Concepto"
            },
            {
                field: "Total",
                title: "Importe"
            },
            {
                field: "Saldo",
                title: "Saldo"
            }
        ]
    }).data("kendoGrid");


    $("#MovimientosVentana").kendoWindow({
        title: "Movimiento",
        width: "600px",
        visible: false,
        modal: true
    });
    w = $("#MovimientosVentana").data("kendoWindow");

    $("#FiltrosVentana").kendoWindow({
        title: "Filtros",
        width: "600px",
        visible: false,
        modal: true
    });
    filtrosVentana = $("#FiltrosVentana").data("kendoWindow");

    $("#fechaMovimiento").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });
    $("#totalMovimiento").kendoNumericTextBox({
        format: "c",
        decimals: 3
    });
    $(".nuevoMovimiento").click(function () {
        w.center();
        w.open();
    });
    $(".ingresosButton").click(function () {
        dataSource.filter({ field: "Total", operator: "gte", value: 0 });
    });
    $(".gastosButton").click(function () {
        dataSource.filter({
            field: "Total", operator: "lt", value: 0
        });
    });
    $(".filtrosVentanaButton").click(function () {
        filtrosVentana.center();
        filtrosVentana.open();
    });
    $(".limpiarButton").click(function () {
        dataSource.filter({});
    });
    $("#MovimientosGrid").delegate(".editarMovimientoButton", "click", function (e) {
        e.preventDefault();
        var movimiento = tabla.dataItem($(this).closest("tr"));

    });
    $("#guardarMovimiento").click(function () {
        var fecha = $("#fechaMovimiento").val();
        var concepto = $("#conceptoMovimiento").val();
        var descripcion = $("#descripcionMovimiento").val();
        var total = $("#totalMovimiento").data("kendoNumericTextBox").value();
        var url = "../Facturas/nuevoMovimiento";
        var datos = {
            fecha: fecha,
            concepto: concepto,
            descripcion: descripcion,
            total: total
        };

        $.post(url, datos, function (data) {
            dataSource.read();
            tabla.refresh();
            w.close();
        });

    });
    $("#descartarMovimiento").click(function () {
        limpiarCampos();
        w.close();
    });
    $(".k-grid-content tr").live("click", function () {
        // Obtenemos la UID de la fila creada por KENDO
        var uid = $(this).attr("data-uid");

        // Obtenemos la fila
        var fila = dataSource.getByUid(uid);

        // Llamamos a la función para ver los detalles de la factura
        leerMovimiento(fila.idMovimiento);
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
    $("#filtrarButton").click(function () {
        var fechaInicial = $("#fechaInicial").val();
        var fechaFinal = $("#fechaFinal").val();
        var concepto = $("#concepto").val();
        var responsable = $("#responsable").val();
        if (fechaInicial != "" && fechaFinal != "") {
            if (Date.parse(fechaInicial) < Date.parse(fechaFinal)) {
                dataSource.filter([
                    { field: "Fecha", operator: "gte", value: fechaInicial },
                    { field: "Fecha", operator: "lte", value: fechaFinal }
                ]);
            }
        }
        if (responsable != null) {
            dataSource.filter([
                { field: "ResponsableName", operator: "contains", value: responsable }
            ]);
        }
        if (concepto != null) {
            dataSource.filter([
                { field: "Concepto", operator: "contains", value: concepto }
            ]);
        }



        filtrosVentana.close();
        tabla.refresh();
    });

});

function leerMovimiento(idMovimiento) {

    var url = "../Facturas/leerMovimiento/" + idMovimiento;
    location.replace(url);
}
    

function limpiarCampos() {
    $("#fechaMovimiento").data("kendoDatePicker").value("");
    $("#totalMovimiento").data("kendoNumericTextBox").value("");
    $("#conceptoMovimiento").val("");
    $("#descripcionMovimiento").val("");
}