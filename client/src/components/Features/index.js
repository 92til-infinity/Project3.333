import React from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import '../../assets/font/stylesheet.css';
import money from '../../assets/images/money.png';
import studying from '../../assets/images/studying.png';
import manual from '../../assets/images/manual.png';

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
        We bring together all of your budgeting, expenses, schedules and todos,
        so you can conveniently get your student life in check from one
        dashboard.
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
            Easily manage your money by creating budgets and logging your
            spending with our management system.
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
            With our calendar and to-do lists, you can efficiently add events
            and tasks to keep you on track.
          </p>
        </MDBCol>
        <MDBCol md='4'>
          <img
            src={manual}
            alt='chat icon'
            style={{ width: '55px', height: '55px' }}
          />
          <h5
            className='font-weight-bold my-4'
            style={{ fontFamily: 'kollektifregular' }}
          >
            Support
          </h5>
          <p
            className='grey-text mb-md-0 mb-5'
            style={{ fontFamily: 'kollektifregular' }}
          >
            StudyCheck makes it easy for you to get all the help you need. You
            can access support via your dashboard or the Support Page.
          </p>
        </MDBCol>
      </MDBRow>
    </section>
  );
};

export default Features;
