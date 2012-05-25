using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class PedidosController : Controller
    {
        static PedidosRepositorio PedidosRepo = new PedidosRepositorio();
        static ArticulosRepositorio ArticulosRepo = new ArticulosRepositorio();
        static UsuariosRepositorio UsuariosRepo = new UsuariosRepositorio();
        static FacturasRepositorio FacturasRepo = new FacturasRepositorio();
        mtbMalagaDataContext db = new mtbMalagaDataContext();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PedidosCerrados()
        {
            return View();
        }
        //*********************RELACION PEDIDO GLOBAL - ARTICULO*****************
        [HttpPost]
        public ActionResult getArticulosByPedido(FormCollection data)
        {
            Guid idPedido = Guid.Parse(data["idPedido"]);
            var articulos = from a in ArticulosRepo.getArticulosById(PedidosRepo.getArticulosByPedido(idPedido))
                            select new
                            {
                                idArticulo = a.idArticulo,
                                nombre = a.Nombre,
                                imagen = a.Imagen,
                                descripcion = a.Descripcion,
                                precio = a.Precio,
                                fKCategoria = a.FKCategoria,
                                categoriaNombre = ArticulosRepo.leerCategoria(a.FKCategoria).Nombre
                            };
            return Json(articulos);
        }

        //*******************************LINEA PEDIDO USUARIO***************************
        public ActionResult getArticulosByPedidoUsuario(FormCollection data)
        {
            Guid idPedidoUsuario = Guid.Parse(data["idPedidoUsuario"]);

            var articulos = from a in PedidosRepo.getLineasPedidoUsuarioByPedidoUsuario(idPedidoUsuario)
                            select new 
                            {
                                idArticulo = ArticulosRepo.leerArticulo(a.FKArticulo).idArticulo,
                                nombre = ArticulosRepo.leerArticulo(a.FKArticulo).Nombre,
                                imagen = ArticulosRepo.leerArticulo(a.FKArticulo).Imagen,
                                descripcion = ArticulosRepo.leerArticulo(a.FKArticulo).Descripcion,
                                precio = ArticulosRepo.leerArticulo(a.FKArticulo).Precio,
                                fKCategoria = ArticulosRepo.leerArticulo(a.FKArticulo).FKCategoria,
                                categoriaNombre = ArticulosRepo.leerCategoria(ArticulosRepo.leerArticulo(a.FKArticulo).FKCategoria).Nombre,
                                unidades = a.Unidades
                            };  
            return Json(articulos);
        }


        //*********************************PEDIDOS********************************
        public ActionResult leerTodos()
        { 
            var pedidos = from ped in PedidosRepo.listarPedidos()
                          select new
                          {
                              idPedido = ped.idPedidoGlobal,
                              descuento = ped.DescuentoFijo,
                              total = ped.Total,
                              fechaLimite = ped.FechaLimite.Value.ToShortDateString(),
                              fechaLimitePago = ped.FechaLimitePago.Value.ToShortDateString(),
                              nombre = ped.Nombre
                          };
            return Json(pedidos);
        }

        public ActionResult leerTodosCerrados()
        {
            var pedidos = from ped in PedidosRepo.listarPedidosCerrados()
                          select new
                          {
                              idPedido = ped.idPedidoGlobal,
                              descuento = ped.DescuentoFijo,
                              total = ped.Total,
                              fechaLimite = ped.FechaLimite.Value.ToShortDateString(),
                              fechaLimitePago = ped.FechaLimitePago.Value.ToShortDateString(),
                              nombre = ped.Nombre
                          };
            return Json(pedidos);
        }

        public int cerrarPedido(FormCollection data)
        {
            Guid idPedidoGlobal = Guid.Parse(data["idPedidoGlobal"]);
            Guid estado = Guid.Parse("48a02026-e354-4973-ab00-976a36cdd998");
            PedidosRepo.setEstadoPedido(idPedidoGlobal, estado);

            return 1;
        }

        public int anadirPedido(FormCollection Data)
        {
            String nombre = Data["Nombre"];
            Decimal descuento = Decimal.Parse(Data["Descuento"]);
            DateTime date = DateTime.Parse(Data["Fecha"]);
            DateTime dateP = DateTime.Parse(Data["FechaPago"]);
            var articulosRaw = System.Web.Helpers.Json.Decode(Data["Articulos"]);
            Guid idPedidoGlobal = Guid.NewGuid();
            tbPedidoGlobal f = new tbPedidoGlobal()
            {
                Nombre = nombre,
                DescuentoFijo = descuento,
                idPedidoGlobal = idPedidoGlobal,
                Total = 0,
                FechaLimite = date,
                FechaLimitePago = dateP
            };

            PedidosRepo.anadirPedidoGlobal(f);

            int i;
            for (i = 0; i < articulosRaw.Length; i++)
            {
                Guid id = Guid.Parse(articulosRaw[i].idArticulo);
                tbRelacionPedidoGlobalArticulo rpga = new tbRelacionPedidoGlobalArticulo
                {
                    FKPedidoGlobal = idPedidoGlobal,
                    FKArticulo = id,
                    idRelacionPedidoGlobalArticulo = Guid.NewGuid()
                };
                PedidosRepo.anadirRelacionPedidoGlobalArticulo(rpga);
            }
            return 1;
        }
        //*************************PEDIDOS USUARIO********************************
        public ActionResult leerPedidosUsuarioByPedido(FormCollection data)
        {
            Guid idPedido = Guid.Parse(data["idPedido"]);
            var PedidosUsuario = from peds in PedidosRepo.getPedidoUsuarioByPedido(idPedido)
                                    select new
                                    {
                                        usuario = UsuariosRepo.obtenerUsuario(peds.FKUsuario).Nickname,
                                        subtotal = peds.Subtotal,
                                        idPedidoUsuario = peds.idPedidoUsuario,

                                        Nombre = UsuariosRepo.obtenerUsuario(peds.FKUsuario).Nombre,
                                        Apellidos = UsuariosRepo.obtenerUsuario(peds.FKUsuario).Apellidos,
                                        Sexo = UsuariosRepo.obtenerUsuario(peds.FKUsuario).Sexo,
                                        Email = UsuariosRepo.obtenerUsuario(peds.FKUsuario).Email,
                                        Avatar = UsuariosRepo.obtenerUsuario(peds.FKUsuario).Avatar,
                                        Nacionaliad = UsuariosRepo.obtenerUsuario(peds.FKUsuario).Nacionalidad
                                    };

            return Json(PedidosUsuario);
        }
        
        public ActionResult leerTodosPedidosUsuario()
        {
            var pedidosUsu = from ped in PedidosRepo.listarPedidosUsuario()
                          select new
                          {
                              idPedidoUsuario = ped.idPedidoUsuario,
                              FKPedidoGlobal = ped.FKPedidoGlobal,
                              FKUsuario = ped.FKUsuario,
                              Subtotal = ped.Subtotal
                          };
            return Json(pedidosUsu);
        }

        public int anadirPedidoUsuario (FormCollection Data)
        {
            Guid FKUsuario = UsuariosRepo.obtenerUsuarioNoAsp(HomeController.obtenerUserIdActual()).idUsuario;
            var lineasRaw = System.Web.Helpers.Json.Decode(Data["lineas"]);
            Guid idPedido = Guid.Parse(Data["FKPedidoGlobal"]);
            Guid idPedidoUsuario = Guid.NewGuid();
            decimal total = 0;
            tbPedidoUsuario f = new tbPedidoUsuario()
            {
                idPedidoUsuario = idPedidoUsuario,
                FKPedidoGlobal = idPedido,
                FKUsuario = FKUsuario,               
            };

            IList<tbLineaPedidoUsuario> lista = new List<tbLineaPedidoUsuario>();
            int i;
            for (i=0;i<lineasRaw.Length;i++)
            {
                Guid idLineaPedidoUsuario = Guid.NewGuid();
                tbLineaPedidoUsuario p = new tbLineaPedidoUsuario()
                {
                    idLineaPedidoUsuario = idLineaPedidoUsuario,
                    FKPedidoUsuario = idPedidoUsuario,
                    Unidades = lineasRaw[i].Unidades,
                    FKArticulo = Guid.Parse(lineasRaw[i].idArticulo)
                };
                total+= ArticulosRepo.leerArticulo(p.FKArticulo).Precio * lineasRaw[i].Unidades;
                lista.Add(p);
            };
            f.Subtotal = total;

            PedidosRepo.anadirPedidoUsuario(f);
            foreach (tbLineaPedidoUsuario linea in lista)
            {
                PedidosRepo.anadirLineaPedidoUsuario(linea);
            }
            return 1;
        }

        //*******************************PEDIDOS CERRADOS******************************
        public void facturarPedidoUsuario(FormCollection data)
        {
            Guid id = Guid.Parse(data["idPedidoUsuario"]);
            tbPedidoUsuario p = PedidosRepo.getPedidoUsuarioById(id);
            Guid idFactura = Guid.NewGuid()
            tbFactura f = new tbFactura
            {
                idFactura = idFactura,
                Concepto = "Pedido usuario: "+UsuariosRepo.obtenerUsuario(p.FKUsuario),
                Fecha = DateTime.Today,
                FKPedidoUsuario = p.idPedidoUsuario,
                FKUsuario = p.FKUsuario,
                FKJuntaDirectiva = obtenerJuntaDirectivaLogueado(),
                FKEstado = FacturasRepo.leerEstadoByNombre("Pagado").idEstadoFactura
            };

            IList<tbLineaPedidoUsuario> lista = PedidosRepo.getLineasPedidoUsuarioByPedidoUsuario(id);
            IList<tbLineaFactura> lineasFactura = new List<tbLineaFactura>();
            Decimal total = 0;
            Decimal unidades = 0;
            Decimal precio = 0;
            foreach (tbLineaPedidoUsuario linea in lista)
            {
                unidades = linea.Unidades;
                precio = ArticulosRepo.leerArticulo(linea.FKArticulo).Precio.Value;
                tbLineaFactura lineaFactura = new tbLineaFactura()
                {
                    idLineaFactura = Guid.NewGuid(),
                    Descripcion = ArticulosRepo.leerArticulo(linea.FKArticulo).Nombre,
                    Unidades = linea.Unidades,
                    PrecioUnitario = ArticulosRepo.leerArticulo(linea.FKArticulo).Precio.Value,
                    Total = unidades * precio,
                    FKArticulo = linea.FKArticulo
                };
                lineasFactura.Add(lineaFactura);
                total = total + (unidades*precio);
            }

            if (!UsuariosRepo.obtenerUsuarioNoAsp(HomeController.obtenerUserIdActual()).Equals(default))
            {
                tbSocio socio = UsuariosRepo.obtenerSocio(UsuariosRepo.obtenerUsuarioNoAsp(HomeController.obtenerUserIdActual()).idUsuario);
                foreach(tbDescuentoSocio ds in UsuariosRepo.listarDescuentosSocio())
                {
                    if(ds.Nombre.Equals("Basico")) 
                    {
                        tbLineaFactura linea = new tbLineaFactura
                        {
                            idLineaFactura =Guid.NewGuid(),
                            Concepto = "Descuento: "+ds.Nombre,
                            Unidades = -ds.Cantidad,
                            PrecioUnitario = total,
                            Total = (-ds.Cantidad) * total,
                            FKFactura = idFactura
                        };
                        lineasFactura.Add(linea);
                    }
                    if(ds.Nombre.Equals("Antiguedad"))
                    {
                        if((socio.FechaAlta - socio.FechaBaja).TotalSeconds > new DateTime(2012,1,1) - new DateTime(2012 - ds.Annos,1,1))
                        {
                            tbLineaFactura linea = new tbLineaFactura
                            {
                                idLineaFactura =Guid.NewGuid(),
                                Concepto = "Descuento: "+ds.Nombre,
                                Unidades = -ds.Cantidad,
                                PrecioUnitario = total,
                                Total = (-ds.Cantidad) * total,
                                FKFactura = idFactura
                            };
                            lineasFactura.Add(linea);
                        }

                }


            }
            
            f.BaseImponible = total;

            FacturasController.crearFacturaExterna(f,lineasFactura);
        }

        private Guid obtenerJuntaDirectivaLogueado()
        {
            Guid user = HomeController.obtenerUserIdActual();
            return db.tbJuntaDirectiva.Where(jd => jd.FKSocio == db.tbSocio.Where(s => s.FKUsuario == db.tbUsuario.Where(u => u.FKUser == user).Single().idUsuario).Single().idSocio).Single().FKSocio;
        }

        private String obtenerJuntaDirectivaNickname(Guid idJuntaDirectiva)
        {
            return db.tbUsuario.Where(u => u.idUsuario == (db.tbSocio.Where(s => s.idSocio == idJuntaDirectiva).Single().FKUsuario)).Single().Nickname;
        }
    }
}