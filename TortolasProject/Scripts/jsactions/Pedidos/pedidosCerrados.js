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

    $("#facturarPedidoButton").click(function () {
        var uid = $("#PedidosCerradosGrid .k-state-selected").attr("data-uid");
        var fila = gridPedidos.dataSource.getByUid(uid);
        console.log(fila);
        id = fila.idPedido;
        
        data = {
            idPedidoGlobal: id
        }
        

        url = 'facturarPedidoGlobal';

        $.post(url, data, function (data) {

        });
    });

    $(".botonEstablecerPagado").live('click', function () {
        var fila = $(".lineasPedido").find("tbody tr.k-state-selected");
        var filajson = $(".lineasPedido").data("kendoGrid").dataItem(fila);

        id = filajson.idPedidoUsuario;

        console.log(id);

        data = {
            idPedidoUsuario: id
        };
        url = 'facturarPedidoUsuario';
        $.post(url, data, function (data) {
              
        });
    });

    gridPedidos = $("#PedidosCerradosGrid").kendoGrid({
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
                    title: "Fecha Límite"
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
                }],
        dataSource: {
            transport: {
                read: {
                    url: "leerTodosCerrados",
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

//***********************************FIN DEL DOCUMENTO************************************

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
               },
               {
                   title: "",
                   command: { text: "Establecer pagado", className: "botonEstablecerPagado" }
               }],
            dataSource: {
                transport: {
                    read: {
                        url: "leerPedidosUsuarioByPedido",
                        data: { "idPedido": e.data.idPedido },
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
                        url: "getArticulosByPedido",
                        data: { "idPedido": e.data.idPedido },
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
                        url: "getArticulosByPedidoUsuario",
                        data: { "idPedidoUsuario": e.data.idPedidoUsuario },
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