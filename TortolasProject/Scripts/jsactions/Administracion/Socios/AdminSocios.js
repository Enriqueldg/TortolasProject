$(document).ready(function () {

    $("#tabsAdminJunta").kendoTabStrip();
       
    $("#fechaBaja").hide();

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

    
     var ventanaEditar = $("#ventanaEditarSocio").kendoWindow({
        title: "Editar Socio",
        modal: true,
        visible: false,
        resizable: false,
        scrollable: false,
        movable: false,
        width:500        
    }).data("kendoWindow");

    // DatePickers y combos

    $(".date").kendoDatePicker();

    $(".comboEstado").kendoDropDownList({
        dataSource : [{ valor: "Activo" , nombre :"Activo" }, { valor: "Inactivo", nombre:"Inactivo" }, { valor:"Baja", nombre:"Baja" } , { valor:"Pendiente", nombre:"Pendiente" }],
        dataValueField : "valor",
        dataTextField : "nombre",
        change: function(){
            if(this.value()=="Baja"){
                $("#fechaBaja").show();
            }
            else{
                $("#fechaBaja").hide();
            }
        }
    });

    // Cargamos la tabla de Socios
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
                                field: "DescuentoSocio",
                                title: "Tipo Descuento",
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
                                    { text: "editar", className: "editarSocio" }                                   
                                ]
                            }

                    ]
    });

    // Cargamos la tabla de Socios
    var tablaAdminJunta = $("#tablaAdminJunta").kendoGrid({
        dataSource: {
            transport: {
                type: "json",
                read: {
                    url: "Socios/obtenerJuntaDirectiva",
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
        toolbar: kendo.template($("#templateToolbarAdminJunta").html()),
       // detailTemplate: kendo.template($("#templateDetailAdminSocio").html()),
      //  detailInit: inicializarTablaAdminSocio,
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
                                field: "Cargo",
                                title: "Cargo",
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
                                field: "Email",
                                title: "Email",
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
                          /*  {
                                title: "Herramientas",
                                command:
                                [
                                    { text: "editar", className: "editarSocio" },
                                    { text: "eliminar", className: "eliminarSocio" }
                                ]
                            }*/

                    ],
                    change: function(){                                                                        
                        var record = this.dataSource.getByUid(this.select().data("uid"));
                        if(record.Estado=="Activo"){
                            $("#botonDesactivarDirectivo").show();
                            $("#botonActivarDirectivo").hide();
                        }else if(record.Estado=="Inactivo"){
                            $("#botonDesactivarDirectivo").hide();
                            $("#botonActivarDirectivo").show();
                        }
                                                
                    }
    });

    // Boton Activar / Desactivar Junta Directiva
    $(".estadoJunta").click(function(){
        var tabla = $("#tablaAdminJunta").data("kendoGrid");
        var fila = tabla.dataSource.getByUid(tabla.select().data("uid"));
        var Estado = $(this).attr("funcion");
        var idSocio = fila.idSocio;
        
        $.ajax({
            url:"Socios/cambiarEstadoJunta",
            type:"POST",
            data:{ idSocio : idSocio , Estado : Estado },
            success: function(){
                $("#tablaAdminJunta").data("kendoGrid").dataSource.read();
            },
            async: false
         });
    });

    // Funcion para comprobar campos vacios
    function comprobarNecesarios(formulario){
        var noHayErrores = true;
        $("."+formulario+" .necesario").each(function(index){
            if($(this).val()==""){
                $(this).addClass("k-invalid"); 
                noHayErrores = false;
            }
        });   
        return noHayErrores;    
    }

    // Sincronizacion de Estado de Socios
    $("#botonSincronizarEstados").click(function(){
        $.ajax({
            url:"Socios/sincronizarEstadoSocio",
            type:"POST",
            async:false,
            success:function(){
                $("#tablaAdminSocios").data("kendoGrid").dataSource.read();
            }
        });
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
                $("#tablaAdminJunta").data("kendoGrid").dataSource.read();
            },
            async: false
        });
    });

    // Boton Crear Nuevo Socio
    $("#botonCrearSocio").click(function(){
        ventanaCrear.open();
        ventanaCrear.center();        
        $(".formularioVentana").val("");                
    });

    // Boton Cancelar
    $("#botonCancelar").click(function(){
        ventanaCrear.close();        
    });

     $("#botonCancelarEdicion").click(function(){
        ventanaEditar.close();        
    });

    $(".editarSocio").live("click",function(){
        var tabla = $("#tablaAdminSocios").data("kendoGrid");
        var seleccionado = tabla.select();
        var filaJson = tabla.dataItem(seleccionado).toJSON();      // La pasamos a JSON                

        var dataSource = tabla.dataSource;

        var idSocio = dataSource.getByUid(seleccionado.attr("data-uid")).idSocio;

        // Ponemos los datos
        $("#editarNombre").val(filaJson.Nombre);
        $("#editarApellidos").val(filaJson.Apellidos);
        $("#editarNumeroSocio").val(filaJson.NumeroSocio);
        $("#editarFechaAlta").data("kendoDatePicker").value(filaJson.FechaAlta);
        $("#editarFechaExpiracion").data("kendoDatePicker").value(filaJson.FechaExpiracion);
        $("#editarFechaBaja").data("kendoDatePicker").value(filaJson.FechaBaja);
        $("#editarEstado").data("kendoDropDownList").value(filaJson.Estado);
        $(".idSocioSeleccionado").val(idSocio);

        var FechaExpiracion = dataSource.getByUid(seleccionado.attr("data-uid")).FechaExpiracion;

        ventanaEditar.open();
        ventanaEditar.center();
    });

    $("#botonEditarSocio").click(function(){
        var aEnviar = {};
         if(comprobarNecesarios("formularioVentanaEditar")){
            
            $(".formularioVentanaEditar input").each(function(){
                aEnviar[$(this).attr("atributo")] = $(this).val();
            });
            
            if((aEnviar["FechaBaja"]=="")&&(aEnviar["Estado"]=="Baja")){
                alert("Debe rellenar el campo 'Fecha de Baja'");
            }
            else{
                $.ajax({
                    url: "Socios/editarSocio",
                    type:"POST",
                    data: aEnviar,
                    success: function(){
                        
                        $("#tablaAdminSocios").data("kendoGrid").dataSource.read();
                        ventanaEditar.close();
                    },
                    async:false
                });
            }
         }
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

    // Boton para crear Usuario
    $("#botonNuevoSocio").click(function () {
        
        if(comprobarNecesarios("formularioVentana")){
                var aEnviar = {};
                
                $(".formularioVentana input").each(function(){                    
                    aEnviar[$(this).attr("atributo")] = $(this).val();
                });
                
                aEnviar["ConfirmPassword"] = $("#nuevoPassword").val();
                
                if(aEnviar["FechaBaja"]=="")
                    aEnviar["FechaBaja"] = "Nada";

                $.ajax({
                    url:"Socios/insertarSocio",
                    type:"POST",
                    data: aEnviar,
                    success: function(){
                        $("#ventanaNuevoSocio").data("kendoWindow").close();                       
                        $("#tablaAdminSocios").data("kendoGrid").dataSource.read();                        
                        
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
   

    $(".comboCargo").kendoDropDownList({
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
    

    $("#cambiarCargo").click(function(){
        
        var tabla = $("#tablaAdminJunta").data("kendoGrid");
        var seleccionado = tabla.select();
        var filaJson = tabla.dataItem(seleccionado).toJSON();      // La pasamos a JSON                

        var dataSource = tabla.dataSource;
        
        var idSocio = dataSource.getByUid(seleccionado.attr("data-uid")).idSocio;
        var Cargo = $("#comboCargoJunta").data("kendoDropDownList").value();
        
        $.ajax({
            url: "Socios/cambiarCargo",
            type:"POST",
            data: { idSocio : idSocio , Cargo : Cargo },
            success: function(){
                tabla.dataSource.read();
            },
            async: false
        });
    });
    

    // ZONA PARA QTIPS


    setTimeout(cargarQTipsAdminSocios, 1000);

    function cargarQTipsAdminSocios() {
      

        $(".botonCambiarEstadoCuota").qtip({
            content: {
                text: "<h4>Al cambiar el estado de la cuota a <i>pagada</i>, la factura asociada tambien cambiara.<br><br>Automaticamente, si la fecha de Expiracion es mayor que la actual, se cambiara el estado del Socio a <b>Activo</b></h4>"
            },
            position: {
                my: "top left"
            }
        });

        $("#botonAscenderJD").qtip({
            content: {
                text: "<h4>Selecciona una fila de la tabla y un cargo a la derecha y pulse este boton.<br><br>Una vez lo hagas, el Socio pasara a ser parte de la <b>Junta Directiva</b><br><br>Para descender al Socio de la Junta Directiva, vaya a la tabla de abajo.</h4>"
            },
            position: {
                my: "top left"
            }
        });

        $(".comboCargo").qtip({
            content: {
                text: "<h4>Selecciona un cargo de este combo y pulse el boton de la izquierda para convertir el Socio en un cargo de la <b>Junta Directiva</b>.</h4>"
            },
            position: {
                my: "top left"
            }
        });

        $(".necesario").qtip({
            content: {
                text: "Este campo es <font color='red'><b>obligatorio</b></font>."
            },
            position: {
                my: "top left"
            }
        });
       
        $("#editarFechaBaja").qtip({
            content: {
                text: "Si desea dar de <b>baja</b> a un Usuario, debe rellenar este campo y seleccionar debajo la opcion <i>Baja</i>"
            },
            position: {
                my: "top left"
            }
        });

        $("#botonSincronizarEstados").qtip({
            content: {
                text: "<center><h2>Sincronizacion de Socios</h2><br><img src='../../Content/iconos/syncsocios.png' /><br></center><h4>Al pulsar este boton el Sistema comprobara la <i>Fecha Actual</i> con la <i>Fecha de Expiracion</i>.<br><br>Si la <i>Fecha de Expiracion</i> es <u>menor</u> que la <i>Fecha Actual</i> pasara a estado <b>Inactivo</b> y si es al contrario, pasara a estado <b>Activo</h4></b>."
            },
            position: {
                my: "top left"
            }
        });

    }

    // Cargamos la pestaña de Cuotas y Descuentos
     $.getScript("Scripts/jsactions/Administracion/Socios/cuotasdescuento.js");   

});