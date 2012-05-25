var datasourceGrid;
var grid;
var gridDisp;
var gridArticulosDePedido;
var idPedido;
var artPedUs;
var artPed;
var datasourceGridPedido;
var gridPedidos;

$(document).ready(function () {
    //*************************************INSCRIPCION PEDIDO VENTANA*************************************
    $("#inscripcionPedidoVentana").kendoWindow({
        title: "Inscripción",
        height: "600px",
        width: "1000px",
        modal: true,
        visible: false
    });

    $("#inscripcionPedidoVentanaCancelar").live('click', function () {
        var z = $("#inscripcionPedidoVentana").data("kendoWindow");
        z.close();
    });

    $("#inscripcionPedidoVentanaAgregarButton").click(function () {
        var uid = $("#articulosPedido .k-state-selected").attr("data-uid");
        var fila = artPed.dataSource.getByUid(uid);
        var filaNueva = {
            idArticulo: fila.idArticulo,
            nombre: fila.nombre,
            imagen: fila.imagen,
            descripcion: fila.descripcion,
            precio: fila.precio,
            unidades: 0,
            categoriaNombre: fila.categoriaNombre
        }
        datasourceGridPedidoUsuario.add(filaNueva);
        artPed.dataSource.remove(fila);
        artPedUs.refresh();
    });


    $("#inscripcionPedidoVentanaAceptar").live('click', function () {
        var lineasRaw = datasourceGridPedidoUsuario.view();
        var lineas = new Array();
        for (var i = 0; i < lineasRaw.length; i++) {
            lineas.push({
                "idArticulo": lineasRaw[i].idArticulo,
                "Unidades": lineasRaw[i].unidades
            });
        }

        data = {
            lineas: kendo.stringify(lineas),
            FkPedidoGlobal: idPedido
        };
        url = 'Pedidos/anadirPedidoUsuario';
        $.post(url, data, function (data) {
            var w = $("#inscripcionPedidoVentana").data("kendoWindow");
            w.close();

            $(".lineasPedido").data("kendoGrid").dataSource.read();
            var tabla = $(".lineasPedido").data("kendoGrid");
            tabla.refresh();
        }); 
    });
    
    $("#articulosPedidoUsuario").delegate(".botonEliminarArticuloPedidoUsuario", "click", function (e) {
        e.preventDefault();
       
        // Obtenemos la UID de la fila creada por KENDO
        var uid = $(this).closest("tr").attr("data-uid");        
        var fila = artPedUs.dataSource.getByUid(uid);
        var filaNueva = {
            idArticulo: fila.idArticulo,
            nombre: fila.nombre,
            imagen: fila.imagen,
            descripcion: fila.descripcion,
            precio: fila.precio,
            categoriaNombre: fila.categoriaNombre
        }
        artPed.dataSource.add(filaNueva);

        datasourceGridPedidoUsuario.remove(datasourceGridPedidoUsuario.getByUid(uid));
        artPedUs.refresh();
        artPed.refresh();
    });

    datasourceGridPedidoUsuario = new kendo.data.DataSource({
        schema:
                {
                    model:
                       {
                           id: "idArticulo",
                           fields: {
                               nombre: {editable: false},
                               imagen: {editable: false},
                               descripcion: {editable: false},
                               precio: {editable: false},
                               categoriaNombre: {editable: false},
                               unidades: { type: "number", editable: true }
                           }
                       }
                }
    });

    artPedUs = $("#articulosPedidoUsuario").kendoGrid({

        editable: true,
        columns: [
        {
            field: "nombre",
            title: "Nombre"
        },
        {
            field: "imagen",
            title: "Imagen"
        },
        {
            field: "descripcion",
            title: "Descripcion"
        },
        {
            field: "precio",
            title: "Precio",
        },
        {
            field: "categoriaNombre",
            title: "Categoria"
        },
        {
            field: "unidades",
            title: "Unidades"
        },
        {
            title: "",
            command: { text: "Eliminar", className: "botonEliminarArticuloPedidoUsuario" }
        }],
        dataSource: datasourceGridPedidoUsuario
    }).data("kendoGrid");

    

    //****************************************ANADIR PEDIDO VENTANA***************************************
    datasourceGrid = new kendo.data.DataSource({
        schema:
                {
                    model:
                       {
                           id: "idArticulo",
                           fields: {
                               nombre: {},
                               imagen: {},
                               descripcion: {},
                               precio: {},
                               categoriaNombre: {}
                           }
                       }
                }
    });

    $("#anadirPedidoVentana").kendoWindow({
        title: "Añadir pedido",
        height: "600px",
        width: "1000px",
        modal: true,
        visible: false
    });

    $("#articulosGridDisponibles").kendoGrid({
        selectable: true,
        columns: [
                  {
                      field: "nombre",
                      title: "Nombre"
                  },
                  {
                      field: "imagen",
                      title: "Imagen"
                  },
                   {
                       field: "descripcion",
                       title: "Descripcion"
                   },
                  {
                      field: "precio",
                      title: "Precio"
                  },
                  {
                      field: "categoriaNombre",
                      title: "Categoria"
                  }],
        dataSource: datasourceGrid
    });

    $("#articulosGridAnadirPedido").kendoGrid({
        selectable: true,
        columns: [
                  {
                      field: "nombre",
                      title: "Nombre"
                  },
                  {
                      field: "imagen",
                      title: "Imagen"
                  },
                   {
                       field: "descripcion",
                       title: "Descripcion"
                   },
                  {
                      field: "precio",
                      title: "Precio"
                  },
                  {
                      field: "categoriaNombre",
                      title: "Categoria"
                  }],
        dataSource: {
            transport: {
                read: {
                    url: "Articulos/leerTodos",
                    dataType: "json",
                    type: "POST"
                }
            },
            schema:
                {
                    model:
                       {
                           id: "idArticulo"
                       }
                }
        }
    });

    grid = $("#articulosGridAnadirPedido").data("kendoGrid");
    gridDisp = $("#articulosGridDisponibles").data("kendoGrid");

    $("#anadirPedidoVentanaAgregarButton").click(function () {
        var uid = $("#articulosGridAnadirPedido .k-state-selected").attr("data-uid");
        var fila = grid.dataSource.getByUid(uid);
        datasourceGrid.add(fila);
       
        grid.dataSource.remove(fila);
 
        gridDisp.refresh();
    });

    $("#fechaPedido").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

     $("#fechaPedidoPago").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

    $("#anadirPedidoVentanaCancelar").live('click', function () {
        var w = $("#anadirPedidoVentana").data("kendoWindow");
        w.close();
    });

    $("#anadirPedidoVentanaAceptar").live('click', function () {

        var nom = $("#nombre").val();
        var desc = $("#descuento").val();
        var date = $("#fechaPedido").val();
        var dateP = $("#fechaPedidoPago").val();
        var articulosRaw = datasourceGrid.view();
        var articulos = new Array();
        for (var i = 0; i < articulosRaw.length; i++) {
            articulos.push({
                "idArticulo": articulosRaw[i].idArticulo
            });
        }

        data = {
            Nombre: nom,
            Descuento: desc,
            Fecha: date,
            FechaPago: dateP,
            Articulos: kendo.stringify(articulos)
        };
        url = 'Pedidos/anadirPedido';
        $.post(url, data, function (data) {
            var w = $("#anadirPedidoVentana").data("kendoWindow");
            w.close();

            $("#pedidosGrid").data("kendoGrid").dataSource.read();
            var tabla = $("#pedidosGrid").data("kendoGrid");
            tabla.refresh();
        });
    });
    //***********************************************INDEX************************************************
    $("#cerrarPedidoButton").click(function () {
        var uid = $("#pedidosGrid .k-state-selected").attr("data-uid");
        var fila = gridPedidos.dataSource.getByUid(uid);
        data = {
            idPedidoGlobal: fila.idPedido
        };
        url = 'Pedidos/cerrarPedido';
        $.post(url, data, function (data){
            gridPedidos.dataSource.remove(fila);
            var tabla = $("#pedidosGrid").data("kendoGrid");
            tabla.refresh();
            location.reload("Pedidos/PedidosCerrados");
        });
    });
    
    $("#anadirPedidoButton").click(function () {
        $("#nombre").val("");
        $("#descuento").val("");
        var w = $("#anadirPedidoVentana").data("kendoWindow");
        w.center();
        w.open();
        var i = 0;
        for (i = 0; i < datasourceGrid.total(); i++) {
            datasourceGrid.remove(datasourceGrid.at(i));
        }
    });

    $(".botonInscribirsePedido").live('click', function () {
        limpiarTablaArticulosPedidoUsuario();
        var z = $("#inscripcionPedidoVentana").data("kendoWindow");
        
        var fila = $("#pedidosGrid").find("tbody tr.k-state-selected");
        var filajson = $("#pedidosGrid").data("kendoGrid").dataItem(fila).toJSON();
        var dataSourcePedidosGrid = $("#pedidosGrid").data("kendoGrid").dataSource;
        idPedido = dataSourcePedidosGrid.getByUid(fila.attr("data-uid")).idPedido;
        datasourceGridPedido = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "Pedidos/getArticulosByPedido",
                        data: { "idPedido": idPedido },
                        dataType: "json",
                        type: "POST"
                    }
                },
                schema:
                {
                    model:
                       {
                           id: "idArticulo"
                       }
                }
            });

        artPed = $("#articulosPedido").kendoGrid({
            selectable: true,
            columns: [
                  {
                      field: "nombre",
                      title: "Nombre"
                  },
                  {
                      field: "imagen",
                      title: "Imagen"
                  },
                   {
                       field: "descripcion",
                       title: "Descripcion"
                   },
                  {
                      field: "precio",
                      title: "Precio"
                  },
                  {
                      field: "categoriaNombre",
                      title: "Categoria"
                  }],
            dataSource: datasourceGridPedido
        }).data("kendoGrid");
        z.open();
        z.center();
    });

    gridPedidos = $("#pedidosGrid").kendoGrid({
        selectable: true,
        detailTemplate: kendo.template($("#templateDetailPedidos").html()),
        detailInit: inicializarTabla,
        columns: [
                  {
                      field: "nombre",
                      title: "Nombre"
                  },
                  {
                      field: "fechaLimite",
                      title: "Fecha límite de inscripción"
                  },
                  {
                      field: "fechaLimitePago",
                      title: "Fecha límite de pago"
                  },
                   {
                       field: "descuento",
                       title: "Descuento"
                   },
                  {
                      field: "total",
                      title: "Total"
                  },
                  {
                      title: "Unirse",
                      command: { text: "Inscripción", className: "botonInscribirsePedido" }
                  }],
        dataSource: {
            transport: {
                read: {
                    url: "Pedidos/leerTodos",
                    dataType: "json",
                    type: "POST"
                }
            },
            schema:
                {
                    model:
                       {
                           id: "idPedidoGlobal"
                       }
                }
        }
    }).data("kendoGrid");

});
       //***********************************FIN DEL DOCUMENT********************************************
       function limpiarTablaArticulosPedidoUsuario(){
                var i = 0;
                for (i = 0; i < datasourceGridPedidoUsuario.total() ; i++)
                {
                        datasourceGridPedidoUsuario.remove(datasourceGridPedidoUsuario.at(i));
                }
       }


       function inicializarTabla(e) {
           $(".tabsPedidos").kendoTabStrip();
           $(".lineasPedido").kendoGrid({
               selectable: true,
               detailTemplate: kendo.template($("#templateDetailPedidoUsuarios").html()),
               detailInit: inicializarTabla2,
               columns: [
               {
                   field: "usuario",
                   title: "Usuario"
               },
               {
                   field: "subtotal",
                   title: "Subtotal"
               }],
               dataSource: {
                   transport: {
                       read: {
                           url: "Pedidos/leerPedidosUsuarioByPedido",
                           data: { "idPedido" : e.data.idPedido},
                           dataType: "json",
                           type: "POST"
                       }
                   },
                   schema:
                       {
                           model:
                           {
                               id: "idPedidoUsuario",
                               fields:
                               {
                                   Nombre: "Nombre",
                                   Apellidos: "Apellidos",
                                   Sexo: "Sexo",
                                   Email: "Email",
                                   Avatar: "Avatar",
                                   Nacionaliad: "Nacionaliad"
                                }
                           }
                       }
               }
           });

           gridArticulosDePedido = $("#articulosDetallesPedido").kendoGrid({
               selectable: true,
               columns: [
                  {
                      field: "nombre",
                      title: "Nombre"
                  },
                  {
                      field: "imagen",
                      title: "Imagen"
                  },
                   {
                       field: "descripcion",
                       title: "Descripcion"
                   },
                  {
                      field: "precio",
                      title: "Precio"
                  },
                  {
                      field: "categoriaNombre",
                      title: "Categoria"
                  }],
               dataSource: {
                   transport: {
                       read: {
                           url: "Pedidos/getArticulosByPedido",
                           data: { "idPedido" : e.data.idPedido},
                           dataType: "json",
                           type: "POST"
                       }
                   },
                   schema:
                {
                    model:
                       {
                           id: "idArticulo"
                       }
                }
               }
           }).data("kendoGrid");

       }

       function inicializarTabla2(e) {
       $(".tabsPedidosUsuario").kendoTabStrip();
       $(".lineasPedidoUsuario").kendoGrid({
               selectable: true,
               columns: [
               {
                      field: "nombre",
                      title: "Nombre"
                  },
                  {
                      field: "imagen",
                      title: "Imagen"
                  },
                   {
                       field: "descripcion",
                       title: "Descripcion"
                   },
                  {
                      field: "precio",
                      title: "Precio"
                  },
                  {
                      field: "categoriaNombre",
                      title: "Categoria"
                  },
                  {
                      field: "unidades",
                      title: "Unidades"
                   }],
               dataSource: {
                   transport: {
                       read: {
                           url: "Pedidos/getArticulosByPedidoUsuario",
                           data: { "idPedidoUsuario" : e.data.idPedidoUsuario},
                           dataType: "json",
                           type: "POST"
                       }
                   },
                   schema:
                       {
                           model:
                           {
                               id: "idArticulo"
                           }
                       }
               }
           });

       }