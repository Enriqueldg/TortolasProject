<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="EmpresasIndexCss" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Empresas/EmpresasNav.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Empresas/EmpresasNew.css" rel="stylesheet" type="text/css" /> 
    <link href="../../Content/Empresas/FormatoTexto.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="EmpresasIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Empresas/EmpresasNav.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Empresas/EmpresasIndex.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Empresas/NuevaEmpresa.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Asociaciones/Asociaciones.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Proveedores/Proveedores.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Patrocinadores/Patrocinadores.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Convenios/Convenios.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Contratos/Contratos.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="EmpresasIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Gestión de Empresas
</asp:Content>

<asp:Content ID="EmpresasIndexMain" ContentPlaceHolderID="MainContent" runat="server">
     <div id="EmpresasNavegador" class="k-widget">
        <ul>
            <li id="EmpresasNav" class="k-state-active">
                Empresas
            </li>
            <li id="AsociacionesNav">
                Asociaciones
            </li>
            <li id="ProveedoresNav">
                Proveedores
            </li>
            <li id="PatrocinadoresNav">
                Patrocinadores
            </li>  
            <li id="ConveniosNav">
                Convenios
            </li>  
            <li id="ContratosNav">
                Contratos
            </li>  
        </ul> 
        <div class="pestana" id="empresas">
            <img src="../../Content/images/empresas.png"  /> <!--Fuente: Calibri, size: 24-->
            <div id="EmpresasGrid">
            
            </div>
            <br />
            <div id="EmpresasHerramientasContent">
                <input type="button" value="Nueva Empresa" id="BotonNuevaEmpresa" class="k-button" />
            </div>
        </div>
        <div class="pestana" id="asociaciones">
            <img src="../../Content/images/asociaciones.jpg"  /> <!--Fuente: Calibri, size: 24-->
            <div id="AsociacionesGrid">
            
            </div>
            <br />
            <div id="AsociacionesHerramientasContent">
                <input type="button" value="Nueva Asociación" id="BotonNuevaAsociacion" class="k-button" />
            </div>
        </div>
        <div class="pestana" id="proveedores">
            <img src="../../Content/images/proveedores.jpg"  /> <!--Fuente: Calibri, size: 24-->
            <div id="ProveedoresGrid">
            
            </div>
            <br />
            <div id="ProveedorHerramientasContent">
                <input type="button" value="Nueva Proveedor" id="BotonNuevoProveedor" class="k-button" />
            </div>
        </div> 
        <div class="pestana" id="patrocinadores">
            <img src="../../Content/images/patrocinador.jpg"  /> <!--Fuente: Calibri, size: 24-->
            <div id="PatrocinadoresGrid">
            
            </div>
            <script type="text/x-kendo-template" id="detallepublicidad">
                <img src="../../Content/images/publicidad.jpg"  /> <!--Fuente: Calibri, size: 24-->
                <div class="PublicidadGrid">
                </div>
                <br />
                <input type="button" value="Nuevo Elemento Publicitario" class="k-button BotonNuevaPublicidad" />
            </script>
            <br />
            <div id="PatrocinadorHerramientasContent">
                <input type="button" value="Nueva Patrocinador" id="BotonNuevoPatrocinador" class="k-button" />
            </div>
        </div> 
        <div class="pestana" id="convenios">
            <img src="../../Content/images/convenios.jpg"  /> <!--Fuente: Calibri, size: 24-->
            <div id="ConveniosGrid">
            
            </div>
            <br />
            <div id="ConveniosHerramientasContent">
                <input type="button" value="Nueva Convenio" id="BotonNuevoConvenio" class="k-button" />
            </div>
        </div>
        <div class="pestana" id="contratos">
            <img src="../../Content/images/contrato.jpg"  /> <!--Fuente: Calibri, size: 24-->
            <div id="ContratosGrid">
            
            </div>
            <br />
            <div id="ContratosHerramientasContent">
                <input type="button" value="Nueva Contrato" id="BotonNuevoContrato" class="k-button" />
            </div>
        </div>
          
    </div> 
    <br />

    <div id="VentanaEditar">
        <b><h5>Datos Empresa</h5></b>
        <br />
        <label for="nombreempresa">Nombre: </label><input type="text" id="nombreempresa" class=" CuadroTexto k-textbox requerido" /><br />
        <label for="cif">CIF: </label><input type="text" id="cif" class=" CuadroTexto k-textbox requerido" /><br />
        <label for="localidad">Localidad: </label><input type="text" id="localidad" class=" CuadroTexto k-textbox" /><br />
        <label for="direccionweb">Dirección Web: </label><input type="text" id="direccionweb" class=" CuadroTexto k-textbox" /><br />
        <label for="telefonodecontacto">Teléfono de Contacto: </label><input type="text" id="telefonodecontacto" class=" CuadroTexto k-textbox requerido" /><br />
        <label for="email">E-Mail: </label><input type="text" id="email-c" class=" CuadroTexto k-textbox" /><br />
        <center>
            <div hidden="hidden" id="MensajeErrorEmpresaEditar" class="FormatoMensajeError">
                    <p>Datos nulos o erroneos</p>
            </div>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEditar" class="k-button VisibilidadBotonAceptarEditar" />
            <input type="button" value="Confirmar" id="BotonAceptarVentanaEliminar" class="k-button VisibilidadBotonAceptarEliminar" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEditar" class="k-button" />           
        </center>
    </div>

    <div id="VentanaCrearEmpresa" class="ComprobarNulos">
        <h5>Datos Empresa</h5>
        <label for="nombreempresa">Nombre: </label><input type="text" id="newnombreempresa" class="k-textbox requerido" /><br />
        <label for="cif">CIF: </label><input type="text" id="newcif" class="k-textbox requerido" /><br />
        <h5>Datos Contacto</h5>
        <label for="localidad">Localidad: </label><input type="text" id="newlocalidad" class=" k-textbox" /><br />
        <label for="direccionweb">Dirección Web: </label><input type="text" id="newdireccionweb" class=" k-textbox" /><br />
        <label for="telefonodecontacto">Teléfono de Contacto: </label><input type="text" id="newtelefonodecontacto" class=" k-textbox requerido" /><br />
        <label for="email">E-Mail: </label><input type="text" id="newemail-c" class=" k-textbox" /><br />
        <center>
            <div id="NuevaEmpresaHerramientasContent">
                <div hidden="hidden" id="MensajeErrorEmpresas" class="FormatoMensajeError">
                    <p>Datos nulos o erroneos</p>
                </div>
                <input type="button" value="Confirmar" id="BotonConfirmarNuevaEmpresa" class="k-button" />
                <input type="button" value="Cancelar" id="BotonCancelarNuevaEmpresa" class="k-button FuncionBotonCancelarProveedores" />
            </div>
        </center>
    </div>

    <div id="VentanaEditarAsociacion" class="ComprobarNulosAsociaciones">
        <b><h5>Datos Asociacion</h5></b>
        <br />
        <label for="nombreempresaasociacion">Nombre: </label><input type="text" id="nombreempresaasociacion" class=" CuadroTexto NoModificable nombreempresaasociacion k-textbox requerido" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifremoto" class=" CuadroTexto NoModificable cifremoto k-textbox requerido" /> <input type="button" value="Vincular Empresa" id="BotonVincularEmpresaDesdeAsociacion" class="k-button VisibilidadBotonVincularEmpresa" /><br />
        <label for="direccion">Dirección: </label><input type="text" id="direccion" class=" CuadroTexto k-textbox" /><br />
        <label for="tematica">Temática: </label><input type="text" id="tematica" class=" CuadroTexto k-textbox" /><br />
        <label for="telefono" class="VisibilidadTelefonodeContacto">Teléfono de Contacto: </label><input type="text" id="telefonoremoto" class=" CuadroTexto VisibilidadTelefonodeContacto NoModificable k-textbox requerido" /><br />
        <hr />

        <div id="DatosNuevaEmpresaRemota" class="VisibilidadDatosNuevaEmpresaRemota">
            <b><h5>Datos Empresa Asociada</h5></b>
            <br />
            <label for="localidad">Localidad: </label><input type="text" id="localidadremota" class=" CuadroTexto localidadremota k-textbox" /><br />
            <label for="direccionweb">Dirección Web: </label><input type="text" id="dirwebremota" class=" CuadroTexto dirwebremota k-textbox" /><br />
            <label for="telefonodecontacto">Teléfono de Contacto: </label><input type="text" id="telefonoremoto2" class=" CuadroTexto telefonoremoto2 k-textbox requerido" /><br />
            <label for="email">E-Mail: </label><input type="text" id="emailremoto" class=" CuadroTexto emailremoto k-textbox" /><br />
        </div>

        <center>
            <div hidden="hidden" id="MensajeErrorAsociaciones" class="FormatoMensajeError">
                    <p>Datos nulos o erroneos</p>
            </div>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEditarAsociacion" class="k-button VisibilidadBotonAceptarEditar" />
            <input type="button" value="Confirmar" id="BotonAceptarVentanaEliminarAsociacion" class="k-button VisibilidadBotonAceptarEliminar" />
            <input type="button" value="Crear" id="BotonAceptarVentanaCrearAsociacion" class="k-button VisibilidadBotonAceptarCrear" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEditarAsociacion" class="k-button" />           
        </center>

        
    </div>

    <div id="VentanaEditarProveedor">
        <b><h5>Datos Proveedor</h5></b>
        <br />
        <label for="nombreempresaproveedor">Nombre: </label><input type="text" id="nombreempresaproveedor" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifproveedor" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="direccion">Dirección Física: </label><input type="text" id="dirfisica" class=" CuadroTexto k-textbox" /><br />
        <label for="mercado">Mercado: </label><input type="text" id="mercado" class=" CuadroTexto k-textbox" /><br />
        <label for="codigopostal">Código Postal: </label><input type="text" id="codigopostal" class=" CuadroTexto VisibilidadTelefonodeContacto k-textbox" /><br />
        <br />
        <hr />
        <br />


        <center>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEditarProveedor" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEditarProveedor" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaEliminarProveedor">
        <b><h5>Datos Proveedor</h5></b>
        <br />
        <label for="nombreempresaproveedor">Nombre: </label><input type="text" id="nombreempresaproveedoreliminar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifproveedoreliminar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="direccion">Dirección Física: </label><input type="text" id="direccionproveedoreliminar" class=" CuadroTexto k-textbox" /><br />
        <label for="mercado">Mercado: </label><input type="text" id="mercadoproveedoreliminar" class=" CuadroTexto k-textbox" /><br />
        <label for="codigopostal">Código Postal: </label><input type="text" id="codigopostalproveedoreliminar" class=" CuadroTexto VisibilidadTelefonodeContacto k-textbox" /><br />
        <br />
        <hr />
        <br />


        <center>
            <input type="button" value="Eliminar" id="BotonAceptarVentanaEliminarProveedor" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEliminarProveedor" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaCrearProveedor" class="ComprobarNulosProveedores">
        <b><h5>Datos Proveedor</h5></b>
        <br />
        <label for="nombreempresaproveedor">Nombre: </label><input type="text" id="nuevoproveedornombre" class=" CuadroTexto NoModificable nombreempresaasociacion k-textbox requerido" /><br />
        <label for="cif">CIF: </label><input type="text" id="nuevoproveedorcif" class=" CuadroTexto NoModificable cifremoto k-textbox requerido" /> <input type="button" value="Vincular Empresa" id="BotonVincularEmpresaDesdeProveedor" class="k-button" /><br />
        <label for="direccion">Dirección Física: </label><input type="text" id="nuevoproveedordir" class=" CuadroTexto k-textbox" /><br />
        <label for="mercado">Mercado: </label><input type="text" id="nuevoproveedormercado" class=" CuadroTexto k-textbox" /><br />
        <label for="codigopostal">Código Postal: </label><input type="text" id="nuevoproveedorcpostal" class=" CuadroTexto k-textbox" /><br />
        <label for="telefono" class="VisibilidadTelefonodeContacto">Teléfono de Contacto: </label><input type="text" id="nuevoproveedortlf" class=" CuadroTexto VisibilidadTelefonodeContacto NoModificable k-textbox requerido" /><br />
        <br />
        <hr />
        <br />
        
        <div id="DatosNuevaEmpresaRemota2" class="VisibilidadDatosNuevaEmpresaRemota">
            <b><h5>Datos Empresa Asociada</h5></b>
            <br />
            <label for="localidad">Localidad: </label><input type="text" id="nuevoproveedorlocalidad" class=" CuadroTexto localidadremota k-textbox" /><br />
            <label for="direccionweb">Dirección Web: </label><input type="text" id="nuevoproveedorweb" class=" CuadroTexto dirwebremota k-textbox" /><br />
            <label for="telefonodecontacto">Teléfono de Contacto: </label><input type="text" id="telefonoempresa" class=" CuadroTexto telefonoremoto2 k-textbox requerido" /><br />
            <label for="email">E-Mail: </label><input type="text" id="nuevoproveedoremail" class=" CuadroTexto emailremoto k-textbox" /><br />
        </div>

        <center>
            <div hidden="hidden" id="MensajeErrorProveedores" class="FormatoMensajeError">
                    <p>Datos nulos o erroneos</p>
            </div>
            <input type="button" value="Crear" id="BotonAceptarVentanaCrearProveedor" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaCrearProveedor" class="k-button FuncionBotonCancelarProveedores" />          
        </center>
    </div>

    <div id="VentanaEditarPatrocinador">
        <b><h5>Datos Patrocinador</h5></b>
        <br />
        <label for="nombreempresapatrocinadoreditar">Nombre: </label><input type="text" id="nombreempresapatrocinadoreditar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifpatrocinadoreditar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="localizacion">Localización Publicidad: </label><input type="text" id="locpatrocinadoreditar" class=" CuadroTexto k-textbox" /><br />
        <br />
        <hr />
        <br />
        <center>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEditarpatrocinador" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEditarpatrocinador" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaEliminarPatrocinador">
        <b><h5>Datos Patrocinador</h5></b>
        <br />
        <label for="nombreempresaproveedor">Nombre: </label><input type="text" id="nombrepatrocinadoreliminar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifpatrocinadoreliinar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="localizacion">Localización Publicidad: </label><input type="text" id="lopatrocinadoreliminar" class=" CuadroTexto k-textbox" /><br />
        <br />
        <hr />
        <br />


        <center>
            <input type="button" value="Eliminar" id="BotonAceptarVentanaEliminarPatrocinador" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEliminarPatrocinador" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaCrearPatrocinador" class="ComprobarNulosPatrocinadores">
        <b><h5>Datos Patrocinador</h5></b>
        <br />
        <label for="nombreempresaproveedor">Nombre: </label><input type="text" id="nombrepatrocinadornuevo" class=" CuadroTexto NoModificable nombreempresaasociacion k-textbox requerido" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifpatrocinadornuevo" class=" CuadroTexto NoModificable cifremoto k-textbox requerido" /> <input type="button" value="Vincular Empresa" id="BotonVincularEmpresaDesdePatrocinador" class="k-button" /><br />
        <label for="loc">Localización Publicidad: </label><input type="text" id="locpatrocinadornuevo" class=" CuadroTexto k-textbox" /><br />
        <label for="telefono" class="VisibilidadTelefonodeContacto">Teléfono de Contacto: </label><input type="text" id="tlfpatrocinadornuevo" class=" CuadroTexto VisibilidadTelefonodeContacto NoModificable k-textbox requerido" /><br />
        <br />
        <hr />
        <br />
        
        <div id="DatosNuevaEmpresaRemota3" class="VisibilidadDatosNuevaEmpresaRemota">
            <b><h5>Datos Empresa Asociada</h5></b>
            <br />
            <label for="localidad">Localidad: </label><input type="text" id="patrocinadorlocalidadremoto" class=" CuadroTexto localidadremota k-textbox" /><br />
            <label for="direccionweb">Dirección Web: </label><input type="text" id="patrocinadorwebremoto" class=" CuadroTexto dirwebremota k-textbox" /><br />
            <label for="telefonodecontacto">Teléfono de Contacto: </label><input type="text" id="patrocinadortflremoto" class=" CuadroTexto telefonoremoto2 k-textbox" /><br />
            <label for="email">E-Mail: </label><input type="text" id="patrocinadoremailremoto" class=" CuadroTexto emailremoto k-textbox" /><br />
        </div>

        <center>
            <div hidden="hidden" id="MensajeErrorPatrocinadores" class="FormatoMensajeError">
                    <p>Datos nulos o erroneos</p>
            </div>
            <input type="button" value="Crear" id="BotonAceptarVentanaCrearPatrocinador" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaCrearPatrocinador" class="k-button FuncionBotonCancelarProveedores" />          
        </center>
    </div>

    <div id="VentanaEditarPublicidad">
        <b><h5>Datos Elemento Publicitario</h5></b>
        <br />
        <label for="loca">Localización: </label><input type="text" id="locpublicidadeditar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="carac">Características: </label><input type="text" id="caracpublicidadeditar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <br />
        <hr />
        <br />
        <center>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEditarPublicidad" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEditarPublicidad" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaCrearPublicidad" class="ComprobarNulosPublicidad">
        <b><h5>Datos Elemento Publicitario</h5></b>
        <br />
        <label for="loca">Localización: </label><input type="text" id="Text1" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="carac">Características: </label><input type="text" id="Text2" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="cif">CIF Patrocinador: </label><input type="text" id="cifpatrocinador" class=" CuadroTexto NoModificable k-textbox requerido" /><br />
        <br />
        <hr />
        <br />
        <center>
            <div hidden="hidden" id="MensajeErrorPublicidad" class="FormatoMensajeError">
                    <p>Datos nulos o erroneos</p>
            </div>
            <input type="button" value="Aceptar" id="Button1" class="k-button" />
            <input type="button" value="Cancelar" id="Button2" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaEliminarPublicidad">
        <b><h5>Datos Elemento Publicitario</h5></b>
        <br />
        <label for="loca">Localización: </label><input type="text" id="locapublicidadeliminar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="carac">Características: </label><input type="text" id="caracteristicapublicidadeliminar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <br />
        <hr />
        <br />
        <center>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEliminarPublicidad" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEliminarPublicidad" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaEditarConvenio">
        <b><h5>Datos Convenio</h5></b>
        <br />
        <label for="nombreempresaconvenioeditar">Nombre: </label><input type="text" id="nombreempresaconvenioeditar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifempresaconvenio" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="desc">Descripción Oferta: </label><input type="text" id="descconvenioeditar" class=" CuadroTexto k-textbox" /><br />
        <br />
        <hr />
        <br />
        <center>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEditarConvenio" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEditarConvenio" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>
    
    <div id="VentanaEliminarConvenio">
        <b><h5>Datos Convenio</h5></b>
        <br />
        <label for="nombreempresaconvenioeditar">Nombre: </label><input type="text" id="nombreempresaconvenioeliminar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifempresaconvenioeliminar" class=" CuadroTexto NoModificable k-textbox" /><br />
        <label for="desc">Descripción Oferta: </label><input type="text" id="descripcionconvenioeliminar" class=" CuadroTexto k-textbox" /><br />
        <br />
        <hr />
        <br />


        <center>
            <input type="button" value="Eliminar" id="BotonAceptarVentanaEliminarConvenio" class="k-button" />
            <input type="button" value="Cancelar" id="BotoncancelarVentanaEliminarConvenio" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaCrearConvenio" class="ComprobarNulosConvenio">
        <b><h5>Datos Convenio</h5></b>
        <br />
        <label for="nombreempresaproveedor">Nombre: </label><input type="text" id="nombreempresaconveniocrear" class=" CuadroTexto NoModificable requerido nombreempresaasociacion k-textbox" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifconveniocrear" class=" CuadroTexto NoModificable cifremoto k-textbox requerido" /> <input type="button" value="Vincular Empresa" id="BotonVincularEmpresaDesdeConvenio" class="k-button" /><br />
        <label for="descripcion">Descripción: </label><input type="text" id="descripcionconveniocrear" class=" CuadroTexto k-textbox" /><br />
        <label for="telefono" class="VisibilidadTelefonodeContacto">Teléfono de Contacto: </label><input type="text" id="tlfconveniocrear" class=" CuadroTexto requerido VisibilidadTelefonodeContacto NoModificable k-textbox" /><br />
        <br />
        <hr />
        <br />
        
        <div id="Div2" class="VisibilidadDatosNuevaEmpresaRemota">
            <b><h5>Datos Empresa Asociada</h5></b>
            <br />
            <label for="localidad">Localidad: </label><input type="text" id="locempresaremotaconveniocrear" class=" CuadroTexto localidadremota k-textbox" /><br />
            <label for="direccionweb">Dirección Web: </label><input type="text" id="webempresaremotaconveniocrear" class=" CuadroTexto dirwebremota k-textbox" /><br />
            <label for="telefonodecontacto">Teléfono de Contacto: </label><input type="text" id="tlfempresaremotaconveniocrear" class=" CuadroTexto requerido telefonoremoto2 k-textbox" /><br />
            <label for="email">E-Mail: </label><input type="text" id="emailempresaremotaconveniocrear" class=" CuadroTexto emailremoto k-textbox" /><br />
        </div>

        <center>
            <div hidden="hidden" id="MensajeErrorConvenios" class="FormatoMensajeError">
                    <p>Datos nulos o erroneos</p>
            </div>
            <input type="button" value="Crear" id="BotonAceptarVentanaCrearConvenio" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaCrearConvenio" class="k-button FuncionBotonCancelarProveedores" />          
        </center>
    </div>

    <div id="VentanaEditarContrato" class="ComprobarNulosContratosEditar">
        <h5>Datos Empresa</h5>
        <label for="nombreempresacontratoeditar">Nombre: </label><input type="text" id="nombreempresacontratoeditar" class=" CuadroTexto k-textbox nombreempresaasociacion" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifcontratoeditar" class=" CuadroTexto k-textbox cifremoto" /><br />
        <input type="button" value="Cambiar Empresa" id="CambiarEmpresaContratoEditar" class="k-button" />
        <hr />
        <h5>Datos Responsable</h5>
        <label for="juntadirevtiva">Junta Directiva Asociada: </label><input type="text" id="jdirectivacontratoeditar" class=" CuadroTexto k-textbox" /><br />
        <input type="button" value="Cambiar Responsable" id="CambiarJuntaDirectivaContratoEditar" class="k-button" />
        <hr />
        <h5>Datos Contrato</h5>
        <label for="FechaCreacion">Fecha Creación: </label><input type="text" id="fechacreacioncontratoeditar" class=" CuadroTexto k-textbox" /><br />
        <label for="FechaCaducidad">Fecha Expiración: </label><input type="text" id="fechacaducidadcontratoeditar" class=" CuadroTexto k-textbox" /><br />
        <h5>Descripción Legal</h5>
        <textarea id="descripcionlegalcontratoeditar" rows="20" cols="38"></textarea>
        <label for="Importe">Importe: </label><input type="text" id="importecontraroeditar" class=" CuadroTexto k-textbox" /><br />
        <br />
        <hr />
        <br />
        <center>
            <div hidden="hidden" id="MensajeErrorContratoEditar" class="FormatoMensajeError">
                    <p>Datos nulos o erroneos</p>
            </div>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEditarContrato" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEditarContrato" class="k-button FuncionBotonCancelarProveedores" />
        </center>
    </div>

    <div id="VentanaEliminarContrato">
        <h5>Datos Empresa</h5>
        <label for="nombreempresacontratoeditar">Nombre: </label><input type="text" id="nombreempresacontratoeliminar" class=" CuadroTexto k-textbox nombreempresaasociacion" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifcontratoeliminar" class=" CuadroTexto k-textbox cifremoto" /><br />
        <hr />
        <h5>Datos Responsable</h5>
        <label for="juntadirevtiva">Junta Directiva Asociada: </label><input type="text" id="juntadirectivacontratoeliminar" class=" CuadroTexto k-textbox" /><br />
        <hr />
        <h5>Datos Contrato</h5>
        <label for="FechaCreacion">Fecha Creación: </label><input type="text" id="fechacreacioncontratoeliminar" class=" CuadroTexto k-textbox" /><br />
        <label for="FechaCaducidad">Fecha Expiración: </label><input type="text" id="fechacaducidadcontratoeliminar" class=" CuadroTexto k-textbox" /><br />
        <h5>Descripción Legal</h5>
        <textarea id="descripcioncontratoeliminar" rows="20" cols="38" readonly="readonly"></textarea>
        <br />
        <label for="Importe">Importe: </label><input type="text" id="importecontratoeliminar" class=" CuadroTexto k-textbox" /><br />
        <br />
        <hr />
        <br />
        <center>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEliminarContrato" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEliminarContrato" class="k-button FuncionBotonCancelarProveedores" />
        </center>
    </div>

    <div id="VentanaCrearContrato" class="ComprobarNulosContratosCrear">
        <h5>Datos Empresa</h5>
        <label for="nombreempresacontratoeditar">Nombre: </label><input type="text" id="nombreempresacontratocrear" class=" CuadroTexto requerido k-textbox nombreempresaasociacion" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifempresacontratocrear" class=" CuadroTexto k-textbox cifremoto requerido" /><br />
        <label for="telefono" class="VisibilidadTelefonodeContacto">Teléfono de Contacto: </label><input type="text" id="telefonoempresacontratocrear" class=" CuadroTexto requerido VisibilidadTelefonodeContacto NoModificable k-textbox" /><br />
        <input type="button" value="Escoger Empresa" id="BotonElegirEmpresaRemotaDesdeContrato" class="k-button" />
        <hr />
        <h5>Datos Responsable</h5>
        <label for="juntadirevtiva">Junta Directiva Asociada: </label><input type="text" id="juntadirectivacontratocrear" class=" CuadroTexto k-textbox nombrejuntadirectivaremota requerido" /><br />
        <input type="button" value="Escoger Responsable" id="BotonElegirJuntaDirectivaDesdeContrato" class="k-button" />
        <hr />
        <h5>Datos Contrato</h5>
        <label for="FechaCreacion">Fecha Creación: </label><input type="text" id="fechacreacioncontratocrear" class=" CuadroTexto k-textbox" /><br />
        <label for="FechaCaducidad">Fecha Expiración: </label><input type="text" id="fechacaducidadcontratocrear" class=" CuadroTexto k-textbox requerido" /><br />
        <h5>Descripción Legal</h5>
        <textarea id="descripcioncontratocrear" rows="20" cols="38" disable="true"></textarea>
        <br />
        <label for="Importe">Importe: </label><input type="text" id="importecontratocrear" class=" CuadroTexto k-textbox" /><br />
        <br />
        <hr />
        <br />
        <center>
            <div hidden="hidden" id="MensajeErrorContratoCrear" class="FormatoMensajeError">
                    <p>Datos nulos o erroneos</p>
            </div>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaCrearContrato" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaCrearContrato" class="k-button FuncionBotonCancelarProveedores" />
        </center>
    </div>

    <div id="NuevaEmpresaFormulario" >
    
    </div>

    <div id="VentanaEmpresasRemota">
        <div id="EmpresasGridRemoto" class="VisibilidadGridEmpresasRemota">
    
        </div>
    </div>
    
    <div id="VentanaJuntaDirectivaRemota">
        <div id="JuntaDirectivaGridRemoto" class="VisibilidadGridJuntaDirectivaRemota">
    
        </div>
    </div>

    
    
</asp:Content>