import { Hono } from "hono";

import { decode, verify } from "hono/jwt";

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createPostInput, updatePostInput } from "@mohitsingh4716/medium-common";


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
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET);

    if(user){
        c.set("userId",String(user.id));
       await  next();
    }else{
        c.status(403);
        return c.json({
            message:"Unauthorized"
        })
    }
    }
    catch(e){
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }
  });


blogRouter.post("/", async(c) => {
    const body= await c.req.json()
    const userId= c.get("userId")

    const {success}= createPostInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }


    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId:userId,
            image: body.firstImgUrl,
        }
      })
    return c.json({
    id:blog.id,
    createdAt: blog.createdAt,
     });
});

// blogRouter.put("/", async(c) => {
     
//     const body= await c.req.json()

//     const {success}= updatePostInput.safeParse(body);

//     if(!success){
//         c.status(411);
//         return c.json({
//             message:"Inputs not correct"
//         })
//     }

//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//       }).$extends(withAccelerate());

//       const post = await prisma.post.update({
//         where:{
//             id:body.id
//         },

//         data:{
//             title: body.title,
//             content: body.content,
            
//         }
//       })

//     return c.json({
//     id:post.id,
   
//      });
// });

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

// to do add pagination
blogRouter.get("/bulk", async(c) => {

    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
   const posts= await prisma.post.findMany({
        select:{   
            id:true,
            title:true,
            content:true,
            image:true,
            createdAt: true,
          
            author:{
                select:{
                    name:true,
                    description:true,
                }
            }

        }
   });

  return c.json({
    posts
  })
});



blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
    try{
        const post = await prisma.post.findFirst({
            where: {
                id
            },
            select:{
                id:true,
                title: true,
                content:true,
                image:true,
                createdAt: true,
                author:{
                    select:{
                        name:true,
                        description:true,
                    }
                }
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

blogRouter.delete("/deleteblog/:id", async (c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const id = c.req.param("id");
  
      await prisma.post.delete({
        where: {
          id,
          authorId: c.get("userId"),
        },
      });
  
      return c.json({
        msg: "Blog Deleted",
      });
    } catch (error) {
      console.log(error);
      c.status(400);
      return c.json({
        error: "Error while deleting blog",
      });
    }
  });

 

