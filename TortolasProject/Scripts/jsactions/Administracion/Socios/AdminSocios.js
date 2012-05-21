﻿$(document).ready(function () {

    // DataSources varios
    var dataSourceCargos = new kendo.data.DataSource({
        transport: {
            type: "json",
            read: {
                url: "Socios/cargosDirectivos",
                type: "POST",
                dataType: "json"
            }
        }
    });

    // Ventanas
     var ventanaCrear = $("#ventanaNuevoSocio").kendoWindow({
        title: "Nuevo Socio",
        modal: true,
        visible: false,
        resizable: false,
        scrollable: false,
        movable: false,
        width:500        
    }).data("kendoWindow");

    // DatePickers y combos

    $(".date").kendoDatePicker();

    $("#nuevoEstado").kendoDropDownList({
        dataSource : [{ valor: "Activo" , nombre :"Activo" }, { valor: "Inactivo", nombre:"Inactivo" }, { valor:"Baja", nombre:"Baja" } , { valor:"Pendiente", nombre:"Pendiente" }],
        dataValueField : "valor",
        dataTextField : "nombre"
    });

    // Cargamos la tabla de Usuarios
    var tablaAdmin = $("#tablaAdminSocios").kendoGrid({
        dataSource: {
            transport: {
                type: "json",
                read: {
                    url: "Socios/obtenerSociosyUsuario",
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
        toolbar: kendo.template($("#templateToolbarAdminSocio").html()),
        detailTemplate: kendo.template($("#templateDetailAdminSocio").html()),
        detailInit: inicializarTablaAdminSocio,
        columns: [
                            {
                                field: "NumeroSocio",
                                title: "Socio",
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
                                field: "Apellidos",
                                title: "Apellidos",
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
                                field: "FechaAlta",
                                title: "Alta",
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
                                field: "FechaExpiracion",
                                title: "Expiracion",
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
                                field: "Estado",
                                title: "Estado",
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
                                command:
                                [
                                    { text: "editar", className: "editarfila" },
                                    { text: "eliminar", className: "eliminarUsuario" }
                                ]
                            }

                    ]
    });



    // Boton de Ascender usuario a JD
    $("#botonAscenderJD").click(function () {
        
        var fila = $("#tablaAdminSocios").data("kendoGrid").select();          // Cogemos la fila seleccionada
        var filaJson = $("#tablaAdminSocios").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON
                             
        var dataSource =$("#tablaAdminSocios").data("kendoGrid").dataSource;       
        var idSocio = dataSource.getByUid(fila.attr("data-uid")).idSocio;
        var cargoDirectivo = $("#comboCargo").data("kendoDropDownList").value();
        
        $.ajax({
            url: "Socios/ascenderJuntaDirectiva",
            type: "POST",
            data: { idSocio: idSocio, cargoDirectivo: cargoDirectivo},
            success: function () {

            },
            async: false
        });
    });

    // Boton Crear Nuevo Socio
    $("#botonCrearSocio").click(function(){
        ventanaCrear.open();
        ventanaCrear.center();
    });

    // Funcion para el check de password Random
    $("#usuarioRandom").change(function () {        
        
        if ($(this).attr("checked") == "checked") {       // Que no este vacio
            $("#nuevoPassword").val(Math.random().toString(36).substring(7));
            $("#nuevoNickname").val(Math.random().toString(36).substring(7));
            $(".random").attr("disabled", true);            
        }
        else {
            $(".random").val("");
            $(".random").attr("disabled", false);
        }

    });

    $(".necesario").change(function(){
    
        if($(this).val()==""){
            $(this).addClass("k-invalid");
        }
        else{
            $(this).removeClass("k-invalid");
        }
    });

    // Funcion para comprobar campos vacios
    function comprobarNecesarios(){
        var noHayErrores = true;
        $(".necesario").each(function(index){
            if($(this).val()==""){
                $(this).addClass("k-invalid"); 
                hayErrores = false;
            }
        });   
        return noHayErrores;    
    }

    // Boton para crear Usuario
    $("#botonNuevoSocio").click(function () {

        if(comprobarNecesarios()){
                var aEnviar = {};
                
                $(".necesario").each(function(){                    
                    aEnviar[$(this).attr("atributo")] = $(this).val();
                });

                $.ajax({
                    url:"Socios/insertarSocio",
                    type:"POST",
                    data: aEnviar,
                    success: function(){
                    },
                    async:false
                });
        }
        
    });

    function inicializarTablaAdminSocio(e) {

        $(".tabsSocios").kendoTabStrip();

        // Combo para mostrar Cargos



        $("#pagados_" + e.data.idSocio).kendoGrid({
            dataSource: {
                transport: {
                    type: "json",
                    read: {
                        url: "Socios/obtenerPagosSocios",
                        data: { idSocio: e.data.idSocio },
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
            //toolbar: kendo.template($("#templateToolbarCuotas").html()),
            //detailTemplate: kendo.template($("#templateDetailAdminSocio").html()),
            //detailInit: inicializarTablaAdminSocio */
            columns: [
                            {
                                field: "TipoCuota",
                                title: "Cuota",
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
                                field: "Fecha",
                                title: "Fecha",
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
                                field: "FechaExpiracion",
                                title: "F.Expiracion",
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
                                field: "Concepto",
                                title: "Concepto",
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
                                field: "BaseImponible",
                                title: "B.Imponible",
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
                                field: "Total",
                                title: "Total",
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
                                field: "Estado",
                                title: "Estado",
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

        $("#pendientes_" + e.data.idSocio).kendoGrid({
            dataSource: {
                transport: {
                    type: "json",
                    read: {
                        url: "Socios/obtenerPagosSocios",
                        data: { idSocio: e.data.idSocio },
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
            toolbar: kendo.template($("#templateToolbarCuotasPendientes").html()),
            //detailTemplate: kendo.template($("#templateDetailAdminSocio").html()),
            //detailInit: inicializarTablaAdminSocio */
            columns: [
                            {
                                field: "TipoCuota",
                                title: "Cuota",
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
                                field: "Fecha",
                                title: "Fecha",
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
                                field: "Concepto",
                                title: "Concepto",
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
                                field: "FechaExpiracion",
                                title: "F.Expiracion",
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
                                field: "BaseImponible",
                                title: "B.Imponible",
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
                                field: "Total",
                                title: "Total",
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
                                field: "Estado",
                                title: "Estado",
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

        $("#pagados_" + e.data.idSocio).data("kendoGrid").dataSource.filter({ field: "Estado", operator: "eq", value: "Pagado" });
        $("#pendientes_" + e.data.idSocio).data("kendoGrid").dataSource.filter({ field: "Estado", operator: "eq", value: "Pendiente" });

        // El boton de Cambio de estado de cuota de Pendiente a Pagado

        $(".botonCambiarEstadoCuota").click(function () {

            var tabla = $(this).parent().parent().data("kendoGrid");

            // var seleccionado = $('[socio="' + socio + '"]').data("kendoGrid").select();
            var seleccionado = tabla.select();
            var filaJson = tabla.dataItem(seleccionado).toJSON();      // La pasamos a JSON                

            var dataSource = tabla.dataSource;

            var idCuota = dataSource.getByUid(seleccionado.attr("data-uid")).idCuota;
            var FechaExpiracion = dataSource.getByUid(seleccionado.attr("data-uid")).FechaExpiracion;


            $.ajax({
                url: "Socios/pagarCuotaSocio",
                type: "POST",
                data: { idCuota: idCuota, FechaExpiracion: FechaExpiracion, idSocio: e.data.idSocio },
                success: function () {
                    $("#pagados_" + e.data.idSocio).data("kendoGrid").dataSource.read();
                    $("#pendientes_" + e.data.idSocio).data("kendoGrid").dataSource.read();
                    $("#pagados_" + e.data.idSocio).data("kendoGrid").dataSource.filter({ field: "Estado", operator: "eq", value: "Pagado" });
                    $("#pendientes_" + e.data.idSocio).data("kendoGrid").dataSource.filter({ field: "Estado", operator: "eq", value: "Pendiente" });
                },
                async: false
            });

        });

        cargarQTipsAdminSocios();
    }
   

    $("#comboCargo").kendoDropDownList({
                dataSource: {
                    transport: {
                        type: "json",
                        read: {
                            url: "Socios/cargosDirectivos",
                            type: "POST",
                            dataType: "json"
                        }
                    }
                },
                dataValueField: "idCargoDirectivo",
                dataTextField: "Nombre",
                index:0,               
        });
    

    // ZONA PARA QTIPS


    setTimeout(cargarQTipsAdminSocios, 1000);

    function cargarQTipsAdminSocios() {

        $(".botonCambiarEstadoCuota").qtip({
            content: {
                text: "Al cambiar el estado de la cuota a <i>pagada</i>, la factura asociada tambien cambiara.<br>Automaticamente, si la fecha de Expiracion es mayor que la actual, se cambiara el estado del Socio a <b>Activo</b>"
            },
            position: {
                my: "top left"
            }
        });

        $("#botonAscenderJD").qtip({
            content: {
                text: "Selecciona una fila de la tabla y un cargo a la derecha y pulse este boton.<br>Una vez lo hagas, el Socio pasara a ser parte de la <b>Junta Directiva</b><br>Para descender al Socio de la Junta Directiva, vaya a la tabla de abajo."
            },
            position: {
                my: "top left"
            }
        });

        $(".comboCargo").qtip({
            content: {
                text: "Selecciona un cargo de este combo y pulse el boton de la izquierda para convertir el Socio en un cargo de la <b>Junta Directiva</b>."
            },
            position: {
                my: "top left"
            }
        });

    }

});