<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Register Assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304"
    Namespace="CrystalDecisions.Web" TagPrefix="CR" %>

<asp:Content ID="informesTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Informes contables
</asp:Content>

<asp:Content ID="informesMainContent" ContentPlaceHolderID="MainContent" runat="server">
 <%Html.RenderPartial("facturasNav"); %>
 <div id="facturaContainer"> 


    <CR:CrystalReportSource ID="CrystalReportSource1" runat="server">
            <Report FileName="/Informes/facturacion.rpt">
            </Report>
        </CR:CrystalReportSource>
        <CR:CrystalReportViewer ID="CrystalReportViewer1" runat="server" 
            AutoDataBind="true" ReportSourceID="CrystalReportSource1" 
            ToolPanelView="None" />

 </div>
</asp:Content>

<asp:Content ID="informesCssContent" ContentPlaceHolderID="CssContent" runat="server">
<link href="../../Content/Facturas/facturasNav.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="informesScriptContent" ContentPlaceHolderID="ScriptContent" runat="server">
</asp:Content>
