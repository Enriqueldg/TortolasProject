﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models.Repositorios
{
    public class EmpresasRepositorio
    {
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        // EMPRESAS //

        public IList<tbEmpresa> ListarEmpresas()
        {
            return mtbMalagaDB.tbEmpresa.ToList();
        }

        public tbEmpresa buscaremp(Guid idemp)
        {
            return mtbMalagaDB.tbEmpresa.Where(empresa => empresa.idEmpresa == idemp).Single();
        }
        public tbEmpresa buscarempCIF(string cif)
        {
            return mtbMalagaDB.tbEmpresa.Where(empresa => empresa.CIF.Equals(cif)).Single();
        }

        public void updateEmp(tbEmpresa emp)
        {
            tbEmpresa original = buscaremp(emp.idEmpresa);

            original.Nombre = emp.Nombre;
            original.Localidad = emp.Localidad;
            original.CIF = emp.CIF;
            original.DireccionWeb = emp.DireccionWeb;
            original.TelefonodeContacto = emp.TelefonodeContacto;
            original.Email = emp.Email;

            salvar();
        }
        public void createEmp(tbEmpresa emp)
        {
            mtbMalagaDB.tbEmpresa.InsertOnSubmit(emp);
            salvar();
        }
        public void salvar()
        {
            mtbMalagaDB.SubmitChanges();
        }
        public void deleteEmp(Guid id)
        {
            if (mtbMalagaDB.tbAsociacion.Any(a => a.FKCodigoEmpresa == id))
            {
                deleteAsoc(id);
            }
            mtbMalagaDB.tbEmpresa.DeleteOnSubmit(buscaremp(id));
            salvar();
        }

        // ASOCIACIONES //

        public IList<tbAsociacion> ListarAsociaciones()
        {
            return mtbMalagaDB.tbAsociacion.ToList();
        }

        public void updateAsoc(tbAsociacion asoc)
        {
            tbAsociacion original = buscarasoc(asoc.FKCodigoEmpresa);

            original.Direccion = asoc.Direccion;
            original.Tematica = asoc.Tematica;

            mtbMalagaDB.SubmitChanges();
        }

        public tbAsociacion buscarasoc(Guid idemp)
        {
            return mtbMalagaDB.tbAsociacion.Where(asociacion => asociacion.FKCodigoEmpresa == idemp).Single();
        }

        public void deleteAsoc(Guid id)
        {
            mtbMalagaDB.tbAsociacion.DeleteOnSubmit(buscarasoc(id));
            salvar();
        }

        public void createAsoc(tbAsociacion asoc)
        {
            mtbMalagaDB.tbAsociacion.InsertOnSubmit(asoc);
            salvar();
        }
    }
}