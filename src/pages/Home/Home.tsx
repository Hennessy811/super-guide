import React, { useEffect, useState } from 'react';
import mockFood from './mockFood.json';
import mockCulture from './mockCulture.json';
import DataGrid, { Column } from 'react-data-grid';
import { TileLayer, Marker, Popup, MapContainer, Tooltip } from 'react-leaflet';
import { Bar, CartesianGrid, ComposedChart, Label, Legend, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

function kFormatter(num: number) {
  if (Math.abs(num) > 999) {
    // @ts-ignore
    return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k';
  } else {
    return Math.sign(num) * Math.abs(num);
  }
}
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
  width: 150,
  headerRenderer: (e: any) => {
    return <span className="text-base">{e.column.name}</span>;
  },
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

  const columns: Column<LocationItem>[] = [
    {
      key: 'name',
      name: 'Название',
      ...defaultColumnProperties,
      formatter: e => {
        return (
          <a
            className="underline"
            href={(e.row as LocationItem).instagram || (e.row as LocationItem).website || ''}
            target="__blank"
            rel="noopener"
          >
            {(e.row as LocationItem).name}
          </a>
        );
      },
    },
    {
      key: 'category',
      name: 'Категория',
      ...defaultColumnProperties,
      width: 220,
    },
    {
      key: 'locationAddress',
      name: 'Адрес',
      ...defaultColumnProperties,
      width: undefined,
    },
    {
      key: 'followerCount',
      name: 'Подписчиков',
      ...defaultColumnProperties,
      width: 130,
      formatter: e => {
        return <div>{kFormatter((e.row as LocationItem).followerCount) || ''}</div>;
      },
    },
    {
      key: 'medias',
      name: 'Посты',
      ...defaultColumnProperties,
      width: 100,
    },
    {
      key: 'agr',
      name: 'AGR',
      ...defaultColumnProperties,
    },
  ];

  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  };

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
          число постов в начале и в конце квартала. На основе этих двух замеров считается показатель{' '}
          <a
            href="https://en.wikipedia.org/wiki/Compound_annual_growth_rate "
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            AGR
          </a>{' '}
          — среднегодовой темп роста. Согласно этому показателю и распределяются места в рейтинге.
        </p>
      </div>
      {food && (
        <div className="max-w-6xl m-auto pt-20" id="food">
          <p className="pb-8 font-bold text-xl">Кафе, рестораны и бары (Q1 2021)</p>
          <DataGrid
            // @ts-ignore
            columns={columns}
            minHeight={900}
            rowsCount={20}
            rows={food}
            onRowClick={e => {
              console.log(e);
            }}
            style={{ height: 702 }}
          />

          <div className="mt-20 p-8 bg-white shadow-sm">
            <ResponsiveContainer width="100%" height={600}>
              <ComposedChart
                data={food}
                margin={{
                  // top: 20,
                  right: 20,
                  bottom: 150,
                  left: 60,
                }}
              >
                <CartesianGrid stroke="#a5a5a5" vertical={false} />
                <XAxis dataKey="name" scale="auto" interval={0} tick={CustomizedAxisTick} />
                <YAxis
                  padding={{ top: 20 }}
                  dataKey="followerCount"
                  orientation="left"
                  yAxisId="left"
                  tickCount={8}
                  tickFormatter={v => kFormatter(v) as string}
                >
                  <Label value="followerCount" angle={90} position="insideLeft" />
                </YAxis>
                <YAxis
                  padding={{ top: 20 }}
                  dataKey="medias"
                  orientation="right"
                  yAxisId="right"
                  tickCount={8}
                  tickFormatter={v => kFormatter(v) as string}
                >
                  <Label value="medias" angle={90} position="insideRight" />
                </YAxis>
                <Legend verticalAlign="top" />
                <Bar yAxisId="left" dataKey="followerCount" barSize={15} fill="rgb(231, 74, 54)" />
                <Line yAxisId="right" type="monotone" dataKey="medias" strokeWidth={2} stroke="#000000" />
                <Tooltip />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-20">
            <MapContainer center={[food[1].lat, food[1].lng]} zoom={10} style={{ height: 500 }}>
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

      {culture && (
        <div className="max-w-6xl m-auto pt-20" id="culture">
          <p className="pb-8 font-bold text-xl">Галереи, театры и музеи (Q1 2021)</p>
          <DataGrid
            // @ts-ignore
            columns={columns}
            minHeight={900}
            rowsCount={20}
            style={{ height: 702 }}
            rows={culture}
          />

          <div className="mt-20 p-8 bg-white shadow-sm">
            <ResponsiveContainer width="100%" height={600}>
              <ComposedChart
                data={culture}
                margin={{
                  // top: 20,
                  right: 20,
                  bottom: 150,
                  left: 60,
                }}
              >
                <CartesianGrid stroke="#a5a5a5" vertical={false} />
                <XAxis dataKey="name" scale="auto" interval={0} tick={CustomizedAxisTick} />
                <YAxis
                  padding={{ top: 20 }}
                  dataKey="followerCount"
                  orientation="left"
                  yAxisId="left"
                  tickCount={8}
                  tickFormatter={v => kFormatter(v) as string}
                >
                  <Label value="followerCount" angle={90} position="insideLeft" />
                </YAxis>
                <YAxis
                  padding={{ top: 20 }}
                  dataKey="medias"
                  orientation="right"
                  yAxisId="right"
                  tickCount={8}
                  tickFormatter={v => kFormatter(v) as string}
                >
                  <Label value="medias" angle={90} position="insideRight" />
                </YAxis>
                <Legend verticalAlign="top" />
                <Bar yAxisId="left" dataKey="followerCount" barSize={15} fill="rgb(231, 74, 54)" />
                <Line yAxisId="right" type="monotone" dataKey="medias" strokeWidth={2} stroke="#000000" />
                <Tooltip />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-20">
            <MapContainer center={[culture[1].lat, culture[1].lng]} zoom={10} style={{ height: 500 }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {culture.map(marker => (
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

      <div className="max-w-5xl m-auto pt-20">
        <a href="mailto:danokhlopkov@gmail.com" className="underline font-mono font-bold text-xl">
          Написать нам
        </a>
      </div>
    </div>
  );
};

export default Home;
