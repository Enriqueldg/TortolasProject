$(document).ready(function () {

    //VALIDACION//
    /*
    $(".requerido").change(function () { //Actualizacion campos requeridos
        if ($(this).val() == "") {
            $(this).addClass("k-invalid");
        }
        else {
            $(this).removeClass("k-invalid");
        }
    });

    function comprobarNecesarios(formulario) { //Comprueba nulos
        var noHayErrores = true;
        $("." + formulario + " .requerido").each(function (Index) {
            if ($(this).val() == "") {
                $(this).addClass("k-invalid");
                noHayErrores = false;
            }
        });
        return noHayErrores;
    }

    $("#BotonConfirmarNuevaEmpresa").live("click", function () {
        var datos = {};

        if (comprobarNecesarios("NuevaEmpresaDatosEmpresa")) {
            datos = {};
            alert("detrodelif");
        }

        //Coger datos
        datos["nombreempresa"] = $("#newnombreempresa").val();
        datos["cif"] = $("#newcif").val();
        datos["localidad"] = $("#newlocalidad").val();
        datos["direccionweb"] = $("#newdireccionweb").val();
        datos["telefonodecontacto"] = $("#newtelefonodecontacto").val();
        datos["email"] = $("#newemail-c").val();
        //datos["idempresa"] = new Guid();

        //alert(datos["nombreempresaupdate"]);

        $.ajax(
        {
            url: "Empresas/CreateEmpresa",
            type: "POST",
            data: datos,
            success: function () {
                //alert("Estoy dentro del success!");
                //alert($("#EmpresasGrid"));
                var temp = $("#EmpresasGrid").data("kendoGrid").dataSource;
                //alert("soy el temp:" + temp);
                temp.read();

                //alert("Ya he cogido e datasource!");
                $.post('Empresas/Index', function () {
                    //alert("Estoy dentro del .post!");
                    $("#EmpresasHerramientasContent").show();
                    $("#EmpresasGrid").show();
                    $("#NuevaEmpresaFormulario2").hide();
                    $("#EmpresasNavegador").show();
                });
                //alert("Ya he terminado!");

            },
            async: false
        });
    });
    $("#BotonCancelarNuevaEmpresa").live("click", function () {
        $.post('Empresas/Index', function () {
            $("#EmpresasNavegador").show();
            $("#EmpresasHerramientasContent").show();
            $("#EmpresasGrid").show();
            $("#NuevaEmpresaFormulario2").hide();
        });
    });
    */
});
