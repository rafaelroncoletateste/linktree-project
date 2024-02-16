import Header from "../../components/header";
import Input from "../../components/input";

import { FormEvent, useEffect, useState } from "react";

import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export default function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    const docRef = doc(db, "social", "link");
    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.data()) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        alert("Cadastrado com sucesso");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas redes sociais
      </h1>
      <form
        action="#"
        className="flex flex-col max-w-xl w-full"
        onSubmit={handleRegister}
      >
        <label htmlFor="#" className="text-white font-medium mt-2 mb-2">
          Link do Facebook
        </label>
        <Input
          type="url"
          placeholder="Digite a URL"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />

        <label htmlFor="#" className="text-white font-medium mt-2 mb-2">
          Link do Instagram
        </label>
        <Input
          type="url"
          placeholder="Digite a URL"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label htmlFor="#" className="text-white font-medium mt-2 mb-2">
          Link do YouTube
        </label>
        <Input
          type="url"
          placeholder="Digite a URL"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md mb-7 font-medium"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}
