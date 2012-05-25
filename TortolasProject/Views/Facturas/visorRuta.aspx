<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    visorRuta
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<h2>visorRuta</h2>
<div id='map_canvas'></div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Facturas/visorRuta.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptContent" runat="server">
    <script type="text/javascript"
      src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCc8eoHPdFfC_ZI0ncqfFxxwlxFGkDIQVs&sensor=true">
    </script>
    <script src="../../Scripts/jsactions/Facturas/visorRutas.js" type="text/javascript"></script>
</asp:Content>
