

<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

                    
            <center>
                <img src="../../Content/images/titulobienvenida.png" /><br />
                <img src="../../Content/images/titulocaptacion.png" />
            </center>
                       
             <p style="margin:10px 5px 10px 5px">
                <h2>A continuacion le mostraremos una serie de gráficas de los ultimos tres años sobre datos de la Asociacion.</h2>                       
                <br /><br />
             </p>
            <div id="graficas">
                <ul>
                    <li><img src="../../Content/iconos/calculator.png" height="30"/>Calculadora</li>
                    <li><img src="../../Content/images/tabaltas.png" height="30" />Altas</li>
                    <li><img src="../../Content/images/tabnumerosocios.png" height="30"/>Socios</li>                       
                </ul>
                <div id="pestanaCalculadora">
                   <center> <h1><img src="../../Content/images/calculatorahorro.png" height="80"/>Calculadora de Ahorro</h1></center>
                    <br />
                    <div id="formularioCalculadora">
                        Para conocer el ahorro que puede conseguir al ser socio de MTB Malaga rellene los campos de abajo y le mostraremos el ahorro.<br /><br />
                        <label>¿Cuanto sueles gastarte en comprar material?   </label><input type="text" class="numeric" id="dineroMaterial" /><br />
                        <label>¿Cuanto sueles gastarte participando en eventos?   </label><input type="text" class="numeric" id="dineroEventos" /><br />
                        <label>.... y si fueses ... </label> <input type="text" id="comboTipoSocio" /> <font color="red">*</font><br />
                        <center><input type="button" class="k-button" id="generarResultado" value="Generar"/></center>
                    </div>
                    <br /><br />
                        <center><h1><font color="red"><div id="resultado"></div></font></h1></center>
                    <br /><br /><br />
                    * : Existen dos tipos de Socios : los Socios que son recientes o los que tienen ciertos años de antigüedad.
                </div>
                <div id="pestanaAltas">                 
                        
                        <div id="graficaAltas"></div>
                 </div>
                 <div id="pestanaNumeroSocios">
                 <br /><br />
                            <p style="margin:20px 0px 10px 30px" id="numeroDeSocios" ><b>Numero de Socios actuales:  <b></p>
                            <div id="graficaNumeroSocio"></div>
                 </div>                
              </div>          
                                             
<link href="../../Content/Captacion/Captacion.css" rel="stylesheet" type="text/css" />
</asp:Content>
