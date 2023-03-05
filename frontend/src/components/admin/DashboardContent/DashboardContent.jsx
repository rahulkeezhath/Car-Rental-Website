import React, {useEffect} from 'react'
import styled from 'styled-components'
import Navbar from '../Navbar/Navbar'
import DashboardCard from '../DashboardCard/DashboardCard'
import scrollreveal from 'scrollreveal'
import './DashboardContent.scss'
import {ResponsiveContainer,BarChart,Bar,XAxis,Tooltip} from 'recharts'


const dummyData=[
  {name:"Sat",mileStats:4000},
  {name:"Sun",mileStats:3000},
  {name:"Mon",mileStats:4200},
  {name:"Tue",mileStats:5600},
  {name:"Wed",mileStats:1890},
]


const DashboardContent = ({children}) => {

  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });

    sr.reveal(
      `
      nav,
      .row_one,
      .row_two
      `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);


  return <Section>
    <Navbar/>
      {children}
      <div className="dashboard">
      <div className="dashboard_warapper">
        <div className="dashboard_cards">
          <DashboardCard title={'Total Cars'} value={8} symbol={<i className="ri-car-fill"></i>} />
          <DashboardCard title={'Users'} value={6} symbol={<i className="ri-booklet-fill"></i>} />
          <DashboardCard title={'Bookings'} value={3} symbol={<i className="ri-car-fill"></i>} />
          <DashboardCard title={'Places'} value={3} symbol={<i className="ri-car-fill"></i>} />
        </div>
        <div className="statics">
          <div className="stats">
            <h3>Miles Statics</h3>
            <ResponsiveContainer width={'100%'} aspect={4/1}>
              <BarChart data={dummyData}>
            <XAxis dataKey={'name'} stroke='#000' />
            <Bar dataKey={'mileStats'} stroke={'rgba(94, 80, 63, 0.81)'} fill={'rgba(95, 71, 42, 0.81)'} barSize={30} />
            <Tooltip cursor={false} wrapperClassName='toolTip_style' />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
        </div>
      </div>
    </div>
  </Section>
}

const Section = styled.section`
margin-left: 18vw;
padding: 2rem;
height: 100%;
.grid{
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  margin-top: 2rem;
  .row_one{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 50%;
    gap: 1rem;
  }
  .row_two{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 50%;
    gap: 1rem;
  }
}
@media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export default DashboardContent
