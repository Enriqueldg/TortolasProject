using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.Security;
using TortolasProject.Models;
using System.Web.Routing;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class HomeController : Controller
    {
        AccountRepositorio AccountRepo = new AccountRepositorio();
        UsuariosRepositorio usuariosRepo = new UsuariosRepositorio();

        public ActionResult Index()
        {
            ViewBag.Message = "ASP.NET MVC";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
        public ActionResult Hola()
        {
            return View();
        }
        public ActionResult Eventos()
        {
            return View();
        }

        public ActionResult Captacion()
        {
            return View();
        }


        ///////////////////////////////////////////////////////////////////////////////
        // INICIAR SESIÓN
        ///////////////////////////////////////////////////////////////////////////////
        [HttpPost]
        public String LogOn(FormCollection data)
        {
            string user = data["username"];
            string pass = data["pass"];
            string returnUrl = data["returnUrl"];

            LogOnModel model = new LogOnModel
            {
                UserName = user,
                Password = pass,
                RememberMe = true
            };

            if (ModelState.IsValid)
            {
                if (Membership.ValidateUser(model.UserName, model.Password))
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, model.RememberMe);
                    if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                        && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                    {
                        return "ok";
                    }
                    else
                    {
                        return "ok";
                    }
                }
                else
                {
                    ModelState.AddModelError("", "El nombre de usuario o la contraseña especificados son incorrectos.");
                }
            }

            // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
            return "error";
        }

        [HttpPost]
        public String Registro(FormCollection data)
        {
            string user = data["UserName"];
            string pass = data["Password"];
            string email = data["Email"];
            string cpass = data["ConfirmPassword"];

            RegisterModel model = new RegisterModel
            {
                UserName = user,
                Password = pass,
                Email = email,
                ConfirmPassword = cpass
            };
            if (ModelState.IsValid)
            {
                // Intento de registrar al usuario
                MembershipCreateStatus createStatus;
                Membership.CreateUser(model.UserName, model.Password, model.Email, null, null, true, null, out createStatus);

                if (createStatus == MembershipCreateStatus.Success)
                {
                    mtbMalagaDataContext db = new mtbMalagaDataContext();

                    aspnet_Users u = db.aspnet_Users.Where(usuario => usuario.UserName == model.UserName).Single();
                    tbUsuario nuevoUsuario = new tbUsuario {
                        Nickname = u.UserName,
                        idUsuario = Guid.NewGuid(),
                        FKUser = u.UserId,
                        Email = model.Email
                    };
                    AccountRepo.registro(nuevoUsuario);
                    FormsAuthentication.SetAuthCookie(model.UserName, false /* createPersistentCookie */);
                    return nuevoUsuario.idUsuario.ToString();
                }
                else
                {
                    ModelState.AddModelError("", ErrorCodeToString(createStatus));
                    return ErrorCodeToString(createStatus);
                }
            }


            // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
            return "Error en modelo";
        }

        [HttpPost]
        public String RegistroInterno(FormCollection data)
        {
            string user = data["UserName"];
            string pass = data["Password"];
            string email = data["Email"];
            string cpass = data["ConfirmPassword"];

            RegisterModel model = new RegisterModel
            {
                UserName = user,
                Password = pass,
                Email = email,
                ConfirmPassword = cpass
            };
            if (ModelState.IsValid)
            {
                // Intento de registrar al usuario
                MembershipCreateStatus createStatus;
                Membership.CreateUser(model.UserName, model.Password, model.Email, null, null, true, null, out createStatus);

                if (createStatus == MembershipCreateStatus.Success)
                {
                    mtbMalagaDataContext db = new mtbMalagaDataContext();

                    aspnet_Users u = db.aspnet_Users.Where(usuario => usuario.UserName == model.UserName).Single();
                    tbUsuario nuevoUsuario = new tbUsuario
                    {
                        Nickname = u.UserName,
                        idUsuario = Guid.NewGuid(),
                        FKUser = u.UserId,
                        Email = model.Email
                    };
                    AccountRepo.registro(nuevoUsuario);
                 
                    return nuevoUsuario.idUsuario.ToString("B");                    
                }
                else
                {
                    ModelState.AddModelError("", ErrorCodeToString(createStatus));
                    return ErrorCodeToString(createStatus);
                }
            }


            // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
           return "Error en modelo";
        }

        public static Guid obtenerUserIdActual()
        {
            // Obtenemos el UserID
            MembershipUser myObject = Membership.GetUser();
            return (Guid)Membership.GetUser().ProviderUserKey;
        }

        #region Status Codes
        private static string ErrorCodeToString(MembershipCreateStatus createStatus)
        {
            // Vaya a http://go.microsoft.com/fwlink/?LinkID=177550 para
            // obtener una lista completa de códigos de estado.
            switch (createStatus)
            {
                case MembershipCreateStatus.DuplicateUserName:
                    return "El nombre de usuario ya existe. Escriba un nombre de usuario diferente.";

                case MembershipCreateStatus.DuplicateEmail:
                    return "Ya existe un nombre de usuario para esa dirección de correo electrónico. Escriba una dirección de correo electrónico diferente.";

                case MembershipCreateStatus.InvalidPassword:
                    return "La contraseña especificada no es válida. Escriba un valor de contraseña válido.";

                case MembershipCreateStatus.InvalidEmail:
                    return "La dirección de correo electrónico especificada no es válida. Compruebe el valor e inténtelo de nuevo.";

                case MembershipCreateStatus.InvalidAnswer:
                    return "La respuesta de recuperación de la contraseña especificada no es válida. Compruebe el valor e inténtelo de nuevo.";

                case MembershipCreateStatus.InvalidQuestion:
                    return "La pregunta de recuperación de la contraseña especificada no es válida. Compruebe el valor e inténtelo de nuevo.";

                case MembershipCreateStatus.InvalidUserName:
                    return "El nombre de usuario especificado no es válido. Compruebe el valor e inténtelo de nuevo.";

                case MembershipCreateStatus.ProviderError:
                    return "El proveedor de autenticación devolvió un error. Compruebe los datos especificados e inténtelo de nuevo. Si el problema continúa, póngase en contacto con el administrador del sistema.";

                case MembershipCreateStatus.UserRejected:
                    return "La solicitud de creación de usuario se ha cancelado. Compruebe los datos especificados e inténtelo de nuevo. Si el problema continúa, póngase en contacto con el administrador del sistema.";

                default:
                    return "Error desconocido. Compruebe los datos especificados e inténtelo de nuevo. Si el problema continúa, póngase en contacto con el administrador del sistema.";
            }
        }
        #endregion


        [HttpPost]
        public JsonResult estadisticasCaptacion()
        {

            DateTime hoy = DateTime.Today;
            int Anno = hoy.Year;

            var salida = new
            {
                // Enviamos los annos
                anno1 = Anno,
                anno2 = Anno - 1,
                anno3 = Anno - 2,
                // Recogemos los eventos de los tres años pasados
                altasSocio1 = usuariosRepo.altasSocioAnno(Anno),
                altasSocio2 = usuariosRepo.altasSocioAnno(Anno - 1),
                altasSocio3 = usuariosRepo.altasSocioAnno(Anno - 2),
                // Recogemos el numero de socios
                numeroSocios = usuariosRepo.numeroSocios(),
                numeroSociosActivo = usuariosRepo.numeroSociosEstado("Activo"),
                numeroSociosInactivo = usuariosRepo.numeroSociosEstado("Inactivo"),
                numeroSociosBaja = usuariosRepo.numeroSociosEstado("Baja"),
                // Recogemos el numero de eventos de los tres años pasados
                numeroEventos1 = usuariosRepo.numeroEventosAnno(Anno),
                numeroEventos2 = usuariosRepo.numeroEventosAnno(Anno - 1),
                numeroEventos3 = usuariosRepo.numeroEventosAnno(Anno - 2),
                // Recogemos el numero de eventos oficiales
                numeroOficiales1 = usuariosRepo.numeroEventosOficialAnno(Anno),
                numeroOficiales2 = usuariosRepo.numeroEventosOficialAnno(Anno - 1),
                numeroOficiales3 = usuariosRepo.numeroEventosOficialAnno(Anno - 2),
                // Recogemos el numero de cursillos
                numeroCursillos1 = usuariosRepo.numeroCursillosAnno(Anno),
                numeroCursillos2 = usuariosRepo.numeroCursillosAnno(Anno - 1),
                numeroCursillos3 = usuariosRepo.numeroCursillosAnno(Anno - 2)
                // Recogemos los pedidos

            };
            return Json(salida);
        }

        [HttpPost]
        public JsonResult estadisticasAltas()
        {
            int Anno = DateTime.Today.Year;
            
            int [][] salida= new int[3][];

            salida[0]= new int[2];
            salida[0][0] = Anno-2;
            salida[0][1] = usuariosRepo.altasSocioAnno(Anno-2);
            salida[1] = new int[2];
            salida[1][0] = Anno-1;
            salida[1][1] = usuariosRepo.altasSocioAnno(Anno-1);
            salida[2] = new int[2];
            salida[2][0] = Anno;
            salida[2][1] = usuariosRepo.altasSocioAnno(Anno);
            
            var datos = from t in salida
                        select new {
                            anno= t[0],
                            altas= t[1]
                        };
            return Json(datos);
        }

        [HttpPost]
        public JsonResult estadisticasNumeroSocios()
        {            
            decimal numeroSocios = usuariosRepo.numeroSocios();
            Dictionary<String, decimal> salida = new Dictionary<String, decimal>();

            // Realizo el tanto por ciento de cada estado
            salida.Add("Activo", ((usuariosRepo.numeroSociosEstado("Activo"))*100)/numeroSocios );
            salida.Add("Inactivo", ((usuariosRepo.numeroSociosEstado("Inactivo")) * 100) / numeroSocios);
            salida.Add("Baja", ((usuariosRepo.numeroSociosEstado("Baja")) * 100) / numeroSocios);

            var datos = from t in salida
                        select new
                        {
                            nombre = t.Key,
                            porcentaje = t.Value
                        };
            return Json(datos);
        }

        [HttpPost]
        public JsonResult numeroSocios()
        {
            return Json(usuariosRepo.numeroSocios());
        }

        [HttpPost]
        public JsonResult estadisticasEventos(FormCollection data)
        {
            int Anno = int.Parse(data["Anno"]);
            decimal numeroSocios = usuariosRepo.numeroSocios();
            Dictionary<int,int[]> salida = new Dictionary<int, int[]>();

            // Realizo el tanto por ciento de cada estado            
            int[] anno1;
            anno1 = new int[3];
            
            anno1.SetValue(usuariosRepo.numeroCursillosAnno(Anno),0);
            anno1.SetValue(usuariosRepo.numeroEventosOficialAnno(Anno),1);
            anno1.SetValue(usuariosRepo.numeroEventosAnno(Anno),2);
            salida.Add(Anno,anno1);
           
            //2.SetValue(usuariosRepo.numeroCursillosAnno(Anno-1),usuariosRepo.numeroEventosOficialAnno(Anno-1),usuariosRepo.numeroEventosAnno(Anno-1));
            //salida.Add(Anno-1,compuesto2);
            
            var datos = from t in salida
                        select new
                        {
                            anno = t.Key,
                            cursillos = t.Value.GetValue(0),
                            oficiales = t.Value.GetValue(1),
                            nooficiales = t.Value.GetValue(2)
                        };
            return Json(datos);
        }
    } 
}
