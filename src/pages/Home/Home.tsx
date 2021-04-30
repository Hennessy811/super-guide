import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import { ArrowUpward, Check, Restore } from '@material-ui/icons';
import React, { useState } from 'react';
import useSWR from 'swr';
import cn from 'classnames';
import { XIcon } from '@heroicons/react/solid';

const agenda = {
  today: [
    {
      title: 'Ожидают подтверждения',
      subtitle: '4 группы по 2 услугам | 16 человек | 32 540 р.',
      shortSubtitle: '16 человек | 32 540 р.',
    },
    {
      title: 'Запросы от исполнителей',
      subtitle: '2 человека | 13 251 р.',
      shortSubtitle: '2 человека | 13 251 р.',
    },
  ],
  weekly: [],
  all: [],
  postponed: [
    {
      title: 'Запросы от исполнителей',
      subtitle: '13 251 р. | Отложено до 20.04',
      shortSubtitle: '13 251 р. | Отложено до 20.04',
    },
    {
      title: '🔁 SMM-менеджер',
      subtitle: '6 500 р. | Отложено до 30.04',
      shortSubtitle: '6 500 р. | Отложено до 30.04',
    },
  ],
};

export interface Geo {
  lat: string;
  lng: string;
}

export interface Addres {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserItem {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Addres;
  phone: string;
  website: string;
  company: Company;
}

const Home = () => {
  const sm = useMediaQuery('(max-width: 600px)');
  const [userId, setUserId] = useState<number | null>(null);
  const { data, isValidating } = useSWR<UserItem[]>('https://jsonplaceholder.typicode.com/users');
  const { data: user, isValidating: userLoading } = useSWR<UserItem>(() =>
    userId ? `https://jsonplaceholder.typicode.com/users/` + userId : null
  );

  return (
    <div className="pb-9">
      <div className="bg-gradient-to-br from-green-400 to-primary-400 p-3 shadow-md text-2xl font-bold font-mono">
        <div className="max-w-xl m-auto">
          <p className="">Users List</p>
        </div>
      </div>
      <div className="max-w-xl m-auto mt-5 bg-white p-5 rounded-lg">
        {userId && (
          <div className="py-8 px-4 mb-5 rounded-lg shadow-lg h-80">
            {userLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <div className="flex justify-between items-center">
                  <div className="text-4xl font-light font-mono">{user?.name}</div>
                  <XIcon
                    width={24}
                    height={24}
                    onClick={() => setUserId(null)}
                    className="cursor-pointer text-gray-400 hover:text-gray-300 transform hover:rotate-90 transition-all"
                  />
                </div>
                <div className="bg-gray-200 h-1 rounded shadow-sm"></div>

                <div className="mt-3">
                  <code>
                    <pre className="text-xs">{JSON.stringify(user?.address, null, 2)}</pre>
                  </code>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid gap-4 grid-flow-row grid-cols-2">
          {data?.map(user => {
            const extended = user.id === 3 || user.id === 9;
            return (
              <div
                onClick={() => setUserId(user.id)}
                className={cn('p-4 shadow-md rounded-lg max-w-xs cursor-pointer hover:shadow-lg transition-shadow', {
                  'row-span-2': extended,
                })}
              >
                <div className="font-mono text-xl">{user.name}</div>
                <div className="font-light text-base">{user.company.name}</div>
                <div className="font-extralight text-sm">{user.phone}</div>
                {extended && (
                  <div className="mt-2">
                    <div className="bg-gray-200 h-1 rounded shadow-sm"></div>

                    <div className="mt-2">
                      <div className="text-base font-mono hover:text-gray-600 transition-all">
                        {user.address.city}, {user.address.street}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
