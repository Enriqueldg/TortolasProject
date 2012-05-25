using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers

{
    public class ContratosController : Controller
    {
        //
        // GET: /Contratos/

        static EmpresasRepositorio ContratosRepo = new EmpresasRepositorio();

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LeerTodos()
        {

            var contratos = from ob in ContratosRepo.ListarContratos()
                            select new
                            {
                                idContrato = ob.idContrato,
                                FKCodigoEmpresa = ob.FKCodigoEmpresa,
                                FKJuntaDirectiva = ob.FKJuntaDirectiva,
                                NombreJuntaDirectiva = ContratosRepo.buscarusuario(ContratosRepo.buscarsocio(ob.FKJuntaDirectiva).FKUsuario).Nombre,
                                NombreEmpresa = ContratosRepo.buscaremp(ob.FKCodigoEmpresa).Nombre,
                                CIFEmpresa = ContratosRepo.buscaremp(ob.FKCodigoEmpresa).CIF,
                                FechaCreacion = ob.FechaCreacion.HasValue ? ob.FechaCreacion.Value.ToShortDateString() : "",
                                FechaCaducidad = ob.FechaCaducidad.ToShortDateString(),
                                DescripcionLegal = ob.DescripcionLegal,
                                Firmas = ob.Firmas,
                                Importe = ob.Importe,
                            };
            return Json(contratos);
        }

        [HttpPost]
        public void UpdateContrato(FormCollection data)
        {
            Guid idContrato = Guid.Parse(data["idcontrato"]);
            Guid FKCodigoEmpresa = ContratosRepo.buscarempCIF(data["cifempresa"]).idEmpresa;
            Guid FKJuntaDirectiva = Guid.Parse(data["fkjuntadirectiva"]);
            String NombreEmpresa = data["nombreempresa"];
            Decimal Importe = Decimal.Parse(data["importe"]);
            DateTime fechacreacion = DateTime.Parse(data["fechacreacion"]);
            DateTime fechacaducidad = DateTime.Parse(data["fechacaducidad"]);
            String Descripcion = data["descripcion"];


            tbContrato contrato = new tbContrato
            {
                idContrato = idContrato,
                  FKCodigoEmpresa = FKCodigoEmpresa,
                   NombreEmpresa = NombreEmpresa,
                    Importe = Importe,
                     FechaCaducidad = fechacaducidad,
                      FechaCreacion = fechacreacion,
                DescripcionLegal = Descripcion,
                 FKJuntaDirectiva = FKJuntaDirectiva,
                     
                  //Le doy un valor para que no este vacio ni repetido, al actualizar no incluyo ese campo

            };


            ContratosRepo.updateContrato(contrato);
        }

        [HttpPost]
        public void DeleteContrato(FormCollection data)
        {
            Guid idContrato = Guid.Parse(data["idcontrato"]);


            ContratosRepo.deleteContrato(idContrato);
            //ProveedoresRepo.deleteEmp(idProveedor);
        }

        [HttpPost]
        public void CreateProveedor(FormCollection data)
        {
            bool existe = true;

            Guid idEmpresa = Guid.NewGuid();
            String NombreEmpresa = data["nombreempresa"];
            String CIF = data["cif"];
            int TelefonodeContacto = int.Parse(data["telefono"]);
            Guid FKJuntaDirectiva = Guid.Parse(data["fkjuntadirectiva"]);
            Decimal Importe = Decimal.Parse(data["importe"]);
            DateTime fechacreacion = DateTime.Parse(data["fechacreacion"]);
            DateTime fechacaducidad = DateTime.Parse(data["fechacaducidad"]);
            String Descripcion = data["descripcion"];


            tbEmpresa Empresa = new tbEmpresa
            {
                idEmpresa = idEmpresa,
                Nombre = NombreEmpresa,
                Localidad = " ",
                DireccionWeb = " ",
                TelefonodeContacto = TelefonodeContacto,
                Email = " ",
                CIF = CIF
            };
            tbContrato Contrato = new tbContrato
            {
                FKCodigoEmpresa = idEmpresa,
                idContrato = Guid.NewGuid(),
                 DescripcionLegal = Descripcion,
                  FKJuntaDirectiva = FKJuntaDirectiva,
                   FechaCaducidad = fechacaducidad,
                    FechaCreacion = fechacreacion,
                     Importe = Importe,
                      NombreEmpresa = NombreEmpresa,
            };
            try
            {
                if (ContratosRepo.buscarempCIF(CIF).CIF.Equals(CIF)) //Si entra dentro del bucle es que EXISTE una empresa asociada
                {
                    Contrato.FKCodigoEmpresa = ContratosRepo.buscarempCIF(CIF).idEmpresa;
                }
            }
            catch
            {
                existe = false;
            }

            if (!existe)
            {
                ContratosRepo.createEmp(Empresa);
            }

            ContratosRepo.createContrato(Contrato);

        }

        [HttpPost]
        public ActionResult LeerJuntaDirectiva()
        {

            var junta = from ob in ContratosRepo.ListarJuntaDirectiva()
                            select new
                            {
                                NombreJuntaDirectiva = ContratosRepo.buscarusuario(ContratosRepo.buscarsocio(ob.FKSocio).FKUsuario).Nombre,
                                Cargo = ContratosRepo.obtenercargo(ob.FKCargoDirectivo),
                                FKSocio = ob.FKSocio,
                                Estado = ob.Estado
                            };
            return Json(junta);
        }

    }
}
