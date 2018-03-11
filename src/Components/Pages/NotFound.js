import React from 'react';
import Page from '../Utils/Page'

export const NotFound = () => 
  <Page title="not found" status={404}>
    <div className="Home">
      Not found!
    </div>
  </Page>


export default NotFound;