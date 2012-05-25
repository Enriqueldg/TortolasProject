using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models
{
    public partial class tbFactura
    {
        public string vista { get; set; }
        public string idRelacion { get; set; }
        public string RelacionName { get; set; }
        public string tipo { get; set; }
        public string EstadoName { get; set; }
        public string ResponsableName { get; set; }
        public IList<tbLineaFactura> LineasFactura { get; set; }
    }
}