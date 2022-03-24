import prisma from 'prisma';

const excelJS = require('exceljs');

class ExcelService {
  public solicitud = prisma.solicitud;
  public interes = prisma.interes;

  public async solicitudesToExcel(solicitudFilterData, response) {
    const findSolicitudes = await this.solicitud.findMany({
      where: {
        asignado: solicitudFilterData.asignado,
        delegacion: { id: solicitudFilterData.delegacionId },
        comercial: { contains: solicitudFilterData.comercial },
        contactado: solicitudFilterData.contactado,
        agenteDigital: { contains: solicitudFilterData.agenteDigital },
        segmento: solicitudFilterData.segmento,
        presupuestado: solicitudFilterData.presupuestado,
        tramitado: solicitudFilterData.tramitado,
        cliente: { contains: solicitudFilterData.cliente },
        solicitudInteres: {
          some: {
            interesId: solicitudFilterData.interesId,
          },
        },
      },
      include: {
        delegacion: {
          select: {
            ubicacion: true,
          },
        },
        solicitudInteres: {
          include: {
            interes: {
              select: {
                tipo: true,
              },
            },
          },
        },
      },
    });

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Kit Digital');

    findSolicitudes.forEach((solicitudObject: any) => {
      console.log(solicitudObject);

      Object.values(solicitudObject).forEach((dato: any) => {
        if (typeof dato === 'object' && dato != null) {
          if (dato.ubicacion) {
            solicitudObject.delegacion = dato.ubicacion;
          }

          if (Array.isArray(dato)) {
            solicitudObject.solicitudInteres = '';
            dato.forEach(solicitudInteres => {
              if (solicitudObject.solicitudInteres === '') {
                solicitudObject.solicitudInteres = solicitudInteres.interes.tipo;
              } else {
                solicitudObject.solicitudInteres = solicitudObject.solicitudInteres + ', ' + solicitudInteres.interes.tipo;
              }
            });
          }
        }
      });
    });

    worksheet.columns = [
      { header: 'Asignado', key: 'asignado', width: 9 },
      { header: 'Comercial', key: 'comercial', width: 20 },
      { header: 'Contactado', key: 'contactado', width: 10 },
      { header: 'Presupuestado', key: 'presupuestado', width: 13 },
      { header: 'Tramitado', key: 'tramitado', width: 10 },
      { header: 'Agente Digital', key: 'agenteDigital', width: 20 },
      { header: 'Cliente', key: 'cliente', width: 35 },
      { header: 'Contacto', key: 'contacto', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Segmento', key: 'segmento', width: 10 },
      { header: 'Provincia', key: 'provincia', width: 20 },
      { header: 'Observaciones', key: 'observaciones', width: 25 },
      { header: 'Delegación', key: 'delegacion', width: 30 },
      { header: 'Localidad', key: 'localidad', width: 30 },
      { header: 'Teléfono', key: 'telefono', width: 11 },
      { header: 'Teléfono 2', key: 'telefono2', width: 11 },
      { header: 'Intereses', key: 'solicitudInteres', width: 250 },
    ];

    findSolicitudes.forEach(solicitud => {
      worksheet.addRow(solicitud);
    });

    // const excel = await workbook.xlsx.writeFile(`./SolicitudesKitDigital.xlsx`);
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.setHeader('Contentutorialst-Disposition', 'attachment; filename=SolicitudesKitDigital.xlsx');

    await workbook.xlsx.write(response);

    // return await excel;
  }
}

export default ExcelService;
