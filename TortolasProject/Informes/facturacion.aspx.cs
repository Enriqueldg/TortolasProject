using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions;
using System.IO;

namespace TortolasProject.Informes
{
    public partial class facturacion1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            DataSetFacturacion datos = new DataSetFacturacion();

            DataSetFacturacionTableAdapters.tbFacturaTableAdapter tf = new DataSetFacturacionTableAdapters.tbFacturaTableAdapter();
            DataSetFacturacionTableAdapters.tbLineaFacturaTableAdapter tlf = new DataSetFacturacionTableAdapters.tbLineaFacturaTableAdapter();

            datos.EnforceConstraints = false;

            tf.Fill(datos.tbFactura);
            tlf.Fill(datos.tbLineaFactura);
          
            datos.EnforceConstraints = true;

            CrystalReportSource1.ReportDocument.SetDataSource(datos);

        }
    }
}