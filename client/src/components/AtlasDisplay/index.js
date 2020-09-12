import React from 'react';
import Iframe from 'react-iframe';

const AtlasDisplay = () => {
  return (
    <div className='container' align='center' position='absolute'>
      <h3 className='text-center'>Budget Display</h3>
      {/* code generated from MongoDBAtlas, inline styling prebuilt */}
      <Iframe style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-project-0-ziumq/embed/charts?id=22bf0fe2-32cf-47db-937d-c4ac0540b06c&autoRefresh=60&theme=dark">
      </Iframe>
    </div>
  );
};

export default AtlasDisplay;
