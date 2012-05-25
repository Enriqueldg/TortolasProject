<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    [MTB] Rutas
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <img src="../../Content/images/titulorutas.png" /><br />
<div id="tablaRutas"></div>

<div id="ventanaCrear">
    <center><img src="../../Content/images/nuevaruta.png" height="160" /></center><br />
    <div id="formularioCrear">
        <label for="nuevoNombre">Nombre:  </label><input type="text" class="k-textbox necesario" placeholder="Nombre de la Ruta" atributo="Nombre" width="300" id="nuevoNombre"/><br />
        <label for="nuevoKilometros">Kilometros:  </label><input type="text" class="numericKm" placeholder="kilometros" atributo="Kilometros" id="nuevoKilometros" /><br />
        <label for="nuevoDificultad">Dificultad:  </label><input type="text" class="comboDificultad" atributo="Dificultad" id="nuevoDificultad" /><br />
        <label for="nuevoEnlaceWeb">Enlace Web:   </label><input type="text" class="k-textbox" placeholder="enlace web" atributo="EnlaceWeb" id="nuevoEnlaceWeb" /><br />
        <label for="nuevoArchivo">Archivo <font color="blue"><u><a class="gpx">(*gpx)</a></u></font> : </label><input type="file" class="uploader" name="attachments" atributo="ArchivoRuta" id="nuevoArchivo" /><br />
        <label for="nuevoDescripcion">Descripcion   </label><br /><textarea id="nuevoDescripcion" class=" necesario" rows="10" cols="35" placeholder="Descripcion de la Ruta" id="nuevoDescripcion"></textarea><br />
    </div>    
    <br />
    <center>
        <input type="button" class="k-button" value="Crear Ruta" id="botonCrearRuta"/>
        <input type="button" class="k-button" value="Editar Ruta" id="editarRuta"/>
    </center>
</div>
    
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Rutas/Rutas.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="../../Scripts/jsactions/Rutas/Rutas.js" type="text/javascript"></script>
      <script type="text/javascript"
      src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCc8eoHPdFfC_ZI0ncqfFxxwlxFGkDIQVs&sensor=true">
    </script>
    
    <!-- TOOLBAR DEL KENDO GRID RUTAS -->
    <script type="text/x-kendo-template" id="templateToolbarRutas">
    <div class="toolbarIzq" style="float:left">
        <input type="button" class="k-button botonNuevaRuta" value="+ Añadir Ruta">
        <input type="button" class="k-button dueno" value="Editar" id="botonEditarRuta">
        <input type="button" class="k-button dueno" value="X Eliminar" id="botonEliminarRuta">
    </div>
    <div class="toolbarDer" style="float:right">
        Mensajes por Pagina
        <input type="text" class="k-textbox comboPageSize" id="comboPageRutas">
    </div>
    </script>  

    <!-- DETAIL TEMPLATE DEL KENDO GRID RUTAS -->    
    <script type="text/x-kendo-template" id="templateDetailRutas">
    <div class="tabsRutas">
        <div class="detallesRutas">
            <ul>
                <li><img src="../../Content/images/Information-icon.png" height="30" /> Informacion</li>
                <li><img src="../../Content/images/vermapa.png" height="30"/> Mapa</li>               
            </ul>
            <div class="pestanainfoMapas">
                <div class="informacion" style="margin-top:30px">
                    <table border="0">
                    <tr>
                    <td width="150">
                        <img src="../../Content/images/map_app.png" />
                    </td>
                    <td>
                        <ul class="listaInfo">
                            <li><label><b>Nombre</b> : </label>#= Nombre #</li>
                            <li><label><b>Kilometros</b> : </label>#= Kilometros #</li>
                            <li><label><b>Enlace web</b> : </label><a href="#= URL #">#= URL #</a></li>
                            <li><label><b>Autor : </b></label>#= Autor #
                            <li><label><b>Descripcion </b>: </label><li>
                            <div class="descripcion_#= idRuta #">
                        
                            </div> 
                        </ul>
                    </td>
                    </tr>
                    </table>
                </div>
            </div>
            <div class="mapa">
                <div class='map_canvas'></div>
            </div>          
        </div>
    </div>
    </script> 
</asp:Content>
