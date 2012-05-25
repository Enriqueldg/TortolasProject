<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>Movimiento</title>
    <link href="../../../Content/Facturas/movimientoPDF.css" rel="stylesheet" type="text/css" />
</head>
<body>
     <div id='movimientoHeader'>
            <div id='logoContainer'>
                <img alt="MTB Málaga" class="logoPDF" src="../../../Content/logo_azul.png" />
            </div> 
            <div id='tituloDocumento'>Movimiento</div> 
    </div> 
     <div id='movimientoContainer'>        
            <div id='fechaContainer' class='leftContent'>
                <label id='fechaLabel' class='titulo'>Fecha</label>
                <div id='fecha' class='valor'><% Response.Write(Model.Fecha.ToShortDateString()); %></div>
            </div>        
            <div id='responsableContainer' class='rightContent'>
                <label id='ResponsableLabel' class='titulo'>Responsable</label>
                <div id='responsable' class='valor'><% Response.Write(Model.ResponsableName); %></div>   
            </div>
            <br />
            <br />
            <br />
            <br />

            <div id='conceptoContainer' class='leftContent'>
                <label id='ConceptoLabel' class='titulo'>Concepto</label>
                <div id='concepto' class='valor'><% Response.Write(Model.Concepto); %></div>
                </div>
            <div id='totalContainer' class='rightContent'>
                <label id='TotalLabel' class='titulo'>Importe</label>
                <div id='total' class='valor'><% Response.Write(Model.Total); %> €</div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div id='descripcionContainer' class='leftContent'>
                <label id='DescripcionLabel' class='titulo'>Descripción</label>
                <div id='descripcion' class='valor'><% Response.Write(Model.Descripcion); %></div>
            </div>
            
        </div>
</body>
</html>
