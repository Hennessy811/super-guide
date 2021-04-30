import React, { useState } from 'react';
import mockData from './mock.json';
import DataGrid from 'react-data-grid';
import { entries } from 'lodash';

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

export interface LocationsReponse {
  finalFood20210429: LocationItem[];
}

const defaultColumnProperties = {
  resizable: true,
  sortable: true,
  width: 120,
};

const initialRows = mockData.finalFood20210429.slice(0, 19) as LocationItem[];
const Home = () => {
  const [data] = useState<LocationItem[]>(initialRows);

  const columns = entries(data[0])
    .filter(i => !!i[0])
    .map(([key, value]) => ({
      key,
      name: key,
      ...defaultColumnProperties,
    }));

  // useEffect(() => {
  //   let url = 'https://api.sheety.co/a38bf8b6248d41fd905a618e5c6a64c5/fastestGrowthLocations/finalFood20210429';
  //   fetch(url)
  //     .then(response => response.json())
  //     .then((json: LocationsReponse) => {
  //       // Do something with the data
  //       setLocations(json.finalFood20210429);
  //     });
  // }, []);

  // console.log(data);

  return (
    <div className="pb-9">
      <div className="p-3 bg-white shadow-md text-2xl font-bold font-mono">
        <div className="max-w-5xl m-auto">
          <p className="">Super Guide</p>
        </div>
      </div>

      <div className="max-w-5xl m-auto py-44">
        <div className="text-center">
          <p className="text-6xl font-bold leading-snug">SGP Index: the fastest-growing places in Moscow, every quarter</p>
          <p className="pt-5 max-w-2xl m-auto text-2xl">
            We select the top-20 open-source startups by their growth at Github quarterly. The transparent and measurable methodology allows
            to call it Super Guide Places (SGP) Index
          </p>
        </div>

        <div className="max-w-4xl m-auto pt-32 text-xl">
          <p>
            Runa actively invests in OSS startups (like Nginx and MariaDB) and considers an active developer community to be instrumental
            for open-source businesses. We look for promising companies with a fast-growing army of fans, track them at Github, and decided
            to open-source our findings as an index.
          </p>
          <br />
          <p>
            ROSS index highlights top-20 open-source startups by the annualised growth rate (AGR) of Github stars at their repositories.
            While these stars are not a perfect metric for community evaluation, they allow us to understand which OSS products were on top
            of developers’ mind last quarter. Our index is transparent, measurable and fully focused on startups.
          </p>
        </div>

        {data && (
          <div className="max-w-4xl m-auto pt-20">
            <DataGrid
              columns={columns}
              minHeight={900}
              rowsCount={20}
              // @ts-ignore
              rows={data}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
