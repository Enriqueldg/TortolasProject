<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    [MTB] Administracion de Socios
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <img src="../../Content/images/tituloadminsocios.png" />
    <br />

    <div id="tabsAdminJunta">
        <ul>
            <li class="k-state-active">
                <img src="../../Content/iconos/Lime-Dossier.png" width="40" /> Socios & Junta Directiva
            </li>
            <li>
                <img src="../../Content/iconos/money.png" width="40"/> Cuotas y Descuentos
            </li>
        </ul>
        
    <!-- TAB PARA ADMINISTRACION DE SOCIOS Y JUNTA DIRECTIVA -->
    <div class="pestana" id="sociosjunta">
    <br />
        <img src="../../Content/images/tituloinneradminsocios.png" />
    <br />
    <h1>Socios</h1>
    <hr />
    <div id="tablaAdminSocios"></div>

    <br />
    <h1>Junta Directiva</h1>
    <hr />
    <div id="tablaAdminJunta"></div>

    <div class="ventana" id="ventanaNuevoSocio">
        <div class="ventanaWrapper">
            <center><img src="../../Content/images/tituloventananuevosocio.png" /></center><br /><br />
            <h4><center>Bienvenido a la creacion de un nuevo Socio de MTB Malaga.</center><br />
                Todo Socio debe tener un usuario asociado, tiene dos formas de crear un nuevo Socio: especificando usuario y contraseña y opcionalmente el email o seleccionando la opcion generacion aleatoria.
                <br /><br />           
            </h4>
           
            <div class="formularioVentana">                
                <label for="nuevoNickname">Usuario : </label><input type="text" class="k-textbox random necesario" placeholder="Nickname del Usuario" atributo="UserName" id="nuevoNickname"/><br />
                <label for="nuevoPassword">Contraseña : </label><input type="text" class="k-textbox random necesario" placeholder="Contraseña del Usuario" atributo="Password" id="nuevoPassword"/><br />
                <input type="checkbox" id="usuarioRandom" /> Generar el Usuario aleatoriamente                
                <br /><br />
                <label for="nuevoEmail">Email : </label><input type="text" class="k-textbox necesario" placeholder="Email" atributo="Email" id="nuevoEmail"/><br />
                <label for="nuevoNumeroSocio">Numero Socio: </label><input type="text" class="k-textbox necesario" placeholder="Numero Socio" atributo="NumeroSocio" id="nuevoNumeroSocio"/><br />
                <label for="nuevoNombre">Nombre : </label><input type="text" class="k-textbox necesario" placeholder="Nombre del Socio" atributo="Nombre" id="nuevoNombre"/><br />
                <label for="nuevoApellidos">Apellidos : </label><input type="text" class="k-textbox necesario" placeholder="Apellidos del Socio" atributo="Apellidos" id="nuevoApellidos"/><br />
                <label for="nuevoFechaAlta">Fecha Alta : </label><input type="text" class="k-textbox date necesario" placeholder="Fecha Alta del Socio" atributo="FechaAlta"  id="nuevoFechaAlta"/><br />
                <label for="nuevoFechaExpiracion">Fecha Expiracion : </label><input type="text" class="k-textbox date necesario" placeholder="Fecha Expiracion del Socio" atributo="FechaExpiracion" id="nuevoFechaExpiracion"/><br />                
                <div id="fechaBaja">
                    <label for="nuevoFechaBaja">Fecha Baja : </label><input type="text" class="k-textbox date" placeholder="Fecha Baja del Socio" atributo="FechaBaja" id="nuevoFechaBaja" /><br />
                </div>
                <label for="nuevoEstado">Estado : </label><input type="text" class="k-textbox comboEstado" placeholder="Estado del Socio" atributo="Estado" id="nuevoEstado"/><br />
                <br />
            </div>
            <input type="button" id="botonNuevoSocio" class="k-button" value="Crear Socio"  /><input type="button" id="botonCancelar" class="k-button" value="Cancelar" />
        </div>
    </div>

    <div class="ventana" id="ventanaEditarSocio">
        <div class="ventanaWrapper">
            <center><img src="../../Content/images/tituloventanaeditarsocio.png" /></center><br /><br />
            
            <h4><center>Bienvenido a la edicion de un nuevo Socio de MTB Malaga.</center><br />                
                <br />           
            </h4>
           
            <div class="formularioVentanaEditar">                               
                
                <label for="editarNumeroSocio">Numero Socio: </label><input type="text" class="k-textbox necesario" placeholder="Numero Socio" atributo="NumeroSocio" id="editarNumeroSocio"/><br />
                <label for="editarNombre">Nombre : </label><input type="text" class="k-textbox necesario" placeholder="Nombre del Socio" atributo="Nombre" id="editarNombre"/><br />
                <label for="editarApellidos">Apellidos : </label><input type="text" class="k-textbox necesario" placeholder="Apellidos del Socio" atributo="Apellidos" id="editarApellidos"/><br />         
                <label for="editarFechaAlta">Fecha Alta : </label><input type="text" class="k-textbox date necesario" placeholder="Fecha Alta del Socio" atributo="FechaAlta"  id="editarFechaAlta"/><br />
                <label for="editarFechaExpiracion">Fecha Expiracion : </label><input type="text" class="k-textbox date necesario" placeholder="Fecha Expiracion del Socio" atributo="FechaExpiracion" id="editarFechaExpiracion"/><br />
                <label for="editarFechaBaja">Fecha Baja : </label><input type="text" class="k-textbox date" placeholder="Fecha Baja del Socio" atributo="FechaBaja" id="editarFechaBaja"/><br />
                <label for="editarEstado">Estado : </label><input type="text" class="k-textbox comboEstado" placeholder="Estado del Socio" atributo="Estado" id="editarEstado"/><br />
                <input type="hidden" atributo="idSocio" class="idSocioSeleccionado"/>
                <br />
            </div>
            <input type="button" id="botonEditarSocio" class="k-button" value="Editar Socio"  /><input type="button" id="botonCancelarEdicion" class="k-button" value="Cancelar" />
        </div>
    </div>

    </div>

    <!-- TAB DE DESCUENTOS Y CUOTAS DE SOCIOS -->
    <div class="pestana" id="cuotasdescuento">
        <br />
        <center><img src="../../Content/images/titulocuotas.png" /></center><br />
        <h1>Cuotas</h1>
        <hr />
        <div class="cuotasWrapper">
            <table border="0">
                <tr>
                    <td><div class="tablaCuotas" id="tablaCuotas"></div></td>
                    <td><center><h3>Descuento por meses</h3></center>
                            Este es un tipo de Descuento para aquellos Socios que decidan hacer un pago de cuota largo, benificiarlos con un descuento.    <br />                        
                    <div class="tablaCuotas" id="tablaDescCuotas"  ></div>       </td>
                </tr>
            </table>
                           
        </div>
        <br /><br />
        <h1>Descuentos de Socios</h1>
        <hr /><br />
        <p style="margin: 10px 15px 10px 15px">
            Existen dos descuentos dentro de la Asociación, acumulativos. El primero es por el hecho de ser Socio recibe un descuento fijo en todos los productos 
            y el segundo es para premiar la antiguedad del Socio.
        </p>
        <br />
        <div id="tablaDescuentoSocio"></div>
        <br />
    </div>

    </div>
    
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Administracion/Socios/AdminSocios.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="../../Scripts/jsactions/Administracion/Socios/AdminSocios.js" type="text/javascript"></script>
        
    <script type="text/x-kendo-template" id="templateToolbarCuotasPendientes">
         <input type="button" class="k-button botonCambiarEstadoCuota"  value="Cambiar estado de Cuota">
    </script>

    <script type="text/x-kendo-template" id="templateToolbarAdminCuotas">
         <input type="button" class="k-button" id="cambiarPrecioCuota" value="Cambiar Precio">
         <input type="text" class="k-textbox numericCuota" id="numericCuota">
    </script>

    <script type="text/x-kendo-template" id="templateToolbarDescuentoSocios">
         <input type="button" class="k-button" id="botonModificarDescuentoSocio" value="Modificar Descuento Socio" style="float:left" >
         <input type="text" class="k-textbox" id="numericCantidad" >
         <input type="text" class="k-textbox" id="numericAnnos"  >
         <input type="button" class="k-button" id="botonSincronizarAntiguedad" value="Sincronizar Antigüedad" style="float:right" >
    </script>

    <script type="text/x-kendo-template" id="templateToolbarAdminDescCuotas">
         <input type="button" class="k-button" id="cambiarPrecioDescCuota" value="Modificar">
         <input type="text" class="k-textbox numeric Desc" id="numericDescCuota">
         <input type="text" class="k-textbox comboTipoDesc Desc" id="comboTipoDesc">
         <input type="text" class="k-textbox numericMeses Desc" id="numericMeses">         
    </script>
    
    <script type="text/x-kendo-template" id="templateToolbarAdminSocio">        
             
             <div class="toolbarIzq">
                <input type="button" class="k-button" id="botonCrearSocio" value="+ Nuevo Socio">
                <input type="button" class="k-button" id="botonSincronizarEstados" value="Sincronizar Estados Socio">               
             </div>
             <div class="toolbarDer">
                <input type="button" class="k-button" id="botonAscenderJD" value="Ascender a Junta Directiva">
                <input type="text" class="comboCargo" id="comboCargo">                                             
             </div>
    </script>

    <script type="text/x-kendo-template" id="templateToolbarAdminJunta">        
                          
                <input type="button" class="k-button estadoJunta" id="botonActivarDirectivo" funcion="Activo" value="Activar Directivo">
                <input type="button" class="k-button estadoJunta" id="botonDesactivarDirectivo" funcion="Inactivo" value="Desactivar Directivo">
                <div class="toolbarDer">
                    <input type="button" class="k-button" id="cambiarCargo" value="Cambiar Cargo">
                    <input type="text" class="comboCargo" id="comboCargoJunta" >                    
                </div>
    </script>

    <script type="text/x-kendo-template" id="templateDetailAdminSocio">
        <div class="tabsSocios">
            <ul>
                <li><img src="../../Content/iconos/Hot/72x72/Paste.png" width="30"/>Informacion</li>
                <li><img src="../../Content/iconos/wallet.png" width="30" />Pagos</li>
            </ul>
            <div class="infoSocio">
                <table>                                                 
                            <tr>
                            <td>
                                <img src="#= Foto #" width="180" height="150" style="float:left">
                            </td>
                            <td>
                                <li><label>Numero Socio:</label>#= NumeroSocio #</li>
                                <li><label>Nombre:</label>#= Nombre #</li>
                                <li><label>Apellidos:</label>#= Apellidos #</li>                                                                                                                                
                                <li><label>Fecha Alta:</label>#= FechaAlta #</li>
                                <li><label>Fecha Baja:</label>#= FechaBaja #</li>
                                <li><label>Fecha Expiracion:</label>#= FechaExpiracion #</li>
                                <li><label>Estado:</label>#= Estado #</li>
                            </td>
                            </tr>
                            </table>   
            </div>
            <div>
                <h3>Cuotas/Altas pagadas</h3><br>
                <div class="Pagados" id="pagados_#= idSocio #">

                </div>
                
                                   
                <br>
                <h3>Cuotas/Altas pendientes<h3><br>
                <div class="Pendientes" id="pendientes_#= idSocio #">
                   
                </div>
            </div>
        </div>
    </script>
</asp:Content>
