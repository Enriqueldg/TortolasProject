<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="PedidosCerradosTitle" ContentPlaceHolderID="TitleContent" runat="server">
    PedidosCerrados
</asp:Content>

<asp:Content ID="PedidosCerradosMain" ContentPlaceHolderID="MainContent" runat="server">
<% if (User.Identity.IsAuthenticated && User.IsInRole("Junta Directiva"))
   { %>
<div id="facturarPedidoButton"><input type="button" class="k-button" value="Facturar pedido" /></div>
<div id="PedidosCerradosGrid"></div>

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

<% } %>

</asp:Content>

<asp:Content ID="PedidosCerradosCss" ContentPlaceHolderID="CssContent" runat="server">
</asp:Content>

<asp:Content ID="PedidosCerradosScript" ContentPlaceHolderID="ScriptContent" runat="server">
<script src="<%: Url.Content("~/Scripts/jsactions/Pedidos/pedidosCerrados.js") %>" type="text/javascript"></script>
</asp:Content>
