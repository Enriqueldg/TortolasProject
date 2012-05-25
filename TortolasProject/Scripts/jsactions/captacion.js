/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {

    var estadisticas = {};
    var descuentoBasico = null;
    var descuentoAntiguo = null;

    $("#graficas").kendoTabStrip();
    $("#graficasSocios").kendoTabStrip();

    $.ajax({
        url: "../Socios/administrarDescuentosSocio",
        type: "POST",
        async: false,
        success: function (descuentosRespuesta) {
            descuentos = descuentosRespuesta;
            if (descuentos[0].Nombre == "Basico") {
                descuentoBasico = descuentos[0].Cantidad;
                descuentoAntiguo = descuentos[1].Cantidad;
            }
            else {
                descuentoBasico = descuentos[1].Cantidad;
                descuentoAntiguo = descuentos[0].Cantidad;
            }
        }
    });


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

    $(".numeric").kendoNumericTextBox({
        format: "c0",
        min: 0
    });

    $("#comboTipoSocio").kendoDropDownList({
        dataValueField: "valor",
        dataTextField: "texto",
        dataSource: [{ texto: "Basico", valor: "Basico" }, { texto: "Antiguo", valor: "Antiguo"}]
    });

    $("#generarResultado").click(function () {
        var valorMaterial = $("#dineroMaterial").data("kendoNumericTextBox").value();
        var valorEventos = $("#dineroEventos").data("kendoNumericTextBox").value();
        var total = valorEventos + valorMaterial;
        var resultado = 0;

        var tipo = $("#comboTipoSocio").data("kendoDropDownList").value();

        if (tipo == "Basico") {
            
            resultado =((total * descuentoBasico) / 100);

        }
        else {
            resultado = ((total * descuentoAntiguo) / 100);
        }

        $("#resultado").html("Te ahorras "+resultado+" &euro;");
    });

});
       