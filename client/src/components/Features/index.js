import React from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import '../../assets/font/stylesheet.css';
import money from '../../assets/images/money.png';
import studying from '../../assets/images/studying.png';
import talk from '../../assets/images/talk.png';
import "./style.css";

const Features = () => {
  return (
    <section className='text-center my-5'>
      <h2
        className='h1-responsive font-weight-bold my-5'
        id='firstFeature'
        style={{ fontFamily: 'kollektifregular' }}
      >
        Why use StudyCheck?
      </h2>
      <p
        className='lead grey-text w-responsive mx-auto mb-5'
        style={{ fontFamily: 'kollektifregular' }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
      <MDBRow>
        <MDBCol md='4'>
          <img
            src={money}
            alt='budget icon'
            style={{ width: '55px', height: '55px' }}
          />
          <h5
            className='font-weight-bold my-4'
            style={{ fontFamily: 'kollektifregular' }}
          >
            Budget
          </h5>
          <p
            className='grey-text mb-md-0 mb-5'
            style={{ fontFamily: 'kollektifregular' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit maiores aperiam minima assumenda deleniti hic.
          </p>
        </MDBCol>
        <MDBCol md='4'>
          <img
            src={studying}
            alt='calendar icon'
            style={{ width: '55px', height: '55px' }}
          />
          <h5
            className='font-weight-bold my-4'
            style={{ fontFamily: 'kollektifregular' }}
          >
            Organize
          </h5>
          <p
            className='grey-text mb-md-0 mb-5'
            style={{ fontFamily: 'kollektifregular' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit maiores aperiam minima assumenda deleniti hic.
          </p>
        </MDBCol>
        <MDBCol md='4'>
          <img
            src={talk}
            alt='chat icon'
            style={{ width: '55px', height: '55px' }}
          />
          <h5
            className='font-weight-bold my-4'
            style={{ fontFamily: 'kollektifregular' }}
          >
            Chat
          </h5>
          <p
            className='grey-text mb-md-0 mb-5'
            style={{ fontFamily: 'kollektifregular' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit maiores aperiam minima assumenda deleniti hic.
          </p>
        </MDBCol>
      </MDBRow>
    </section>
  );
};

export default Features;
