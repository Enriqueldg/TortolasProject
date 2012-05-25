using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models
{
    public class Movimiento
    {
        public Guid idMovimiento { get; set; }
        public String Concepto { get; set; }
        public String Descripcion { get; set; }
        public DateTime Fecha { get; set; }
        public Guid Responsable { get; set; }
        public String ResponsableName { get; set; }
        public Guid FKFactura { get; set; }
        public Decimal Total { get; set; }
        public int NumMovimiento { get; set; }
        public Decimal Saldo { get; set; }
    }
}