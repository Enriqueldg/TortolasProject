using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TortolasProject.Models.Repositorios
{
    public class EventosRepositorio : Controller
    {
        //Conexion BD
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();


        public IList<tbEvento> listarEventos()
        {
            return mtbMalagaDB.tbEvento.ToList();
        }

        public tbEvento details(Guid id)
        {
            return mtbMalagaDB.tbEvento.Where(evento => evento.idEvento == id).Single();
        }

        public tbEvento leerEvento(Guid id)
        {
            return mtbMalagaDB.tbEvento.Where(evento => evento.idEvento == id).Single();
        }

        public void inscripcionEvento(tbDocInscripcion doc)
        {
            mtbMalagaDB.tbDocInscripcion.InsertOnSubmit(doc);
            save();
        }

        public void crearEvento(tbEvento ev)
        {
            mtbMalagaDB.tbEvento.InsertOnSubmit(ev);
            save();
        }

        public void eliminarEvento(Guid id) 
        {
            tbEvento ev = leerEvento(id);
            mtbMalagaDB.tbEvento.DeleteOnSubmit(ev);
            save();
        }

        public void editarEvento(Guid id, tbEvento evento) 
        {
            tbEvento ev = leerEvento(id);

            ev.Titulo = evento.Titulo;
            ev.FechaRealizacion = evento.FechaRealizacion;
            ev.Lugar = evento.Lugar;
            ev.Actividad = evento.Actividad;
            ev.FechaAperturaInscripcion = evento.FechaAperturaInscripcion;
            ev.FechaLimiteInscripcion = evento.FechaLimiteInscripcion;
            ev.PrioridadSocios = evento.PrioridadSocios;
            ev.Plazas = evento.Plazas;
            ev.NumAcompa = evento.NumAcompa;

            save();
        }

        public IList<tbEvento> getByUser(Guid idUsuario)
        {
            return mtbMalagaDB.tbEvento.Where(evento => evento.FKUsuarioCreador == idUsuario).ToList();
        }

        public IList<tbDocInscripcion> documentosEvento(Guid Evento)
        {
            return mtbMalagaDB.tbDocInscripcion.Where(doc => doc.FKEvento.Equals(Evento)).ToList();
        }

        public IList<tbUsuario> participantesEvento(Guid Evento)
        {
            IList<tbDocInscripcion> documentos = documentosEvento(Evento);
            //return mtbMalagaDB.tbUsuario.Where(usuario => documentos.Where(doc => doc.FKUsuario.Equals(usuario.idUsuario)).Count().Equals(1)  ).ToList();
            IList<tbUsuario> participantes = new List<tbUsuario>();

            foreach(tbDocInscripcion doc in documentos)
            {
                participantes.Add(mtbMalagaDB.tbUsuario.Where(u => u.idUsuario.Equals(doc.FKUsuario)).Single());
            }
             //participantes =  mtbMalagaDB.tbUsuario.Where(usuario => documentos.Where(doc => doc.FKUsuario.Equals(usuario.idUsuario)).Count().Equals(1)).ToList();

            return participantes;
        }

        public int obtenerAcompanantesEvento(Guid idEvento, Guid idUsuario)
        {
            tbDocInscripcion doc = mtbMalagaDB.tbDocInscripcion
                .Where(di => di.FKEvento.Equals(idEvento) && di.FKUsuario.Equals(idUsuario))
                .Single(); 
            return mtbMalagaDB.tbDocInscripcion.Where(di => di.FKEvento.Equals(idEvento) && di.FKUsuario.Equals(idUsuario)).Single().NumAcom;
           
        }

        public Boolean existInscrip(Guid idEvento,Guid idUsuario)
        {
            return mtbMalagaDB.tbDocInscripcion.Where(docu => docu.FKEvento.Equals(idEvento) && docu.FKUsuario.Equals(idUsuario)).Count() != 0;
        }

        public void crearEventoOficial(tbEventoOficial ev)
        {
            mtbMalagaDB.tbEventoOficial.InsertOnSubmit(ev);
            save();
        }

        public Boolean esOficial(Guid idEvento)
        {
            return mtbMalagaDB.tbEventoOficial.Where(evo => evo.FKEvento.Equals(idEvento)).Count().Equals(1);
        }

        public tbEventoOficial obtenerEventoOficialByIdEvento(Guid idEvento)
        {
            return mtbMalagaDB.tbEventoOficial.Where(evo => evo.FKEvento.Equals(idEvento)).Single();
        }

        public tbEvento obtenerEventoByEventoOficial(Guid idEventoOficial)
        {
            tbEventoOficial eventoOfi = new tbEventoOficial();
            eventoOfi = mtbMalagaDB.tbEventoOficial.Where(evo =>evo.idEventoOficial.Equals(idEventoOficial)).Single();
            return leerEvento(eventoOfi.FKEvento);
        }

        public void editarEventoOficial(Guid FKEvento, Decimal Precio)
        {
            tbEventoOficial evOfi = obtenerEventoOficialByIdEvento(FKEvento);
            evOfi.Precio = Precio;
            save();
        }

        public int calcularTotalParticipantes(Guid idEvento)
        {
            return mtbMalagaDB.tbDocInscripcion.Where(doc => doc.FKEvento.Equals(idEvento)).Sum(doc => doc.NumAcom + 1);
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
