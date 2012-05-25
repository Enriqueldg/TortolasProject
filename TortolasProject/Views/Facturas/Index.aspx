<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="FacturasIndexCss" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Facturas/facturasNav.css" rel="stylesheet" type="text/css" /> 
    <link href="../../Content/Facturas/facturasIndex.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="FacturasIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/facturasNav.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/facturasIndex.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="FacturasIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Gestión de facturas
</asp:Content>

<asp:Content ID="FacturasIndexMain" ContentPlaceHolderID="MainContent" runat="server">
    <%Html.RenderPartial("facturasNav"); %>    

    <div id="facturaContainer">
        <div id="FacturasGrid"></div>        
    </div>

    <div id='filtrosVentana'>
                    <div id='relacionesTab'>
                        <ul>
                            <li class="k-state-active">General</li>
                            <li>Usuarios</li>
                            <li>Eventos</li>
                            <li>Cursillos</li>
                            <li>Pedidos globales</li>
                            <li>Pedidos usuario</li>
                            <li>Empresas</li>
                            <li>Proveedores</li>
                            <li>Contratos</li>
                        </ul>
                        <div id='generalDiv'>
                            <label for='periodoFechas'>Periodo</label>
                            <div id='periodoFechas'>
                                <label for='fechaInicial'>Inicial</label><input id='fechaInicial' />
                                <label for='fechaFinal'>Final</label><input id='fechaFinal' />
                            </div>
                            <label for='filtroUsuarios' class='filtrosCheckBox'>Usuarios</label><input id='filtroUsuarios' name='filtroUsuarios' type="checkbox" class='filtrosCheckBox k-checkbox' /><br />
                            <label for='filtroEventos' class='filtrosCheckBox'>Eventos</label><input id='filtroEventos' name='filtroEventos' type="checkbox" class='filtrosCheckBox k-checkbox' /><br />
                            <label for='filtroCursillos' class='filtrosCheckBox'>Cursillos</label><input id='filtroCursillos' name='filtroCursillos' type="checkbox" class='filtrosCheckBox k-checkbox' /><br />
                            <label for='filtroPedidoGlobal' class='filtrosCheckBox'>Pedidos globales</label><input id='filtroPedidoGlobal' name='filtroPedidoGlobal' type="checkbox" class='filtrosCheckBox k-checkbox' /><br />
                            <label for='filtroPedidoUsuario' class='filtrosCheckBox'>Pedidos usuarios</label><input id='filtroPedidoUsuario' name='filtroPedidoUsuario' type="checkbox" class='filtrosCheckBox k-checkbox' /><br />
                            <label for='filtroEmpresa' class='filtrosCheckBox'>Empresas</label><input id='filtroEmpresa' name='filtroEmpresa' type="checkbox" class='filtrosCheckBox k-checkbox' /><br />
                            <label for='filtroProveedores' class='filtrosCheckBox'>Proveedores</label><input id='filtroProveedores' name='filtroProveedores' type="checkbox" class='filtrosCheckBox k-checkbox' /><br />
                            <label for='filtroContrato' class='filtrosCheckBox'>Contratos</label><input id='filtroContrato' name='filtroContrato' type="checkbox" class='filtrosCheckBox k-checkbox' /><br />
                        </div>
                        <div id='usuariosFacturaDiv'>
                            <div id='usuariosFacturaGrid'></div>                        
                        </div>
                        <div id='eventosFacturaDiv'>
                            <div id='eventosFacturaGrid'></div>
                        </div>
                        <div id='cursillosFacturaDiv'>
                            <div id='cursillosFacturaGrid'></div>
                        </div>
                        <div id='pedidosGlobalesDiv'>
                            <div id='pedidosGlobalesGrid'></div>
                        </div>
                        <div id='pedidosUsuarioDiv'>
                            <div id='pedidosUsuarioGrid'></div>
                        </div>
                        <div id='empresasDiv'>
                            <div id='empresasGrid'></div>
                        </div>
                        <div id='proveedoresDiv'>
                            <div id='proveedoresGrid'></div>
                        </div>
                        <div id='contratosDiv'>
                            <div id='contratosGrid'></div>
                        </div>
                    </div>  
                    <div id='filtrarButton' class='k-button'>Filtrar</div>              
                
    </div>

    <script type="text/x-kendo-template" id="toolbarTemplate">
                <div class="toolbar">
                    <div class='k-button k-button-icontext'><%: Html.ActionLink("Nueva factura", "nuevaFactura", "Facturas") %></div>
                    <div class='ingresosButton k-button k-button-icontext'>Ingresos</div>
                    <div class='gastosButton k-button k-button-icontext'>Gastos</div>
                    <div class='pendientesButton k-button k-button-icontext'>Sólo pendientes</div>
                    <div class='ventanaFiltrosButton k-button k-button-icontext'>Más filtros</div>
                    <div class='pageSizeDropDownContainer'>
                        <label class="pagesize-label" for="pageSizeDropDown"></label>
                        <div class='pageSizeDropDown'></div>
                    </div>
                    <div class='limpiarButton k-button k-button-icontext'>Quitar filtros</div>
                </div>
    </script>
</asp:Content>

