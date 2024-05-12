import Link from "next/link";
import { prisma } from "@/libs/prisma";

async function loadNotes() {
  const notes = await prisma.note.findMany();
  // Add date formatting here
  notes.forEach((note) => {
    const formattedDate = new Date(note.created_at).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    note.formattedDate = formattedDate;
  });
  return notes;
}


export default async function Home() {
  const notes = await loadNotes();

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 md:w-[80%] mx-auto">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Link href={`/notes/${note.id}`} key={note.id} className="bg-sky-950 p-4 rounded">
              <p className=" text-end text-xs ">{note.formattedDate}</p>
              <p className="md:text-lg">{note.title}</p>
            </Link>
          ))
        ) : (
          <h2 className="text-2xl drop-shadow-2xl mt-40 text-center">No tienes ninguna nota</h2>
        )}
      </div>
      <Link
        href="/new"
        className="size-12 bg-sky-500 rounded-full font-extrabold text-2xl fixed bottom-6 right-6 grid place-content-center"
      >
        +
      </Link>
    </div>
  );
}
