using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;
using TortolasProject.Controllers;

namespace TortolasProject.Controllers.Socios
{
    public class SociosController : Controller
    {
        mtbMalagaDataContext mtbDB = new mtbMalagaDataContext();
        UsuariosRepositorio usuariosRepo = new UsuariosRepositorio();
        FacturasRepositorio facturasRepo = new FacturasRepositorio();
        AccountController accountRepo = new AccountController();
        
       
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult obtenerSocios()
        {
            var socios = from s in usuariosRepo.listarSocios()
                         select new
                         {
                             FechaExpiracion = s.FechaExpiracion.HasValue ? s.FechaExpiracion.Value.ToShortDateString() : "",
                             FechaBaja = s.FechaBaja.HasValue ? s.FechaBaja.Value.ToShortDateString() : "",
                             FechaAlta = s.FechaAlta.ToShortDateString(),
                             Estado = s.Estado,
                             Foto = s.Foto,
                             FKUsuario = s.FKUsuario,
                             idSocio = s.idSocio,
                             Observaciones = s.Observaciones,
                             NumeroSocio = s.NumeroSocio,
                             MotivosBaja = s.MotivosBaja
                         };
            return Json(socios);
        }
        

        [HttpPost]
        public JsonResult obtenerSociosyUsuario()
        {
            
            var SociosyUsuario = from societe in usuariosRepo.listarSocios()
                                 select new
                                 {
                                     Estado = societe.Estado,
                                     FechaAlta = societe.FechaAlta.ToShortDateString(),
                                     FechaBaja = societe.FechaBaja.HasValue ? societe.FechaBaja.Value.ToShortDateString() : "",
                                     FechaExpiracion = societe.FechaExpiracion.HasValue ?  societe.FechaExpiracion.Value.ToShortDateString() : "",
                                     Foto = societe.Foto,
                                     idSocio = societe.idSocio,
                                     NumeroSocio = societe.NumeroSocio,
                                     Observaciones = societe.Observaciones,
                                     Nombre = usuariosRepo.obtenerUsuario(societe.FKUsuario).Nombre,
                                     Apellidos = usuariosRepo.obtenerUsuario(societe.FKUsuario).Apellidos
                                 };
            return Json(SociosyUsuario);
        }

        [HttpPost]
        public void crearSocio(tbSocio societe)
        {
            mtbDB.tbSocio.InsertOnSubmit(societe);
            mtbDB.SubmitChanges();
        }

        [HttpPost]
        public JsonResult obtenerPagosSocios(FormCollection data)
        {
            Guid idSocio = Guid.Parse(data["idSocio"]);
            
            var cuotas = from c in usuariosRepo.cuotasDeSocio(idSocio)
                         select new
                         {
                             idCuota = c.idCuota,
                             TipoCuota = mtbDB.tbTipoCuota.Where(tipoC => tipoC.idTipoCuota.Equals(c.FKTipoCuota)).Single().Nombre,
                             Fecha = mtbDB.tbFactura.Where(factu => factu.idFactura.Equals(c.FKFactura)).Single().Fecha.ToShortDateString(),
                             Concepto = mtbDB.tbFactura.Where(factu => factu.idFactura.Equals(c.FKFactura)).Single().Concepto,
                             BaseImponible = mtbDB.tbFactura.Where(factu => factu.idFactura.Equals(c.FKFactura)).Single().BaseImponible,
                             Total = mtbDB.tbFactura.Where(factu => factu.idFactura.Equals(c.FKFactura)).Single().Total,                             
                             Estado = mtbDB.tbEstadoFactura.Where(estado => estado.idEstadoFactura.Equals(mtbDB.tbFactura.Where(factu => factu.idFactura.Equals(c.FKFactura)).Single().FKEstado)).Single().Nombre,
                             FechaExpiracion = c.FechaExpiracion.ToShortDateString()
                         };
            return Json(cuotas);
        }

        [HttpPost]
        public void pagarCuotaSocio(FormCollection data)
        {
            Guid idCuota = Guid.Parse(data["idCuota"]);
            String FechaExpiracion = data["FechaExpiracion"];
            Guid idSocio = Guid.Parse(data["idSocio"]);

            tbCuota cuota = usuariosRepo.obtenerCuota(idCuota);
            tbEstadoFactura pagado = mtbDB.tbEstadoFactura.Where(estadoF => estadoF.Nombre.Equals("Pagado")).Single();
            facturasRepo.setEstadoFactura(pagado, cuota.FKFactura);

            if(DateTime.Today.CompareTo(DateTime.Parse(FechaExpiracion)).Equals(-1))
                usuariosRepo.cambiarEstadoSocio(idSocio, "Activo", FechaExpiracion);
        }

        [HttpPost]
        public void ascenderJuntaDirectiva(FormCollection data)
        {
            Guid idSocio = Guid.Parse(data["idSocio"]);
            Guid Cargo = Guid.Parse(data["cargoDirectivo"]);

            if (usuariosRepo.esJuntaDirectiva(idSocio).Equals(false))
                usuariosRepo.crearJuntaDirectiva(idSocio, Cargo);
        }

        [HttpPost]
        public JsonResult cargosDirectivos()
        {
            var cargos = from c in usuariosRepo.obtenerTodosCargos()
                         select new
                         {
                             idCargoDirectivo = c.idCargoDirectivo,
                             Nombre = c.Nombre                             
                         };

            return Json(cargos);
        }

        [HttpPost]
        public void insertarSocio(FormCollection data)
        {
            // Creamos el Usuario ASP NET
            

            // Creamos el Usuario
            tbUsuario usuario = new tbUsuario
            {
                 idUsuario = Guid.NewGuid(),
                 Nombre = data["Nombre"],
                 Apellidos = data["Apellidos"],
                 Email = data["Email"]
            };

            // Creamos el Socio
            tbSocio socio = new tbSocio
            {
                 idSocio = Guid.NewGuid(),
                 FechaExpiracion = DateTime.Parse(data["FechaExpiracion"]),
                 FechaAlta = DateTime.Parse(data["FechaAlta"]),
                 Estado = data["Estado"],
                 FKUsuario = usuario.idUsuario,
                 NumeroSocio = int.Parse(data["NumeroSocio"])
                 
            };

            
        }

        [HttpPost]
        public void editarSocio(FormCollection data)
        {
            Guid idSocio = Guid.Parse(data["idSocio"]);
            int NumeroSocio = int.Parse(data["NumeroSocio"]);
            DateTime FechaExpiracion = DateTime.Parse(data["FechaExpiracion"]);
            DateTime FechaAlta = DateTime.Parse(data["FechaAlta"]);
            String Estado = data["Estado"];

            usuariosRepo.actualizarNombreApellidosUsuario(usuariosRepo.obtenerUsuarioBySocio(idSocio).idUsuario, data["Nombre"], data["Apellidos"]);
            usuariosRepo.actualizarSocio(idSocio, NumeroSocio, FechaExpiracion, FechaAlta, data["FechaBaja"], Estado);            
            
        }

        [HttpPost]
        public JsonResult obtenerJuntaDirectiva()
        {
            var JuntaDirectiva = from j in usuariosRepo.obtenerJuntaDirectiva()
                                 select new
                                 {
                                     FKCargoDirectivo = j.FKCargoDirectivo
                                     
                                 };
            return Json(JuntaDirectiva);
        }
        
    }
}
