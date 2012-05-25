using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;


namespace TortolasProject.Controllers
{
    public class CursillosController : Controller
    {
        //
        // GET: /Cursillos/
        mtbMalagaDataContext bd = new mtbMalagaDataContext();
        CursillosRepositorio CursillosRepo = new CursillosRepositorio();
        UsuariosRepositorio UsuariosRepo = new UsuariosRepositorio();
        FacturasRepositorio FacturasRepo = new FacturasRepositorio();
        

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult cargarVistaCrearCursillo()
        {
            return PartialView("VistaCrearCursillo");
        }
        [HttpPost]
        public ActionResult LeerTodos()
        {
            var cursillos = from ob in CursillosRepo.listarCursillos()
                            select new
                            {
                                idCursillo = ob.idCursillo,
                                Titulo = ob.Titulo,
                                Lugar = ob.Lugar,
                                Actividad = ob.Actividad,
                                Tematica = ob.Tematica,
                                FechaAperturaInscripcion = ob.FechaAperturaInscripcion.ToShortDateString(),
                                FechaLimiteInscripcion = ob.FechaLimiteInscripcion.ToShortDateString(),
                                FechaRealizacion = ob.FechaRealizacion.ToShortDateString(),
                                Precio = ob.Precio,
                                Plazas = ob.Plazas,
                                NumAcompa = ob.NumAcompa,
                                DescuentoSocios = ob.DescuentoSocios,
                                ConocimientosPrevios = ob.ConocimientosPrevios,
                                TotalParticipantes = CursillosRepo.calcularTotalParticipantes(ob.idCursillo),
                                PlazasLibres = (ob.Plazas - CursillosRepo.calcularTotalParticipantes(ob.idCursillo))
                            };
            return Json(cursillos);
        }

        [HttpPost]
        public void InscripcionCursillo(FormCollection data)
        {
            Guid idDocumentoInscripcion = Guid.NewGuid();
            Guid idCursillo = Guid.Parse(data["idCursillo"]);
            int NumAcompa = int.Parse(data["numacompa"]);
            
            Guid FKUsuario = UsuariosRepo.obtenerUsuarioByUser(HomeController.obtenerUserIdActual());
            tbDocInscripcion DocInscrip = new tbDocInscripcion
            {
                idDocumentoInscripcion = idDocumentoInscripcion,
                Pagado = false,
                NumAcom = NumAcompa,
                FKCursillo = idCursillo,
                FKUsuario = FKUsuario
            };
            CursillosRepo.inscripcionCursillo(DocInscrip);

            Guid idFactura = Guid.NewGuid();
            tbFactura Factura = new tbFactura
            {
                idFactura = idFactura,
                Concepto = "Inscripción cursillo",
                FKCursillo = idCursillo,
                FKUsuario = FKUsuario,
                Fecha = DateTime.Today,
                FKEstado = FacturasRepo.leerEstadoByNombre("Pendiente").idEstadoFactura
            };
            tbLineaFactura Linea = new tbLineaFactura
            {
                idLineaFactura = Guid.NewGuid(),
                Descripcion = UsuariosRepo.obtenerUsuario(FKUsuario).Nickname,
                Unidades = (CursillosRepo.obtenerAcompanantesCursillo(idCursillo, FKUsuario) + 1),
                PrecioUnitario = CursillosRepo.leerCursillo(idCursillo).Precio.HasValue? CursillosRepo.leerCursillo(idCursillo).Precio.Value : 0 ,
                FKFactura = idFactura
            };
            IList<tbLineaFactura> lista = new List<tbLineaFactura>();
            lista.Add(Linea);
            FacturasController.crearFacturaExterna(Factura,lista);
        }

        [HttpPost]
        public void UpdateCursillo(FormCollection data)
        {
            Guid idCursillo = Guid.Parse(data["idCursillo"]);
            String Titulo = data["TituloUpdate"];
            String Lugar = data["LugarUpdate"];
            DateTime FechaRealizacion = DateTime.Parse(data["FechaRealizacionUpdate"]);
            DateTime FechaAperturaIncripcion = DateTime.Parse(data["FechaAperturaInscripUpdate"]);
            DateTime FechaLimiteIncripcion = DateTime.Parse(data["FechaLimiteInscripUpdate"]);
            String Tematica = data["TematicaUpdate"];
            int Plazas = int.Parse(data["PlazasUpdate"]);
            int NumAcompa = int.Parse(data["NumAcompaUpdate"]);
            String ConocimientosPrevios = data["ConocimientosPreviosUpdate"];
            bool DescuentoSocios = bool.Parse(data["DescuentoSociosUpdate"]);
            String Actividad = data["ActividadUpdate"];
            Decimal Precio = Decimal.Parse(data["PrecioUpdate"]);

            tbCursillo Cursillo = new tbCursillo
            {

                Titulo = Titulo,
                Lugar = Lugar,
                FechaRealizacion = FechaRealizacion,
                FechaAperturaInscripcion = FechaAperturaIncripcion,
                FechaLimiteInscripcion = FechaLimiteIncripcion,
                Plazas = Plazas,
                NumAcompa = NumAcompa,
                Tematica = Tematica,
                ConocimientosPrevios = ConocimientosPrevios,
                DescuentoSocios = DescuentoSocios,
                Precio = Precio,
                Actividad = Actividad
            };

            CursillosRepo.editarCursillo(idCursillo,Cursillo);
        }

        [HttpPost]
        public void CreateCursillo(FormCollection data)
        {
            Guid idCursillo = Guid.NewGuid();
            String Titulo = data["TituloUpdate"];
            String Lugar = data["LugarUpdate"];
            DateTime FechaRealizacion = DateTime.Parse(data["FechaRealizacionUpdate"]);
            DateTime FechaAperturaIncripcion = DateTime.Parse(data["FechaAperturaInscripUpdate"]);
            DateTime FechaLimiteIncripcion = DateTime.Parse(data["FechaLimiteInscripUpdate"]);
            String Tematica = data["TematicaUpdate"];
            int Plazas = int.Parse(data["PlazasUpdate"]);
            int NumAcompa = int.Parse(data["NumAcompaUpdate"]);
            String ConocimientosPrevios = data["ConocimientosPreviosUpdate"];
            bool DescuentoSocios = bool.Parse(data["DescuentoSociosUpdate"]);
            String Actividad = data["ActividadUpdate"];
            Decimal Precio = Decimal.Parse(data["PrecioUpdate"]);
            Guid FKUsuario = UsuariosRepo.obtenerSocio(UsuariosRepo.obtenerUsuarioByUser(HomeController.obtenerUserIdActual())).idSocio;
            tbCursillo Cursillo = new tbCursillo
            {
                idCursillo = idCursillo,
                Titulo = Titulo,
                Lugar = Lugar,
                FechaRealizacion = FechaRealizacion,
                FechaAperturaInscripcion = FechaAperturaIncripcion,
                FechaLimiteInscripcion = FechaLimiteIncripcion,
                Plazas = Plazas,
                NumAcompa = NumAcompa,
                Tematica = Tematica,
                ConocimientosPrevios = ConocimientosPrevios,
                DescuentoSocios = DescuentoSocios,
                Precio = Precio,
                Actividad = Actividad,
                FKUsuarioCreador = FKUsuario
            };

            CursillosRepo.crearCursillo(Cursillo);
        }

        [HttpPost]
        public void eliminarCursillo(FormCollection data)
        {
            Guid idCursillo = Guid.Parse(data["idCursillo"]);

            CursillosRepo.eliminarCursillo(idCursillo);
        }

        
        [HttpPost]
        public ActionResult participantesDeCursillo(FormCollection data)
        {
            Guid idCursillo = Guid.Parse(data["idCursillo"]);

            var participantes = from p in CursillosRepo.participantesCursillo(idCursillo)
                                select new
                                {
                                    idUsuario = p.idUsuario,
                                    Nombre = p.Nombre,
                                    Apellidos = p.Apellidos,
                                    NumAcompa = CursillosRepo.obtenerAcompanantesCursillo(idCursillo,p.idUsuario),
                                    PrecioPorGrupo = (CursillosRepo.leerCursillo(idCursillo).Precio) * (CursillosRepo.obtenerAcompanantesCursillo(idCursillo, p.idUsuario) + 1)
                                };
            return Json(participantes);
        }

        [HttpPost]
        public Boolean comprobarInscrip(FormCollection data)
        {
            Guid idCursillo = Guid.Parse(data["idCursillo"]);
            Guid Usuario = UsuariosRepo.obtenerUsuarioByUser(HomeController.obtenerUserIdActual());


            return CursillosRepo.existInscrip(idCursillo, Usuario);
        }

    
    }
}
