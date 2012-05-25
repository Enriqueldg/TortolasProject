
    var tablaCuotas = $("#tablaCuotas").width(250).kendoGrid({
                    dataSource: {
                        transport: {
                            type: "json",
                            read: {
                                url: "Socios/administrarCuotas",
                                data : { clase:"Cuota" },
                                type: "POST",
                                dataType: "json"
                            },
                            pageSize: 15
                        }
                    },
                    sortable: true,
                    selectable: true,
                    toolbar: kendo.template($("#templateToolbarAdminCuotas").html()),
                    change: function () {
                        var record = this.dataSource.getByUid(this.select().data("uid"));        
                        $("#numericCuota").data("kendoNumericTextBox").value(record.Precio);
                    },
                    columns: [
                            {
                                field: "Nombre",
                                title: "Nombre",
                                width: 100
                            },
                            {
                                field: "Precio",
                                title: "Precio",
                                width: 100
                            }
                    ]
    });

    var tablaDescCuotas = $("#tablaDescCuotas").width(420).kendoGrid({
        dataSource: {
            transport: {
                type: "json",
                read: {
                    url: "Socios/administrarCuotas",
                    data: { clase: "Descuento" },
                    type: "POST",
                    dataType: "json"
                },
                pageSize: 15
            }
        },
        sortable: true,
        selectable: true,
        toolbar: kendo.template($("#templateToolbarAdminDescCuotas").html()),
        change: function () {
            var record = this.dataSource.getByUid(this.select().data("uid"));
            $("#numericDescCuota").data("kendoNumericTextBox").value(record.Precio);
            $("#numericMeses").data("kendoNumericTextBox").value(record.Meses);
            $("#comboTipoDesc").data("kendoDropDownList").value(record.Tipo);
        },
        columns: [
                {
                    field: "Nombre",
                    title: "Nombre",
                    width: 100
                },
                {
                    field: "Precio",
                    title: "Precio",
                    width: 50
                },               
                {
                    field: "Tipo",
                    text: "Tipo",
                    width: 120
                },
                 {
                    field: "Meses",
                    text: "Meses",
                    width: 50
                }
        ]
    });


    $("#tablaDescuentoSocio").kendoGrid({
        dataSource: {
            transport: {
                type: "json",
                read: {
                    url: "Socios/administrarDescuentosSocio",
                    data: { clase: "Cuota" },
                    type: "POST",
                    dataType: "json"
                },
                pageSize: 15
            }
        },
        sortable: true,
        selectable: true,
        toolbar: kendo.template($("#templateToolbarDescuentoSocios").html()),
        change: function () {

            var record = this.dataSource.getByUid(this.select().data("uid"));
            var numericoannos = $("#numericAnnos").data("kendoNumericTextBox");
            var numericcantidad = $("#numericCantidad").data("kendoNumericTextBox");

            numericcantidad.value(record.Cantidad / 100);                       

            if (record.Nombre == "Basico") {
                numericoannos.enable(false);
                numericoannos.value(0);
            }
            else {
                numericoannos.enable(true);
                numericoannos.value(record.Annos);
            }
        },
        columns: [
                        {
                            field: "Nombre",
                            title: "Nombre",
                            width: 150
                        },
                        {
                            field: "Cantidad",
                            title: "Cantidad",
                            width: 70
                        },
                        {
                            field: "Annos",
                            title: "Años",
                            width: 60
                        },
                        {
                            field: "Observaciones",
                            title: "Observaciones"
                        }
                ]
    });

    // SINCRONIZACION DE ANTIGUEDAD

    $("#botonSincronizarAntiguedad").click(function () {
        $.ajax({
            url: "Socios/sincronizarSociosAntiguedad",
            type: "POST",
            async: false,
            success: function () {
                alert("Los Socios han sido sincronizados");
            }
        });
    });

    $("#botonModificarDescuentoSocio").click(function () {

        var tablaDesc = $("#tablaDescuentoSocio").data("kendoGrid");
        var Annos = $("#numericAnnos").data("kendoNumericTextBox").value();
        var Cantidad = $("#numericCantidad").data("kendoNumericTextBox").value() * 100;
        var idDescuentoSocio = tablaDesc.dataSource.getByUid(tablaDesc.select().data("uid")).idDescuentoSocio;
        var Nombre = tablaDesc.dataSource.getByUid(tablaDesc.select().data("uid")).Nombre;

        if (Nombre == "Basico")
            Annos = 0;

        $.ajax({
            url: "Socios/modificarDescuentoSocio",
            type: "POST",
            data: { idDescuentoSocio: idDescuentoSocio, Cantidad: Cantidad, Annos: Annos },
            async: false,
            success: function () {
                tablaDesc.dataSource.read();
            }
        });
    });

    $(".numericCuota").width(100).kendoNumericTextBox({
            format: "c",
            min: 0
        });

    $(".numeric").width(50).kendoNumericTextBox({
        format: "g",
        min: 1
    });

    $(".numericMeses").width(100).kendoNumericTextBox({
        format: "# meses",
        min: 1
    });

    $("#numericCantidad").width(100).kendoNumericTextBox({
        format: "p0",
        min: 0,
        max: 1,
        step: 0.01
    });

    $("#numericAnnos").width(100).kendoNumericTextBox({
        format: "# años",
        min: 1
    });

    $(".comboTipoDesc").width(50).kendoDropDownList({
        dataTextField: "texto",
        dataValueField: "valor",
        dataSource: [{ texto: "€", valor: "Cantidad" }, { texto:"%", valor: "Porcentaje" }]
    });

    $("#cambiarPrecioCuota").click(function () {
        var tablita = tablaCuotas.data("kendoGrid");
        var idTipoCuota = tablita.dataSource.getByUid(tablita.select().data("uid")).idTipoCuota;
        var nuevoPrecio = $("#numericCuota").data("kendoNumericTextBox").value();
            
        $.ajax({
            url: "Socios/cambiarCuota",
            type: "POST",
            data: { idTipoCuota: idTipoCuota, Precio: nuevoPrecio, clase: "Cuota" },
            async: false,
            success: function () {
                tablita.dataSource.read();
            }
        });

    });

    $("#cambiarPrecioDescCuota").click(function () {
        var tablita = tablaDescCuotas.data("kendoGrid");
        var idTipoCuota = tablita.dataSource.getByUid(tablita.select().data("uid")).idTipoCuota;
        var nuevoPrecio = $("#numericDescCuota").data("kendoNumericTextBox").value();
        var nuevoMeses = $("#numericMeses").data("kendoNumericTextBox").value();
        var nuevoTipo = $("#comboTipoDesc").data("kendoDropDownList").value();

        $.ajax({
            url: "Socios/cambiarCuota",
            type: "POST",
            data: { idTipoCuota: idTipoCuota, Precio: nuevoPrecio, Meses:nuevoMeses, Tipo:nuevoTipo, clase:"Descuento" },
            async: false,
            success: function () {
                tablita.dataSource.read();
            }
        });


    });




    // ZONA DE QTIPS

    
    setTimeout(cargarQTipsAdminCuotas, 1000);

    function cargarQTipsAdminCuotas() {
        
        $(".numericCuota").qtip({
            content: {
                text: "<b>Seleccione primero</b> una cuota y luego elija el importe que al que desee que se modifique."
            },
            position: {
                my: "top left"
            }
        });

        $(".numericDesc").qtip({
            content: {
                text: "Este campo representará el precio que se descontará en <u>cantidad</u> o <u>tanto por ciento</u>."
            },
            position: {
                my: "top left"
            }
        });

        $(".comboTipoDesc").qtip({
            content: {
                text: "Este campo decidiriá si la cantidad elegida sera descontada en <u>euros (€)</u> o en <u>tanto por ciento</u>."
            },
            position: {
                my: "top left"
            }
        });

        $(".numericMeses").qtip({
            content: {
                text: "A partir de un <u>numero de meses</u> se aplicara el descuento. Elige el que desees que se aplique."
            },
            position: {
                my: "top left"
            }
        });

        $("#botonSincronizarAntiguedad").qtip({
            content: {
                text: "<center><h2>Sincronizacion de Antigüedad Socios</h2><br><img src='../../Content/iconos/syncsociosantiguedad.png' /><br></center><h4>Al pulsar este boton el Sistema comprobara la <i>Fecha Actual</i> con la <i>Fecha de Alta</i>.<br><br>Luego comprobara que la diferencia de tiempo se cumple o no con los meses establecidos para los Socios de cierta Antigüedad.</h4>."
            },
            position: {
                my: "bottom left"
            }
        });
        
    }