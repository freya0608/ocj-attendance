import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import _isEmpty from 'lodash/isEmpty';
//import bridge from 'services/bridge';
import { ServerError } from 'components/ServerError';

import {
  mapFetcherToProps
} from 'libs/fetcher';


class {{pascalCase routerPath}}Detail extends Component {
  render(){
    const { base, others, error } = this.props;
    if(error) return <ServerError />; // 错误页
    if(_isEmpty(base)) return null;
    console.log('base', base); // TODO 开发完成后删除

    return (
      <div>
        <Helmet title="XXXXXXX详情"/>
        <div>Hello {base.data.Hello}</div>
        {this.renderOthers()}
      </div>
    )
  }

  // 延时加载
  renderOthers(){
    const { others } = this.props;
    if(_isEmpty(others)) return null;
    console.log('others', others); // TODO 开发完成后删除

    return (
      <div>
        {others.rows.map((v, i)=><div key={i}>{v}</div>)}
      </div>
    )
  }
}

export default withRouter(
  connect(mapFetcherToProps)(
    {{pascalCase routerPath}}Detail
  )
);
