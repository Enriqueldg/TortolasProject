/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {

    var estadisticas = {};

    $("#graficas").kendoTabStrip();
    $("#graficasSocios").kendoTabStrip();

    dataSourceAltas = new kendo.data.DataSource({
        transport: {
            read: {
                url: "estadisticasAltas",
                dataType: "json",
                type: "POST"
            }
        },
        schema: {
            model: {
                fields: {
                    anno: {},
                    altas: { type: "number" }
                }
            }
        }
    });

    dataSourceNumeroSocios = new kendo.data.DataSource({
        transport: {
            read: {
                url: "estadisticasNumeroSocios",
                dataType: "json",
                type: "POST"
            }
        },
        schema: {
            model: {
                fields: {
                    nombre: {},
                    porcentaje: { type: "number" }
                }
            }
        }
    });

    var FechaHoy = new Date();
    var Anno = FechaHoy.getFullYear();
    dataSourceEventos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "estadisticasEventos",
                dataType: "json",
                data: { Anno: Anno },
                type: "POST"
            }

        }
    });
    dataSourceEventos.read();
    $("#graficaAltas").kendoChart({
        dataSource: dataSourceAltas,
        title: {
            text: "Altas de Usuarios"
        },
        seriesDefaults: {
            type: "line"
        },
        legend: {
            position: "bottom"
        },
        series: [{
            field: "altas",
            name: "Altas"
        }],
        categoryAxis: {
            field: "anno"
        }
    });

    $.ajax({
        url: "numeroSocios",
        type: "POST",
        async: false,
        success: function (respuesta) {
            $("#numeroDeSocios").append(respuesta);
        }
    });



    $("#graficaNumeroSocio").kendoChart({
        dataSource: dataSourceNumeroSocios,
        title: {
            text: "Estado de Socios actuales"
        },
        seriesDefaults: {
            type: "pie",
            labels: {
                visible: true,
                format: "{0}%"
            }
        },
        legend: {
            position: "bottom",
            template: "#= nombre #"
        },
        series: [{
            field: "porcentaje",
            name: "nombre",
            categoryField: "nombre"
        }],
        categoryAxis: {
            field: "nombre"
        },
        tooltip: {
            visible: true,
            template: "${ category } <br> #= value# %"

        }
    });

/*
    $("#graficaEventos").kendoChart({
        dataSource: dataSourceEventos,
        title: {
            text: "Estado de Socios actuales"
        },
        seriesDefaults: {
            type: "pie",
            labels: {
                visible: true,
                format: "{0}%"
            }
        },
        legend: {
            position: "bottom",
            template: "#= nombre #"
        },
        series: [{
            field: "porcentaje",
            name: "nombre",
            categoryField: "nombre"
        },
        {
            field: "",
            name: "nombre",
            categoryField: "nombre"
        }
        ],
        categoryAxis: {
            field: "nombre"
        },
        tooltip: {
            visible: true,
            template: "${ category } <br> #= value# %"

        }
    });*/
    
});
       