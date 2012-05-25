using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models.Repositorios
{
    public class FacturasRepositorio
    {
        // Conecto a la BD
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        ///////////////////////////////////////////////////////////////////////////////
        // Métodos de la clase de tbFactura
        ///////////////////////////////////////////////////////////////////////////////
        public int nuevoNumFactura()
        {
            if (mtbMalagaDB.tbFactura.Count() > 0) return mtbMalagaDB.tbFactura.Max(f => f.NumFactura) + 1;
            else return 1;
        }
        public IList<tbFactura> listarFacturas()
        {
            return mtbMalagaDB.tbFactura.Where(f=> f.Eliminado == false).ToList();

        }

        public tbFactura leerFactura(Guid id)
        {
            return mtbMalagaDB.tbFactura.Where(factura => factura.idFactura == id && factura.Eliminado == false).Single();            
        }

        public void nuevaFactura(tbFactura f)
        {
            f.NumFactura = nuevoNumFactura();
            f.Eliminado = false;
            mtbMalagaDB.tbFactura.InsertOnSubmit(f);
            save();
        }
        public void eliminarFactura(Guid id)
        {
            tbFactura f = leerFactura(id);
            f.Eliminado = true;
            save();
        }

        public void setEstadoFactura(tbEstadoFactura estado, Guid id)
        {
            tbFactura f = leerFactura(id);
            f.FKEstado = estado.idEstadoFactura;            
            save();

        }

        public tbEstadoFactura leerEstadoByNombre(String Nombre)
        {
            return mtbMalagaDB.tbEstadoFactura.Where(e => e.Nombre.Equals(Nombre)).Single();
        }

        public String leerEstadoByGuid(Guid id)
        {
            return mtbMalagaDB.tbEstadoFactura.Where(e => e.idEstadoFactura.Equals(id)).Single().Nombre;
        }
        public String getEstadoFactura(Guid id)
        {
            tbFactura f = leerFactura(id);

            return mtbMalagaDB.tbEstadoFactura.Where(estado => estado.idEstadoFactura == f.FKEstado).Single().Nombre;
        }

        public void modificarFactura(Guid id, tbFactura factura)
        {
            tbFactura f = leerFactura(id);

            f.Concepto = factura.Concepto;
            f.Fecha = factura.Fecha; // Pendiente de saber si se puede modificar la fecha de una factura.
            f.FKCodigoEmpresa = factura.FKCodigoEmpresa;
            f.FKContrato = factura.FKContrato;
            f.FKCursillo = factura.FKCursillo;
            f.FKEstado = factura.FKEstado;
            f.FKEventoOficial = factura.FKEventoOficial;
            f.FKJuntaDirectiva = factura.FKJuntaDirectiva;
            f.FKProveedores = factura.FKProveedores;
            f.FKUsuario = factura.FKUsuario;
            f.Total = factura.Total;

            save();
        }

        public IList<tbFactura> getByCourse(Guid idCursillo)
        {
            return mtbMalagaDB.tbFactura.Where(facturas => facturas.FKCursillo == idCursillo).ToList();
        }

        ///////////////////////////////////////////////////////////////////////////////
        //  Métodos de tbLineaFactura
        ///////////////////////////////////////////////////////////////////////////////

        public void nuevaLinea(tbLineaFactura linea)
        {
            mtbMalagaDB.tbLineaFactura.InsertOnSubmit(linea);
            save();
        }

        public void modificarLinea(Guid id, tbLineaFactura linea)
        {
            tbLineaFactura lineaFactura = leerLinea(id);
            lineaFactura.Descripcion = linea.Descripcion;
            lineaFactura.PrecioUnitario = linea.PrecioUnitario;
            lineaFactura.Total = linea.Total;
            lineaFactura.Unidades = linea.Unidades;
            
            save();
        }

        public tbLineaFactura leerLinea(Guid id)
        {
            return mtbMalagaDB.tbLineaFactura.Where(linea => linea.idLineaFactura == id).Single();
        }

        public void eliminarLinea(Guid id)
        {
            tbLineaFactura linea = leerLinea(id);
            mtbMalagaDB.tbLineaFactura.DeleteOnSubmit(linea);
            save();
        }

        public IList<tbLineaFactura> listarLineasFactura(Guid idFactura)
        {
            return mtbMalagaDB.tbLineaFactura.Where(lineaFactura => lineaFactura.FKFactura == idFactura).ToList();
        }

        public Boolean existeLinea(tbLineaFactura linea)
        {
            return mtbMalagaDB.tbLineaFactura.Contains(linea);
        }

        ///////////////////////////////////////////////////////////////////////////////
        // Métodos generales de movimientos
        ///////////////////////////////////////////////////////////////////////////////
        public int nuevoNumMovimiento()
        {
            int numGastos = mtbMalagaDB.tbMovimientoGasto.Count();
            int numIngresos = mtbMalagaDB.tbMovimientoIngreso.Count();

            if ( numGastos > 0 || numIngresos > 0)
            {
                return Math.Max(
                    numGastos > 0? mtbMalagaDB.tbMovimientoGasto.Max(mg => mg.NumMovimiento):0,
                    numIngresos > 0? mtbMalagaDB.tbMovimientoIngreso.Max(mi => mi.NumMovimiento):0
                );
            }
            else return 1;
        }

        public Decimal saldoAnterior()
        {
            int numGastos = mtbMalagaDB.tbMovimientoGasto.Count();
            int numIngresos = mtbMalagaDB.tbMovimientoIngreso.Count();
            
            if (numGastos > 0 || numIngresos > 0)
            {
                int numMovimiento = nuevoNumMovimiento();
                if (existeMovimientoGastoByNumMovimiento(numMovimiento) != null) return existeMovimientoGastoByNumMovimiento(numMovimiento).Saldo;
                else if (existeMovimientoIngresoByNumMovimiento(numMovimiento) != null) return existeMovimientoIngresoByNumMovimiento(numMovimiento).Saldo;
                else return 0;
            }
            else return 0;   
        }

        ///////////////////////////////////////////////////////////////////////////////
        // Métodos de tbMovimientosIngreso
        ///////////////////////////////////////////////////////////////////////////////
        public void nuevoMovimientoIngreso(tbMovimientoIngreso mov)
        {
            mov.NumMovimiento = nuevoNumMovimiento() + 1;
            mov.Saldo = saldoAnterior() + mov.Total;
            mtbMalagaDB.tbMovimientoIngreso.InsertOnSubmit(mov);
            save();
        }

        public IList<tbMovimientoIngreso> listarMovimientosIngreso()
        {
            return mtbMalagaDB.tbMovimientoIngreso.ToList();
        }

        public tbMovimientoIngreso leerMovimientoIngreso(Guid id)
        {
            return mtbMalagaDB.tbMovimientoIngreso.Where(mov => mov.idMovimientoIngreso == id).Single();
        }

        public void eliminarMovimientoIngreso(Guid id)
        {
            tbMovimientoIngreso mov = leerMovimientoIngreso(id);
            mtbMalagaDB.tbMovimientoIngreso.DeleteOnSubmit(mov);
            save();
        }

        public void modificarMovimientoIngreso(Guid id, tbMovimientoIngreso mov)
        {
            tbMovimientoIngreso old = leerMovimientoIngreso(id);
            old.Concepto = mov.Concepto;
            old.Descripcion = mov.Descripcion;
            old.Fecha = mov.Fecha;
            old.FKFactura = mov.FKFactura;
            old.Responsable = mov.Responsable;
            old.Total = mov.Total;
            save();
        }
        public tbMovimientoGasto existeMovimientoGastoByNumMovimiento(int numMovimiento)
        {
            return mtbMalagaDB.tbMovimientoGasto.Where(mg => mg.NumMovimiento == numMovimiento).Count() > 0 ?
                mtbMalagaDB.tbMovimientoGasto.Where(mg => mg.NumMovimiento == numMovimiento).Single() :
                null;

        }
        ///////////////////////////////////////////////////////////////////////////////
        // Métodos de tbMovimientosGasto
        ///////////////////////////////////////////////////////////////////////////////
        public void nuevoMovimientoGasto(tbMovimientoGasto mov)
        {
            mov.NumMovimiento = nuevoNumMovimiento() + 1;
            mov.Saldo = saldoAnterior() + mov.Total;
            mtbMalagaDB.tbMovimientoGasto.InsertOnSubmit(mov);
            save();
        }

        public IList<tbMovimientoGasto> listarMovimientosGasto()
        {
            return mtbMalagaDB.tbMovimientoGasto.ToList();
        }

        public tbMovimientoGasto leerMovimientoGasto(Guid id)
        {
            return mtbMalagaDB.tbMovimientoGasto.Where(mov => mov.idMovimientoGasto == id).Single();
        }

        public void eliminarMovimientoGasto(Guid id)
        {
            tbMovimientoGasto mov = leerMovimientoGasto(id);
            mtbMalagaDB.tbMovimientoGasto.DeleteOnSubmit(mov);
            save();
        }

        public void modificarMovimientoGasto(Guid id, tbMovimientoGasto mov)
        {
            tbMovimientoGasto old = leerMovimientoGasto(id);
            old.Concepto = mov.Concepto;
            old.Descripcion = mov.Descripcion;
            old.Fecha = mov.Fecha;
            old.FKFactura = mov.FKFactura;
            old.Responsable = mov.Responsable;
            old.Total = mov.Total;
            save();
        }

        public Boolean esMovimientoGasto(Guid idMovimiento)
        {
            return mtbMalagaDB.tbMovimientoGasto.Any(m => m.idMovimientoGasto.Equals(idMovimiento));
        }

        public Boolean esMovimientoIngreso(Guid idMovimiento)
        {
            return mtbMalagaDB.tbMovimientoIngreso.Any(m => m.idMovimientoIngreso.Equals(idMovimiento));
        }
        public tbMovimientoIngreso existeMovimientoIngresoByNumMovimiento(int numMovimiento)
        {
            return mtbMalagaDB.tbMovimientoIngreso.Where(mi => mi.NumMovimiento == numMovimiento).Count() > 0 ?
                mtbMalagaDB.tbMovimientoIngreso.Where(mg => mg.NumMovimiento == numMovimiento).Single() :
                null;

        }
        ///////////////////////////////////////////////////////////////////////////////
        // Gráficas contables                                                            
        ////////////////// /////////////////////////////////////////////////////////////

        public IList<tbFactura> soloIngresosFactura()
        {
            return mtbMalagaDB.tbFactura.Where(f => f.Total >= 0 && f.Eliminado == false).ToList(); 
        }

        public IList<tbFactura> soloGastosFactura()
        {
            return mtbMalagaDB.tbFactura.Where(f => f.Total < 0 && f.Eliminado == false).ToList();
        }

        public Decimal ingresosFecha(DateTime inicial, DateTime final)
        {
            return mtbMalagaDB.tbFactura.Where(f => f.Fecha.CompareTo(inicial) > 0 && f.Fecha.CompareTo(final) < 0 && f.Total >= 0 && f.Eliminado == false).ToList().Sum(f=> f.Total);
        }

        public Decimal gastosFecha(DateTime inicial, DateTime final)
        {
            return mtbMalagaDB.tbFactura.Where(f => f.Fecha.CompareTo(inicial) > 0 && f.Fecha.CompareTo(final) < 0 && f.Total < 0 && f.Eliminado == false).ToList().Sum(f => f.Total);
        }

        public Dictionary<DateTime, Decimal[]> todosIngresosGastos()
        {
            Dictionary<DateTime,Decimal[]> datos = new Dictionary<DateTime,decimal[]>();

            foreach (tbFactura f in mtbMalagaDB.tbFactura.Where(f => f.Eliminado == false).ToList())
            {
                DateTime fecha = new DateTime(f.Fecha.Year,f.Fecha.Month,f.Fecha.Day);
                if (!datos.ContainsKey(new DateTime(fecha.Year,fecha.Month,1)))
                {
                    Decimal[] valores = new Decimal[2];
                    if(f.Total >= 0)
                    {
                        valores[0] = f.Total;
                        valores[1] = 0;
                    }else
                    {
                        valores[0] = 0;
                        valores[1] = f.Total;
                    }
                    datos.Add(new DateTime(fecha.Year,fecha.Month,1),valores);
                }
                else
                {                   
                    if(f.Total >= 0)
                    {
                        datos[new DateTime(fecha.Year, fecha.Month, 1)][0] = datos[new DateTime(fecha.Year, fecha.Month, 1)][0] + f.Total;
                    }
                    else
                    {
                        datos[new DateTime(fecha.Year, fecha.Month, 1)][1] = datos[new DateTime(fecha.Year, fecha.Month, 1)][1] - f.Total;
                    }
                }
            }
            return datos;
        }
        // 
        //  Funciones auxiliares
        //

        private void save()
        {
            mtbMalagaDB.SubmitChanges();
        }



    }
}