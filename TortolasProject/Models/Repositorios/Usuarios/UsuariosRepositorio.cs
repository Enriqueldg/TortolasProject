using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models.Repositorios
{
    public class UsuariosRepositorio
    {
        //
        // GET: /Usuarios/

        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public IList<tbUsuario> listarUsuarios()
        {
            return mtbMalagaDB.tbUsuario.ToList();

        }

        public tbUsuario obtenerUsuario(Guid abuscar) 
        {
            return mtbMalagaDB.tbUsuario.Where(usuario => usuario.idUsuario.Equals(abuscar)).Single();
        }

        public tbUsuario obtenerUsuarioNoAsp(Guid abuscar)
        {
            return mtbMalagaDB.tbUsuario.Where(usuario => usuario.FKUser == abuscar).Single();
        }

        public void actualizarUsuario(tbUsuario aModificar)
        {
            tbUsuario usuario = obtenerUsuarioNoAsp(aModificar.idUsuario);

            usuario.Aficiones = aModificar.Aficiones;
            usuario.Apellidos = aModificar.Apellidos;
            usuario.Avatar = aModificar.Avatar;
            usuario.Direccion = aModificar.Direccion;
            usuario.DNI = aModificar.DNI;            
            usuario.Experiencias = aModificar.Experiencias;
            usuario.Facebook = aModificar.Facebook;
            usuario.FechaNacimiento = aModificar.FechaNacimiento;
            usuario.GooglePlus = aModificar.GooglePlus;
            usuario.Localidad = aModificar.Localidad;
            usuario.Nacionalidad = aModificar.Nacionalidad;
            usuario.Nombre = aModificar.Nombre;
            usuario.Sexo = aModificar.Sexo;
            usuario.SitioWeb = aModificar.SitioWeb;
            usuario.Skype = aModificar.Skype;

            mtbMalagaDB.SubmitChanges();
        }

        public void actualizarNombreApellidosUsuario(Guid idUsuario, String Nombre, String Apellidos)
        {
            tbUsuario user = obtenerUsuario(idUsuario);
            user.Nombre = Nombre;
            user.Apellidos = Apellidos;
            mtbMalagaDB.SubmitChanges();
        }

        public void actualizarSocio(Guid idSocio,int NumeroSocio, DateTime FechaExpiracion, DateTime FechaAlta, String FechaBaja, String Estado)
        {
            tbSocio socio = obtenerSocioById(idSocio);
            
            if(FechaBaja!="")
                 socio.FechaBaja  = DateTime.Parse(FechaBaja);
            socio.NumeroSocio = NumeroSocio;
            socio.FechaExpiracion = FechaExpiracion;
            socio.Estado = Estado;
            socio.FechaAlta = FechaAlta;

            mtbMalagaDB.SubmitChanges();
        }

        public tbSocio obtenerSocio(Guid usuario)
        {
            return  mtbMalagaDB.tbSocio.Where(socio => socio.FKUsuario.Equals(usuario)).SingleOrDefault();
           /* return new tbSocio
            {
                idSocio = societe.idSocio,
                Estado = societe.Estado,
                Foto = societe.Foto,
                NumeroSocio = societe.NumeroSocio,
                FKUsuario = societe.FKUsuario,

            };*/
        }

        public tbSocio obtenerSocioById(Guid socio)
        {
            return mtbMalagaDB.tbSocio.Where(soci => soci.idSocio.Equals(socio)).Single();
        }

        public tbUsuario obtenerUsuarioBySocio(Guid socio)
        {
            return mtbMalagaDB.tbUsuario.Where(usuario => usuario.idUsuario.Equals(obtenerSocioById(socio).FKUsuario)).Single();
        }

        public IList<tbTipoCuota> obtenerCuotas()
        {
            return mtbMalagaDB.tbTipoCuota.ToList();
        }


        public int existeNickname(String Nickname)
        {
            return mtbMalagaDB.tbUsuario.Count(usuario => usuario.Nickname.Equals(Nickname));
        }

        public int existeEmail(String Email)
        {
            return mtbMalagaDB.tbUsuario.Count(usuario => usuario.Email.Equals(Email));
        }


        public void eliminarUsuario(Guid usuario)
        {
            tbUsuario usuarioAEliminar = obtenerUsuario(usuario);
            String nickname = usuarioAEliminar.Nickname;

            mtbMalagaDB.tbUsuario.DeleteOnSubmit(usuarioAEliminar);
            mtbMalagaDB.SubmitChanges();
            System.Web.Security.Membership.DeleteUser(nickname);
            mtbMalagaDB.SubmitChanges();
        }

        public IList<tbSocio> listarSocios()
        {
            return mtbMalagaDB.tbSocio.ToList();
        }

        public IList<tbCuota> cuotasDeSocio(Guid Socio)
        {
            return mtbMalagaDB.tbCuota.Where(cuota => cuota.FKSocio.Equals(Socio)).ToList();
        }

        public Guid obtenerUsuarioByUser(Guid user)
        {
            return mtbMalagaDB.tbUsuario.Where(u => u.FKUser == user).Single().idUsuario;
        }

        public void crearSocio(tbSocio socio)
        {
            mtbMalagaDB.tbSocio.InsertOnSubmit(socio);
            mtbMalagaDB.SubmitChanges();
        }

        public int ultimoNumeroSocio()
        {
            return mtbMalagaDB.tbSocio.Max(s => s.NumeroSocio);
        }

        public Guid tipoCuota(String tipoCuota)
        {
            return mtbMalagaDB.tbTipoCuota.Where(tipoC => tipoC.Nombre.Equals(tipoCuota)).Single().idTipoCuota;
        }

        public void crearTipoCuota(tbTipoCuota tipoCuota)
        {
            mtbMalagaDB.tbTipoCuota.InsertOnSubmit(tipoCuota);
            mtbMalagaDB.SubmitChanges();
        }

        public void modificarDatosPersonalesUsuario(Guid Usuario, String Nombre, String Apellidos, String Email)
        {
            tbUsuario usu =  obtenerUsuario(Usuario);
            usu.Nombre = Nombre;
            usu.Apellidos = Apellidos;
            usu.Email = Email;

            mtbMalagaDB.SubmitChanges();
        }

        public void cambiarEstadoSocio(Guid Socio , String Estado, String FechaExpiracion)
        {
            tbSocio socio = obtenerSocioById(Socio);
          
            if (FechaExpiracion.Length.Equals(0))
            {                
                socio.FechaExpiracion = DateTime.Parse(FechaExpiracion);
            }
            
            socio.Estado = Estado;
            mtbMalagaDB.SubmitChanges();
        }

        public void cambiarEstadoSocioDate(Guid Socio, String Estado, DateTime FechaExpiracion)
        {
            tbSocio socio = obtenerSocioById(Socio);
            socio.FechaExpiracion = FechaExpiracion;
            socio.Estado = Estado;
            mtbMalagaDB.SubmitChanges();
        }

        public int obtenerAnnosAntiguedad()
        {
            return mtbMalagaDB.tbDescuentoSocio.Where(desc => desc.Nombre.Equals("Antiguedad")).Single().Annos.Value;
        }

        public void cambiarAntiguedad(Guid idSocio, Boolean esAntiguo)
        {
            tbSocio socio = obtenerSocioById(idSocio);
            if (esAntiguo)
            {
                socio.FKDescuento = mtbMalagaDB.tbDescuentoSocio.Where(desc => desc.Nombre.Equals("Antiguedad")).Single().idDescuentoSocio;
            }
            else
            {
                socio.FKDescuento = mtbMalagaDB.tbDescuentoSocio.Where(desc => desc.Nombre.Equals("Basico")).Single().idDescuentoSocio;
            }

            mtbMalagaDB.SubmitChanges();
        }

        public String nombreDescuentoSocio(Guid abuscar)
        {
            return mtbMalagaDB.tbDescuentoSocio.Where(desc => desc.idDescuentoSocio.Equals(abuscar)).Single().Nombre;
        }

        public void crearCuota(tbCuota cuota)
        {
            mtbMalagaDB.tbCuota.InsertOnSubmit(cuota);
            mtbMalagaDB.SubmitChanges();
        }

        public tbCuota obtenerCuota(Guid idCuota)
        {
            return mtbMalagaDB.tbCuota.Where(cuoti => cuoti.idCuota.Equals(idCuota)).Single();
        }

        public Boolean esJuntaDirectiva(Guid Socio)
        {
            return mtbMalagaDB.tbJuntaDirectiva.Where(junta => junta.FKSocio.Equals(Socio)).Count().Equals(1);
        }

        public void crearJuntaDirectiva(Guid Socio, Guid Cargo)
        {
            tbJuntaDirectiva directivo = new tbJuntaDirectiva{ FKSocio = Socio , FKCargoDirectivo = Cargo };
            mtbMalagaDB.tbJuntaDirectiva.InsertOnSubmit(directivo);
            mtbMalagaDB.SubmitChanges();
        }

        public Guid cargoPorNombre(String Nombre)
        {
            return mtbMalagaDB.tbCargoDirectivo.Where(cargo => cargo.Nombre.Equals(Nombre)).Single().idCargoDirectivo;
        }

        public IList<tbCargoDirectivo> obtenerTodosCargos()
        {
            return mtbMalagaDB.tbCargoDirectivo.ToList();
        }

        public IList<tbJuntaDirectiva> obtenerJuntaDirectiva()
        {
            return mtbMalagaDB.tbJuntaDirectiva.ToList();
        }

        public tbCargoDirectivo CargoPorID(Guid Cargo)
        {
            return mtbMalagaDB.tbCargoDirectivo.Where(cargo => cargo.idCargoDirectivo.Equals(Cargo)).Single();
        }

        public tbJuntaDirectiva obtenerJuntaDirectivaByID(Guid idJunta)
        {
            return mtbMalagaDB.tbJuntaDirectiva.Where(junta => junta.FKSocio.Equals(idJunta)).Single();
        }

        public void cambiarEstadoJunta(Guid idSocio, String Estado)
        {
            tbJuntaDirectiva junta = mtbMalagaDB.tbJuntaDirectiva.Where(cargo => cargo.FKSocio.Equals(idSocio)).Single();

            junta.Estado = Estado;

            mtbMalagaDB.SubmitChanges();
        }

        public void cambiarCargoJunta(Guid Socio, Guid Cargo)
        {
            tbJuntaDirectiva junta = mtbMalagaDB.tbJuntaDirectiva.Where(jun => jun.FKSocio.Equals(Socio)).Single();
            junta.FKCargoDirectivo = Cargo;

            mtbMalagaDB.SubmitChanges();
        }

        public void cambiarCuota(Guid tipoCuota, int Precio)
        {
            tbTipoCuota cuota = mtbMalagaDB.tbTipoCuota.Where(cuoti => cuoti.idTipoCuota.Equals(tipoCuota)).Single();
            cuota.Precio = Precio;
            mtbMalagaDB.SubmitChanges();
        }

        public void cambiarDescCuota(Guid tipoCuota, int Precio, int Meses, String Tipo)
        {
            tbTipoCuota cuota = mtbMalagaDB.tbTipoCuota.Where(cuoti => cuoti.idTipoCuota.Equals(tipoCuota)).Single();
            cuota.Precio = Precio;
            cuota.Meses = Meses;
            cuota.Tipo = Tipo;
            mtbMalagaDB.SubmitChanges();
        }

        public IList<tbDescuentoSocio> listarDescuentoSocios()
        {
            return mtbMalagaDB.tbDescuentoSocio.ToList();
        }

        public tbDescuentoSocio obtenerDescuentoSocio(Guid abuscar)
        {
            return mtbMalagaDB.tbDescuentoSocio.Where(desc => desc.idDescuentoSocio.Equals(abuscar)).Single();
        }

        public void modificarDescuentoSocio(Guid DescuentoSocio, int Cantidad, int Annos)
        {
            tbDescuentoSocio descuento = obtenerDescuentoSocio(DescuentoSocio);

            descuento.Cantidad = Cantidad;            
            if(Annos.Equals(0))
                descuento.Annos = Annos;

            mtbMalagaDB.SubmitChanges();
        }

        public void sincronizarDescuentosAntiguedad()
        {
            
        }
    }
}
