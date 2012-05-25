using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TortolasProject.Models.Repositorios
{
    public class PedidosRepositorio
    { 
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        //****************************************PEDIDOS*****************************************
        public IList<tbPedidoGlobal> listarPedidos()
        {
            Guid estado = mtbMalagaDB.tbEstadoPedido.Where(a => a.Estado.Equals("Abierto")).Single().idEstadoPedido;
            return mtbMalagaDB.tbPedidoGlobal.Where(a => a.FKEstadoPedido == estado).ToList();
        }

        public IList<tbPedidoGlobal> listarPedidosCerrados()
        {
            Guid estado = mtbMalagaDB.tbEstadoPedido.Where(a => a.Estado.Equals("Cerrado")).Single().idEstadoPedido;
            return mtbMalagaDB.tbPedidoGlobal.Where(a => a.FKEstadoPedido == estado).ToList();
        }

        public IList<tbRelacionPedidoGlobalArticulo> listarRelacionPedidoGlobalArticulo()
        {
            return mtbMalagaDB.tbRelacionPedidoGlobalArticulo.ToList();
        }

        public IList<Guid> getArticulosByPedido(Guid idPedido)
        {
            IList<Guid> idArticulos = mtbMalagaDB.tbRelacionPedidoGlobalArticulo.Where(a => a.FKPedidoGlobal == idPedido).Select(a=> a.FKArticulo).ToList<Guid>();
            return idArticulos;
        }

        public void anadirRelacionPedidoGlobalArticulo(tbRelacionPedidoGlobalArticulo rpga)
        {
            mtbMalagaDB.tbRelacionPedidoGlobalArticulo.InsertOnSubmit(rpga);
            save();
        }

        public tbPedidoGlobal getPedidoGlobalById(Guid id)
        {
            return mtbMalagaDB.tbPedidoGlobal.Where(a => a.idPedidoGlobal == id).Single();
        }

        public void setEstadoPedido(Guid idPedidoGlobal, Guid FKEstado)
        {
            getPedidoGlobalById(idPedidoGlobal).FKEstadoPedido = FKEstado;
            save();
        }

        public void anadirPedidoGlobal(tbPedidoGlobal f)
        {
            mtbMalagaDB.tbPedidoGlobal.InsertOnSubmit(f);
            save();
        }
        //**************************************PEDIDOS USUARIO**********************************
        public IList<Guid> getArticulosByPedidoUsuario(Guid idPedidoUsuario)
        {
            IList<Guid> idArticulos = mtbMalagaDB.tbLineaPedidoUsuario.Where(a => a.FKPedidoUsuario == idPedidoUsuario).Select(a => a.FKArticulo).ToList<Guid>();
            return idArticulos;
        }
        
        public IList<tbPedidoUsuario> listarPedidosUsuario()
        {
            return mtbMalagaDB.tbPedidoUsuario.ToList();
        }

        public void anadirPedidoUsuario(tbPedidoUsuario f)
        {
            mtbMalagaDB.tbPedidoUsuario.InsertOnSubmit(f);
            save();
        }

        public IList<tbLineaPedidoUsuario> getLineasPedidoUsuarioByPedidoUsuario(Guid PedidoUsuario)
        {
            IList<tbLineaPedidoUsuario> Lineas = mtbMalagaDB.tbLineaPedidoUsuario.Where(a => a.FKPedidoUsuario == PedidoUsuario).ToList<tbLineaPedidoUsuario>();
            return Lineas;
        }

        public IList<tbPedidoUsuario> getPedidoUsuarioByPedido(Guid PedidoUsuario)
        {
            IList<tbPedidoUsuario> pedidos = mtbMalagaDB.tbPedidoUsuario.Where(a => a.FKPedidoGlobal == PedidoUsuario).ToList<tbPedidoUsuario>();
            return pedidos;
        }

        public void anadirLineaPedidoUsuario(tbLineaPedidoUsuario p)
        {
            mtbMalagaDB.tbLineaPedidoUsuario.InsertOnSubmit(p);
            save();
        }

        public tbPedidoUsuario getPedidoUsuarioById(Guid id)
        {
            return mtbMalagaDB.tbPedidoUsuario.Where(a => a.idPedidoUsuario == id).Single();
        }

        private void save()
        {
            mtbMalagaDB.SubmitChanges();
        }

    }
}
