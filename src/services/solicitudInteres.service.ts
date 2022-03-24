import { HttpException } from 'exceptions/HttpException';
import { isEmpty } from 'utils/util';
import prisma from 'prisma';
import { SolicitudInteresDTO } from 'dtos/solicitudInteres.dto';

class SolicitudInteresService {
  public solicitudInteres = prisma.solicitudInteres;

  public async create(data: SolicitudInteresDTO) {
    if (isEmpty(data)) throw new HttpException(400, 'Empty');

    const createSolicitudInteresData = await this.solicitudInteres.create({
      data: {
        interesId: data.idInteres,
        solicitudId: data.idSolicitud,
      },
    });
    return createSolicitudInteresData;
  }

  public async delete(data) {
    if (isEmpty(data)) throw new HttpException(400, 'Empty');

    const deleteSolicitud = await this.solicitudInteres.deleteMany({ where: { solicitudId: data.solicitudId, interesId: data.solicitudId } });

    return deleteSolicitud;
  }

  public async update(solicitudData) {
    if (isEmpty(solicitudData)) throw new HttpException(400, 'Empty');

    solicitudData.changes.map(async (data: any) => {
      switch (data.op) {
        case 'replace':
          await this.solicitudInteres.updateMany({
            where: {
              solicitudId: solicitudData.idSolicitud,
              interesId: data.oldValue,
            },
            data: {
              interesId: data.value,
            },
          });
          break;

        case 'add':
          await this.solicitudInteres.create({
            data: {
              solicitudId: solicitudData.idSolicitud,
              interesId: data.value,
            },
          });
          break;

        case 'remove':
          await this.solicitudInteres.deleteMany({
            where: {
              solicitudId: solicitudData.idSolicitud,
              interesId: data.oldValue,
            },
          });
          break;

        default:
          break;
      }
    });

    return 'edit complete';
  }
}

export default SolicitudInteresService;
