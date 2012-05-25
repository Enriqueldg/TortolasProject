<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="MovimientosTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Movimientos
</asp:Content>

<asp:Content ID="MovimientosMainContent" ContentPlaceHolderID="MainContent" runat="server">
    <%Html.RenderPartial("facturasNav"); %>
    <div id="facturaContainer"> 

        <div id="MovimientosGrid"></div>

        <div id="MovimientosVentana">        
            <label for='Fecha'>Fecha</label>                <input id='fechaMovimiento'                   name='Fecha'  /><br />
            <label for='Concepto'>Concepto</label>          <input id='conceptoMovimiento'      type='text' name='Concepto' class='k-input' /><br />
            <label for='Descripcion'>Descripción</label>    <input id='descripcionMovimiento'   type='text' name='Descripcion' class='k-input' /><br />
            <label for='Importe'>Importe</label>            <input id='totalMovimiento'                     name='Importe'  /><br />
            <br />
            <div id='descartarMovimiento' class='k-button'>Descartar</div>
            <div id='guardarMovimiento' class='k-button'>Crear movimiento</div>
        </div>

        <div id="FiltrosVentana"> 
            <label for='filtroFecha'>Periodo</label>     
            <div name='filtroFecha'>
                <label for='FechaInicial'>Inicial</label>       <input id='fechaInicial'    name='FechaInicial'  /><br />
                <label for='FechaFinal'>Final</label>         <input id='fechaFinal'    name='FechaFinal'  /><br />
            </div>  
            <label for='Concepto'>Concepto</label>          <input id='concepto'    type='text' name='Concepto' class='k-input' /><br />
            <label for='Responsable'>Responsable</label>    <input id='responsable' type='text' name='Responsable' class='k-input' /><br />
            
            <br />
            <div id='filtrarButton' class='k-button'>Filtrar</div>
        </div>

        <!-- 
        <div id="FechaFiltroVentana">
            <label for='FechaInicio'>Inicio</label><input id='fechaInicio' name='FechaInicio' /><br />
            <label for='FechaFin'>Fin</label><input id='fechaFin' name='FechaFin' /><br />
            <br />
            <div id='filtrarFechasButton'>Filtrar</div>
        </div>

        -->
    </div>

</asp:Content>

<asp:Content ID="MovimientosCssContent" ContentPlaceHolderID="CssContent" runat="server">
<link href="../../Content/Facturas/facturasNav.css" rel="stylesheet" type="text/css" /> 
<link href="../../Content/Facturas/movimientos.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="MovimientosScriptContent" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/facturasNav.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/movimientos.js") %>" type="text/javascript"></script>
</asp:Content>
