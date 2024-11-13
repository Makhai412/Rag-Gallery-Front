import React from 'react';
import TeamMember from '../../components/aboutuscomponent/TeamMember';
import { SocialLinks, SocialLinks1, SocialLinks2, SocialLinks3 } from '../../components/aboutuscomponent/SocialLinks';

const AboutUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900 h-full relative mt-8">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-60"
        style={{ backgroundImage: "url('https://i.ibb.co/tD1648m/Rag-Gallery-Logo.png')", backgroundSize: '70%' }}
      >
      </div>

      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6 relative z-10">
        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Nuestro Equipo</h2>
          <p className="font-semibold text-gray-800 shadow-sm sm:text-xl dark:text-gray-400">
            Este proyecto fue diseñado para la materia de Ingeniería de Software 2, de la carrera de Ingeniería Informática de la Universidad Autónoma de Occidente.
            Bajo la tutela del profesor Jhon Jairo Valderrama Muñoz, se logró la creación de un sistema Rag.
          </p>

          <div className="mx-auto max-w-screen-sm lg:mb-16 py-8">
            <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center">
              <TeamMember
                name="Andres Higuera Lozano"
                role="Desarrollador Front-end"
                imgSrc="https://i.ibb.co/HgmfXDH/Foto-Andres.jpg"
                socialLinks={SocialLinks}
              />
              <TeamMember
                name="Fernando José Cedeño Gerdez"
                role="Desarrollador Back-end"
                imgSrc="https://i.ibb.co/QKq13nz/Fernando.png"
                socialLinks={SocialLinks1}
              />
              <TeamMember
                name="Maryori Alejandra Lasso Díaz"
                role="Desarrolladora Front-end"
                imgSrc="https://i.ibb.co/k8BbxGD/Maryori.png"
                socialLinks={SocialLinks2}
              />
              <TeamMember
                name="Yusef Aqil Tezna"
                role="Desarrollador Back-end"
                imgSrc="https://i.ibb.co/WvqxB1F/Yusef.png"
                socialLinks={SocialLinks3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
