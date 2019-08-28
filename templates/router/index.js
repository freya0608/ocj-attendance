import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { exec }   from 'libs/fetcher';
import Bundle     from 'libs/react-bundle';
import RouteHook  from 'libs/react-router-hooks';

import api from 'services/api';

import load{{pascalCase routerPath}}ListPage from 'bundle-loader?lazy&name={{ routerPath }}-list!./{{pascalCase routerPath}}List.js'; // eslint-disable-line
import load{{pascalCase routerPath}}DetailPage from 'bundle-loader?lazy&name={{ routerPath }}-detail!./{{pascalCase routerPath}}Detail.js'; // eslint-disable-line

/**
 * url: localhost:3003/app/{{ routerPath }}
 */
export default ({match: {path}})=>(
  <Switch>

    { /* 详情页 */ }
    <Route path="/{{ routerPath }}/:id" component={()=>(
      <RouteHook didMount={({location: {pathname}, match: {params}})=>{
        const id = params.id;
        const refetch = exec(pathname);

        refetch({
          base(){
            //return api.fetch(`/v1/{{ routerPath }}/${id}`);
            return Promise.resolve({
              data: {
                Hello: 'World'
              }
            })
          }
        })
          .then(({base})=>(
            refetch({
              others(){
                // console.log(base); // 这里可以使用上次获取到的值
                //return api.fetch(`/v1/{{ routerPath }}/${id}/others`);
                return new Promise(resolve=>setTimeout(()=>resolve({
                  rows: [
                    'react',
                    'redux',
                    'saga',
                    'nodejs',
                    'docker'
                  ]
                }), 1500));
              }
            })
        ));
      }}>
        <Bundle load={load{{pascalCase routerPath}}DetailPage}>
          { {{pascalCase routerPath }}Detail=>!!{{pascalCase routerPath}}Detail && <{{pascalCase routerPath}}Detail />}
        </Bundle>
      </RouteHook>
    )} />



    { /* 列表页 */ }
    <Route path="/{{ routerPath }}" component={()=>(
      <Bundle load={load{{pascalCase routerPath}}ListPage}>
        { {{pascalCase routerPath }}List=>!!{{pascalCase routerPath}}List && <{{pascalCase routerPath}}List />}
      </Bundle>
    )} />

  </Switch>
)

