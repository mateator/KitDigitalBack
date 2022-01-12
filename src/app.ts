import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import HttpException from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

import { NextFunction, Request, Response } from 'express';
import { networkInterfaces } from "os";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

//SOLICITUD
app.post('/solicitud/create', async (req, res, next) => {

  try {
    const data = await prisma.solicitud.create({
      // data: {asignado: false, delegacionId: 1, comercial:"a", contactado:false, presupuestado:false, tramitado: false, cliente: "w", contacto: "w", telefono:213, email:"w", observaciones:"w"}
      data: { asignado: req.body.asignado, delegacionId: req.body.delegacionId, comercial: req.body.comercial, contactado: req.body.contactado, presupuestado: req.body.presupuestado, tramitado: req.body.tramitado, cliente: req.body.cliente, contacto: req.body.contacto, telefono: req.body.telefono, email: req.body.email, observaciones: req.body.observaciones, agenteDigital: req.body.agenteDigital }

    })
    res.status(201).json({ data: data, message: 'created' });

  } catch (error) {
    next(error);
  }
})

app.post('/solicitud/delete', async (req, res, next) => {
  if (isEmpty(req.body.id)) throw new HttpException(400, 'Error al eliminar campo');

  try {
    const data = await prisma.solicitud.delete({
      where: {
        id: req.body.id
      }
    })
    res.status(201).json({ message: 'deleted' });

  } catch (error) {
    next(error);
  }
})


app.put('/solicitud/:id/edit', async (req, res, next) => {
  try {
    const data = await prisma.solicitud.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: { asignado: req.body.asignado, delegacionId: req.body.delegacionId, comercial: req.body.comercial, contactado: req.body.contactado, presupuestado: req.body.presupuestado, tramitado: req.body.tramitado, cliente: req.body.cliente, contacto: req.body.contacto, telefono: req.body.telefono, email: req.body.email, observaciones: req.body.observaciones, agenteDigital: req.body.agenteDigital }
    })
    res.status(201).json({ data: data, message: 'edited' });

  } catch (error) {
    next(error);
  }
})

app.post('/solicitud', async (req, res,next) => {
  try {
    const data = await prisma.solicitud.findMany({
      where: {
        asignado: req.body.asignado,
        delegacion: {id: req.body.delegacionId},
        comercial: {contains: req.body.comercial},
        contactado: req.body.contactado,
        presupuestado: req.body.presupuestado,
        tramitado: req.body.tramitado, 
        agenteDigital: req.body.agenteDigital,
        cliente: {contains: req.body.cliente},
        solicitudInteres:{
          some:{
            interesId: req.body.interesId
          }
        }
      },
      include: {
        delegacion: true,
        solicitudInteres:true,
      }
    })

    res.status(201).json(data);

  } catch (error) {
    next(error);
  }
})
//USER
app.post('/check', async (req, res) => {

  const user = await prisma.user.findMany({
    where: {
      password: req.body?.password,
      email: req.body?.email
    },
    select: {
      rol: true,
      delegacionId: true,
    }
  })

  if (user.length === 1) {
    res.json({ login: true, user })
  } else {
    res.json({ login: false })
  }

})

//SOLICITUD-INTERES
app.post('/solicitudInteres', async (req, res) => {
  if (isEmpty(req.body.solicitudId)) throw new HttpException(400, 'Error al obtener intereses de una solicitud');

  const intereses = await prisma.solicitudInteres.findMany({
    where: {
      solicitud: { id: req.body.solicitudId }
    },
    select: {
      interesId: true,
    }
  })
  res.json(intereses)
})

app.post('/solicitudInteres/create', async (req, res) => {

  const data = await prisma.solicitudInteres.create({
    data: {
      solicitudId: req.body.idSolicitud,
      interesId: req.body.idInteres,
    }
  })
  res.status(201).json({ data: data, message: 'created' });
})

// changes: [{op: "remove", path: "/4", oldValue: 3}, {op: "replace", path: "/3", value: 5, oldValue: 2},…]
// {op: "remove", path: "/4", oldValue: 3}
// {op: "replace", path: "/3", value: 5, oldValue: 2} ,{op: "replace", path: "/1", value: 2, oldValue: 5}
// {op: "replace", path: "/2", value: 4, oldValue: 4}
// {op: "replace", path: "/1", value: 2, oldValue: 5}
app.post('/solicitudInteres/edit', async (req, res, next) => {

  // req.body.changes.map((data1: any,index: any)=>{
  //   req.body.changes.map((data2: any) =>{
  //     if(data2.oldValue === data1.value && data2.value === data1.oldValue && data2.path !== data1.path){
  //       console.log(data1);
  //       console.log('-----------------------');
  //       req.body.changes.splice(index,index+1);
  //       console.log(data2);
  //       console.log('-----------------------');
  //       console.log(index);
        
  //     }
  //   })
  // })

  req.body.changes.map(async (data: any) => {
    switch (data.op) {

      case 'replace':
        await prisma.solicitudInteres.updateMany({
          where: {
            solicitudId: req.body.idSolicitud,
            interesId: data.oldValue,
          },
          data: {
            interesId: data.value
          }
        });
        break;

      case 'add':
        await prisma.solicitudInteres.create({
          data: {
            solicitudId: req.body.idSolicitud,
            interesId: data.value,
          }
        });
        break;

      case 'remove':
        await prisma.solicitudInteres.deleteMany({
          where: {
            solicitudId: req.body.idSolicitud,
            interesId: data.oldValue,
          },
        });
        break;

      default:
        break;
    }
  })
  res.status(201).json('cambios realizados');
})

//interes
app.get('/interes', async (req, res) => {

  const intereses = await prisma.interes.findMany()
  res.json(intereses)
})

//DELEGACION

app.get('/delegacion', async (req, res) => {

  const delegaciones = await prisma.delegacion.findMany()
  res.json(delegaciones)
})

app.get('/delegacion/:id', async (req, res) => {
  const delegaciones = await prisma.delegacion.findMany({
    where: {
      id: parseInt(req.params.id),
    }
  })
  res.json(delegaciones)
})

const server = app.listen(3000, () =>
  console.log(`
  🚀 Server ready at: http://localhost:3000
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)