var grafica;
var options;
var dataSource;
var dataSourceFechas;
var datos;
$(document).ready(function () {
    inicializar();
    inicializarGrafica();
});
function inicializar() {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/todosIngresosGastos",
                dataType: "json",
                type: "POST"
            }
        },
        schema: {
                model: {
                    fields: {
                        fecha: {  },
                        ingresos: { type: "number"},
                        gastos: { type: "number" }
                    }
                }
            },
    });

    $("#fechaInicio").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });
    $("#fechaFinal").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

    $("#gastos").click(function () {
        var titulo = "Gastos";
        var series = [{
            field: "gastos",
            name: "Gastos",
            color: "red"
        }];

        jQuery.removeData("#grafica", "kendoChart");
        $("#grafica").empty();
        graficaTodos(titulo, series);
    });

    $("#ingresos").click(function () {
        var titulo = "Ingresos";
        var series = [{
            field: "ingresos",
            name: "Ingresos",
            color: "blue"
        }];
        jQuery.removeData("#grafica", "kendoChart");
        $("#grafica").empty();
        graficaTodos(titulo, series);
    });

    $("#todos").click(function () {
        var titulo = "Contabilidad";
        var series = [
        {
            field: "ingresos",
            name: "Ingresos",
            color: "blue"
        },
        {
            field: "gastos",
            name: "Gastos",
            color: "red"
        }];
        jQuery.removeData("#grafica", "kendoChart");
        $("#grafica").empty();
        dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/todosIngresosGastos",
                dataType: "json",
                type: "POST"
            }
        },
        schema: {
                model: {
                    fields: {
                        fecha: {  },
                        ingresos: { type: "number"},
                        gastos: { type: "number" }
                    }
                }
            },
    });
    dataSource.read();    
    graficaTodos(titulo, series);
    });

    $("#filtrarFecha").click(function () {
        var url = "../Facturas/periodoIngresosGastos";
        var datosPeriodo = {
            inicial: $("#fechaInicio").val(),
            final: $("#fechaFinal").val()
        };
        dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: url,
                    data: datosPeriodo,
                    dataType: "json",                    
                    type: "POST"
                }
            },
            schema: {
                    model: {
                        fields: {
                            fecha: {  },
                            ingresos: { type: "number"},
                            gastos: { type: "number" }
                        }
                    }
                }
        });

        var titulo = "Contabilidad";
        var series = [{
            field: "gastos",
            name: "Gastos",
            color: "red"
        }, {
            field: "ingresos",
            name: "Ingresos",
            color: "blue"
        }];
        jQuery.removeData("#grafica", "kendoChart");
        $("#grafica").empty();
        graficaTodos(titulo,series);
    });
       
}

function inicializarGrafica() {
    var titulo = "Contabilidad";
    var series = [{
        field: "gastos",
        name: "Gastos",
        color: "red"
    }, {
        field: "ingresos",
        name: "Ingresos",
        color: "blue"
    }];
    jQuery.removeData("#grafica", "kendoChart");
    $("#grafica").empty();
    graficaTodos(titulo, series);
    
}
function graficaTodos(titulo,series){
    grafica = $("#grafica").kendoChart({
        theme: $(document).data("kendoSkin") || "default",
        height: 200,
        chartArea: 
        {                
            height: 400,
        },
        dataSource: dataSource,
        title: {
            text: titulo
        },
        legend: {
            position: "top"
        },
        seriesDefaults: {
            type: "line"
        },
        series: series
        ,
        categoryAxis: {
            field: "fecha"            
        },
        valueAxis: {
            labels: {
                format: "{0:N0}"
            }
        },
        tooltip: {
            visible: true,
            template: "#= category # <br /> <b>#= series.name #</b> #= value  #€"
        }
    }).data("kendoChart");
}
