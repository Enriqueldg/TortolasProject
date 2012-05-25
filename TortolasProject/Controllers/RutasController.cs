using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;
using TortolasProject.Controllers;
using System.IO;

namespace TortolasProject.Controllers
{
    public class RutasController : Controller
    {
        //
        // GET: /Rutas/

        RutasRepositorio RutasRepo = new RutasRepositorio();
        UsuariosRepositorio UsuariosRepo = new UsuariosRepositorio();
        mtbMalagaDataContext mtbDB = new mtbMalagaDataContext();

        public ActionResult Index()
        {
            return View();
        }

        // Funcion para leer todas las rutas (montar el KendoGrid)
        [HttpPost]
        public JsonResult leerRutas()
        {
            var rutas = from r in RutasRepo.leerTodas()
                        select new
                        {
                            idRuta = r.idRuta,
                            Nombre = r.Nombre,
                            Ruta = r.rutaArchivo,
                            URL = r.URL,
                            Descripcion = r.Descripcion,
                            idUsuario = r.FKUsuario,
                            Dificultad = r.FKDificultad.HasValue ? mtbDB.tbDificultad.Where(dific => dific.idDificultad.Equals(r.FKDificultad)).Single().Nombre : null,
                            Kilometros = r.Kilometros,
                            Autor = UsuariosRepo.obtenerUsuario(r.FKUsuario).Nickname
                        };
            return Json(rutas);
        }

        [HttpPost]
        public JsonResult leerRutasUsuario(FormCollection data)
        {
            Guid idUsuario = Guid.Parse(data["idUsuario"]);
            var rutas = from r in RutasRepo.leerRutasUsuario(idUsuario)
                        select new
                        {
                            idRuta = r.idRuta,
                            Nombre = r.Nombre,
                            Ruta = r.rutaArchivo,
                            URL = r.URL,
                            Descripcion = r.Descripcion,
                            idUsuario = r.FKUsuario,
                            Dificultad = r.FKDificultad.HasValue ? mtbDB.tbDificultad.Where(dific => dific.idDificultad.Equals(r.FKDificultad)).Single().Nombre : null,
                            Kilometros = r.Kilometros,
                            Autor = UsuariosRepo.obtenerUsuario(r.FKUsuario).Nickname
                        };
            return Json(rutas);
        }

        // Funcion para insertar una nueva Ruta
        [HttpPost]
        [ValidateInput(false)]
        public void insertarRuta(FormCollection data)
        {
            tbRuta nueva = new tbRuta
            {
                 idRuta = Guid.NewGuid(),
                 FKUsuario = UsuariosRepo.obtenerUsuarioNoAsp(HomeController.obtenerUserIdActual()).idUsuario,
                 FKDificultad = RutasRepo.dificultadPorNombre(data["Dificultad"]),
                 Kilometros = int.Parse(data["Kilometros"]),
                 URL = data["EnlaceWeb"],
                 Descripcion = data["Descripcion"],
                 Nombre = data["Nombre"],
                 rutaArchivo = data["RutaArchivo"]
                   
            };
            RutasRepo.insertarRuta(nueva);
        }

        // Funcion para editar una nueva Ruta
        [HttpPost]
        [ValidateInput(false)]
        public void editarRuta(FormCollection data)
        {

            tbRuta nueva = new tbRuta
            {
                //idRuta = Guid.Parse(),
                FKUsuario = UsuariosRepo.obtenerUsuarioNoAsp(HomeController.obtenerUserIdActual()).idUsuario,
                FKDificultad = RutasRepo.dificultadPorNombre(data["Dificultad"]),
                Kilometros = int.Parse(data["Kilometros"]),
                URL = data["EnlaceWeb"],
                Descripcion = data["Descripcion"],
                Nombre = data["Nombre"],
                rutaArchivo = data["RutaArchivo"]

            };
            RutasRepo.insertarRuta(nueva);
        }

        // Funcion para obtener todas las dificultades
        [HttpPost]
        public JsonResult obtenerDificultades()
        {
            var dificultades = from d in RutasRepo.todasDificultades()
                               select new
                               {
                                   Nombre = d.Nombre,
                                   Valor = d.Nombre                                   
                               };
            return Json(dificultades);
        }

        [HttpPost]
        // Funcion para subir las rutas al servidor
        public String subir(IEnumerable<HttpPostedFileBase> attachments)
        {
            String fileName = " ";
            // The Name of the Upload component is "attachments" 
            foreach (var file in attachments)
            {
                // Some browsers send file names with full path. This needs to be stripped.
                fileName = Path.GetFileName(file.FileName);
                var physicalPath = Path.Combine(Server.MapPath("~/Content/Rutas/"), fileName);

                file.SaveAs(physicalPath);
            }
            // Return an empty string to signify success
            //return Content("");
            return fileName;
        }

        [HttpPost]
        public void eliminarRuta(FormCollection data)
        {
            Guid idRuta = Guid.Parse(data["idRuta"]);

            RutasRepo.eliminarRuta(idRuta);
        }


        public ActionResult devolverRuta(String data)
        {
            Guid idRuta = Guid.Parse(data);
            tbRuta ruta = RutasRepo.obtenerRuta(idRuta);
            String filename = ruta.rutaArchivo;
            return File(filename, "text/xml", Server.HtmlEncode(filename));
        }
    }
}
