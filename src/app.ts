import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { NextFunction, Request, Response } from 'express';
import HttpException from '@exceptions/HttpException';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({credentials: true, origin: true}));

//SOLICITUD
app.post('/solicitud/create' , async (req,res, next) => {
  try {
    const data = await prisma.solicitud.create({
      // data: {asignado: false, delegacionId: 1, comercial:"a", contactado:false, presupuestado:false, tramitado: false, cliente: "w", contacto: "w", telefono:213, email:"w", observaciones:"w"}
    data: {asignado: req.body.asignado, delegacionId: req.body.delegacionId, comercial:req.body.comercial, contactado:req.body.contactado, presupuestado:req.body.presupuestado, tramitado: req.body.tramitado, cliente: req.body.cliente, contacto: req.body.contacto, telefono:req.body.telefono, email: req.body.email, observaciones:req.body.observaciones}

    })
    res.status(201).json({ data: data, message: 'created' });

  } catch (error) {
    next(error);
  }
}) 

app.put('/solicitud/:id/edit' , async (req,res, next) => {
  try {
    const data = await prisma.solicitud.update({
      where:{
        id : parseInt(req.params.id)
      },
      data: {asignado: req.body.asignado, delegacionId: req.body.delegacionId, comercial:req.body.comercial, contactado:req.body.contactado, presupuestado:req.body.presupuestado, tramitado: req.body.tramitado, cliente: req.body.cliente, contacto: req.body.contacto, telefono:req.body.telefono, email: req.body.email, observaciones:req.body.observaciones}
    })
    res.status(201).json({ data: data, message: 'edited' });

  } catch (error) {
    next(error);
  }
}) 

app.post('/solicitud', async (req, res) => {
  console.log('s');
  if ((req.body.delegacionId)) throw new HttpException(400, 'Necesitas logearte primero');

  const solicitudes = await prisma.solicitud.findMany({
    where:{
      delegacionId : req.body.delegacionId,
    }
  })
  res.json(solicitudes)
})
//USER
app.post('/check', async (req, res) => {
  console.log(req.body);
  
  const delegaciones = await prisma.user.findMany({
    where: {
      password: req.body?.password,
      email: req.body?.email
    }
  })

  if(delegaciones.length > 0){
    res.json(true)
  }else{
    res.json(false)
  }
})

//DELEGACION

app.get('/delegacion', async (req, res) => {
  console.log('s');
  
  const delegaciones = await prisma.delegacion.findMany()
  res.json(delegaciones)
})

app.get('/delegacion/:id', async (req, res) => {
  console.log(req.params.id)
  const delegaciones = await prisma.delegacion.findMany({
    where: {
      id : parseInt(req.params.id) ,
    }
  })
  res.json(delegaciones)
})

const server = app.listen(3000, () =>
  console.log(`
  🚀 Server ready at: http://localhost:3000
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)