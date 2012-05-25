<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div id="anadirArticuloForm">

    <div id="nombreText">
    Nombre <input type="text" class="k-textbox necesario" id="nombreAnadirArticuloAutocomplete"/> 
    </div>

    <div id="imagenText">
    Imagen <input type="text" class="k-textbox necesario" id="imagenAnadirArticuloAutocomplete"/> 
    </div>

    <div id="descripcionText">
    Descripción <input type="text" class="k-textbox necesario" id="descripcionAnadirArticuloAutocomplete"/>
    </div>

    <div id="precioText">
    Precio <input type="text" class="k-textbox necesario" id="precioAnadirArticuloAutocomplete"/>
            
    </div>

    <div id="categoriaDrop">
    Categoria <input id="dropDownList" />
    </div>

    </div>
<div id="anadirArticuloAceptarButton"><input type="button" class="k-button" value="Aceptar" /></div>


<div id="anadirArticuloCancelarButton"><input type="button" class="k-button" value="Cancelar" /></div>

