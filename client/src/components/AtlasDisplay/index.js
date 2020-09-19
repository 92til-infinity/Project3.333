import React from 'react';
import Iframe from 'react-iframe';
import './style.css';

const AtlasDisplay = () => {
  return (
    <div className='container mt-0' align='center' position='absolute'>
      {/* <h3 style={{ textAlign: 'match-parent' }}>Your Budget</h3> */}
      {/* code generated from MongoDBAtlas, inline styling prebuilt */}
      <Iframe
        width='500px'
        height='380px'
        className='iframe'
        src='https://charts.mongodb.com/charts-project-0-ziumq/embed/charts?id=22bf0fe2-32cf-47db-937d-c4ac0540b06c&autoRefresh=45&theme=light'
      ></Iframe>
    </div>
  );
};
//

export default AtlasDisplay;
