import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";



export const userInfo= new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
      userId: string
  }
}>();

userInfo.get('/', async (c) => {
    const authHeader = c.req.header("authorization");
    try {
      if (!authHeader) {
        c.status(401);
        return c.json({
          error: "Unauthorized",
        });
      }
      const response = await verify(authHeader, c.env.JWT_SECRET) as { id: string };
    //  console.log(response);
     
      if (!response.id) {
        c.status(401);
        return c.json({
          error: "Unauthorized",
        });
      }
  
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const user = await prisma.user.findUnique({
        where: {
          id: response.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          description: true,
        },
      });
  
      return c.json({ user });
    } catch (error) {
      c.status(400);
      return c.json({ error: "Error while fetching user" });
    }
  });




  userInfo.get('/post', async (c) => {
    const authHeader = c.req.header("authorization");
    try {
      if (!authHeader) {
        c.status(401);
        return c.json({
          error: "Unauthorized",
        });
      }
      const response = await verify(authHeader, c.env.JWT_SECRET) as { id: string };
      
      if (!response.id) {
        c.status(401);
        return c.json({
          error: "Unauthorized",
        });
      }
  
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const posts = await prisma.post.findMany({
        where: {
          authorId: response.id,
        },
        select:{   
            id:true,
            title:true,
            content:true,
            createdAt: true,
            image:true,
          
            author:{
                select:{
                    name:true,
                    description:true,
                }
            }

        }
      });
  
      return c.json({ posts });
    } catch (error) {
      c.status(400);
      return c.json({ error: "Error while fetching posts" });
    }
  });