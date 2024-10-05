
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

import {signupInput, signinInput} from "@mohitsingh4716/medium-common";


export const userRouter= new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
      userId: string
  }
}>();


  
  userRouter.post("/signup", async (c) => {
    const body= await c.req.json();

    const { success}= signupInput.safeParse(body)

    if(!success){
      c.status(411);
        return c.json({
          message:"inputs not correct"
        })
    }


    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  

    try {
      const user = await prisma.user.create({
       data:{
          email: body.email,
          password: body.password,
          name:body.name,
          description:body.description,
        },
      });
  
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  
      return c.json({
        jwt: token,
      });
    } catch (e) {
      c.status(403);
      return c.json({ error: "error while signing up" });
    }
  });



  
  userRouter.post("/signin", async (c) => {
    const body = await c.req.json();

    const { success}= signinInput.safeParse(body)
    if(!success){
      c.status(411);
        return c.json({
          message:"inputs not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());
  
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
  
    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  });



 