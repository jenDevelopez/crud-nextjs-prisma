import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
  const notes = await prisma.note.findFirst({
    where:{
      id: Number(params.id)
    }
  });
  return NextResponse.json(notes);
}


export async function PUT(request,{params}) {
  try{
    const { title, content, completed} = await request.json()
    const updatedNote = await prisma.note.update({
      where:{
        id: Number(params.id)
      },
      data:{
        title,content,completed
      }
    })
    return NextResponse.json(updatedNote)
  }catch(error){
    console.log(error)
    return NextResponse({
      message: error.message
    },{
      status:500
    })
  }
}

export async function DELETE(request,{params}) {
  const notes = await prisma.note.delete({
    where:{
      id: Number(params.id)
    }
  });
  return NextResponse.json(notes);
}