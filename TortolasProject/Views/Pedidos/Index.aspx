<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="PedidosIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Pedidos
</asp:Content>

<asp:Content ID="PedidosIndexMain" ContentPlaceHolderID="MainContent" runat="server">

<% if (User.Identity.IsAuthenticated && User.IsInRole("Junta Directiva"))
   { %>
        <div id="cerrarPedidoButton"><input type="button" class="k-button" value="Cerrar pedido" /></div>
        <div id="anadirPedidoButton"><input type="button" class="k-button" value="Añadir pedido" /></div>
<% } %>
<div id="pedidosGrid"></div>

<script type="text/x-kendo-template" id="templateDetailPedidos">
    <div class="tabsPedidos">
                    <ul>
                        <li class="k-state-active">
                           Pedidos
                        </li>
                        <li>
                            Articulos disponibles para el pedido:
                        </li>
                    </ul>
                    <div>
                        <div class="lineasPedido"></div>
                    </div>
                    <div class="detallesPedidos">                                               
                        <div id="articulosDetallesPedido"></div>
                    </div>
                </div>
</script>

<script type="text/x-kendo-template" id="templateDetailPedidoUsuarios">

    <div class="tabsPedidosUsuario">
        <ul>
            <li class="k-state-active">
                Articulos del pedido de usuario
            </li>
            <li>
                Detalles del usuario
            <li>
        </ul>
        <div>
            <div class="lineasPedidoUsuario"></div>
        </div>
        <div class="detallesPedidoUsuario">
            <ul>
                <li><label>Nombre: </label>#= Nombre#</li>
                <li><label>Apellidos: </label>#= Apellidos#</li>
                <li><label>Sexo: </label>#= Sexo#</li>
                <li><label>Email: </label>#= Email#</li>
                <li><label>Avatar: </label>#= Avatar#</li>
                <li><label>Nacionaliad: </label>#= Nacionaliad#</li>
            </ul>
        </div>
    </div> 

</script>

<% if (User.Identity.IsAuthenticated && User.IsInRole("Junta Directiva")) { %>
<div id="anadirPedidoVentana"> 
    Nombre <input type="text" class="k-textbox necesario" id="nombre"/> <br/>
    Descuento <input type="text" class="k-textbox necesario" id="descuento"/> <br/>
    Fecha límite de inscripción <input type="text" class="k-textbox necesario" id="fechaPedido"/> <br/>
    Fecha límite de pago <input type="text" class="k-textbox necesario" id="fechaPedidoPago"/> <br/>
    <div id="articulosGridDisponibles"></div>
    <div id="articulosGridAnadirPedido"></div>
    <div id="anadirPedidoVentanaAgregarButton"><input type="button" class="k-button" value="Agregar" /></div>
    <div id="anadirPedidoVentanaAceptar"><input type="button" class="k-button" value="Aceptar" /></div>
    <div id="anadirPedidoVentanaCancelar"><input type="button" class="k-button" value="Cancelar" /></div>
 </div>
 <% } %>

 <div id="inscripcionPedidoVentana"> 
    Selecciona los articulos
    <div id="articulosPedidoUsuario"></div>
    <div id="articulosPedido"></div>
    <div id="inscripcionPedidoVentanaAgregarButton"><input type="button" class="k-button" value="Agregar" /></div>
    <div id="inscripcionPedidoVentanaAceptar"><input type="button" class="k-button" value="Aceptar" /></div>
    <div id="inscripcionPedidoVentanaCancelar"><input type="button" class="k-button" value="Cancelar" /></div>
 </div>

</asp:Content>

<asp:Content ID="PedidosIndexCss" ContentPlaceHolderID="CssContent" runat="server">
<link href="../../Content/Pedidos/formatoArticulos.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="PedidosIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
 <script src="<%: Url.Content("~/Scripts/jsactions/Pedidos/pedidosIndex.js") %>" type="text/javascript"></script>
</asp:Content>
