import React from "react";

const links = [
  { name: "Nos offres", href: "#" },
  { name: "Programme de location", href: "#" },
  { name: "Nos valeurs", href: "#" },
  { name: "Rencontrez notre équipe", href: "#" },
];
const stats = [
  { name: "Bureaux dans le monde", value: "12" },
  { name: "Collaborateurs à plein temps", value: "300+" },
  { name: "Heures par semaine", value: "40" },
  { name: "Congés payés", value: "Illimités" },
];

export default function SurNous() {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100">
      <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl font-bold tracking-wide text-center sm:text-5xl dark:text-gray-50">
            Bienvenue chez FabriKri
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-400">
            Découvrez notre plateforme de location d'objets innovante.
          </p>
        </div>
        <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="text-2xl font-bold tracking-wide sm:text-3xl dark:text-gray-50">
              La location simplifiée
            </h3>
            <p className="mt-3 text-lg dark:text-gray-400">
              Chez FabriKri, nous rendons la location d'objets simple et
              pratique. Notre plateforme vous permet de louer une large gamme
              d'objets pour toutes les occasions.
            </p>
            <div className="mt-12 space-y-12">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-50">
                    Large sélection d'objets
                  </h4>
                  <p className="mt-2 dark:text-gray-400">
                    Parcourez notre vaste catalogue d'objets disponibles à la
                    location. Que ce soit pour un événement spécial, un projet
                    créatif ou des besoins du quotidien, nous avons tout ce dont
                    vous avez besoin.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-50">
                    Processus de location facile
                  </h4>
                  <p className="mt-2 dark:text-gray-400">
                    Notre processus de location est simple et rapide. Choisissez
                    l'objet, sélectionnez les dates de location et effectuez le
                    paiement en quelques clics.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-50">
                    Service clientèle dédié
                  </h4>
                  <p className="mt-2 dark:text-gray-400">
                    Notre équipe de service clientèle est disponible pour
                    répondre à toutes vos questions et vous assurer une
                    expérience de location agréable et sans tracas.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="mt-10 lg:mt-0">
            <img
              src="https://source.unsplash.com/random/360x480"
              alt=""
              className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
            />
          </div>
        </div>
        <div>
          <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
            <div className="lg:col-start-2">
              <h3 className="text-2xl font-bold tracking-wide sm:text-3xl dark:text-gray-50">
                Nos valeurs
              </h3>
              <p className="mt-3 text-lg dark:text-gray-400">
                Chez FabriKri, nos valeurs sont au cœur de tout ce que nous
                faisons. Elles guident notre approche de la location d'objets et
                notre engagement envers nos clients.
              </p>
              <div className="mt-12 space-y-12">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leading-6 dark:text-gray-50">
                      Qualité et fiabilité
                    </h4>
                    <p className="mt-2 dark:text-gray-400">
                      Nous nous engageons à fournir des objets de qualité
                      supérieure et fiables pour répondre aux besoins de nos
                      clients.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leading-6 dark:text-gray-50">
                      Respect de l'environnement
                    </h4>
                    <p className="mt-2 dark:text-gray-400">
                      Nous nous efforçons de réduire notre empreinte
                      environnementale en favorisant la réutilisation et en
                      adoptant des pratiques durables.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leading-6 dark:text-gray-50">
                      Engagement envers la communauté
                    </h4>
                    <p className="mt-2 dark:text-gray-400">
                      Nous soutenons les initiatives locales et contribuons au
                      bien-être de nos communautés en encourageant le partage et
                      l'entraide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
              <img
                src="https://source.unsplash.com/random/361x481"
                alt=""
                className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
