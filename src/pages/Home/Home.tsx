import React, { useEffect, useState } from 'react';
import mockFood from './mockFood.json';
import mockCulture from './mockCulture.json';
import DataGrid from 'react-data-grid';
import { entries } from 'lodash';
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';

export interface LocationItem {
  name: string;
  website: string;
  category: string;
  instagram: string;
  followerCount: number;
  lat: number;
  lng: number;
  locationAddress: string;
  medias: number;
  agr: number;
  id: number;
}

export interface LocationsFoodReponse {
  еда: LocationItem[];
}
export interface LocationsCultureReponse {
  культура: LocationItem[];
}

const defaultColumnProperties = {
  resizable: true,
  sortable: true,
  width: 120,
};

const initialRowsFood = mockFood.еда.slice(0, 19) as LocationItem[];
const initialRowsCulture = mockCulture.культура.slice(0, 19) as LocationItem[];
const Home = () => {
  const [food] = useState<LocationItem[]>(initialRowsFood);
  const [culture] = useState<LocationItem[]>(initialRowsCulture);

  useEffect(() => {
    // let url = 'https://api.sheety.co/a38bf8b6248d41fd905a618e5c6a64c5/fastestGrowthLocations/культура';
    // fetch(url)
    //   .then(response => response.json())
    //   .then(json => {
    //     // Do something with the data
    //     console.log(json.культура);
    //   });
  }, []);

  const columns = entries(food[0])
    .filter(i => !!i[0])
    .map(([key, value]) => ({
      key,
      name: key,
      ...defaultColumnProperties,
    }));

  return (
    <div className="">
      <div className="text-center">
        <p className="text-6xl font-bold leading-snug">
          Самые быстрорастущие локации: рейтинг мест для отдыха в Москве за первый квартал 2021
        </p>
        <p className="pt-5 max-w-3xl m-auto text-2xl">
          Раз в квартал top20locations.ru собирает 20 быстрорастущих мест в категориях{' '}
          <a href="#food" className="underline cursor-pointer">
            🍔еда
          </a>
          ,{' '}
          <a href="#culture" className="underline cursor-pointer">
            🎨 культура
          </a>{' '}
          и <span className="underline cursor-pointer">💃ночная жизнь</span>. Для каждого из ~60k московских Instagram-геотегов замеряется
          число постов в начале и в конце квартала. На основе этих двух замеров считается показатель AGR — annualized growth rate —
          среднегодовой темп роста. Согласно этому показателю и распределяются места в рейтинге.
        </p>
      </div>

      <div className="max-w-4xl m-auto pt-32 text-xl">
        <p>Этот рейтинг создан для тех, кто чаще остальных задает вопрос: “А куда сегодня сходить?”</p>
      </div>

      {food && (
        <div className="max-w-4xl m-auto pt-20" id="food">
          <p className="pb-8 font-bold text-xl">Кафе, рестораны и бары (Q1 2021)</p>
          <DataGrid
            columns={columns}
            minHeight={900}
            rowsCount={20}
            // @ts-ignore
            rows={food}
          />

          <div className="pt-20">
            <MapContainer center={[food[1].lat, food[1].lng]} zoom={11} scrollWheelZoom={false} style={{ height: 500 }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {food.map(marker => (
                <Marker position={[marker.lat, marker.lng]}>
                  <Popup>
                    <p className="font-bold text-lg">{marker.name}</p>
                    <p className="font text-base">{marker.locationAddress}</p>
                    <p className="font text-sm">{marker.category}</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}

      {food && (
        <div className="max-w-4xl m-auto pt-20" id="culture">
          <p className="pb-8 font-bold text-xl">Галереи, театры и музеи (Q1 2021)</p>
          <DataGrid
            columns={columns}
            minHeight={900}
            rowsCount={20}
            // @ts-ignore
            rows={culture}
          />

          <div className="pt-20">
            <MapContainer center={[food[1].lat, food[1].lng]} zoom={11} scrollWheelZoom={false} style={{ height: 500 }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {food.map(marker => (
                <Marker position={[marker.lat, marker.lng]}>
                  <Popup>
                    <p className="font-bold text-lg">{marker.name}</p>
                    <p className="font text-base">{marker.locationAddress}</p>
                    <p className="font text-sm">{marker.category}</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}

      <div className="max-w-4xl m-auto pt-20">
        <p className="pb-8 font-bold text-xl">Пока мы делали этот рейтинг, вот что произошло</p>

        <ul>
          <li>- Мы заболели COVID-19</li>
          <li>- Спарсили 90k московских и питерских локаций</li>
          <li>- 3 раза заказали “Кухню на районе”, посмотрели “Анастасию”, “Мулан”, “Красотку” и “Лего Фильм: Бэтмен”.</li>
        </ul>

        <p className="mt-12">
          top20locations.ru — проект, который будет развиваться. Не стесняйтесь делиться своими комментариями и идеями КОНТАКТ
        </p>
      </div>
    </div>
  );
};

export default Home;
