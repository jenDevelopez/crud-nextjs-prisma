import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const notes = await prisma.note.findMany();
  return NextResponse.json(notes);
}

export async function POST(request) {
  try{
    const { title, content} = await request.json()
    const newNote = await prisma.note.create({
      data: {
        title,content
      }
    })
    return NextResponse.json(newNote)
  }catch(error){
    console.log(error)
    return NextResponse({
      message: error.message
    },{
      status:500
    })
  }
}