import { Hono } from "hono";

import { decode, verify } from "hono/jwt";

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


export const blogRouter= new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader= c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);

    if(user){
        c.set("userId",String(user.id));
        next();
    }else{
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }
  });


blogRouter.post("/", async(c) => {
    const body= await c.req.json()
    const userId= c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId:userId,
        }
      })
    return c.json({
    id:blog.id
     });
});

blogRouter.put("/", async(c) => {
     
    const body= await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const post = await prisma.post.update({
        where:{
            id:body.id
        },

        data:{
            title: body.title,
            content: body.content,
            
        }
      })

    return c.json({
    id:post.id
     });
});

blogRouter.get('/', async(c)=>{
    const body= await c.req.json();
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const post= await prisma.post.findFirst({
            where:{
                id:body.id
            },
        })

        return c.json({
            post
        });
    }catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching"
        })
    }
})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
    try{
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        });
    
        return c.json(post);
    }catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching blog post"
        })
    }
})

 

blogRouter.get("/bulk", async(c) => {

    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
   const posts= await prisma.post.findMany();

  return c.json({
    posts
  })
});