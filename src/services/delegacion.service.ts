import prisma from 'prisma';

class DelegacionService {
  public delegacion = prisma.delegacion;

  public async getAll() {
    const delegacionData = await this.delegacion.findMany();

    return delegacionData;
  }
}

export default DelegacionService;
