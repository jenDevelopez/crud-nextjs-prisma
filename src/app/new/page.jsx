"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function NewNote() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;

    if (params.id) {
      try {
        const res = await fetch(`/api/notes/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await fetch("/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });
        const data = await res.json();
        console.log(data);
        router.refresh();
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }

    router.refresh();
    router.push("/");
  };

  useEffect(() => {
    if (params.id) {
      fetch(`/api/notes/${params.id}`)
        .then((data) => data.json())
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
        });
    }
    router.refresh()
  }, []);
  return (
    <div className="h-[calc(100vh-7rem)]  flex justify-center items-center p-2">
      <form
        autoComplete="off"
        className="flex flex-col justify-center items-center gap-2 my-4 bg-slate-800 p-4 rounded w-full md:w-1/2 lg:w-1/4"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl mb-4">Que hacemos hoy? 🤔</h2>
        <div className="flex flex-col gap-2 w-full">
          <label>Titulo</label>
          <input
            id="title"
            className="h-8 rounded-md pl-2 text-slate-800"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Contenido</label>
          <textarea
            id="content"
            className={`h-16 rounded-md pl-2 text-slate-800 `}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        <div
          className={`w-full flex justify-between items-center mt-4`}
        >
          <button
            type="submit"
            className="bg-yellow-500 px-4 py-2 rounded-md self-start "
          >
            {params.id ? "Actualizar" : "Crear"}
          </button>
          {params.id && (
             <button
             type="button"
             className="bg-red-500 px-4 py-2 rounded-md self-start "
             onClick={async () => {
               const res = await fetch(`/api/notes/${params.id}`, {
                 method: "DELETE",
               });
               const data = res.json();
               router.refresh();
               router.push('/')
             }}
           >
             Eliminar
           </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NewNote;
