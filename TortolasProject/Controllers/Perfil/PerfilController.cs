using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Controllers.Perfil;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;
using System.IO;


namespace TortolasProject.Controllers.Perfil
{
    public class PerfilController : Controller
    {
        //
        // GET: /Perfil/

        mtbMalagaDataContext mtbDB = new mtbMalagaDataContext();
        MensajesRepositorio mensajesRepo = new MensajesRepositorio();
        UsuariosRepositorio usuariosRepo = new UsuariosRepositorio();
        FacturasRepositorio facturasRepo = new FacturasRepositorio();


        public ActionResult Index()
        {
            return View();
        }

        // PESTAÑA : MENSAJES

        [HttpPost]
        public ActionResult leerMensajes(FormCollection data)
        {
            Guid usuario = usuariosRepo.obtenerUsuarioNoAsp(HomeController.obtenerUserIdActual()).idUsuario;
            String tipo = data["tipo"];

            var mensaje = from m in mensajesRepo.listarMensajes(usuario, tipo)
                          select new
                          {
                              idMensaje = m.idMensaje,
                              estado = m.estado,
                              fecha = m.fecha.Value.ToShortDateString(),
                              asunto = m.asunto,
                              cuerpomensaje = m.cuerpomensaje,
                              nombreDestinatario = mensajesRepo.nombreUsuario(m.FKDestinatario),
                              nombreRemitente = mensajesRepo.nombreUsuario(m.FKRemitente),
                              FKDestinatario = m.FKDestinatario,
                              FKRemitente = m.FKRemitente

                          };

            return Json(mensaje);

        }

        [HttpPost]
        public ActionResult leerDestinatarios()
        {

            var usuario = from u in usuariosRepo.listarUsuarios()
                          select new
                          {
                              idUsuario = u.idUsuario,
                              Nickname = u.Nickname,
                              Apellidos = u.Apellidos,
                              Nombre = u.Nombre,
                              FechaNacimiento = u.FechaNacimiento,
                              Email = u.Email,
                              DNI = u.DNI,
                              Direccion = u.Direccion,
                              Avatar = u.Avatar

                          };

            return Json(usuario);

        }

        [HttpPost]
        [ValidateInput(false)]
        public void enviarMensaje(FormCollection data)
        {

            Guid Destinatario = Guid.Parse(data["Destinatario"]);
            String Asunto = data["Asunto"];
            String CuerpoMensaje = data["CuerpoMensaje"];
            DateTime Fecha = DateTime.Parse(data["Fecha"]);

            Guid Remitente = usuariosRepo.obtenerUsuarioNoAsp(HomeController.obtenerUserIdActual()).idUsuario;
            Guid idMensaje = Guid.NewGuid();

            tbMensaje nuevo = new tbMensaje
            {
                FKDestinatario = Destinatario,
                asunto = Asunto,
                cuerpomensaje = CuerpoMensaje,
                fecha = Fecha,
                estado = "noleido",
                FKRemitente = Remitente,
                idMensaje = idMensaje
            };
            mensajesRepo.enviarMensaje(nuevo);
        }

        [HttpPost]
        public void marcarLeido(FormCollection data, String tipo)
        {
            Guid idMensaje = Guid.Parse(data["idMensaje"]);

            mensajesRepo.cambiarEstado(idMensaje, tipo);

        }

        [HttpPost]
        public void eliminarMensaje(FormCollection data)
        {
            Guid idMensaje = Guid.Parse(data["idMensaje"]);

            mensajesRepo.eliminarMensaje(idMensaje);
        }

        [HttpPost]
        public JsonResult informacionUsuario()
        {
            tbUsuario actual = usuariosRepo.obtenerUsuarioNoAsp(HomeController.obtenerUserIdActual());

            var infoUsuario = new
                                  {
                                      Nickname = actual.Nickname,
                                      Apellidos = actual.Apellidos,
                                      Nombre = actual.Nombre,
                                      FechaNacimiento = actual.FechaNacimiento.ToString(),
                                      Email = actual.Email,
                                      DNI = actual.DNI,
                                      Direccion = actual.Direccion,
                                      Avatar = actual.Avatar,
                                      Sexo = actual.Sexo,
                                      Provincia = actual.Provincia,
                                      SitioWeb = actual.SitioWeb,
                                      Skype = actual.Skype,
                                      Telefono = actual.Telefono,
                                      Twitter = actual.Twitter,
                                      Experiencias = actual.Experiencias,
                                      Facebook = actual.Facebook,
                                      GooglePlus = actual.GooglePlus,
                                      Localidad = actual.Localidad,
                                      Nacionalidad = actual.Nacionalidad,
                                      Aficiones = actual.Aficiones,
                                      FKUser = actual.FKUser
                                  };
            return Json(infoUsuario);


        }

        [HttpPost]
        //public ActionResult subir(IEnumerable<HttpPostedFileBase> attachments)
        public String subirAvatar(IEnumerable<HttpPostedFileBase> attachments)
        {
            String fileName = " ";
            // The Name of the Upload component is "attachments" 
            foreach (var file in attachments)
            {
                // Some browsers send file names with full path. This needs to be stripped.
                fileName = Path.GetFileName(file.FileName);
                var physicalPath = Path.Combine(Server.MapPath("~/Content/images/usuarios/"), fileName);

                file.SaveAs(physicalPath);
            }
            // Return an empty string to signify success
            //return Content("");
            return fileName;
        }

        [HttpPost]
        public void actualizarInfoUsuario(FormCollection data)
        {

            // Introducimos los datos en un tbUsuario
            tbUsuario aModificar = new tbUsuario
            {
                idUsuario = HomeController.obtenerUserIdActual(),
                Apellidos = data["Apellidos"],
                Nombre = data["Nombre"],
                FechaNacimiento = DateTime.Parse(data["FechaNacimiento"]),
                Email = data["Email"],
                DNI = data["DNI"],
                Direccion = data["Direccion"],
                Avatar = data["Avatar"],
                Sexo = data["Sexo"],
                Provincia = data["Provincia"],
                SitioWeb = data["SitioWeb"],
                Skype = data["Skype"],
                Telefono = data["Telefono"],
                Twitter = data["Twitter"],
                Experiencias = data["Experiencias"],
                Facebook = data["Facebook"],
                GooglePlus = data["GooglePlus"],
                Localidad = data["Localidad"],
                Nacionalidad = data["Nacionalidad"],
                Aficiones = data["Aficiones"],
            };
            usuariosRepo.actualizarUsuario(aModificar);

        }

        [HttpPost]
        public JsonResult socioDeUsuario()
        {
            tbUsuario usuario = usuariosRepo.obtenerUsuarioNoAsp(HomeController.obtenerUserIdActual());
            tbSocio societe = usuariosRepo.obtenerSocio(usuario.idUsuario);

            String FechaBaja = " no hay";
            String FechaExpiracion = "no hay";

            if (societe.FechaBaja.HasValue)
                FechaBaja = societe.FechaBaja.Value.ToShortDateString();

            if (societe.FechaExpiracion.HasValue)
                FechaExpiracion = societe.FechaExpiracion.Value.ToShortDateString();

            // Enviamos los datos del socio y del usuario a la vez
            var societeyusuario = new
            {
                // Datos del socio
                Estado = societe.Estado,
                FKUsuario = societe.FKUsuario,
                Foto = societe.Foto,
                idSocio = societe.idSocio,
                NumeroSocio = societe.NumeroSocio,
                Apellidos = usuario.Apellidos,
                DNI = usuario.DNI,
                Nombre = usuario.Nombre,
                Observaciones = societe.Observaciones,
                MotivosBaja = societe.MotivosBaja,
                FechaAlta = societe.FechaAlta.ToShortDateString(),
                FechaBaja = societe.FechaBaja.HasValue == true ? societe.FechaBaja.Value.ToShortDateString() : null,
                FechaExpiracion = societe.FechaExpiracion.HasValue == true ? societe.FechaExpiracion.Value.ToShortDateString() : null

            };

            return Json(societeyusuario);

        }

        [HttpPost]
        public JsonResult cuotas()
        {
            IList<tbTipoCuota> cuotas = usuariosRepo.obtenerCuotas();                        
            return Json(new
            {                
                Mensual = cuotas.Where(cuota => cuota.Nombre.Equals("Mensual")).Single().Precio ,
                Trimestral =  cuotas.Where(cuota => cuota.Nombre.Equals("Trimestral")).Single().Precio,
                Anual = cuotas.Where(cuota => cuota.Nombre.Equals("Anual")).Single().Precio,
                Alta = cuotas.Where(cuota => cuota.Nombre.Equals("Alta")).Single().Precio,
                DescuentoPrecio = cuotas.Where(cuota => cuota.Nombre.Equals("Descuento")).Single().Precio,
                DescuentoMeses = cuotas.Where(cuota => cuota.Nombre.Equals("Descuento")).Single().Meses,
                DescuentoTipo = cuotas.Where(cuota => cuota.Nombre.Equals("Descuento")).Single().Tipo
            });
        }

        [HttpPost]
        public void realizarPago(FormCollection data)
        {
            Boolean hayAlta = Boolean.Parse(data["hayAlta"]);
            IList<tbLineaFactura> lineasFacturas = new List<tbLineaFactura>();
            Guid usuario = usuariosRepo.obtenerUsuarioNoAsp(HomeController.obtenerUserIdActual()).idUsuario;
            Guid socio = usuariosRepo.obtenerSocio(usuario).idSocio;

            tbFactura factura = new tbFactura
            {
                idFactura = Guid.NewGuid(),
                Concepto = data["Concepto"],    // Renovacion o alta+ reno
                Fecha = DateTime.Today,
                FKUsuario = usuario,                
                FKEstado = mtbDB.tbEstadoFactura.Where(estado => estado.Nombre.Equals("Pendiente")).Single().idEstadoFactura
            };

            if (hayAlta)
            {

                tbLineaFactura alta = new tbLineaFactura
                {
                    idLineaFactura = Guid.NewGuid(),
                    Descripcion = "Alta de Socio", // informacion mas detallada
                    FKFactura = factura.idFactura,
                    Unidades = 1,
                    PrecioUnitario = int.Parse(data["importeAlta"]), 
                    Total = 1 * int.Parse(data["importeAlta"])
                };

                lineasFacturas.Add(alta);
            }

            tbLineaFactura renovacion = new tbLineaFactura
            {
                    idLineaFactura = Guid.NewGuid(),
                    Descripcion = data["Descripcion"], // informacion mas detallada
                    FKFactura = factura.idFactura,
                    Unidades = 1,
                    PrecioUnitario = int.Parse(data["importeRenovacion"]), //
                    Total = 1 * int.Parse(data["importeRenovacion"])
            };

            lineasFacturas.Add(renovacion);
            

            tbCuota cuota = new tbCuota
            {
                FKFactura = factura.idFactura,
                idCuota = Guid.NewGuid(),
                FKTipoCuota = usuariosRepo.tipoCuota(data["tipoCuota"]),
                FKSocio = socio,
                FechaExpiracion = DateTime.Parse(data["FechaExpiracion"])
            };
                        
            // Creamos la Factura
            FacturasController.crearFacturaExterna(factura, lineasFacturas);                
               
            // Creamos la Cuota
            usuariosRepo.crearCuota(cuota);

            // Cambiamos el estado del socio            
            usuariosRepo.cambiarEstadoSocio(socio, "Pendiente", data["FechaExpiracion"]);
            // FALTA AÑADIR PDF
            
        }

    }
}
