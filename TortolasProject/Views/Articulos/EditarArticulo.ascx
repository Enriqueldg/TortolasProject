<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div id="editarArticuloForm">

    <div id="nombreTextEditar">
    Nombre <input type="text" class="k-textbox necesario" id="nombreEditarArticuloAutocomplete"/>
    </div>

    <div id="imagenTextEditar">
    Imagen <input type="text" class="k-textbox necesario" id="imagenEditarArticuloAutocomplete"/>
    </div>

    <div id="descripcionTextEditar">
    Descripción <input type="text" class="k-textbox necesario" id="descripcionEditarArticuloAutocomplete"/>
    </div>

    <div id="precioTextEditar">
    Precio <input type="text" class="k-textbox necesario" id="precioEditarArticuloAutocomplete"/>
    </div>
</div>
<div id="editarArticuloAceptarButton"><input type="button" class="k-button" value="Aceptar" /></div>


<div id="editarArticuloCancelarButton"><input type="button" class="k-button" value="Cancelar" /></div>