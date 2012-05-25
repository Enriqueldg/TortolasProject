using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TortolasProject.Models.Repositorios
{
    public class RutasRepositorio 
    {
        //
        // GET: /RutasRepositorio/

        mtbMalagaDataContext mtbDB = new mtbMalagaDataContext();

        public IList<tbRuta> leerTodas()
        {
            return mtbDB.tbRuta.ToList();
        }

        public IList<tbRuta> leerRutasUsuario(Guid idUsuario)
        {
            return mtbDB.tbRuta.Where(ruta => ruta.FKUsuario.Equals(idUsuario)).ToList();
        }

        public tbRuta obtenerRuta(Guid idRuta)
        {
            return mtbDB.tbRuta.Where(ruta => ruta.idRuta.Equals(idRuta)).SingleOrDefault();
        }

        public String nombreDificultad(Guid Dificultad)
        {
            return mtbDB.tbDificultad.Where(difi => difi.idDificultad.Equals(Dificultad)).Single().Nombre;
        }

        public IList<tbDificultad> todasDificultades()
        {
            return mtbDB.tbDificultad.ToList();
        }

        public void insertarRuta(tbRuta ruta)
        {
            mtbDB.tbRuta.InsertOnSubmit(ruta);
            mtbDB.SubmitChanges();
        }

        public Guid dificultadPorNombre(String Nombre)
        {
            return mtbDB.tbDificultad.Where(difi => difi.Nombre.Equals(Nombre)).Single().idDificultad;
        }

        public void eliminarRuta(Guid idRuta)
        {
            mtbDB.tbRuta.DeleteOnSubmit(obtenerRuta(idRuta));
            mtbDB.SubmitChanges();
        }
    }
}
