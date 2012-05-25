<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="graficosTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Gráficas contables
</asp:Content>

<asp:Content ID="graficosMainContent" ContentPlaceHolderID="MainContent" runat="server">
 <%Html.RenderPartial("facturasNav"); %>
 <div id='facturaContainer'>
     <div id="GraficosContainer" class='k-grid k-widget'>
        <div id='graficaToolbar' class='k-toolbar k-grid-toolbar'>        
            <a id='todos' class='k-button'>Todos</a>
            <a id='ingresos' class='k-button'>Ingresos</a>
            <a id='gastos' class='k-button'>Gastos</a>         
            <span id='fechaLabel' class='periodo'>Periodo</span>        
            <span class='.periodoFecha' class='periodo'>Inicial</span><input id='fechaInicio' name='fechaInicio' class='periodo'/>
            <span class='.periodoFecha' class='periodo'>Final</span><input id='fechaFinal' name='fechaFinal' class='periodo' />
            <a id='filtrarFecha' class='k-button periodo'>Por fecha</a>        
        </div>
        <div id='grafica' class='k-grid-content'></div> 
     </div>
    </div>
</asp:Content>

<asp:Content ID="graficosCssContent" ContentPlaceHolderID="CssContent" runat="server">
<link href="../../Content/Facturas/facturasNav.css" rel="stylesheet" type="text/css" /> 
<link href="../../Content/Facturas/graficosContables.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="graficosScriptContent" ContentPlaceHolderID="ScriptContent" runat="server">
 <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/graficosContables.js") %>" type="text/javascript"></script>
 <script src="<%: Url.Content("~/Scripts/Highcharts/highcharts.js") %>" type="text/javascript"></script>
 <script src="<%: Url.Content("~/Scripts/Highcharts/highstock.js") %>" type="text/javascript"></script>
</asp:Content>
