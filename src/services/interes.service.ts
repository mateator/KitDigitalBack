import prisma from 'prisma';

class interesService {
  public interes = prisma.interes;

  public async getAll() {
    const dataInteres = await this.interes.findMany();

    return dataInteres;
  }
}

export default interesService;
