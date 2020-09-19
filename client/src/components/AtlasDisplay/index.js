import React from 'react';
import Iframe from 'react-iframe';

const AtlasDisplay = () => {
  return (
    <div classname='container' align='center' position='absolute'>
      <h3 classname='text-center'>Budget Display</h3>
      {/* {'{'}/* code generated from MongoDBAtlas, inline styling prebuilt */}
      <Iframe
        style={{
          background: '#21313C',
          border: 'none',
          borderRadius: 2,
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        }}
        width={640}
        height={480}
        src='https://charts.mongodb.com/charts-project-0-ziumq/embed/charts?id=22bf0fe2-32cf-47db-937d-c4ac0540b06c&autoRefresh=45&theme=light'
      ></Iframe>
    </div>
  );
};

export default AtlasDisplay;
