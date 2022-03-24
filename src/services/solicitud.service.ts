import { HttpException } from 'exceptions/HttpException';
import { isEmpty } from 'utils/util';
import { SolicitudDTO } from 'dtos/solicitud.dto';
import prisma from 'prisma';

class SolicitudService {
  public solicitud = prisma.solicitud;

  public async create(data: SolicitudDTO): Promise<SolicitudDTO> {
    if (isEmpty(data)) throw new HttpException(400, 'Empty');

    const createSolicitudData: SolicitudDTO = await this.solicitud.create({
      data: {
        asignado: data.asignado,
        delegacionId: data.delegacionId,
        comercial: data.comercial,
        contactado: data.contactado,
        presupuestado: data.presupuestado,
        tramitado: data.tramitado,
        cliente: data.cliente,
        contacto: data.contacto,
        telefono: data.telefono,
        segmento: data.segmento,
        provincia: data.provincia,
        localidad: data.localidad,
        telefono2: data.telefono2,
        agenteDigital: data.agenteDigital,
        email: data.email,
        observaciones: data.observaciones,
      },
    });
    return createSolicitudData;
  }

  public async delete(solicitudId): Promise<SolicitudDTO> {
    if (isEmpty(solicitudId)) throw new HttpException(400, 'Empty');

    const findSolicitud: SolicitudDTO = await this.solicitud.findUnique({ where: { id: solicitudId } });
    if (!findSolicitud) throw new HttpException(409, 'El registro que se desea borrar no existe actualmente');

    const deleteSolicitud = await this.solicitud.delete({ where: { id: solicitudId } });

    return deleteSolicitud;
  }

  public async update(solicitudId, solicitudData): Promise<SolicitudDTO> {
    if (isEmpty(solicitudId)) throw new HttpException(400, 'Empty');

    const findSolicitud: SolicitudDTO = await this.solicitud.findUnique({ where: { id: solicitudId } });
    if (!findSolicitud) throw new HttpException(409, 'El registro que se desea editar no existe');

    const deleteSolicitud = await this.solicitud.update({ where: { id: solicitudId }, data: { ...solicitudData } });

    return deleteSolicitud;
  }

  public async readWithFilter(solicitudFilterData) {
    const findSolicitudes = await this.solicitud.findMany({
      where: {
        asignado: solicitudFilterData.asignado,
        delegacion: { id: solicitudFilterData.delegacionId },
        comercial: { contains: solicitudFilterData.comercial },
        contactado: solicitudFilterData.contactado,
        agenteDigital: { contains: solicitudFilterData.agenteDigital },
        presupuestado: solicitudFilterData.presupuestado,
        segmento: solicitudFilterData.segmento,
        tramitado: solicitudFilterData.tramitado,
        cliente: { contains: solicitudFilterData.cliente },
        solicitudInteres: {
          some: {
            interesId: solicitudFilterData.interesId,
          },
        },
      },
      include: {
        delegacion: true,
        solicitudInteres: true,
      },
    });

    return findSolicitudes;
  }
}

export default SolicitudService;
