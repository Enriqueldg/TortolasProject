﻿var maxacompa;
var idEvento = null;

$(document).ready(function () {

    var datasource = new kendo.data.DataSource
    ({
        transport:
        {
            read:
            {
                url: "Eventos/LeerTodos",
                datatype: "json",
                type: "POST"
            }
        },
        schema:
        {
            model:
            {
                id: "idEvento"
            }
        }
    });
    var tablaevento = $("#Eventostabla").kendoGrid({
        dataSource: datasource,
        toolbar: kendo.template($("#templateToolbarEvento").html()),
        sortable: true,
        pageable: true,
        selectable: true,
        filterable: true,
        columns: [
                    {
                        field: "Titulo",
                        text: "Titulo",
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
                        field: "Lugar",
                        text: "Lugar",
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
                        field: "FechaRealizacion",
                        text: "Fecha",
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
                        field: "Plazas",
                        text: "Plazas",
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
                        title: "Herramientas",
                        width: "200px",
                        command: [{ text: "Editar", className: "botonEditarFila" }, { text: "Eliminar", className: "botonEliminarFila" }, { text: "Inscribirse", className: "botonInscripcion"}]
                    }

        ],
        detailTemplate: kendo.template($("#template").html()),
        detailInit: inicializarDetalles
    });

    //............................................VENTANAS POP-UP...............................................

    var windowEditar = $("#VentanaEditar").kendoWindow
    ({
        title: "Editar",
        modal: true,
        visible: false,
        resizable: false
    }).data("kendoWindow");

    var windowInscripcion = $("#VentanaInscripcion").kendoWindow
    ({
        title: "Inscripcion",
        modal: true,
        visible: false,
        resizable: false
    }).data("kendoWindow");

    // ..........................FUNCIONES..............................

    $("#editor").kendoEditor();

    var valoresComboPrioridad = [{ texto: "No", valor: false },{ texto: "Si", valor: true }];

    $("#PrioridadSocios").kendoDropDownList({
        dataTextField: "texto",
        dataValueField: "valor",
        dataSource: valoresComboPrioridad
    });

    $("#AcompanantesDropdown").kendoDropDownList({
        dataTextField: "texto",
        dataValueField: "valor",
        dataSource: valoresComboPrioridad,
        select: function (e) {
            var numacompa = this.dataItem(e.item.index());
            if (numacompa.valor == true) {
                $("#Acompanantes").kendoNumericTextBox({
                    min: 1,
                    max: maxacompa,
                    step: 1,
                    format:"0"
                });
                $("#NumeroAcompa").show();
            }
            else {
                $("#NumeroAcompa").hide();
            }
        }
    });
    $("#NumeroAcompa").hide();

    $("#FechaRealizacion").kendoDatePicker({

        format: "dd/MM/yyyy"
    });


    $("#FechaAperturaInscrip").kendoDatePicker({

        format: "dd/MM/yyyy"
    });


    $("#FechaLimiteInscrip").kendoDatePicker({

        format: "dd/MM/yyyy"
    });

    $("#botonCrearEvento").live("click", function () {

        $.ajax({
            url: "Eventos/cargarVistaCrearEvento",
            type: "POST",
            success: function (data) {
                $("#Eventostabla").hide();
                $("#FormularioCreacion").html(data);
                $("#FormularioCreacion").show();
                $("#editor").kendoEditor();



                $("#FechaRealizacion").kendoDatePicker({

                    format: "dd/MM/yyyy"
                });
                $("#FechaAperturaInscrip").kendoDatePicker({

                    format: "dd/MM/yyyy"
                });
                $("#FechaLimiteInscrip").kendoDatePicker({

                    format: "dd/MM/yyyy"
                });




                var valoresComboPrioridad = [
                        { texto: "Si", valor: true },
                        { texto: "No", valor: false }

                    ];

                $("#PrioridadSocios").kendoDropDownList({
                    dataTextField: "texto",
                    dataValueField: "valor",
                    dataSource: valoresComboPrioridad
                });
            }

        });


    });

    $(".botonEditarFila").live("click", function () {

        var fila = $("#Eventostabla").find("tbody tr.k-state-selected");

        var filajson = $("#Eventostabla").data("kendoGrid").dataItem(fila).toJSON();
        idEvento = datasource.getByUid(fila.attr("data-uid")).idEvento;

        $("#Titulo").val(filajson.Titulo);
        $("#Lugar").val(filajson.Lugar);
        $("#FechaRealizacion").data("kendoDatePicker").value(filajson.FechaRealizacion);
        $("#FechaAperturaInscrip").data("kendoDatePicker").value(filajson.FechaAperturaInscripcion);
        $("#FechaLimiteInscrip").data("kendoDatePicker").value(filajson.FechaLimiteInscripcion);
        $("#Plazas").val(filajson.Plazas);
        $("#NumAcompa").val(filajson.NumAcompa);

        $("#PrioridadSocios").data("kendoDropDownList").value((filajson.PrioridadSocios));
        $("#editor").data("kendoEditor").value((filajson.Actividad));

        windowEditar.center();
        windowEditar.open();
    });

    $("#BotonCancelarVentanaEditar").live("click", function () {
        windowEditar.close();
        $("#Eventostabla").show();
    });

    $("#BotonCancelarInscripcion").live("click", function () {
        windowInscripcion.close();
        $("#Eventostabla").show();
    });


    $("#BotonCancelarFormularioCrear").live("click", function () {
        $("#FormularioCreacion").hide();
        $("#Eventostabla").show();

    });

    $("#BotonAceptarFormularioCrear").live("click", function () {
        var datos = {};

        datos["TituloUpdate"] = $("#Titulo").val();
        datos["LugarUpdate"] = $("#Lugar").val();
        datos["FechaRealizacionUpdate"] = $("#FechaRealizacion").val();
        datos["FechaAperturaInscripUpdate"] = $("#FechaAperturaInscrip").val();
        datos["FechaLimiteInscripUpdate"] = $("#FechaLimiteInscrip").val();
        datos["PlazasUpdate"] = $("#Plazas").val();
        datos["NumAcompaUpdate"] = $("#NumAcompa").val();
        datos["PrioridadSociosUpdate"] = $("#PrioridadSocios").val();
        datos["ActividadUpdate"] = $("#editor").data("kendoEditor").value();


        $.ajax(
        {
            url: "Eventos/CreateEvento",
            type: "POST",
            data: datos,
            success: function () {
                datasource.read();
                $("#FormularioCreacion").hide();
                $("#Eventostabla").show();
            }
        });

    });

    $("#BotonAceptarInscripcion").click(function () {
        var datos = {};

        datos["numacompa"] = 0;
        if (!$("#AcompanantesDropdown").data("kendoDropDownList").value()) {
            datos["numacompa"] = $("#Acompanantes").val();
        }
        datos["idEvento"] = idEvento;
        $.ajax(
        {
            url: "Eventos/InscripcionEvento",
            type: "POST",
            data: datos,
            success: function () {
                datasource.read();
                windowInscripcion.close();
            }
        });
    });

    $("#BotonAceptarVentanaEditar").click(function () {
        var datos = {};

        datos["TituloUpdate"] = $("#Titulo").val();
        datos["LugarUpdate"] = $("#Lugar").val();
        datos["FechaRealizacionUpdate"] = $("#FechaRealizacion").val();
        datos["FechaAperturaInscripUpdate"] = $("#FechaAperturaInscrip").val();
        datos["FechaLimiteInscripUpdate"] = $("#FechaLimiteInscrip").val();
        datos["PlazasUpdate"] = $("#Plazas").val();
        datos["NumAcompaUpdate"] = $("#NumAcompa").val();
        datos["PrioridadSociosUpdate"] = $("#PrioridadSocios").val();
        datos["ActividadUpdate"] = $("#editor").data("kendoEditor").value();
        datos["idEvento"] = idEvento;

        $.ajax(
        {
            url: "Eventos/UpdateEvento",
            type: "POST",
            data: datos,
            success: function () {
                datasource.read();
                windowEditar.close();
            }
        });
    });


    function inicializarDetalles(e) {

        var detailRow = e.detailRow;

        detailRow.find(".detallesEventosPestanas").kendoTabStrip({
            animation: {
                open: { effects: "fadeIn" }
            }
        });
    }

    $(".botonInscripcion").live("click", function () {

        var fila = $("#Eventostabla").data("kendoGrid").select();
        var filaJson = $("#Eventostabla").data("kendoGrid").dataItem(fila).toJSON(); // La pasamos a JSON

        var Evento = datasource.getByUid(fila.attr("data-uid"));
        var Titulo = Evento.Titulo;
        idEvento = Evento.idEvento;
        var Precio = Evento.Precio;
        maxacompa = Evento.NumAcompa;

        $("#TituloEventoInscripcion").text(Titulo);
        $("#PrecioEventoInscripcion").text(Precio);

        $("#acompaWrapper").empty();
        $("#acompaWrapper").html('<div id="NumeroAcompa"><label> Número de acompañantes: </label><input id="Acompanantes" /></div>');
        $("#AcompanantesDropdown").data("kendoDropDownList").select(0);

        $("#Acompanantes").kendoNumericTextBox({
            
            min: 1,
            max: maxacompa,
            step: 1,
            format:"0"
        });

        $("#NumeroAcompa").hide();

        windowInscripcion.center();
        windowInscripcion.open();
    });

    $(".botonEliminarFila").live("click", function () {

        var fila = $("#Eventostabla").data("kendoGrid").select(); // Cogemos la fila seleccionada
        var filaJson = $("#Eventostabla").data("kendoGrid").dataItem(fila).toJSON(); // La pasamos a JSON

        var idEvento = datasource.getByUid(fila.attr("data-uid")).idEvento;

        $.ajax({
            url: "Eventos/eliminarEvento",
            type: "POST",
            data: { idEvento: idEvento },
            success: function () {
                datasource.read();
            }
        });
    });
});