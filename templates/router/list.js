import React,{ Component } from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import queryString from 'querystring';

import api from 'services/api';

import FullScreen from 'components/FullScreen/FullScreen';

import {
  SpartaListView
} from 'libs/sparta-list-view';


class {{pascalCase routerPath}}List extends Component{
  renderRow(item, idx, list){
    const style = {
      fontSize: 40,
      padding: '15px 25px'
    };

    return <div style={style}>{item}</div>;
  }

  render(){
    const { location: { pathname } } = this.props;

    return(
      <FullScreen>
        <Helmet title="XXXXXXXXX列表页" />

        <SpartaListView
          name={pathname}
          apiFn={({pageSize, pageIndex})=>{
            /*
            const search = queryString.stringify({
              page: pageIndex,
              pagesize: pageSize
            });

            return api.fetch(`/v1/products?${search}`)
              .then(response=>{
                return {
                  raw: response,
                  listData: response.rows,
                  totalCount: response.count
                }
              });
            */
            return new Promise(resolve=>{
              setTimeout(()=>{
                resolve({
                  rows: [
                    `${pageIndex} - 1`,
                    `${pageIndex} - 2`,
                    `${pageIndex} - 3`,
                    `${pageIndex} - 4`,
                    `${pageIndex} - 4`,
                    `${pageIndex} - 6`,
                    `${pageIndex} - 7`,
                    `${pageIndex} - 8`,
                    `${pageIndex} - 9`,
                    `${pageIndex} - 10`,
                  ],
                  count: 40
                })
              });
            }).then(response=>{
              return {
                raw: response,
                listData: response.rows,
                totalCount: response.count
              }
            });
          }}
          renderRow={this.renderRow.bind(this)}
          pageSize={10}
        />

      </FullScreen>
    );
  }
}

export default withRouter({{pascalCase routerPath}}List);
