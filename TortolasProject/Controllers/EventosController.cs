using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;

namespace TortolasProject.Controllers
{
    public class EventosController : Controller
    {
        // GET: /Eventos/
        mtbMalagaDataContext bd = new mtbMalagaDataContext();
        EventosRepositorio EventosRepo = new EventosRepositorio();
        UsuariosRepositorio UsuariosRepo = new UsuariosRepositorio();
        FacturasRepositorio FacturasRepo = new FacturasRepositorio();

          //Index
        public ActionResult Index()
        {
            return View();
        }

         
        [HttpPost]
        public ActionResult cargarVistaCrearEvento()
        {
            return PartialView("VistaCrearEvento");
        }

        [HttpPost]
        public ActionResult LeerTodos()
        {
            var eventos = from ob in EventosRepo.listarEventos()
                          select new
                          {
                              idEvento = ob.idEvento,
                              Titulo = ob.Titulo,
                              Lugar = ob.Lugar,
                              Actividad = ob.Actividad,
                              FechaAperturaInscripcion = ob.FechaAperturaInscripcion.ToShortDateString(),
                              FechaLimiteInscripcion = ob.FechaLimiteInscripcion.ToShortDateString(),
                              FechaRealizacion = ob.FechaRealizacion.ToShortDateString(),
                              PrioridadSocios = ob.PrioridadSocios,
                              Plazas = ob.Plazas,
                              NumAcompa = ob.NumAcompa,
                              Tipo = EventosRepo.esOficial(ob.idEvento)==true ? "Oficial" : "Libre",
                              Precio = EventosRepo.esOficial(ob.idEvento)==true ? EventosRepo.obtenerEventoOficialByIdEvento(ob.idEvento).Precio : 0,
                              TotalParticipantes = EventosRepo.calcularTotalParticipantes(ob.idEvento),
                              PlazasLibres = (ob.Plazas - EventosRepo.calcularTotalParticipantes(ob.idEvento))
                          };
            return Json(eventos);
        }

        [HttpPost]
        public void InscripcionEvento(FormCollection data)
        {
            Guid idDocumentoInscripcion = Guid.NewGuid();
            Guid idEvento = Guid.Parse(data["idEvento"]);
            int NumAcompa = int.Parse(data["numacompa"]);
            Guid FKUsuario = UsuariosRepo.obtenerUsuarioByUser(HomeController.obtenerUserIdActual());
            tbDocInscripcion DocInscrip = new tbDocInscripcion
            {
                idDocumentoInscripcion = idDocumentoInscripcion,
                Pagado = false,
                NumAcom = NumAcompa,
                FKEvento = idEvento,
                FKUsuario = FKUsuario
            };
            EventosRepo.inscripcionEvento(DocInscrip);

            if (EventosRepo.esOficial(idEvento))
            {
                Guid idFactura = Guid.NewGuid();
                tbFactura Factura = new tbFactura
                {
                    idFactura = idFactura,
                    Concepto = "Inscripción Evento Oficial",
                    FKEventoOficial = EventosRepo.obtenerEventoOficialByIdEvento(idEvento).idEventoOficial,
                    FKUsuario = FKUsuario,
                    Fecha = DateTime.Today,
                    FKEstado = FacturasRepo.leerEstadoByNombre("Pendiente").idEstadoFactura
                };
                tbLineaFactura Linea = new tbLineaFactura
                {
                    idLineaFactura = Guid.NewGuid(),
                    Descripcion = UsuariosRepo.obtenerUsuario(FKUsuario).Nickname,
                    Unidades = (EventosRepo.obtenerAcompanantesEvento(idEvento, FKUsuario) + 1),
                    PrecioUnitario = EventosRepo.obtenerEventoOficialByIdEvento(idEvento).Precio.HasValue ? EventosRepo.obtenerEventoOficialByIdEvento(idEvento).Precio.Value : 0,
                    FKFactura = idFactura
                };
                IList<tbLineaFactura> lista = new List<tbLineaFactura>();
                lista.Add(Linea);
                FacturasController.crearFacturaExterna(Factura, lista);
            }
            
        }

        [HttpPost]
        public void UpdateEvento(FormCollection data)
        {
            Guid idEvento = Guid.Parse(data["idEvento"]);
            String Titulo = data["TituloUpdate"];
            String Lugar = data["LugarUpdate"];
            DateTime FechaRealizacion = DateTime.Parse(data["FechaRealizacionUpdate"]);
            DateTime FechaAperturaIncripcion = DateTime.Parse(data["FechaAperturaInscripUpdate"]);
            DateTime FechaLimiteIncripcion = DateTime.Parse(data["FechaLimiteInscripUpdate"]);
            int Plazas = int.Parse(data["PlazasUpdate"]);
            int NumAcompa = int.Parse(data["NumAcompaUpdate"]);
            bool PrioridadSocios = bool.Parse(data["PrioridadSociosUpdate"]);
            String Actividad = data["ActividadUpdate"];
            String Tipo = data["Tipo"];
            Decimal Precio = Decimal.Parse(data["PrecioUpdate"]);

            tbEvento Evento = new tbEvento
            {
                Titulo = Titulo,
                Lugar = Lugar,
                FechaRealizacion = FechaRealizacion,
                FechaAperturaInscripcion = FechaAperturaIncripcion,
                FechaLimiteInscripcion = FechaLimiteIncripcion,
                Plazas = Plazas,
                NumAcompa = NumAcompa,
                PrioridadSocios = PrioridadSocios,
                Actividad = Actividad
            };

            EventosRepo.editarEvento(idEvento,Evento);

            if (Tipo=="Oficial")
            {

                EventosRepo.editarEventoOficial(idEvento, Precio);
            }
        }

        [HttpPost]
        public void CreateEvento(FormCollection data)
        {
            Guid idEvento = Guid.NewGuid();
            String Titulo = data["TituloUpdate"];
            String Lugar = data["LugarUpdate"];
            DateTime FechaRealizacion = DateTime.Parse(data["FechaRealizacionUpdate"]);
            DateTime FechaAperturaIncripcion = DateTime.Parse(data["FechaAperturaInscripUpdate"]);
            DateTime FechaLimiteIncripcion = DateTime.Parse(data["FechaLimiteInscripUpdate"]);
            int Plazas = int.Parse(data["PlazasUpdate"]);
            int NumAcompa = int.Parse(data["NumAcompaUpdate"]);
            bool PrioridadSocios = bool.Parse(data["PrioridadSociosUpdate"]);
            String Actividad = data["ActividadUpdate"];
            Guid FKUsuario =  UsuariosRepo.obtenerUsuarioByUser(HomeController.obtenerUserIdActual());
            Guid FKJuntaDirectiva = UsuariosRepo.obtenerSocio(UsuariosRepo.obtenerUsuarioByUser(HomeController.obtenerUserIdActual())).idSocio;
            bool oficial = bool.Parse(data["TipoUpdate"]);
            Decimal precioEvento = 0;
            if (oficial) precioEvento = Decimal.Parse(data["PrecioEventoUpdate"]);
            
            tbEvento Evento = new tbEvento
            {
                idEvento = idEvento,
                Titulo = Titulo,
                Lugar = Lugar,
                FechaRealizacion = FechaRealizacion,
                FechaAperturaInscripcion = FechaAperturaIncripcion,
                FechaLimiteInscripcion = FechaLimiteIncripcion,
                Plazas = Plazas,
                NumAcompa = NumAcompa,
                PrioridadSocios = PrioridadSocios,
                Actividad = Actividad,
                FKUsuarioCreador = FKUsuario
            };

            EventosRepo.crearEvento(Evento);

            if (oficial)
            {
                tbEventoOficial eventoOficial = new tbEventoOficial()
                {
                    idEventoOficial = Guid.NewGuid(),
                    FKEvento = idEvento,
                    FKJuntaDirectiva = FKJuntaDirectiva,
                    Precio = precioEvento
                };
            EventosRepo.crearEventoOficial(eventoOficial);
            }
            
            
        }

        [HttpPost]
        public void eliminarEvento(FormCollection data)
        {
            Guid idEvento = Guid.Parse(data["idEvento"]);

            EventosRepo.eliminarEvento(idEvento);
        }

        [HttpPost]
        public ActionResult participantesDeEvento(FormCollection data)
        {
            Guid idEvento = Guid.Parse(data["idEvento"]);

            var participantes = from p in EventosRepo.participantesEvento(idEvento)
                                select new
                                {
                                    idUsuario = p.idUsuario,
                                    Nombre = p.Nombre,
                                    Apellidos = p.Apellidos,
                                    NumAcompa = EventosRepo.obtenerAcompanantesEvento(idEvento,p.idUsuario)
                                };
            return Json(participantes);
        }

        [HttpPost]
        public Boolean comprobarInscrip(FormCollection data)
        {
            Guid idEvento = Guid.Parse(data["idEvento"]);
            Guid Usuario = UsuariosRepo.obtenerUsuarioByUser(HomeController.obtenerUserIdActual());


            return EventosRepo.existInscrip(idEvento, Usuario);
        }

    }

}

