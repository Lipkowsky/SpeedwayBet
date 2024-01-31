import { React, useRef, useState } from "react";

export default function EndGame(props) {
  const playersMap = props.playersMap;
  console.log(playersMap);

  return (
    <div>
      <main className="flex h-fit flex-col items-left space-y-4">
        <div>
          <h3 className="italic font-bold">Komunikat:</h3>
          <p className="text-sm mb-5">Wyniki rozgrywki:</p>
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Pozycja
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Nazwa użytkownika
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Punkty
                  </th>
                </tr>
              </thead>
              <tbody>
                {playersMap.map((item, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-400 dark:border-gray-700"
                    key={item.id}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.player}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
