$(document).ready(function () {
    
    var idContrato = null;
        var FKJuntaDirectiva = null;

        //Junta Directiva Remota//

        $("#VentanaJuntaDirectivaRemota") //Creo la ventana como variable global para que pueda ser usado por todos
            .kendoWindow
            ({
                title: "Vincular Junta Directiva",
                modal: false,
                visible: false,
                resizable: false,
                width: 300,
        }).data("kendoWindow");
    
        $('#JuntaDirectivaGridRemoto .k-grid-content tr').live('dblclick', function () {   //Grid Junta Directiva Remota Crear
            alert("hola");
            var fila = $("#JuntaDirectivaGridRemoto").find("tbody tr.k-state-selected");

            var filajson = $("#JuntaDirectivaGridRemoto").data("kendoGrid").dataItem(fila).toJSON();
        
            FKJuntaDirectiva = datasourcejunta.getByUid(fila.attr("data-uid")).FKSocio;
        
            $(".nombrejuntadirectivaremota").val(filajson.NombreJuntaDirectiva);


            $("#VentanaJuntaDirectivaRemota").data("kendoWindow").close();
            $(".VisibilidadGridJuntaDirectivaRemota").hide(); //Lo oculto

        });


        var datasourcecont = new kendo.data.DataSource //Datasource Contratos
        ({
            transport:
                {
                    read:
                    {
                        url: "Contratos/LeerTodos",
                        datatype: "json",
                        type: "POST"
                    }
                },
            schema:
            {
                model:
                 {
                     id: "idConvenio"
                 }
            }
         });

         var datasourcejunta = new kendo.data.DataSource //Datasource Junta Directiva
        ({
            transport:
                {
                    read:
                    {
                        url: "Contratos/LeerJuntaDirectiva",
                        datatype: "json",
                        type: "POST"
                    }
                },
            schema:
            {
                model:
                 {
                     id: "FKSocio"
                 }
            }
         });

         $("#ContratosGrid").kendoGrid //Creo el kendo Grid
        ({
            dataSource: datasourcecont,
            selectable: true,
            pageable: true,
            sortable: true,
            filterable: true,
            groupable: true,
            columns: [
                {
                    field: "NombreEmpresa",
                    title: "Nombre Empresa"
                },
                {
                    field: "CIFEmpresa",
                    title: "CIF Empresa",
                    filterable: {
                        extra: false, //do not show extra filters
                        operators: { // redefine the string operators
                            string: {
                                eq: "Es igual a...",
                                neq: "No es igual a...",
                                startswith: "Empieza por...",
                                contains: "Contiene"
                            }
                        }
                    }

                },
                {
                    field: "FechaCreacion",
                    title: "Fecha Creación"
                },
                {
                    field: "FechaCaducidad",
                    title: "Fecha Expiración"
                },
                {
                    title: "Editar",
                    command: { text: "Editar", className: "botonEditarFilaContrato" }
                },
                {
                    title: "Eliminar",
                    command: { text: "Eliminar", className: "botonEliminarFilaContrato" }
                }
            ]

            });

            //DataSource Grid Junta Directiva Remoto

            $("#JuntaDirectivaGridRemoto").kendoGrid //Creo el kendo Grid
            ({
            //height: 400,
            dataSource: datasourcejunta,
            selectable: true,
            pageable: true,
            sortable: true,
            filterable: true,
            columns: [
                {
                    field: "NombreJuntaDirectiva",
                    title: "Nombre Responsable",
                    filterable: {
                        extra: false, //do not show extra filters
                        operators: { // redefine the string operators
                            string: {
                                eq: "Es igual a...",
                                neq: "No es igual a...",
                                startswith: "Empieza por...",
                                contains: "Contiene"
                            }
                        }
                    }

                },
                {
                    field: "Cargo",
                    title: "Cargo"
                }
            ]

        });

        //VALIDACION//

        function comprobarNecesarios(formulario){ //Comprueba nulos
        var noHayErrores = true;
        $("."+formulario+" .requerido").each(function(){
            if($(this).val()==""){
                $(this).addClass("k-invalid");
                noHayErrores = false;
            }
        });   
        return noHayErrores;    
        }

            //POP-UPs//

            //Editar//

            var weditarContrato = $("#VentanaEditarContrato")
            .kendoWindow
            ({
                title: "Editar Contrato",
                modal: true,
                visible: false,
                resizable: false,
            }).data("kendoWindow");

            //Eliminar//

            var weliminarContrato = $("#VentanaEliminarContrato")
            .kendoWindow
            ({
                title: "Eliminar Contrato",
                modal: true,
                visible: false,
                resizable: false,
            }).data("kendoWindow");

            //Crear//

            var wcrearContrato = $("#VentanaCrearContrato")
            .kendoWindow
            ({
                title: "Crear Contrato",
                modal: true,
                visible: false,
                resizable: false,
            }).data("kendoWindow");

        

            // FUNCIONES //

        //Funciones: Botones del GRID//

        //Boton Editar//

        $(".botonEditarFilaContrato").live("click", function () {

            var fila = $("#ContratosGrid").find("tbody tr.k-state-selected");

            var filajson = $("#ContratosGrid").data("kendoGrid").dataItem(fila).toJSON();
            idContrato = datasourcecont.getByUid(fila.attr("data-uid")).idContrato;
            FKJuntaDirectiva = datasourcecont.getByUid(fila.attr("data-uid")).FKJuntaDirectiva;
        
        
            $("#nombreempresacontratoeditar").val(filajson.NombreEmpresa);
            $("#cifcontratoeditar").val(filajson.CIFEmpresa);
            $("#jdirectivacontratoeditar").val(filajson.NombreJuntaDirectiva);
            $("#fechacreacioncontratoeditar").val(filajson.FechaCreacion);
            $("#fechacaducidadcontratoeditar").val(filajson.FechaCaducidad);
            $("#descripcionlegalcontratoeditar").data("kendoEditor").value((filajson.DescripcionLegal));
            $("#importecontraroeditar").val(filajson.Importe);

            weditarContrato.center();

            weditarContrato.open();
        });

        //Boton Eliminar//

        $(".botonEliminarFilaContrato").live("click", function () {
            //alert("Eliminar!");

            $(".CuadroTexto").prop('disabled', true); //Bloquea editar los campos

            var fila = $("#ContratosGrid").find("tbody tr.k-state-selected");

            var filajson = $("#ContratosGrid").data("kendoGrid").dataItem(fila).toJSON();
            idContrato = datasourcecont.getByUid(fila.attr("data-uid")).idContrato;

            $("#nombreempresacontratoeliminar").val(filajson.NombreEmpresa);
            $("#cifcontratoeliminar").val(filajson.CIFEmpresa);
            $("#juntadirectivacontratoeliminar").val(filajson.NombreJuntaDirectiva);
            $("#fechacreacioncontratoeliminar").val(filajson.FechaCreacion);
            $("#fechacaducidadcontratoeliminar").val(filajson.FechaCaducidad);
            $("#descripcioncontratoeliminar").val((filajson.DescripcionLegal));
            $("#importecontratoeliminar").val(filajson.Importe);


            weliminarContrato.center();

            weliminarContrato.open();
        });

        // Funciones: Botones Ventana Editaje //

        //Boton Cambiar Empresa//

        $("#CambiarEmpresaContratoEditar").live("click", function () {  

            $("#VentanaEmpresasRemota").data("kendoWindow").center();
            $(".VisibilidadGridEmpresasRemota").show(); //Lo muestro
            $("#VentanaEmpresasRemota").data("kendoWindow").open();
        });

        //Boton Cancelar//

        $(".FuncionBotonCancelarProveedores").live("click", function () {

            $(".CuadroTexto").prop('disabled', false); //Bloquea editar los campos
            $(".VisibilidadDatosNuevaEmpresaRemota").hide();

            weditarContrato.close();
            weliminarContrato.close();
            wcrearContrato.close();
        });

        //Boton Aceptar//

        $("#BotonAceptarVentanaEditarContrato").live("click", function () {
            var datos = {};

            if (comprobarNecesarios("ComprobarNulosContratosEditar")) 
            {
                //Coger datos
                datos["nombreempresa"] = $("#nombreempresacontratoeditar").val();
                datos["cifempresa"] = $("#cifcontratoeditar").val();
                datos["nombrejunta"] = $("#jdirectivacontratoeditar").val();
                datos["fechacreacion"] = $("#fechacreacioncontratoeditar").val();
                datos["fechacaducidad"] = $("#fechacaducidadcontratoeditar").val();
                datos["descripcion"] = $("#descripcionlegalcontratoeditar").data("kendoEditor").value();
                datos["importe"] = $("#importecontraroeditar").val();
                datos["idcontrato"] = idContrato;
                datos["fkjuntadirectiva"] = FKJuntaDirectiva;

                $.ajax(
                    {
                        url: "Contratos/UpdateContrato",
                        type: "POST",
                        data: datos,
                        success: function () {
                            $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                            datasourcecont.read();
                            weditarContrato.close();
                        },
                        async: false
                    });
            }
            else
            {
                $("#MensajeErrorContratoEditar").fadeIn(500).fadeOut(3000);
            }
        });
    
        // Funciones: Botones Ventana Eliminar //

        //Boton Aceptar//

        $("#BotonAceptarVentanaEliminarContrato").live("click", function () {

            var datos = {};
            //Coger datos

            datos["idcontrato"] = idContrato;

            $.ajax(
                {
                    url: "Contratos/DeleteContrato",
                    type: "POST",
                    data: datos,
                    success: function () {
                        $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                        datasourcecont.read();
                        weliminarContrato.close();
                    },
                    async: false
                });

        });

        //Boton Nuevo Contrato//

        $("#BotonNuevoContrato").click(function () {

            $(".VisibilidadTelefonodeContacto").show();
            $(".CuadroTexto").prop('disable', false); //Devuelve poder editar los campos en la ventana

            wcrearContrato.center();

            wcrearContrato.open();

        });

        //Funciones: Botones Ventana Crear //

        //Boton Vincular Empresa//

        $("#BotonElegirEmpresaRemotaDesdeContrato").live("click", function () {  

            $("#VentanaEmpresasRemota").data("kendoWindow").center();
            $(".VisibilidadGridEmpresasRemota").show(); //Lo muestro
            $("#VentanaEmpresasRemota").data("kendoWindow").open();
        });

        //Boton Vincular JuntaDirectiva//

        $("#BotonElegirJuntaDirectivaDesdeContrato").live("click", function () {  

            $("#VentanaJuntaDirectivaRemota").data("kendoWindow").center();
            $(".VisibilidadGridJuntaDirectivaRemota").show(); //Lo muestro
            $("#VentanaJuntaDirectivaRemota").data("kendoWindow").open();
        });

        //Boton Crear Proveedor//

        $("#BotonAceptarVentanaCrearContrato").click(function () {

            var datos = {};
            if (comprobarNecesarios("ComprobarNulosContratosCrear")) 
            {
                //Coger datos
                datos["nombreempresa"] = $("#nombreempresacontratocrear").val();
                datos["cif"] = $("#cifempresacontratocrear").val();
                datos["nombrejunta"] = $("#juntadirectivacontratocrear").val();
                datos["fechacreacion"] = $("#fechacreacioncontratocrear").val();
                datos["fechacaducidad"] = $("#fechacaducidadcontratocrear").val();
                datos["descripcion"] = $("#descripcioncontratocrear").val();
                datos["importe"] = $("#importecontratocrear").val();
                datos["idcontrato"] = idContrato;
                datos["fkjuntadirectiva"] = FKJuntaDirectiva;
                if ($("#telefonoempresacontratocrear").val() == "") {
                    datos["telefono"] = 0
                }
                else {
                    datos["telefono"] = $("#telefonoempresacontratocrear").val();
                }
        
                $.ajax(
                {
                    url: "Contratos/CreateContrato",
                    type: "POST",
                    data: datos,
                    success: function () {
                
                        var temp = $("#ContratosGrid").data("kendoGrid").dataSource;

                        temp.read();

                        $(".VisibilidadDatosNuevaEmpresaRemota").hide();

                        wcrearContrato.close();

                
                    },
                    async: false
                });
            }
            else
            {
                $("#MensajeErrorContratoCrear").fadeIn(500).fadeOut(3000);
            }
        });
    /*$("#ContratosNav").live("click", function () {
        
    });*/
    
});