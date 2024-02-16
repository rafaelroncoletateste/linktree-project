import Header from "../../components/header";
import Input from "../../components/input";

import { FormEvent, useState, useEffect } from "react";

import { FiTrash } from "react-icons/fi";

import {
  addDoc, // Gerar ID Aleatório
  collection,
  onSnapshot,
  query, // Busca Personalizada | Ordenação
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export default function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(lista);
    });

    return () => unsub(); // Remove the listener when invoked
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (!nameInput || !urlInput) {
      alert("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
      })
      .catch((err) => console.log(err));
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />

      <form
        action="#"
        className="flex flex-col mt-3 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label
          htmlFor="nome-link"
          className="text-white font-medium mt-2 mb-2 cursor-pointer"
        >
          Nome do Link
        </label>
        <Input
          type="text"
          placeholder="Digite o nome do link"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          id="nome-link"
        />

        <label
          htmlFor="url-link"
          className="text-white font-medium mt-2 mb-2 cursor-pointer"
        >
          URL do Link
        </label>
        <Input
          type="url"
          placeholder="Digite a URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          id="url-link"
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2 cursor-pointer">
              Cor do Link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2 cursor-pointer">
              Fundo do Link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-2 cursor-pointer">
              Veja como está ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p
                className="text-center font-medium"
                style={{ color: textColorInput }}
              >
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>
      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p>{link.name}</p>
          <div>
            <button
              onClick={() => handleDeleteLink(link.id)}
              className="border py-1 rounded "
            >
              <FiTrash size={18} color="#000" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
