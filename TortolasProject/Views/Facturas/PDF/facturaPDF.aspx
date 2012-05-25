<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<TortolasProject.Models.tbFactura>" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>facturaPDF</title>
    <link href="../../../Scripts/styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../../../Content/Facturas/facturaPDF.css" />
    <link href="../../../Scripts/styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <script src="<%: Url.Content("~/Scripts/jquery-1.7.2.min.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/modernizr-1.7.min.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/kendo.all.min.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/cultures/kendo.culture.es-ES.min.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/generarFacturaPDF.js") %>" type="text/javascript"></script>
    
</head>

<body>
        <input type="hidden" id='idFactura' value='<%= Model.idFactura%>' />
        <div id='facturaHeader'>
            <div id='logoContainer'>
                <img alt="MTB Málaga" class="logoPDF" src="../../Content/logo_azul.png" />
            </div> 
            <div id='tituloDocumento'>Factura</div> 
        </div>  
        <div id='facturaContainer'>
            <div id='detallesFactura'>
                <div id='relacionDiv' class='rightContent valor'>
                    <% Response.Write(Model.RelacionName);  %>              
                </div>    

                <div id='fechaFacturaDiv' class='leftContent'>
                    <label for='fechaFacturaValor' id='fechaFacturaLabel' class='titulo'>Fecha</label>
                    <div id='fechaFacturaValor' class='valor'>
                    <%
                        Response.Write(Model.Fecha.ToShortDateString());                                
                    %>
                    </div> 
                </div>
                <br />
                <br />
                <br />
                <br />

                <div id='conceptoFacturaDiv' class='leftContent'>
                    <label for='conceptoFacturaValor' class='titulo'>Concepto</label>
                    <div id='conceptoFacturaValor'>
                    <%
                        Response.Write(Model.Concepto);                   
                    %>
                    </div>
                </div>
                <div id='responsableFacturaDiv' class='rightContent'>
                    <div id='responsableFacturaValor' class='valor'>
                        <% if(!Model.ResponsableName.Equals("system")) Response.Write(Model.ResponsableName); %>
                    </div>
                </div>
                <div id='estadoFacturaDiv' class='rightContent'>                
                    <div id='estadoFacturaValor' class='valor'>
                        <% Response.Write(Model.EstadoName); %>
                    </div>
                </div>
            </div>
        
            <div id='grid'></div>
        
            <div id='facturaBottom'>
                <div id='totalFacturaDiv' class='rightContent'>
                        <label for='baseImponibleValor' class='titulo'>Base imponible</label>
                        <div id='baseImponibleValor'><% Response.Write(Model.BaseImponible); %></div>
                        <label id='ivaLabel' class='titulo'>IVA</label>
                        <div id='ivaNumero' class='valor'>18%</div>
                        <label for='totalFacturaNumero' id='totalFacturaLabel' class='titulo'>Total</label>
                        <div id='totalFacturaNumero' class='valor'><% Response.Write(Model.Total); %></div>
                </div>
            </div>
        </div>

</body>
</html>
